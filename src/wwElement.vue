<template>
    <div :id="mapContainerId"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import './mapbox-gl.css';

const DEFAULT_MARKERS_CONTENT_FIELD = 'content';
const DEFAULT_MARKERS_LAT_FIELD = 'lat';
const DEFAULT_MARKERS_LNG_FIELD = 'lng';
const DEFAULT_MARKERS_COLOR_FIELD = 'color';
const DEFAULT_MARKERS_DRAGGABLE_FIELD = 'draggable';

const DEFAULT_LAYERS_ID_FIELD = 'id';
const DEFAULT_LAYERS_TYPE_FIELD = 'type';
const DEFAULT_LAYERS_SOURCE_FIELD = 'source';
const DEFAULT_LAYERS_SOURCE_LAYER_FIELD = 'sourceLayer';
const DEFAULT_LAYERS_OPTIONS_FIELD = 'options';

const DEFAULT_SOURCES_ID_FIELD = 'id';
const DEFAULT_SOURCES_TYPE_FIELD = 'type';
const DEFAULT_SOURCES_OPTIONS_FIELD = 'options';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event', 'update:content:effect'],
    setup() {
        return {
            mapContainerId: 'ww-mapbox-' + wwLib.wwUtils.getUid(),
            map: null,
            markerInstances: [],
        };
    },
    computed: {
        mapStyle() {
            return this.content.mapStyle || this.content.styleUrl;
        },
        center() {
            return [Number(this.content.lng), Number(this.content.lat)];
        },
        markers() {
            const contentField = this.content.markersContentField || DEFAULT_MARKERS_CONTENT_FIELD;
            const latField = this.content.markersLatField || DEFAULT_MARKERS_LAT_FIELD;
            const lngField = this.content.markersLngField || DEFAULT_MARKERS_LNG_FIELD;
            const colorField = this.content.markersColorField || DEFAULT_MARKERS_COLOR_FIELD;
            const draggableField = this.content.markersDraggableField || DEFAULT_MARKERS_DRAGGABLE_FIELD;

            const data = wwLib.wwCollection.getCollectionData(this.content.markers);
            if (!Array.isArray(data)) return [];

            return data.map(marker => ({
                content: wwLib.resolveObjectPropertyPath(marker, contentField) || '',
                color: wwLib.resolveObjectPropertyPath(marker, colorField) || this.content.defaultMarkerColor || null,
                draggable:
                    wwLib.resolveObjectPropertyPath(marker, draggableField) ||
                    this.content.defaultMarkerDraggable ||
                    false,
                position: {
                    lat: Number(wwLib.resolveObjectPropertyPath(marker, latField) || 0),
                    lng: Number(wwLib.resolveObjectPropertyPath(marker, lngField) || 0),
                },
                rawData: marker,
            }));
        },
        sources() {
            const sourcesIdField = this.content.sourcesIdField || DEFAULT_SOURCES_ID_FIELD;
            const sourcesTypeField = this.content.sourcesTypeField || DEFAULT_SOURCES_TYPE_FIELD;
            const sourcesOptionsField = this.content.sourcesOptionsField || DEFAULT_SOURCES_OPTIONS_FIELD;

            const data = wwLib.wwCollection.getCollectionData(this.content.sources);
            if (!Array.isArray(data)) return [];

            return data.map(source => ({
                id: wwLib.resolveObjectPropertyPath(source, sourcesIdField) || '',
                type: wwLib.resolveObjectPropertyPath(source, sourcesTypeField) || '',
                options: wwLib.resolveObjectPropertyPath(source, sourcesOptionsField) || {},
            }));
        },
        layers() {
            const layersIdField = this.content.layersIdField || DEFAULT_LAYERS_ID_FIELD;
            const layersTypeField = this.content.layersTypeField || DEFAULT_LAYERS_TYPE_FIELD;
            const layersSourceField = this.content.layersSourceField || DEFAULT_LAYERS_SOURCE_FIELD;
            const layersSourceLayerField = this.content.layersSourceLayerField || DEFAULT_LAYERS_SOURCE_LAYER_FIELD;
            const layersOptionsField = this.content.layersOptionsField || DEFAULT_LAYERS_OPTIONS_FIELD;

            const data = wwLib.wwCollection.getCollectionData(this.content.layers);
            if (!Array.isArray(data)) return [];

            return data.map(layer => ({
                id: wwLib.resolveObjectPropertyPath(layer, layersIdField) || '',
                type: wwLib.resolveObjectPropertyPath(layer, layersTypeField) || '',
                source: wwLib.resolveObjectPropertyPath(layer, layersSourceField) || '',
                sourceLayer: wwLib.resolveObjectPropertyPath(layer, layersSourceLayerField) || '',
                options: wwLib.resolveObjectPropertyPath(layer, layersOptionsField) || {},
            }));
        },
    },
    watch: {
        /* wwEditor:start */
        'content.logoPosition'() {
            this.loadMap();
        },
        'wwEditorState.boundProps.markers'(isBind) {
            if (!isBind)
                this.$emit('update:content:effect', {
                    markersContentField: null,
                    markersLatField: null,
                    markersLngField: null,
                    markersColorField: null,
                    markersDraggableField: null,
                });
        },
        'wwEditorState.boundProps.sources'(isBind) {
            if (!isBind)
                this.$emit('update:content:effect', {
                    sourcesIdField: null,
                    sourcesTypeField: null,
                    sourcesOptionsField: null,
                });
        },
        'wwEditorState.boundProps.layers'(isBind) {
            if (!isBind)
                this.$emit('update:content:effect', {
                    layersIdField: null,
                    layersTypeField: null,
                    layersSourceField: null,
                    layersSourceLayerField: null,
                    layersOptionsField: null,
                });
        },
        /* wwEditor:end */
        'content.apiAccessToken'(value) {
            if (!value) return;
            this.loadMap();
        },
        'content.zoom'(value) {
            if (!this.map) return;
            this.map.setZoom(value);
        },
        'content.mapProjection'(value) {
            if (!this.map) return;
            this.map.setProjection(value);
        },
        'content.fixedBounds'(value) {
            if (!this.map) return;
            if (value) this.fitMarkersBounds();
        },
        mapStyle(value) {
            if (!this.map) return;
            this.map.setStyle(value);
        },
        center(value) {
            if (!this.map) return;
            this.map.setCenter(value);
        },
        markers() {
            this.loadMarkers();
        },
        sources(newSources, oldSources) {
            this.refreshSourcesAndLayers({ newSources, oldSources, newLayers: this.layers, oldLayers: this.layers });
        },
        layers(newLayers, oldLayers) {
            this.refreshSourcesAndLayers({ newLayers, oldLayers, newSources: this.sources, oldSources: this.sources });
        },
    },
    methods: {
        loadMap() {
            mapboxgl.accessToken = this.content.apiAccessToken;
            document.getElementById(this.mapContainerId).innerHTML = '';
            this.map = new mapboxgl.Map({
                container: this.mapContainerId,
                style: this.mapStyle,
                center: this.center,
                zoom: this.content.zoom,
                projection: this.content.mapProjection,
                scrollZoom: this.content.scrollZoom,
                trackResize: this.content.trackResize,
                logoPosition: this.content.logoPosition,
                attributionControl: false,
            });
            this.map.on('style.load', () => {
                this.map.setFog({}); // Set the default atmosphere style
            });
            this.map.on('click', this.handleMapClick);
            this.loadMarkers();

            this.map.on('load', () => {
                this.refreshSourcesAndLayers({ newSources: this.sources, newLayers: this.layers });
            });
        },
        refreshSourcesAndLayers({ newSources = [], oldSources = [], newLayers = [], oldLayers = [] }) {
            if (!this.map) return;

            try {
                // We need to clear layers before sources
                for (const layer of oldLayers) {
                    if (!layer.id) continue;
                    this.map.removeLayer(layer.id);
                }

                for (const source of oldSources) {
                    if (!source.id) continue;
                    this.map.removeSource(source.id);
                }

                // We need to add sources before layers
                for (const source of newSources) {
                    if (!source.id) continue;
                    this.map.addSource(source.id, {
                        type: source.type,
                        ...(source.options ? source.options : {}),
                    });
                }

                for (const layer of newLayers) {
                    if (!layer.id) continue;
                    this.map.addLayer({
                        id: layer.id,
                        type: layer.type,
                        source: layer.source,
                        'source-layer': layer.sourceLayer,
                        ...(layer.options ? layer.options : {}),
                    });
                }
            } catch (error) {
                wwLib.wwLog.warn('WW-MAPBOX FAILED TO REFRESH SOURCES AND LAYERS', error);
            }
        },
        loadMarkers() {
            if (!this.map) return;

            // Clear markers
            for (const marker of this.markerInstances) {
                marker.remove();
            }

            for (const marker of this.markers) {
                const _marker = new mapboxgl.Marker({
                    color: marker.color,
                    draggable: marker.draggable,
                })
                    .setLngLat([marker.position.lng, marker.position.lat])
                    .setPopup(new mapboxgl.Popup().setHTML(marker.content))
                    .addTo(this.map);
                _marker.getElement().addEventListener('click', () => this.handleMarkerClick(marker));
                _marker.getElement().addEventListener('mouseover', () => this.handleMarkerClick(marker));
                _marker.getElement().addEventListener('mouseout', () => this.handleMarkerClick(marker));
                _marker.on('dragstart', event => this.handleMarkerDrag(marker, event));
                _marker.on('drag', event => this.handleMarkerDrag(marker, event));
                _marker.on('dragend', event => this.handleMarkerDrag(marker, event));
                this.markerInstances.push(_marker);
            }

            if (this.content.fixedBounds) this.fitMarkersBounds();
        },
        fitMarkersBounds() {
            if (!this.map || !this.markers.length) return;
            const baseBounds = new mapboxgl.LngLatBounds(
                [this.markers[0].position.lng, this.markers[0].position.lat],
                [this.markers[0].position.lng, this.markers[0].position.lat]
            );
            const bounds = this.markers.reduce((bounds, marker) => {
                return bounds.extend([marker.position.lng, marker.position.lat]);
            }, baseBounds);

            this.map.fitBounds(bounds, { padding: 20 });
        },
        handleMarkerClick(marker) {
            this.$emit('trigger-event', {
                name: 'marker:click',
                event: { marker },
            });
        },
        handleMarkerMouseover(marker) {
            this.$emit('trigger-event', {
                name: 'marker:mouseover',
                event: { marker },
            });
        },
        handleMarkerMouseout(marker) {
            this.$emit('trigger-event', {
                name: 'marker:mouseout',
                event: { marker },
            });
        },
        handleMarkerDrag(marker, event) {
            this.$emit('trigger-event', {
                name: 'marker:' + event.type,
                event: { marker, lngLat: event.target._lngLat },
            });
        },
        handleMapClick(event) {
            this.$emit('trigger-event', {
                name: 'map:click',
                event: { ...event, domEvent: event.originalEvent },
            });
        },
    },
};
</script>

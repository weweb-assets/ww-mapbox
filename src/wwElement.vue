<template>
    <div :id="mapContainerId"></div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import './mapbox-gl.css';

export default {
    props: {
        content: { type: Object, required: true },
        /* wwEditor:start */
        wwEditorState: { type: Object, required: true },
        /* wwEditor:end */
    },
    emits: ['trigger-event', 'update:content:effect'],
    setup() {
        const { resolveMappingFormula } = wwLib.wwFormula.useFormula();
        return {
            mapContainerId: 'ww-mapbox-' + wwLib.wwUtils.getUid(),
            map: null,
            markerInstances: [],
            resolveMappingFormula
        };
    },
    mounted() {
        this.loadMap()
    },
    computed: {
        mapStyle() {
            return this.content.mapStyle || this.content.styleUrl;
        },
        center() {
            return [Number(this.content.lng), Number(this.content.lat)];
        },
        markers() {
            const data = wwLib.wwCollection.getCollectionData(this.content.markers);
            if (!Array.isArray(data)) return [];

            return data.map(marker => ({
                content: this.resolveMappingFormula(this.content.contentField, marker, marker.content || ''),
                color: this.resolveMappingFormula(this.content.colorField, marker, marker.color || null),
                draggable:
                    this.resolveMappingFormula(this.content.draggableField, marker, marker.draggable || false),
                position: {
                    lat: Number(this.resolveMappingFormula(this.content.latField, marker, marker.lat || 0)),
                    lng: Number(this.resolveMappingFormula(this.content.lngField, marker, marker.lng || 0)),
                },
                rawData: marker,
            }));
        },
        sources() {
            const data = wwLib.wwCollection.getCollectionData(this.content.sources);
            if (!Array.isArray(data)) return [];

            return data.map(source => ({
                id: this.resolveMappingFormula(this.content.sourcesIdField, source, source.id || ''),
                type: this.resolveMappingFormula(this.content.sourcesTypeField, source, source.type || ''),
                url: this.resolveMappingFormula(this.content.sourcesUrlField, source, source.url || ''),
                options: this.resolveMappingFormula(this.content.sourcesOptionsField, source, source.options || {}),
            }));
        },
        layers() {
            const data = wwLib.wwCollection.getCollectionData(this.content.layers);
            if (!Array.isArray(data)) return [];

            return data.map(layer => ({
                id: this.resolveMappingFormula(this.content.layersIdField, layer, layer.id || ''),
                type: this.resolveMappingFormula(this.content.layersTypeField, layer, layer.type || ''),
                source: this.resolveMappingFormula(this.content.layersSourceField, layer, layer.source || ''),
                sourceLayer: this.resolveMappingFormula(this.content.layersSourceLayerField, layer, layer.sourceLayer || ''),
                minzoom: this.resolveMappingFormula(this.content.layersMinZoomField, layer, layer.minZoom || 0),
                maxzoom: this.resolveMappingFormula(this.content.layersMaxZoomField, layer, layer.maxZoom || 24),
                layout: this.resolveMappingFormula(this.content.layersLayoutField, layer, layer.layout || {}),
                paint: this.resolveMappingFormula(this.content.layersPaintField, layer, layer.paint || {}),
                filter: this.resolveMappingFormula(this.content.layersFilterField, layer, layer.filter || null),
                metadata: this.resolveMappingFormula(this.content.layersMetadataField, layer, layer.metadata || null),
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
            if (!this.content.apiAccessToken) return
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
                    if (!layer.id || !this.map.getLayer(layer.id)) continue;
                    this.map.removeLayer(layer.id);
                }

                for (const source of oldSources) {
                    if (!source.id || !this.map.getSource(source.id)) continue;
                    this.map.removeSource(source.id);
                }

                // We need to add sources before layers
                for (const source of newSources) {
                    if (!source.id) continue;
                    this.map.addSource(source.id, this.formatSource(source));
                }

                for (const layer of newLayers) {
                    if (!layer.id) continue;
                    this.map.addLayer(this.formatLayer(layer));
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
        formatSource(source) {
            const _source = {...source, ...(source.options || null)}
            delete _source.id
            delete _source.options
            if(['geojson', 'video'].includes(_source.type)) delete _source.url
            return _source
        },
        formatLayer(layer) {
            const _layer = {...layer}
            if (!_layer.filter) delete _layer.filter
            return _layer
        },
        /* wwEditor:start */
        getMarkerTestEvent() {
            if(!this.markers.length) throw new Error('No markers found')
            return {marker: this.markers[0]}
        },
        getMarkerDragTestEvent() {
            if(!this.markers.length) throw new Error('No markers found')
            return {marker: this.markers[0], lngLat: {
                    lat: 48.84872727506581,
                    lng: 2.351657694024656,
                },}
        },
        /* wwEditor:end */
    },
};
</script>

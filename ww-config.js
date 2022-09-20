export default {
    editor: {
        label: {
            en: 'Mapbox',
        },
        icon: 'tracking',
        customSettingsPropertiesOrder: [
            'apiAccessToken',
            ['lat', 'lng', 'zoom'],
            ['scrollZoom', 'trackResize', 'defaultMarkerDraggable', 'fixedBounds'],
            [
                'markers',
                'markersHintFields',
                'markersContentField',
                'markersLatField',
                'markersLngField',
                'markersColorField',
                'markersDraggableField',
            ],
            'advancedOptions',
            ['sources', 'sourcesHintFields', 'sourcesIdField', 'sourcesTypeField', 'sourcesUrlField', 'sourcesOptionsField'],
            [
                'layers',
                'layersHintFields',
                'layersIdField',
                'layersTypeField',
                'layersSourceField',
                'layersSourceLayerField',
                'layersMinZoomField',
                'layersMaxZoomField',
                'layersLayoutField',
                'layersPaintField',
                'layersFilterField',
                'layersMetadataField',
            ],
        ],
    },
    triggerEvents: [
        {
            name: 'map:click',
            label: { en: 'On map click' },
            event: {
                lngLat: {
                    lat: 48.84872727506581,
                    lng: 2.351657694024656,
                },
                point: {
                    x: 474,
                    y: 196,
                },
                domEvent: {},
            },
            default: true
        },
        {
            name: 'marker:mouseover',
            label: { en: 'On marker mouse enter' },
            event: {
                marker: {
                    content: 'Paris',
                    position: {
                        lat: 48.84872727506581,
                        lng: 2.351657694024656,
                    },
                    rawData: {},
                },
            },
        },
        {
            name: 'marker:mouseout',
            label: { en: 'On marker mouse leave' },
            event: {
                marker: {
                    content: 'Paris',
                    position: {
                        lat: 48.84872727506581,
                        lng: 2.351657694024656,
                    },
                    rawData: {},
                },
            },
        },
        {
            name: 'marker:click',
            label: { en: 'On marker click' },
            event: {
                marker: {
                    content: 'Paris',
                    position: {
                        lat: 48.84872727506581,
                        lng: 2.351657694024656,
                    },
                    rawData: {},
                },
            },
        },
        {
            name: 'marker:dragstart',
            label: { en: 'On marker drag start' },
            event: {
                marker: {
                    content: 'Paris',
                    position: {
                        lat: 48.84872727506581,
                        lng: 2.351657694024656,
                    },
                    rawData: {},
                },
                lngLat: {
                    lat: 48.84872727506581,
                    lng: 2.351657694024656,
                },
            },
        },
        {
            name: 'marker:drag',
            label: { en: 'On marker drag' },
            event: {
                marker: {
                    content: 'Paris',
                    position: {
                        lat: 48.84872727506581,
                        lng: 2.351657694024656,
                    },
                    rawData: {},
                },
                lngLat: {
                    lat: 48.84872727506581,
                    lng: 2.351657694024656,
                },
            },
        },
        {
            name: 'marker:dragend',
            label: { en: 'On marker drag end' },
            event: {
                marker: {
                    content: 'Paris',
                    position: {
                        lat: 48.84872727506581,
                        lng: 2.351657694024656,
                    },
                    rawData: {},
                },
                lngLat: {
                    lat: 48.84872727506581,
                    lng: 2.351657694024656,
                },
            },
        },
    ],
    properties: {
        mapStyle: {
            label: {
                en: 'Map style',
                fr: 'Style de la map',
            },
            type: 'TextSelect',
            options: {
                options: [
                    {
                        value: 'mapbox://styles/mapbox/streets-v11',
                        label: 'Mapbox Streets',
                    },
                    {
                        value: 'mapbox://styles/mapbox/outdoors-v11',
                        label: 'Mapbox outdoors',
                    },
                    { value: 'mapbox://styles/mapbox/light-v10', label: 'Mapbox Light' },
                    { value: 'mapbox://styles/mapbox/dark-v10', label: 'Mapbox Dark' },
                    {
                        value: 'mapbox://styles/mapbox/satellite-v9',
                        label: 'Mapbox Satellite',
                    },
                    {
                        value: 'mapbox://styles/mapbox/satellite-streets-v11',
                        label: 'Mapbox Satellite Streets',
                    },
                    {
                        value: 'mapbox://styles/mapbox/navigation-day-v1',
                        label: 'Mapbox Navigation Day',
                    },
                    {
                        value: 'mapbox://styles/mapbox/navigation-night-v1',
                        label: 'Mapbox Navigation Night',
                    },
                    { value: null, label: 'Custom' },
                ],
            },
            defaultValue: 'mapbox://styles/mapbox/streets-v11',
            bindable: true,
        },
        styleUrl: {
            hidden: content => !!content.mapStyle,
            label: { en: 'Style URL', fr: 'Style URL' },
            type: 'Text',
            options: {
                placeholder: 'mapbox://styles/username/styleid',
            },
            defaultValue: '',
            bindable: true,
        },
        mapProjection: {
            label: {
                en: 'Map projection',
                fr: 'Map projection',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'albers', label: 'Albers' },
                    { value: 'equalEarth', label: 'Equal Earth' },
                    { value: 'equirectangular', label: 'Equirectangular' },
                    { value: 'globe', label: '3D Globe' },
                    { value: 'lambertConformalConic', label: 'Lambert Conformal Conic' },
                    { value: 'mercator', label: 'Mercator' },
                    { value: 'naturalEarth', label: 'Natural Earth' },
                    { value: 'winkelTripel', label: 'Winkel Tripel' },
                ],
            },
            defaultValue: 'globe',
            bindable: true,
        },
        logoPosition: {
            label: {
                en: 'Logo position',
                fr: 'Logo position',
            },
            type: 'TextSelect',
            options: {
                options: [
                    { value: 'top-left', label: 'Top left' },
                    { value: 'top-right', label: 'Top right' },
                    { value: 'bottom-left', label: 'Bottom left' },
                    { value: 'bottom-right', label: 'Bottom right' },
                ],
            },
            defaultValue: 'bottom-left',
        },
        defaultMarkerColor: {
            label: {
                en: 'Default Markers color',
                fr: 'Default Markers color',
            },
            type: 'Color',
            defaultValue: '#F23636',
            bindable: true,
        },
        apiAccessToken: {
            section: 'settings',
            label: { en: 'API access token', fr: 'API access token' },
            type: 'Text',
            options: {
                placeholder:
                    'pk.eyJ1IjoiYWxleGlzamMiLCJhIjoiY2w2eHUwOXR0MHdrczNncWx2eGMxcXdqbSJ9.qDyDmFSrF81mnB_VkeFPmK',
            },
            defaultValue: '',
            bindable: true,
        },
        lat: {
            section: 'settings',
            label: { en: 'Latitude', fr: 'Latitude' },
            type: 'Text',
            options: {
                placeholder: 'Latitude',
            },
            defaultValue: '40.712784',
            bindable: true,
        },
        lng: {
            section: 'settings',
            label: { en: 'Longitude', fr: 'Longitude' },
            type: 'Text',
            options: {
                placeholder: 'Longitude',
            },
            defaultValue: '-74.005941',
            bindable: true,
        },
        zoom: {
            section: 'settings',
            type: 'Number',
            label: { en: 'Zoom', fr: 'Zoom' },
            options: {
                min: 0,
                max: 20,
                step: 1,
            },
            defaultValue: 9,
            bindable: true,
        },
        scrollZoom: {
            section: 'settings',
            label: {
                en: 'Scroll zoom',
                fr: 'Scroll zoom',
            },
            type: 'OnOff',
            defaultValue: true,
        },
        trackResize: {
            section: 'settings',
            label: {
                en: 'Track resize',
                fr: 'Track resize',
            },
            type: 'OnOff',
            defaultValue: true,
        },
        defaultMarkerDraggable: {
            section: 'settings',
            label: {
                en: 'Markers draggable',
                fr: 'Markers draggable',
            },
            type: 'OnOff',
            defaultValue: false,
            bindable: true,
        },
        fixedBounds: {
            section: 'settings',
            label: { en: 'Fixed markers bounds', fr: 'Fixed markers bounds' },
            type: 'OnOff',
            defaultValue: true,
            bindable: true,
        },
        markers: {
            section: 'settings',
            label: { en: 'Markers', fr: 'Markers' },
            bindable: true,
            type: 'Array',
            options: {
                getItemLabel(_, index) {
                    return `Marker ${index + 1}`;
                },
                movable: true,
                expandable: true,
                item: {
                    type: 'Object',
                    defaultValue: {
                        content: '',
                        lat: 0,
                        lng: 0,
                        color: '#F23636',
                        draggable: false,
                    },
                    options: {
                        item: {
                            content: {
                                label: { en: 'Content' },
                                type: 'Text',
                                options: { placeholder: 'Content' },
                            },
                            lat: {
                                label: { en: 'Latitude' },
                                type: 'Text',
                                options: { placeholder: 'Latitude' },
                            },
                            lng: {
                                label: { en: 'Longitude' },
                                type: 'Text',
                                options: { placeholder: 'Longitude' },
                            },
                            lng: {
                                label: { en: 'Longitude' },
                                type: 'Text',
                                options: { placeholder: 'Longitude' },
                            },
                            color: {
                                label: { en: 'Color' },
                                type: 'Color',
                            },
                            draggable: {
                                label: { en: 'Draggable' },
                                type: 'OnOff',
                            },
                        },
                    },
                },
            },
            defaultValue: [
                {
                    title: 'New York',
                    content:
                        'New York, often called New York City (NYC) to distinguish it from the State of New York, is the most populous city in the United States.',
                    lat: 40.712784,
                    lng: -74.005941,
                    color: null,
                    draggable: false,
                },
                {
                    title: 'Brooklyn',
                    content:
                        'Brooklyn is a borough of New York City, coextensive with Kings County, in the U.S. state of New York.',
                    lat: 40.650002,
                    lng: -73.949997,
                    color: null,
                    draggable: false,
                },
            ],
        },
        markersHintFields: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.markers || content.markers,
            label: {
                en: 'Marker fields',
                fr: 'Champs du marker',
            },
            type: 'Info',
            options: {
                text: { en: 'Please provide at least one marker to configure fields' },
            },
            editorOnly: true,
            section: 'settings',
        },
        markersContentField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.markers || !content.markers,
            label: {
                en: 'Marker content',
                fr: 'Marker content',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.markers.length || typeof content.markers[0] !== 'object') {
                    return null;
                }

                return { object: content.markers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        markersLatField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.markers || !content.markers,
            label: {
                en: 'Marker lat. field',
                fr: 'Marker lat. field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.markers.length || typeof content.markers[0] !== 'object') {
                    return null;
                }

                return { object: content.markers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        markersLngField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.markers || !content.markers,
            label: {
                en: 'Marker long. field',
                fr: 'Marker long. field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.markers.length || typeof content.markers[0] !== 'object') {
                    return null;
                }

                return { object: content.markers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        markersColorField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.markers || !content.markers,
            label: {
                en: 'Marker color',
                fr: 'Marker color',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.markers.length || typeof content.markers[0] !== 'object') {
                    return null;
                }

                return { object: content.markers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        markersDraggableField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.markers || !content.markers,
            label: {
                en: 'Marker draggable',
                fr: 'Marker draggable',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.markers.length || typeof content.markers[0] !== 'object') {
                    return null;
                }

                return { object: content.markers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        advancedOptions: {
            label: {
                en: 'Advanced',
                fr: 'Avancées',
            },
            type: 'Info',
            options: {
                text: { en: 'Read the mapbox-gl-js documentation to use custom sources & layers' },
            },
            editorOnly: true,
            section: 'settings',
        },
        layers: {
            section: 'settings',
            label: { en: 'Layers', fr: 'Layers' },
            bindable: true,
            type: 'Array',
            options: {
                getItemLabel(_, index) {
                    return `Layer ${index + 1}`;
                },
                movable: true,
                expandable: true,
                item: {
                    type: 'Object',
                    defaultValue: {
                        id: '',
                        type: '',
                        source: null,
                        sourceLayer: '',
                        metadata: null,
                        layout: null,
                        paint: null,
                        minZoom: 0,
                        maxZoom: 24,
                        filter: null
                    },
                    options: {
                        item: {
                            id: {
                                label: { en: 'Unique Id' },
                                type: 'Text',
                                options: { placeholder: 'my-layer-id' },
                                bindable: true,
                            },
                            type: {
                                label: { en: 'Type' },
                                type: 'TextSelect',
                                options: {
                                    options: [
                                        { value: 'fill', label: 'fill' },
                                        { value: 'line', label: 'line' },
                                        { value: 'symbol', label: 'symbol' },
                                        { value: 'circle', label: 'circle' },
                                        { value: 'heatmap', label: 'heatmap' },
                                        { value: 'fill-extrusion', label: 'fill-extrusion' },
                                        { value: 'raster', label: 'raster' },
                                        { value: 'hillshade', label: 'hillshade' },
                                        { value: 'background', label: 'background' },
                                        { value: 'sky', label: 'sky' },
                                    ],
                                },
                                bindable: true,
                            },
                            source: {
                                label: { en: 'Source' },
                                type: 'TextSelect',
                                options: content => {
                                    return {
                                        options: content.sources.map(source => ({
                                            label: source.id,
                                            value: source.id,
                                        })),
                                    };
                                },
                                bindable: true,
                            },
                            sourceLayer: {
                                label: { en: 'Source layer' },
                                type: 'Text',
                                options: { placeholder: 'Source layer' },
                                bindable: true,
                            },
                            minZoom: {
                                type: 'Number',
                                label: { en: 'Min zoom', fr: 'Min zoom' },
                                options: {
                                    min: 0,
                                    max: 24,
                                    step: 1,
                                },
                                defaultValue: 0,
                                bindable: true,
                            },
                            maxZoom: {
                                type: 'Number',
                                label: { en: 'Max zoom', fr: 'Max zoom' },
                                options: {
                                    min: 0,
                                    max: 24,
                                    step: 1,
                                },
                                defaultValue: 24,
                                bindable: true,
                            },
                            metadata: {
                                label: { en: 'Metadata' },
                                type: 'Info',
                                bindable: true,
                            },
                            layout: {
                                label: { en: 'Layout' },
                                type: 'Info',
                                bindable: true,
                            },
                            paint: {
                                label: { en: 'Paint' },
                                type: 'Info',
                                bindable: true,
                            },
                            filter: {
                                label: { en: 'Filter' },
                                type: 'Info',
                                bindable: true,
                            },
                        },
                    },
                },
            },
            defaultValue: [],
        },
        layersHintFields: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || content.layers,
            label: {
                en: 'Layers fields',
                fr: 'Champs des layers',
            },
            type: 'Info',
            options: {
                text: { en: 'Please provide at least one layer to configure fields' },
            },
            editorOnly: true,
            section: 'settings',
        },
        layersIdField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Id field',
                fr: 'Id field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersTypeField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Type field',
                fr: 'Type field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersSourceField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Source field',
                fr: 'Source field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersSourceLayerField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Source layer field',
                fr: 'Source layer field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersMetadataField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Metadata field',
                fr: 'Metadata field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersLayoutField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Layout field',
                fr: 'Layout field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersPaintField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Paint field',
                fr: 'Paint field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersFilterField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Filter field',
                fr: 'Filter field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersMaxZoomField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Max zoom field',
                fr: 'Max zoom field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        layersMinZoomField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.layers || !content.layers,
            label: {
                en: 'Min zoom field',
                fr: 'Min zoom field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.layers.length || typeof content.layers[0] !== 'object') {
                    return null;
                }

                return { object: content.layers[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        sources: {
            section: 'settings',
            label: { en: 'Sources', fr: 'Sources' },
            bindable: true,
            type: 'Array',
            options: {
                getItemLabel(_, index) {
                    return `Source ${index + 1}`;
                },
                movable: true,
                expandable: true,
                item: {
                    type: 'Object',
                    defaultValue: { id: '', type: '', config: {} },
                    options: {
                        item: {
                            id: {
                                label: { en: 'Unique Id' },
                                type: 'Text',
                                options: { placeholder: 'Id' },
                                bindable: true,
                            },
                            type: {
                                label: { en: 'Type' },
                                type: 'TextSelect',
                                options: {
                                    options: [
                                        { value: 'vector', label: 'vector' },
                                        { value: 'raster', label: 'raster' },
                                        { value: 'raster-dem', label: 'raster-dem' },
                                        { value: 'geojson', label: 'geojson' },
                                        { value: 'image', label: 'image' },
                                        { value: 'video', label: 'video' },
                                    ],
                                },
                                bindable: true,
                            },
                            url: {
                                label: { en: 'Url (Tileset)' },
                                type: 'Text',
                                options: { placeholder: 'mapbox://mapbox.mapbox-streets-v6' },
                                bindable: true,
                            },
                            options: {
                                label: { en: 'Advanced options' },
                                type: 'Info',
                                bindable: true,
                            },
                        },
                    },
                },
            },
            defaultValue: [],
        },
        sourcesHintFields: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.sources || content.sources,
            label: {
                en: 'Sources fields',
                fr: 'Champs des sources',
            },
            type: 'Info',
            options: {
                text: { en: 'Please provide at least one source to configure fields' },
            },
            editorOnly: true,
            section: 'settings',
        },
        sourcesIdField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.sources || !content.sources,
            label: {
                en: 'Id field',
                fr: 'Id field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.sources.length || typeof content.sources[0] !== 'object') {
                    return null;
                }

                return { object: content.sources[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        sourcesTypeField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.sources || !content.sources,
            label: {
                en: 'Type field',
                fr: 'Type field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.sources.length || typeof content.sources[0] !== 'object') {
                    return null;
                }

                return { object: content.sources[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        sourcesUrlField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.sources || !content.sources,
            label: {
                en: 'Url field',
                fr: 'Url field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.sources.length || typeof content.sources[0] !== 'object') {
                    return null;
                }

                return { object: content.sources[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
        sourcesOptionsField: {
            hidden: (content, sidepanelContent, boundProps) => !boundProps.sources || !content.sources,
            label: {
                en: 'Advanced Opt. field',
                fr: 'Advanced Opt. field',
            },
            type: 'ObjectPropertyPath',
            options: content => {
                if (!content.sources.length || typeof content.sources[0] !== 'object') {
                    return null;
                }

                return { object: content.sources[0] };
            },
            defaultValue: null,
            section: 'settings',
        },
    },
};

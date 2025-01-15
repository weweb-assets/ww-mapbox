---
name: ww-mapbox
description: The ww-mapbox component renders an interactive Mapbox map with customizable styles, projections, and markers, supporting custom layers and sources, and requires a user-provided API access token for full functionality.
keywords: mapbox gl js, interactive map, custom markers, map projections, map layers, api access token, draggable markers, zoom level, custom map styles, marker popups
---

#### ww-mapbox

Component Purpose: Renders interactive Mapbox GL JS map with markers, custom layers, and sources. Customizable with zoom, center, style settings.

Properties:
- mapStyle: string|null - Predefined/custom style URL
- styleUrl: string - Custom style URL when mapStyle null. Default: ""
- mapProjection: string - Map projection type. Default: "globe"
- logoPosition: string - Mapbox logo position. Default: "bottom-left"
- customMarker: boolean - Use custom marker icons. Default: false
- defaultMarkerColor: string|null - Default marker color. Default: "#F23636"
- defaultMarkerIcon: string|null - Default custom marker icon URL. Default: null
- defaultMarkerWidth: string - Custom marker width. Default: "40px"
- defaultMarkerHeight: string - Custom marker height. Default: "auto"
- disablePopups: boolean - Disable marker popups. Default: false
- popupHideCloseButton: boolean - Hide popup close button. Default: false
- popupStayOpenOnClick: boolean - Keep popups open on click. Default: false
- popupCloseOnMove: boolean - Close popups on map move. Default: false
- popupMaxWidth: string - Popup max width. Default: "240px"
- apiAccessToken: string - Mapbox API token. Default: ""
- lat: string - Initial latitude. Default: "40.712784"
- lng: string - Initial longitude. Default: "-74.005941"
- zoom: number - Initial zoom level. Default: 9
- scrollZoom: boolean - Enable scroll zoom. Default: true
- trackResize: boolean - Track window resize. Default: true
- defaultMarkerDraggable: boolean - Markers draggable by default. Default: false
- fixedBounds: boolean - Auto-adjust bounds to fit markers. Default: true
- text: string|object - Input field text. Default: ""
- markers: array - Marker objects with content, position, style properties
- sources: array - Source objects with id, type, url, options
- layers: array - Layer objects with styling and rendering properties

Events:
- map:load - When map initially loads. No payload.
- map:render - When map renders. No payload.
- map:idle - When map becomes idle. No payload.
- map:click - When map is clicked. Payload: {lngLat, point, domEvent}.
- map:dragstart - When map drag starts. Payload: {lngLat}.
- map:dragend - When map drag ends. Payload: {lngLat}.
- marker:mouseover - When cursor enters marker. Payload: {marker, domEvent}.
- marker:mouseout - When cursor leaves marker. Payload: {marker, domEvent}.
- marker:click - When marker is clicked. Payload: {marker, domEvent}.
- marker:dragstart - When marker drag starts. Payload: {marker, lngLat}.
- marker:drag - During marker drag. Payload: {marker, lngLat}.
- marker:dragend - When marker drag ends. Payload: {marker, lngLat}.

Variables:
- center: object - Current map center coordinates {lng, lat}
- instance: object - Mapbox map instance

Example:
<elements>
{"uid":0,"tag":"ww-mapbox","props":{"default":{"mapStyle":"mapbox://styles/mapbox/streets-v11","styleUrl":"","mapProjection":"globe","logoPosition":"bottom-left","customMarker":false,"defaultMarkerColor":"#F23636","defaultMarkerWidth":"40px","defaultMarkerHeight":"auto","disablePopups":false,"popupHideCloseButton":false,"popupStayOpenOnClick":false,"popupCloseOnMove":false,"popupMaxWidth":"240px","apiAccessToken":"...","lat":"40.712784","lng":"-74.005941","zoom":9,"scrollZoom":true,"trackResize":true,"defaultMarkerDraggable":false,"fixedBounds":true,"markers":[{"title":"New York","content":"New York, often called New York City (NYC) to distinguish it from the State of New York, is the most populous city in the United States.","lat":40.712784,"lng":-74.005941,"color":null,"draggable":false},{"title":"Brooklyn","content":"Brooklyn is a borough of New York City, coextensive with Kings County, in the U.S. state of New York.","lat":40.650002,"lng":-73.949997,"color":null,"draggable":false}]}},"styles":{"default":{"height":"600px","aspectRatio":"unset"}}}
</elements>

import React from "react";
import { Map, Marker, ZoomControl } from "pigeon-maps";

export default function MapComponent({ center, markerPosition, height, zoom }) {
  return (
    <Map
      height={height}
      center={center}
      defaultZoom={zoom}
      // Ajouter `key` unique à chaque commune force React à démonter et remonter
      // le component Map à chaque fois que le `centre` ou le `zoom` est modifié.
      key={`${center[0]}-${center[1]}-${zoom}`}
    >
      <Marker
        anchor={markerPosition}
        payload={1}
        onClick={({ event, anchor, payload }) => {}}
      />
      <ZoomControl />
    </Map>
  );
}

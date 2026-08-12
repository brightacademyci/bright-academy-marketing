"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapSite {
  name: string;
  area: string;
  lat: number;
  lng: number;
  mapsUrl: string;
}

interface SiteMapProps {
  sites: MapSite[];
  selected: number;
  onSelect: (i: number) => void;
  directionsLabel: string;
}

// Custom pin — a brand-orange circle with a navy ring — instead of Leaflet's
// default marker image, whose relative asset paths break under Next.js's
// bundler. Grows slightly and shifts to navy when it's the selected site.
function pinIcon(active: boolean) {
  return L.divIcon({
    className: "",
    html: `<span style="
      display:block;
      width:${active ? 22 : 16}px;
      height:${active ? 22 : 16}px;
      border-radius:9999px;
      background:${active ? "#113e6f" : "#f2790c"};
      border:3px solid white;
      box-shadow:0 2px 8px rgba(7,20,38,0.4);
    "></span>`,
    iconSize: [active ? 22 : 16, active ? 22 : 16],
    iconAnchor: [active ? 11 : 8, active ? 11 : 8],
  });
}

// Keeps the map view in sync with the selected site card without re-mounting
// the whole map (MapContainer only reads its center/zoom props once).
function FlyToSelected({ site }: { site: MapSite }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([site.lat, site.lng], 13, { duration: 0.8 });
  }, [site, map]);
  return null;
}

export default function SiteMap({ sites, selected, onSelect, directionsLabel }: SiteMapProps) {
  const initialCenter = useRef<[number, number]>([sites[selected].lat, sites[selected].lng]);

  return (
    <MapContainer
      center={initialCenter.current}
      zoom={12}
      scrollWheelZoom={false}
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <FlyToSelected site={sites[selected]} />
      {sites.map((s, i) => (
        <Marker
          key={s.name}
          position={[s.lat, s.lng]}
          icon={pinIcon(i === selected)}
          eventHandlers={{ click: () => onSelect(i) }}
          ref={(marker) => {
            // Leaflet's divIcon markers are keyboard-focusable (role="button")
            // but ship with no accessible name of their own — set one from
            // the site name so screen readers announce something useful.
            marker?.getElement()?.setAttribute("aria-label", s.name);
          }}
        >
          <Popup>
            <div className="text-[13px]">
              <div className="font-semibold text-navy">{s.name}</div>
              <div className="text-navy-deep/70">{s.area}</div>
              <a
                href={s.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block font-semibold text-orange-text"
              >
                {directionsLabel} →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

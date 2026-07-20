import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BGCGroup } from '@/data/mockGroups';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect } from 'react';

// Create a custom icon using a raw SVG string to avoid react-dom/server dependency
const createCustomIcon = (color: string = '#f59e0b') => {
  // SVG string for the MapPin icon matching Lucide's design
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-6 h-6"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
  
  const iconHtml = `
    <div class="relative flex items-center justify-center w-8 h-8">
      <div class="absolute inset-0 bg-white rounded-full shadow-md"></div>
      <div class="relative z-10 p-1 flex items-center justify-center">
        ${svgString}
      </div>
    </div>
  `;

  return L.divIcon({
    html: iconHtml,
    className: 'custom-marker-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

const customIcon = createCustomIcon();

interface MapViewProps {
  groups: BGCGroup[];
  center?: [number, number];
  zoom?: number;
}

// Component to update map view when center/groups change
function MapUpdater({ center, groups }: { center?: [number, number], groups: BGCGroup[] }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    } else if (groups.length > 0) {
      // Fit bounds to show all markers
      const validPoints = groups
        .filter(g => g.location.coordinates)
        .map(g => [
          g.location.coordinates!.lat,
          g.location.coordinates!.lng
        ] as [number, number]);
      
      if (validPoints.length > 0) {
        const bounds = L.latLngBounds(validPoints);
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }
  }, [center, groups, map]);

  return null;
}

export function MapView({ groups, center = [39.8283, -98.5795], zoom = 4 }: MapViewProps) {
  // Filter out groups without coordinates
  const validGroups = groups.filter(g => g.location.coordinates);

  return (
    <div className="h-[600px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-sm z-0 relative">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={center} groups={validGroups} />

        {validGroups.map(group => (
          <Marker 
            key={group.id} 
            position={[
              group.location.coordinates!.lat,
              group.location.coordinates!.lng
            ]}
            icon={customIcon}
          >
            <Popup>
              <div className="min-w-[200px]">
                <div className="flex gap-3 mb-2">
                  <img 
                    src={group.coverImage} 
                    alt={group.name} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1 text-sm">{group.name}</h3>
                    <p className="text-xs text-gray-500">{group.location.city}, {group.location.state}</p>
                  </div>
                </div>
                {group.primaryVenue && (
                  <p className="text-xs text-gray-600 mb-2 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {group.primaryVenue}
                  </p>
                )}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs font-medium text-amber-600 px-2 py-1 bg-amber-50 rounded-full">
                    {group.groupType}
                  </span>
                  <Link 
                    to={`/groups/${group.id}`}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
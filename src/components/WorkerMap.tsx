import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Worker } from '@/data/mockData';

interface WorkerMapProps {
  workers: Worker[];
  selectedWorker?: Worker;
}

const WorkerMap = ({ workers, selectedWorker }: WorkerMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<mapboxgl.Marker[]>([]);

  useEffect(() => {
    if (!mapContainer.current) return;

    // For demo purposes - using placeholder map token
    // In production, add your Mapbox token in environment variables
    const demoToken = 'pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbTdlaTgyNTAwMDljMmlzYjBpeHZwc3JyIn0.example';
    
    // Check if token is available
    if (demoToken.includes('example')) {
      // Show placeholder for demo
      return;
    }

    mapboxgl.accessToken = demoToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [77.4123, 23.2156],
      zoom: 15,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      markers.current.forEach(marker => marker.remove());
      map.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add markers for all active workers
    workers
      .filter(w => w.status === 'active')
      .forEach(worker => {
        const el = document.createElement('div');
        el.className = 'worker-marker';
        el.style.width = '30px';
        el.style.height = '30px';
        el.style.borderRadius = '50%';
        el.style.backgroundColor = selectedWorker?.id === worker.id ? '#ef4444' : '#3b82f6';
        el.style.border = '3px solid white';
        el.style.cursor = 'pointer';
        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3)';

        const marker = new mapboxgl.Marker(el)
          .setLngLat([worker.location.lng, worker.location.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 })
              .setHTML(
                `<div style="padding: 8px;">
                  <strong>${worker.name}</strong><br/>
                  <small>${worker.location.zone}</small><br/>
                  <small>Gas: ${worker.gasLevel} ppm | O₂: ${worker.oxygenLevel}%</small>
                </div>`
              )
          )
          .addTo(map.current!);

        markers.current.push(marker);
      });

    // Center on selected worker if exists
    if (selectedWorker && selectedWorker.status === 'active') {
      map.current.flyTo({
        center: [selectedWorker.location.lng, selectedWorker.location.lat],
        zoom: 16,
      });
    }
  }, [workers, selectedWorker]);

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      {/* Demo overlay - remove when Mapbox token is added */}
      <div className="absolute inset-0 bg-muted/50 backdrop-blur-sm flex items-center justify-center">
        <div className="text-center p-6 bg-card/90 rounded-lg border border-border max-w-md">
          <p className="text-sm font-semibold mb-2">🗺️ Map Preview</p>
          <p className="text-xs text-muted-foreground mb-3">
            Underground GPS tracking system showing worker locations in real-time
          </p>
          <div className="space-y-1 text-xs text-left bg-background/50 p-3 rounded">
            {workers.filter(w => w.status === 'active').map(w => (
              <div key={w.id} className="flex justify-between">
                <span className={selectedWorker?.id === w.id ? 'font-bold text-destructive' : ''}>
                  {w.name}
                </span>
                <span className="text-muted-foreground">{w.location.zone}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            Add Mapbox token to see interactive map
          </p>
        </div>
      </div>
    </div>
  );
};

export default WorkerMap;

let mapInstance = null;
let polylineInstances = [];
let stopMarkers = [];
let busMarkers = {};

// Helper to interpolate coordinates
function interpolateCoordinates(coord1, coord2, progress) {
  const lat = coord1[0] + (coord2[0] - coord1[0]) * progress;
  const lng = coord1[1] + (coord2[1] - coord1[1]) * progress;
  return [lat, lng];
}

function initMap(containerId, onMapClick) {
    mapInstance = L.map(containerId, {
        zoomControl: false
    });

    L.control.zoom({
        position: 'bottomright'
    }).addTo(mapInstance);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstance);

    if (onMapClick) {
        mapInstance.on('click', (e) => {
            onMapClick();
        });
    }

    // Default center for Delhi
    mapInstance.setView([28.6139, 77.2090], 11);

    return mapInstance;
}

function renderRoutesOnMap(routesToRender) {
    if (!mapInstance) return;

    // Clear previous
    polylineInstances.forEach(p => mapInstance.removeLayer(p));
    polylineInstances = [];
    stopMarkers.forEach(m => mapInstance.removeLayer(m));
    stopMarkers = [];
    
    // Note: We don't clear bus markers here because updateBusesOnMap handles it
    
    if (!routesToRender || routesToRender.length === 0) return;

    routesToRender.forEach(route => {
        const routePositions = route.stops.map(stop => stop.coords);
        const polyline = L.polyline(routePositions, { color: route.color, weight: 4, opacity: 0.6 }).addTo(mapInstance);
        polylineInstances.push(polyline);

        // Only show stop markers if specifically one route is selected, or at a higher zoom level
        // For "Global View", we might want to skip stop markers to avoid clutter
        if (routesToRender.length === 1) {
            route.stops.forEach(stop => {
                const icon = L.divIcon({
                    className: 'stop-marker-icon',
                    html: `<div style="background-color: white; border: 3px solid ${route.color}; width: 10px; height: 10px; border-radius: 50%;"></div>`,
                    iconSize: [10, 10],
                    iconAnchor: [5, 5]
                });
                const marker = L.marker(stop.coords, { icon: icon }).addTo(mapInstance);
                marker.bindPopup(stop.name);
                stopMarkers.push(marker);
            });
            
            // Fit bounds for single route
            mapInstance.fitBounds(polyline.getBounds(), { padding: [50, 50] });
        }
    });

    if (routesToRender.length > 1) {
        // Center on all routes
        const allBounds = L.featureGroup(polylineInstances).getBounds();
        mapInstance.fitBounds(allBounds, { padding: [50, 50] });
    }
}

function updateBusesOnMap(allBuses, activeBusId, onBusClick, routesData) {
    if (!mapInstance) return;

    allBuses.forEach(bus => {
        const route = routesData.find(r => r.id === bus.routeId);
        if (!route) return;

        let currentPos;
        if (bus.currentStopIndex < route.stops.length - 1) {
            currentPos = interpolateCoordinates(
                route.stops[bus.currentStopIndex].coords,
                route.stops[bus.currentStopIndex + 1].coords,
                bus.progress
            );
        } else {
            currentPos = route.stops[route.stops.length - 1].coords;
        }

        const isActive = bus.id === activeBusId;
        const activeClass = isActive ? 'active-bus' : '';
        const marker = busMarkers[bus.id];
        const wasActive = marker && marker._isActive;

        const busHtml = `
            <div class="bus-icon-wrapper ${activeClass}" style="border-color: ${route.color}">
                <span class="bus-number-label">${route.number}</span>
            </div>
        `;
        if (marker) {
            marker.setLatLng(currentPos);
            if (wasActive !== isActive) {
                marker.setIcon(L.divIcon({
                    className: 'custom-bus-icon',
                    html: busHtml,
                    iconSize: [54, 32],
                    iconAnchor: [27, 16]
                }));
                marker._isActive = isActive;
            }
        } else {
            const newMarker = L.marker(currentPos, { 
                icon: L.divIcon({
                    className: 'custom-bus-icon',
                    html: busHtml,
                    iconSize: [54, 32],
                    iconAnchor: [27, 16]
                }) 
            }).addTo(mapInstance);
            
            newMarker.on('click', (e) => {
                if (e.originalEvent) e.originalEvent.stopPropagation();
                onBusClick(bus.id);
            });
            newMarker._isActive = isActive;
            busMarkers[bus.id] = newMarker;
        }
    });

    // Clean up markers for buses no longer in the list
    Object.keys(busMarkers).forEach(id => {
        if (!allBuses.find(b => b.id === id)) {
            mapInstance.removeLayer(busMarkers[id]);
            delete busMarkers[id];
        }
    });
}

function clearRouteOnMap() {
    renderRoutesOnMap([]);
}

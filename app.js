// State
let currentBuses = [];
let activeRouteId = null;
let activeBusId = null;

// DOM Elements
let routeListEl, routeCountEl, busDetailsEl, searchInput;
let busIdDisplay, busStatusBadge, routeNumberDisplay, routeNameDisplay;
let routePill, nextStopDisplay, speedDisplay, capacityText, capacityBar, driverNameDisplay;
let waitTimeDisplay, etaDisplay;

function initApp() {
    if (typeof routes === 'undefined' || typeof initialBuses === 'undefined') {
        console.error("Data (routes/buses) not loaded!");
        return;
    }

    // Initialize DOM links after content is present
    bindDomElements();
    initFareCalculator();
    setupEventListeners();

    currentBuses = [...initialBuses];

    initMap('map-container', () => {
        activeBusId = null;
        activeRouteId = null;
        renderRouteList();
        updateUI();
    });
    
    renderRouteList();
    updateUI();
    
    // Simulation loop
    setInterval(() => {
        currentBuses = simulateMovement(currentBuses);
        updateUI();
    }, 100);
}

function setupEventListeners() {
    const searchInput = document.getElementById('search-input');
    const resetViewBtn = document.getElementById('reset-routes-view');

    if (resetViewBtn) {
        resetViewBtn.onclick = () => {
            selectRoute(null);
        };
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderRouteList(e.target.value);
        });
    }
}

function bindDomElements() {
    routeListEl = document.getElementById('route-list');
    routeCountEl = document.getElementById('route-count-display');
    busDetailsEl = document.getElementById('bus-details');

    busIdDisplay = document.getElementById('bus-id-display');
    busStatusBadge = document.getElementById('bus-status-badge');
    routeNumberDisplay = document.getElementById('route-number-display');
    routeNameDisplay = document.getElementById('route-name-display');
    routePill = document.getElementById('route-pill');
    nextStopDisplay = document.getElementById('next-stop-display');
    speedDisplay = document.getElementById('speed-display');
    capacityText = document.getElementById('capacity-text');
    capacityBar = document.getElementById('capacity-bar');
    driverNameDisplay = document.getElementById('driver-name-display');
    searchInput = document.getElementById('search-input');
    waitTimeDisplay = document.getElementById('wait-time-display');
    etaDisplay = document.getElementById('eta-display');
}

function renderRouteList(filterQuery = "") {
    const query = filterQuery.toLowerCase().trim();
    const filteredRoutes = routes.filter(route => 
        route.name.toLowerCase().includes(query) || 
        route.number.toLowerCase().includes(query)
    );

    if (routeCountEl) routeCountEl.textContent = filteredRoutes.length;
    if (!routeListEl) return;
    
    routeListEl.innerHTML = '';
    
    filteredRoutes.forEach(route => {
        const isActive = route.id === activeRouteId;
        
        const card = document.createElement('div');
        card.className = `route-card ${isActive ? 'active' : ''}`;
        card.onclick = (e) => {
            selectRoute(activeRouteId === route.id ? null : route.id);
        };
        
        card.innerHTML = `
            <div class="route-card-main">
                <div class="route-badge" style="background-color: ${route.color}">
                    ${route.number}
                </div>
                <div class="route-info">
                    <h3>${route.name}</h3>
                    <p>
                        <span>${route.startPoint}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        <span>${route.endPoint}</span>
                    </p>
                </div>
                ${isActive ? `
                    <div class="active-indicator">
                        <div class="pulse"></div>
                    </div>
                ` : ''}
            </div>
            ${isActive ? `
                <div class="route-stops-expand">
                    <div class="stops-header">Stops At:</div>
                    <div class="stops-timeline">
                        ${route.stops.map((stop, index) => `
                            <div class="stop-item">
                                <div class="stop-point">
                                    <div class="point-dot" style="background-color: ${route.color}"></div>
                                    ${index < route.stops.length - 1 ? `<div class="point-line"></div>` : ''}
                                </div>
                                <div class="stop-label">${stop.name}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        `;
        
        routeListEl.appendChild(card);
    });
}

function selectRoute(routeId) {
    activeRouteId = routeId;
    activeBusId = null;
    renderRouteList();
    
    // Update map static elements only when route changes
    if (activeRouteId) {
        const route = routes.find(r => r.id === activeRouteId);
        renderRoutesOnMap([route]);
    } else {
        renderRoutesOnMap(routes);
    }
    
    updateUI();
}

function selectBus(busId) {
    activeBusId = busId;
    updateUI();
}

function updateUI() {
    try {
        if (activeRouteId) {
            const route = routes.find(r => r.id === activeRouteId);
            const activeRouteBuses = currentBuses.filter(b => b.routeId === activeRouteId);
            
            // Only update bus positions
            updateBusesOnMap(activeRouteBuses, activeBusId, selectBus, routes);
            
            // Update Bus Details Panel
            if (activeBusId) {
                const bus = currentBuses.find(b => b.id === activeBusId);
                if (bus) {
                    if (busDetailsEl) busDetailsEl.classList.remove('hidden');
                    
                    if (busIdDisplay) busIdDisplay.textContent = `Bus #${bus.id.replace('b', '')}`;
                    if (busStatusBadge) {
                        busStatusBadge.textContent = bus.status;
                        busStatusBadge.className = `status-badge ${bus.status === 'At Stop' ? 'status-delayed' : 'status-on-time'}`;
                    }
                    
                    if (routeNumberDisplay) {
                        routeNumberDisplay.textContent = route.number;
                        routeNumberDisplay.style.backgroundColor = route.color;
                    }
                    if (routeNameDisplay) routeNameDisplay.textContent = route.name;
                    
                    if (nextStopDisplay) nextStopDisplay.textContent = route.stops[bus.currentStopIndex].name;
                    if (speedDisplay) speedDisplay.textContent = bus.speed;
                    
                    // Wait Time Logic
                    if (bus.waitTime > 0) {
                        const secondsLeft = Math.ceil(bus.waitTime * 0.1);
                        if (waitTimeDisplay) waitTimeDisplay.textContent = `${secondsLeft}s`;
                        if (etaDisplay) etaDisplay.textContent = "At Stop";
                    } else {
                        if (waitTimeDisplay) waitTimeDisplay.textContent = "Moving";
                        
                        // ETA Logic
                        const remainingProgress = 1 - bus.progress;
                        const estimatedTicks = remainingProgress / 0.002;
                        const estimatedSeconds = Math.ceil(estimatedTicks * 0.1);
                        
                        if (etaDisplay) {
                            if (estimatedSeconds < 60) {
                                etaDisplay.textContent = `${estimatedSeconds}s`;
                            } else {
                                const mins = Math.floor(estimatedSeconds / 60);
                                const secs = estimatedSeconds % 60;
                                etaDisplay.textContent = `${mins}m ${secs}s`;
                            }
                        }
                    }
                    
                    if (capacityText) capacityText.textContent = `${bus.occupancy} / ${bus.capacity}`;
                    const occupancyRatio = bus.occupancy / bus.capacity;
                    if (capacityBar) {
                        capacityBar.style.width = `${Math.round(occupancyRatio * 100)}%`;
                        if (occupancyRatio < 0.5) capacityBar.style.backgroundColor = 'var(--accent-green)';
                        else if (occupancyRatio < 0.8) capacityBar.style.backgroundColor = 'var(--accent-orange)';
                        else capacityBar.style.backgroundColor = 'var(--accent-red)';
                    }
                    
                    if (driverNameDisplay) driverNameDisplay.textContent = bus.driver;
                }
            } else {
                if (busDetailsEl) busDetailsEl.classList.add('hidden');
            }
        } else {
            // GLOBAL VIEW: Only update bus positions
            updateBusesOnMap(currentBuses, activeBusId, selectBus, routes);
            if (busDetailsEl) busDetailsEl.classList.add('hidden');
        }
    } catch (err) {
        console.error("UI Update Error:", err);
    }
}

function initFareCalculator() {
    const modal = document.getElementById('fare-modal');
    const closeBtn = document.getElementById('close-fare-modal');
    const routeSelect = document.getElementById('fare-route-select');
    const fromSelect = document.getElementById('fare-from-stop');
    const toSelect = document.getElementById('fare-to-stop');
    const calcBtn = document.getElementById('calculate-fare-btn');
    const resultPanel = document.getElementById('fare-result-panel');

    const sidebarTrigger = document.getElementById('sidebar-fare-calc');

    if (!modal) return;

    if (sidebarTrigger) {
        sidebarTrigger.onclick = (e) => {
            e.stopPropagation();
            modal.classList.remove('hidden');
            populateFareRoutes();
        };
    }

    if (closeBtn) closeBtn.onclick = () => modal.classList.add('hidden');
    window.onclick = (e) => { if (e.target === modal) modal.classList.add('hidden'); };

    function populateFareRoutes() {
        if (!routeSelect) return;
        routeSelect.innerHTML = '<option value="">Choose a route...</option>';
        routes.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r.id;
            opt.textContent = `${r.number} - ${r.name}`;
            routeSelect.appendChild(opt);
        });
    }

    if (routeSelect) {
        routeSelect.onchange = (e) => {
            const route = routes.find(r => r.id === e.target.value);
            if (route) {
                fromSelect.disabled = false;
                toSelect.disabled = false;
                populateStops(fromSelect, route.stops);
                populateStops(toSelect, route.stops);
                calcBtn.disabled = false;
            } else {
                fromSelect.disabled = true;
                toSelect.disabled = true;
                calcBtn.disabled = true;
            }
            if (resultPanel) resultPanel.classList.add('hidden');
        };
    }

    function populateStops(select, stops) {
        if (!select) return;
        select.innerHTML = '<option value="">Select stop...</option>';
        stops.forEach((s, idx) => {
            const opt = document.createElement('option');
            opt.value = idx;
            opt.textContent = s.name;
            select.appendChild(opt);
        });
    }

    if (calcBtn) {
        calcBtn.onclick = () => {
            const route = routes.find(r => r.id === routeSelect.value);
            const fromIdx = parseInt(fromSelect.value);
            const toIdx = parseInt(toSelect.value);

            if (route && !isNaN(fromIdx) && !isNaN(toIdx)) {
                if (fromIdx === toIdx) {
                    alert("Please select different stops.");
                    return;
                }

                let totalDist = 0;
                const start = Math.min(fromIdx, toIdx);
                const end = Math.max(fromIdx, toIdx);
                
                for (let i = start; i < end; i++) {
                    totalDist += getDistance(route.stops[i].coords, route.stops[i+1].coords);
                }

                const fare = 5 + (totalDist * 3);
                
                if (document.getElementById('fare-amount')) document.getElementById('fare-amount').textContent = `₹${fare.toFixed(2)}`;
                if (document.getElementById('fare-distance')) document.getElementById('fare-distance').textContent = `${totalDist.toFixed(1)} km`;
                if (resultPanel) resultPanel.classList.remove('hidden');
            }
        };
    }
}

// Start
document.addEventListener('DOMContentLoaded', initApp);

// Глобальные переменные
let map;
let markers = [];
let currentLine = null;

// Инициализация карты
function initMap() {
    console.log("Инициализация карты...");
    
    if (!cities || cities.length === 0) {
        console.error("Нет данных о городах!");
        return;
    }
    
    // Создаем карту
    map = L.map('map').setView([61.5240, 105.3188], 3);
    
    // Добавляем слой карты
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        maxZoom: 19,
        subdomains: 'abcd'
    }).addTo(map);
    
    // Добавляем города
    addCitiesToMap();
    
    // Настраиваем калькулятор
    setupCalculator();
    
    console.log("Карта загружена!");
}

// Добавление городов на карту
function addCitiesToMap() {
    cities.forEach(city => {
        const lat = parseFloat(city.latitude);
        const lon = parseFloat(city.longitude);
        
        const marker = L.circleMarker([lat, lon], {
            radius: 6,
            fillColor: '#00adb5',
            color: '#ffffff',
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <h3 style="color: #00adb5; margin: 0 0 10px;">${city.city}</h3>
                <p><strong>Регион:</strong> ${city.region}</p>
                <p><strong>Координаты:</strong><br>${lat.toFixed(4)}°, ${lon.toFixed(4)}°</p>
            </div>
        `);
        
        marker.addTo(map);
        markers.push(marker);
    });
}

// Настройка калькулятора
function setupCalculator() {
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    
    if (city1Select && city2Select) {
        // Заполняем списки
        [city1Select, city2Select].forEach(select => {
            select.innerHTML = '<option value="">Выберите город</option>';
            cities.forEach((city, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = city.city;
                select.appendChild(option);
            });
        });
        
        // События
        document.getElementById('calculate')?.addEventListener('click', calculateDistance);
        document.getElementById('clear')?.addEventListener('click', clearSelection);
        
        city1Select.addEventListener('change', () => {
            if (city1Select.value && city2Select.value) {
                calculateDistance();
            }
        });
        
        city2Select.addEventListener('change', () => {
            if (city1Select.value && city2Select.value) {
                calculateDistance();
            }
        });
    }
}

// Расчет расстояния
function calculateDistance() {
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    const resultDiv = document.getElementById('result');
    
    if (!city1Select || !city2Select || !resultDiv) return;
    
    const city1Id = parseInt(city1Select.value);
    const city2Id = parseInt(city2Select.value);
    
    if (!city1Id || !city2Id) {
        resultDiv.innerHTML = '<span style="color: #ff5722;">Выберите оба города!</span>';
        return;
    }
    
    const city1 = cities[city1Id];
    const city2 = cities[city2Id];
    
    if (!city1 || !city2) return;
    
    const lat1 = parseFloat(city1.latitude);
    const lon1 = parseFloat(city1.longitude);
    const lat2 = parseFloat(city2.latitude);
    const lon2 = parseFloat(city2.longitude);
    
    const distance = calculateOrthodromicDistance(lat1, lon1, lat2, lon2);
    
    resultDiv.innerHTML = `
        <div style="font-size: 1.2em; margin-bottom: 10px;">
            <strong>${city1.city}</strong> → <strong>${city2.city}</strong>
        </div>
        <div style="font-size: 2.5em; color: #00fff5; font-weight: bold;">
            ${distance.toLocaleString()} км
        </div>
    `;
    
    drawLineOnMap(city1, city2, distance);
}

// Расчет ортодромного расстояния
function calculateOrthodromicDistance(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = deg => deg * Math.PI / 180;
    
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
}

// Рисование линии
function drawLineOnMap(city1, city2, distance) {
    if (currentLine) {
        map.removeLayer(currentLine);
    }
    
    const lat1 = parseFloat(city1.latitude);
    const lon1 = parseFloat(city1.longitude);
    const lat2 = parseFloat(city2.latitude);
    const lon2 = parseFloat(city2.longitude);
    
    currentLine = L.polyline([
        [lat1, lon1],
        [lat2, lon2]
    ], {
        color: '#00fff5',
        weight: 3,
        opacity: 0.7
    }).addTo(map);
    
    const bounds = L.latLngBounds(
        [lat1, lon1],
        [lat2, lon2]
    );
    map.fitBounds(bounds, { padding: [100, 100] });
}

// Очистка
function clearSelection() {
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    const resultDiv = document.getElementById('result');
    
    if (city1Select) city1Select.value = '';
    if (city2Select) city2Select.value = '';
    if (resultDiv) resultDiv.innerHTML = 'Выберите два города';
    
    if (currentLine) {
        map.removeLayer(currentLine);
        currentLine = null;
    }
    
    if (map) {
        map.setView([61.5240, 105.3188], 3);
    }
}

// Автоинициализация
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (document.getElementById('map') && typeof cities !== 'undefined') {
            initMap();
        }
    }, 1000);
});

// Карта России с городами
let map = null;
let markers = [];
let currentLine = null;

// Инициализация карты
function initMap() {
    console.log('Загружаем карту России...');
    
    // Создаем карту
    map = L.map('map').setView([61.5240, 105.3188], 3);
    
    // Добавляем слой карты
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        maxZoom: 19,
        subdomains: 'abcd'
    }).addTo(map);
    
    // Добавляем города на карту
    addCitiesToMap();
    
    // Настраиваем калькулятор
    setupCalculator();
    
    console.log('Карта загружена!');
}

// Добавление городов на карту
function addCitiesToMap() {
    console.log('Добавляем города на карту:', cities.length);
    
    cities.forEach(city => {
        const latitude = parseFloat(city.latitude);
        const longitude = parseFloat(city.longitude);
        
        // Создаем маркер
        const marker = L.circleMarker([latitude, longitude], {
            radius: 6,
            fillColor: '#00adb5',
            color: '#ffffff',
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        // Добавляем всплывающую подсказку
        marker.bindPopup(`
            <div style="min-width: 200px;">
                <h3 style="color: #00adb5; margin: 0 0 10px;">${city.city}</h3>
                <p><strong>Регион:</strong> ${city.region}</p>
                <p><strong>Координаты:</strong><br>${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°</p>
            </div>
        `);
        
        // Добавляем маркер на карту
        marker.addTo(map);
        markers.push(marker);
    });
}

// Расчет расстояния между городами
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в км
    
    const toRad = (deg) => deg * Math.PI / 180;
    
    const lat1Rad = toRad(lat1);
    const lon1Rad = toRad(lon1);
    const lat2Rad = toRad(lat2);
    const lon2Rad = toRad(lon2);
    
    const dLat = lat2Rad - lat1Rad;
    const dLon = lon2Rad - lon1Rad;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1Rad) * Math.cos(lat2Rad) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance);
}

// Настройка калькулятора
function setupCalculator() {
    // Заполняем выпадающие списки
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    
    if (city1Select && city2Select) {
        // Очищаем и добавляем города
        [city1Select, city2Select].forEach(select => {
            select.innerHTML = '<option value="">Выберите город</option>';
            cities.forEach((city, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = city.city;
                select.appendChild(option);
            });
        });
        
        // Обработчик для кнопки расчета
        const calculateBtn = document.getElementById('calculate');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', calculateDistanceBetweenCities);
        }
        
        // Обработчик для кнопки очистки
        const clearBtn = document.getElementById('clear');
        if (clearBtn) {
            clearBtn.addEventListener('click', clearSelection);
        }
        
        // Авторасчет при изменении выбора
        city1Select.addEventListener('change', () => {
            if (city1Select.value && city2Select.value) {
                calculateDistanceBetweenCities();
            }
        });
        
        city2Select.addEventListener('change', () => {
            if (city1Select.value && city2Select.value) {
                calculateDistanceBetweenCities();
            }
        });
    }
}

// Расчет и отображение расстояния
function calculateDistanceBetweenCities() {
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
    
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    
    // Обновляем результат
    resultDiv.innerHTML = `
        <div style="font-size: 1.2em; margin-bottom: 10px;">
            <strong>${city1.city}</strong> → <strong>${city2.city}</strong>
        </div>
        <div style="font-size: 2.5em; color: #00fff5; font-weight: bold;">
            ${distance.toLocaleString()} км
        </div>
        <div style="color: #b0b0b0; margin-top: 10px; font-size: 0.9em;">
            Ортодромное расстояние (по дуге большого круга)
        </div>
    `;
    
    // Показываем линию на карте
    drawPathOnMap(city1, city2, distance);
}

// Отрисовка линии на карте
function drawPathOnMap(city1, city2, distance) {
    // Удаляем старую линию
    if (currentLine) {
        map.removeLayer(currentLine);
    }
    
    const lat1 = parseFloat(city1.latitude);
    const lon1 = parseFloat(city1.longitude);
    const lat2 = parseFloat(city2.latitude);
    const lon2 = parseFloat(city2.longitude);
    
    // Создаем линию
    currentLine = L.polyline([
        [lat1, lon1],
        [lat2, lon2]
    ], {
        color: '#00fff5',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);
    
    // Центрируем карту на обоих городах
    const bounds = L.latLngBounds(
        [lat1, lon1],
        [lat2, lon2]
    );
    map.fitBounds(bounds, { padding: [100, 100] });
}

// Очистка выбора
function clearSelection() {
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    const resultDiv = document.getElementById('result');
    
    if (city1Select) city1Select.value = '';
    if (city2Select) city2Select.value = '';
    if (resultDiv) resultDiv.innerHTML = 'Выберите два города';
    
    // Удаляем линию с карты
    if (currentLine) {
        map.removeLayer(currentLine);
        currentLine = null;
    }
    
    // Возвращаем карту к общему виду
    if (map) {
        map.setView([61.5240, 105.3188], 3);
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем карту когда перейдем на слайд с картой
    const checkMapInterval = setInterval(() => {
        const mapElement = document.getElementById('map');
        if (mapElement && mapElement.offsetWidth > 0) {
            initMap();
            clearInterval(checkMapInterval);
        }
    }, 500);
});

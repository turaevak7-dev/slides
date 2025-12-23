// Инициализация карты
let map;
let markers = [];
let currentLine = null;

// Инициализация карты при загрузке страницы
function initMap() {
    console.log("Инициализация карты...");
    
    // Центр России
    map = L.map('map').setView([61.5240, 105.3188], 3);
    
    // Добавляем слой карты
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);
    
    // Добавляем маркеры городов
    addCityMarkers();
    
    // Настройка событий
    setupMapEvents();
    
    console.log("Карта загружена!");
}

// Добавление маркеров городов
function addCityMarkers() {
    console.log("Добавление маркеров для", citiesData.length, "городов");
    
    // Очищаем старые маркеры
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    citiesData.forEach(city => {
        // Создаем маркер
        const marker = L.circleMarker([city.lat, city.lon], {
            radius: city.population > 1000000 ? 8 : 6,
            fillColor: getRegionColor(city.region),
            color: '#ffffff',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        // Добавляем всплывающую подсказку
        marker.bindPopup(`
            <div style="color: #333; font-family: Arial, sans-serif;">
                <h3 style="margin: 0 0 10px; color: #00adb5;">${city.name}</h3>
                <p><strong>Население:</strong> ${city.population.toLocaleString()} чел.</p>
                <p><strong>Регион:</strong> ${getRegionFullName(city.region)}</p>
                <p><strong>Координаты:</strong> ${city.lat.toFixed(4)}°, ${city.lon.toFixed(4)}°</p>
                ${city.capital ? '<p><strong>Административный центр</strong></p>' : ''}
                <button onclick="selectCity(${city.id})" style="
                    background: #00adb5;
                    color: white;
                    border: none;
                    padding: 5px 10px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 10px;
                ">Выбрать для расчета</button>
            </div>
        `);
        
        // Добавляем маркер на карту
        marker.addTo(map);
        markers.push(marker);
    });
}

// Получение цвета для региона
function getRegionColor(region) {
    const colors = {
        'ЦФО': '#00adb5',
        'СЗФО': '#00fff5',
        'ЮФО': '#ff5722',
        'СКФО': '#ff9800',
        'ПФО': '#8bc34a',
        'УФО': '#9c27b0',
        'СФО': '#2196f3',
        'ДФО': '#ffeb3b'
    };
    return colors[region] || '#cccccc';
}

// Полное название региона
function getRegionFullName(region) {
    const names = {
        'ЦФО': 'Центральный федеральный округ',
        'СЗФО': 'Северо-Западный федеральный округ',
        'ЮФО': 'Южный федеральный округ',
        'СКФО': 'Северо-Кавказский федеральный округ',
        'ПФО': 'Приволжский федеральный округ',
        'УФО': 'Уральский федеральный округ',
        'СФО': 'Сибирский федеральный округ',
        'ДФО': 'Дальневосточный федеральный округ'
    };
    return names[region] || region;
}

// Настройка событий карты
function setupMapEvents() {
    // Фильтр по регионам
    document.getElementById('regionSelect')?.addEventListener('change', function(e) {
        const region = e.target.value;
        filterCitiesByRegion(region);
    });
    
    // Кнопка "Показать все города"
    document.getElementById('showAll')?.addEventListener('click', function() {
        showAllCities();
    });
    
    // Кнопка "Сбросить вид"
    document.getElementById('resetView')?.addEventListener('click', function() {
        map.setView([61.5240, 105.3188], 3);
        showAllCities();
    });
    
    // Кнопка "Показать путь"
    document.getElementById('showPath')?.addEventListener('click', function() {
        showPathBetweenSelectedCities();
    });
}

// Фильтрация городов по региону
function filterCitiesByRegion(region) {
    if (region === 'all') {
        showAllCities();
        return;
    }
    
    markers.forEach(marker => {
        const cityId = parseInt(marker._popup._content.match(/selectCity\((\d+)\)/)?.[1]);
        const city = citiesData.find(c => c.id === cityId);
        
        if (city && city.region === region) {
            map.addLayer(marker);
        } else {
            map.removeLayer(marker);
        }
    });
}

// Показать все города
function showAllCities() {
    markers.forEach(marker => {
        map.addLayer(marker);
    });
}

// Показать путь между выбранными городами
function showPathBetweenSelectedCities() {
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    
    if (!city1Select || !city2Select) return;
    
    const city1Id = parseInt(city1Select.value);
    const city2Id = parseInt(city2Select.value);
    
    if (!city1Id || !city2Id) {
        alert('Выберите два города для построения пути!');
        return;
    }
    
    const city1 = citiesData.find(c => c.id === city1Id);
    const city2 = citiesData.find(c => c.id === city2Id);
    
    if (!city1 || !city2) return;
    
    // Удаляем старую линию
    if (currentLine) {
        map.removeLayer(currentLine);
    }
    
    // Создаем новую линию
    currentLine = L.polyline([
        [city1.lat, city1.lon],
        [city2.lat, city2.lon]
    ], {
        color: '#00fff5',
        weight: 3,
        opacity: 0.8,
        dashArray: '10, 10'
    }).addTo(map);
    
    // Добавляем popup к линии
    const distance = calculateDistance(city1, city2);
    currentLine.bindPopup(`<b>${city1.name} → ${city2.name}</b><br>Расстояние: ${distance} км`);
    
    // Подсвечиваем выбранные города
    markers.forEach(marker => {
        const cityId = parseInt(marker._popup._content.match(/selectCity\((\d+)\)/)?.[1]);
        if (cityId === city1Id || cityId === city2Id) {
            marker.setStyle({ fillColor: '#ff5722', radius: 10 });
        } else {
            const city = citiesData.find(c => c.id === cityId);
            marker.setStyle({ 
                fillColor: getRegionColor(city.region),
                radius: city.population > 1000000 ? 8 : 6
            });
        }
    });
    
    // Центрируем карту на обоих городах
    const bounds = L.latLngBounds(
        [city1.lat, city1.lon],
        [city2.lat, city2.lon]
    );
    map.fitBounds(bounds, { padding: [50, 50] });
}

// Выбор города для калькулятора
function selectCity(cityId) {
    const city = citiesData.find(c => c.id === cityId);
    if (!city) return;
    
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    
    if (city1Select && !city1Select.value) {
        city1Select.value = cityId;
    } else if (city2Select && !city2Select.value) {
        city2Select.value = cityId;
    } else {
        // Если оба уже выбраны, спросим пользователя
        if (confirm(`Заменить первый город на ${city.name}?`)) {
            city1Select.value = cityId;
        } else {
            city2Select.value = cityId;
        }
    }
    
    // Обновляем визуальное выделение
    markers.forEach(marker => {
        const markerCityId = parseInt(marker._popup._content.match(/selectCity\((\d+)\)/)?.[1]);
        if (markerCityId === cityId) {
            marker.setStyle({ fillColor: '#ff5722', radius: 10 });
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Ждем загрузки Leaflet
    setTimeout(initMap, 500);
});

// Экспортируем функции для использования в других скриптах
window.calculateDistance = calculateDistance;
window.selectCity = selectCity;

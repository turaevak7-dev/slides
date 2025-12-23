// map.js - ОПТИМИЗИРОВАННАЯ ВЕРСИЯ
console.log('🌍 Инициализация карты России...');

// Глобальные переменные
let map = null;
let currentMarkers = [];
let currentLine = null;
let distanceLabel = null;

// Основная функция инициализации
function initMap() {
    try {
        console.log('Создание карты...');
        
        // Создаем карту с центром на Россию
        map = L.map('map', {
            preferCanvas: true,
            zoomControl: true,
            attributionControl: true
        }).setView([61.5240, 105.3188], 3);
        
        // Добавляем слой карты (используем более контрастные тайлы)
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '© OpenStreetMap, © CARTO',
            maxZoom: 19,
            subdomains: 'abcd'
        }).addTo(map);
        
        console.log('✅ Карта создана');
        
        // Добавляем города России
        addAllCities();
        
        // Инициализируем калькулятор
        initCalculator();
        
        // Для отладки - делаем карту доступной глобально
        window.map = map;
        
        console.log('✅ Карта готова к работе');
        
    } catch (error) {
        console.error('❌ Ошибка создания карты:', error);
        showMapError(error);
    }
}

// Функция добавления всех городов
function addAllCities() {
    console.log(`Добавление ${citiesData.length} городов...`);
    
    // Используем Cluster для лучшей производительности
    const markers = L.markerClusterGroup({
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        showCoverageOnHover: true,
        zoomToBoundsOnClick: true
    });
    
    citiesData.forEach(city => {
        const marker = L.marker([city.latitude, city.longitude], {
            title: `${city.city}, ${city.region}`
        });
        
        marker.bindPopup(`
            <div style="min-width: 180px;">
                <strong style="color: #00adb5; font-size: 14px;">${city.city}</strong><br>
                <span style="color: #666; font-size: 12px;">${city.region}</span><br>
                <small style="color: #888;">Ш: ${city.latitude.toFixed(4)}<br>Д: ${city.longitude.toFixed(4)}</small>
            </div>
        `);
        
        markers.addLayer(marker);
    });
    
    map.addLayer(markers);
    console.log(`✅ Добавлено ${citiesData.length} городов`);
}

// Функция калькулятора
function initCalculator() {
    console.log('Инициализация калькулятора...');
    
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const resultDiv = document.getElementById('result');
    
    if (!city1Select || !city2Select) {
        console.warn('Элементы select не найдены');
        return;
    }
    
    // Заполняем выпадающие списки
    populateSelect(city1Select);
    populateSelect(city2Select);
    
    // Обработчики событий
    calculateBtn.addEventListener('click', handleCalculate);
    clearBtn.addEventListener('click', handleClear);
    
    // Автоматический расчет при изменении выбора
    city1Select.addEventListener('change', () => {
        if (city1Select.value && city2Select.value) {
            handleCalculate();
        }
    });
    
    city2Select.addEventListener('change', () => {
        if (city1Select.value && city2Select.value) {
            handleCalculate();
        }
    });
    
    console.log('✅ Калькулятор готов');
}

// Заполнение списков городов
function populateSelect(selectElement) {
    selectElement.innerHTML = '<option value="">Выберите город...</option>';
    
    citiesData.forEach(city => {
        const option = document.createElement('option');
        option.value = city.city;
        option.textContent = `${city.city} (${city.region})`;
        selectElement.appendChild(option);
    });
}

// Расчет расстояния (формула гаверсинусов)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в км
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

// Обработчик расчета
function handleCalculate() {
    const city1Name = document.getElementById('city1').value;
    const city2Name = document.getElementById('city2').value;
    const resultDiv = document.getElementById('result');
    
    if (!city1Name || !city2Name) {
        resultDiv.innerHTML = '<span style="color:#ff5722;">Выберите оба города!</span>';
        return;
    }
    
    if (city1Name === city2Name) {
        resultDiv.innerHTML = '<span style="color:#ff5722;">Выберите разные города!</span>';
        return;
    }
    
    const city1 = citiesData.find(c => c.city === city1Name);
    const city2 = citiesData.find(c => c.city === city2Name);
    
    if (!city1 || !city2) {
        resultDiv.innerHTML = '<span style="color:#ff5722;">Город не найден!</span>';
        return;
    }
    
    const distance = calculateDistance(
        city1.latitude, city1.longitude,
        city2.latitude, city2.longitude
    );
    
    // Отрисовываем маршрут на карте
    drawRouteOnMap(city1, city2, distance);
    
    // Показываем результат
    showResult(city1, city2, distance, resultDiv);
}

// Отрисовка маршрута на карте
function drawRouteOnMap(city1, city2, distance) {
    // Очищаем предыдущие элементы
    clearMap();
    
    // Создаем красную линию между городами
    currentLine = L.polyline([
        [city1.latitude, city1.longitude],
        [city2.latitude, city2.longitude]
    ], {
        color: '#ff5722', // Красный цвет
        weight: 4,
        opacity: 0.8,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: null
    }).addTo(map);
    
    // Создаем маркеры для выбранных городов
    const icon1 = L.divIcon({
        html: '<div style="background: #ff5722; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);">1</div>',
        iconSize: [30, 30],
        className: 'selected-marker'
    });
    
    const icon2 = L.divIcon({
        html: '<div style="background: #00adb5; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);">2</div>',
        iconSize: [30, 30],
        className: 'selected-marker'
    });
    
    const marker1 = L.marker([city1.latitude, city1.longitude], { icon: icon1 })
        .addTo(map)
        .bindPopup(`<b>${city1.city}</b><br>${city1.region}`);
    
    const marker2 = L.marker([city2.latitude, city2.longitude], { icon: icon2 })
        .addTo(map)
        .bindPopup(`<b>${city2.city}</b><br>${city2.region}`);
    
    currentMarkers = [marker1, marker2];
    
    // Добавляем надпись с расстоянием посередине
    const midPoint = [
        (city1.latitude + city2.latitude) / 2,
        (city1.longitude + city2.longitude) / 2
    ];
    
    distanceLabel = L.marker(midPoint, {
        icon: L.divIcon({
            html: `<div style="
                background: rgba(255, 87, 34, 0.9);
                color: white;
                padding: 8px 15px;
                border-radius: 15px;
                font-weight: bold;
                font-size: 14px;
                border: 2px solid white;
                box-shadow: 0 0 15px rgba(0,0,0,0.7);
                text-align: center;
                min-width: 100px;
            "><strong>${distance.toLocaleString('ru-RU')} км</strong></div>`,
            iconSize: [null, null],
            className: 'distance-label'
        })
    }).addTo(map);
    
    // Центрируем карту на маршруте
    const bounds = L.latLngBounds([
        [city1.latitude, city1.longitude],
        [city2.latitude, city2.longitude]
    ]);
    map.fitBounds(bounds, { padding: [100, 100] });
    
    console.log(`Маршрут отрисован: ${city1.city} → ${city2.city}`);
}

// Показать результат в блоке
function showResult(city1, city2, distance, resultDiv) {
    resultDiv.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 14px; color: #aaa; margin-bottom: 5px;">
                Ортодромное расстояние
            </div>
            <div style="font-size: 36px; font-weight: bold; color: #ff5722; margin: 10px 0;">
                ${distance.toLocaleString('ru-RU')} км
            </div>
            <div style="font-size: 16px; margin: 10px 0; color: #e6e6e6;">
                <span style="color: #ff5722;">${city1.city}</span> 
                <span style="color: #aaa;">→</span> 
                <span style="color: #00adb5;">${city2.city}</span>
            </div>
            <div style="margin-top: 15px; padding: 10px; background: rgba(255, 87, 34, 0.1); border-radius: 8px; font-size: 12px; color: #888;">
                📍 Маршрут отображен на карте<br>
                📏 Линия показывает кратчайший путь (ортодрому)
            </div>
        </div>
    `;
}

// Очистка карты
function clearMap() {
    // Удаляем маркеры
    currentMarkers.forEach(marker => {
        if (marker && map.hasLayer(marker)) {
            map.removeLayer(marker);
        }
    });
    currentMarkers = [];
    
    // Удаляем линию
    if (currentLine && map.hasLayer(currentLine)) {
        map.removeLayer(currentLine);
        currentLine = null;
    }
    
    // Удаляем надпись расстояния
    if (distanceLabel && map.hasLayer(distanceLabel)) {
        map.removeLayer(distanceLabel);
        distanceLabel = null;
    }
}

// Обработчик очистки
function handleClear() {
    document.getElementById('city1').value = '';
    document.getElementById('city2').value = '';
    document.getElementById('result').innerHTML = 'Выберите два города';
    
    clearMap();
    
    // Возвращаем карту к виду всей России
    if (map) {
        map.setView([61.5240, 105.3188], 3);
    }
    
    console.log('Карта очищена');
}

// Показать ошибку на карте
function showMapError(error) {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.innerHTML = `
            <div style="
                color: white;
                background: #1a1a2e;
                padding: 40px;
                border-radius: 15px;
                text-align: center;
                border: 3px solid #ff5722;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            ">
                <div style="font-size: 48px; margin-bottom: 20px;">🌍</div>
                <h3 style="color: #ff5722; margin-bottom: 15px;">Карта России</h3>
                <p>${error.message || 'Ошибка загрузки карты'}</p>
                <p style="font-size: 12px; color: #888; margin-top: 20px;">Проверьте консоль (F12) для подробностей</p>
            </div>
        `;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        console.log('Элемент карты найден');
        initMap();
    } else {
        console.warn('Элемент карты не найден, отложенная инициализация...');
        // Проверяем каждые 500мс, пока не появится элемент карты
        const checkInterval = setInterval(() => {
            if (document.getElementById('map')) {
                clearInterval(checkInterval);
                initMap();
            }
        }, 500);
    }
});

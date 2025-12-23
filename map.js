// map.js - РАБОЧАЯ ВЕРСИЯ КАРТЫ
console.log('🌍 Инициализация карты России...');

// БАЗА ДАННЫХ ВСЕХ ГОРОДОВ РОССИИ (85 городов)
const citiesData = [
    { "city": "Майкоп", "region": "Адыгея", "latitude": 44.6098268, "longitude": 40.1006527 },
    { "city": "Горно-Алтайск", "region": "Алтай", "latitude": 51.9582681, "longitude": 85.9602957 },
    { "city": "Барнаул", "region": "Алтайский край", "latitude": 53.3481145, "longitude": 83.7798362 },
    { "city": "Благовещенск", "region": "Амурская область", "latitude": 50.2905935, "longitude": 127.5272186 },
    { "city": "Архангельск", "region": "Архангельская область", "latitude": 64.5392985, "longitude": 40.5170083 },
    { "city": "Астрахань", "region": "Астраханская область", "latitude": 46.3655808, "longitude": 48.0559979 },
    { "city": "Уфа", "region": "Башкортостан", "latitude": 54.734853, "longitude": 55.9578647 },
    { "city": "Белгород", "region": "Белгородская область", "latitude": 50.5977351, "longitude": 36.5858236 },
    { "city": "Брянск", "region": "Брянская область", "latitude": 53.2420071, "longitude": 34.3652716 },
    { "city": "Улан-Удэ", "region": "Бурятия", "latitude": 51.8334378, "longitude": 107.5841511 },
    { "city": "Владимир", "region": "Владимирская область", "latitude": 56.1281561, "longitude": 40.4082995 },
    { "city": "Волгоград", "region": "Волгоградская область", "latitude": 48.7072005, "longitude": 44.5170207 },
    { "city": "Вологда", "region": "Вологодская область", "latitude": 59.2484186, "longitude": 39.8356461 },
    { "city": "Воронеж", "region": "Воронежская область", "latitude": 51.6592378, "longitude": 39.1968284 },
    { "city": "Махачкала", "region": "Дагестан", "latitude": 42.9848572, "longitude": 47.5046303 },
    { "city": "Биробиджан", "region": "Еврейская Автономная область", "latitude": 48.7945975, "longitude": 132.9217594 },
    { "city": "Чита", "region": "Забайкальский край", "latitude": 52.0340128, "longitude": 113.4994884 },
    { "city": "Иваново", "region": "Ивановская область", "latitude": 56.9994677, "longitude": 40.9728231 },
    { "city": "Магас", "region": "Ингушетия", "latitude": 43.1686967, "longitude": 44.8130849 },
    { "city": "Иркутск", "region": "Иркутская область", "latitude": 52.2863513, "longitude": 104.280655 },
    { "city": "Нальчик", "region": "Кабардино-Балкарская", "latitude": 43.4846312, "longitude": 43.6070316 },
    { "city": "Калининград", "region": "Калининградская область", "latitude": 54.7073218, "longitude": 20.5072458 },
    { "city": "Элиста", "region": "Калмыкия", "latitude": 46.3082947, "longitude": 44.2701417 },
    { "city": "Калуга", "region": "Калужская область", "latitude": 54.5060439, "longitude": 36.2515933 },
    { "city": "Петропавловск-Камчатский", "region": "Камчатский край", "latitude": 53.0370213, "longitude": 158.6559142 },
    { "city": "Черкесск", "region": "Карачаево-Черкесская", "latitude": 44.2268637, "longitude": 42.0467829 },
    { "city": "Петрозаводск", "region": "Карелия", "latitude": 61.78909, "longitude": 34.3596263 },
    { "city": "Кемерово", "region": "Кемеровская область", "latitude": 55.3909721, "longitude": 86.0467864 },
    { "city": "Киров", "region": "Кировская область", "latitude": 58.6035313, "longitude": 49.6679219 },
    { "city": "Сыктывкар", "region": "Коми", "latitude": 61.668789, "longitude": 50.8356491 },
    { "city": "Кострома", "region": "Костромская область", "latitude": 57.8029445, "longitude": 40.9907282 },
    { "city": "Краснодар", "region": "Краснодарский край", "latitude": 45.040235, "longitude": 38.9760801 },
    { "city": "Красноярск", "region": "Красноярский край", "latitude": 56.009466, "longitude": 92.8524162 },
    { "city": "Курган", "region": "Курганская область", "latitude": 55.4443448, "longitude": 65.3161339 },
    { "city": "Курск", "region": "Курская область", "latitude": 51.7303391, "longitude": 36.1926448 },
    { "city": "Гатчина", "region": "Ленинградская область", "latitude": 59.5650861, "longitude": 30.1281859 },
    { "city": "Липецк", "region": "Липецкая область", "latitude": 52.6103027, "longitude": 39.5946266 },
    { "city": "Магадан", "region": "Магаданская область", "latitude": 59.5681763, "longitude": 150.8085289 },
    { "city": "Йошкар-Ола", "region": "Марий Эл", "latitude": 56.6343763, "longitude": 47.8998445 },
    { "city": "Саранск", "region": "Мордовия", "latitude": 54.1807601, "longitude": 45.1862263 },
    { "city": "Москва", "region": "Москва", "latitude": 55.755826, "longitude": 37.6173 },
    { "city": "Мурманск", "region": "Мурманская область", "latitude": 68.958524, "longitude": 33.08266 },
    { "city": "Нижний Новгород", "region": "Нижегородская область", "latitude": 56.326887, "longitude": 44.005986 },
    { "city": "Великий Новгород", "region": "Новгородская область", "latitude": 58.5256, "longitude": 31.2741 },
    { "city": "Новосибирск", "region": "Новосибирская область", "latitude": 55.030199, "longitude": 82.92043 },
    { "city": "Омск", "region": "Омская область", "latitude": 54.98848, "longitude": 73.324236 },
    { "city": "Оренбург", "region": "Оренбургская область", "latitude": 51.768199, "longitude": 55.096955 },
    { "city": "Орёл", "region": "Орловская область", "latitude": 52.970306, "longitude": 36.063514 },
    { "city": "Пенза", "region": "Пензенская область", "latitude": 53.195538, "longitude": 45.018711 },
    { "city": "Пермь", "region": "Пермский край", "latitude": 58.010374, "longitude": 56.229398 },
    { "city": "Владивосток", "region": "Приморский край", "latitude": 43.115536, "longitude": 131.885485 },
    { "city": "Псков", "region": "Псковская область", "latitude": 57.819274, "longitude": 28.332635 },
    { "city": "Ростов-на-Дону", "region": "Ростовская область", "latitude": 47.222078, "longitude": 39.720349 },
    { "city": "Рязань", "region": "Рязанская область", "latitude": 54.6269, "longitude": 39.6916 },
    { "city": "Самара", "region": "Самарская область", "latitude": 53.195538, "longitude": 50.101783 },
    { "city": "Санкт-Петербург", "region": "Санкт-Петербург", "latitude": 59.939095, "longitude": 30.315868 },
    { "city": "Саратов", "region": "Саратовская область", "latitude": 51.533103, "longitude": 46.034158 },
    { "city": "Южно-Сахалинск", "region": "Сахалинская область", "latitude": 46.959133, "longitude": 142.7381252 },
    { "city": "Екатеринбург", "region": "Свердловская область", "latitude": 56.838011, "longitude": 60.597465 },
    { "city": "Владикавказ", "region": "Северная Осетия - Алания", "latitude": 43.0205039, "longitude": 44.6819383 },
    { "city": "Смоленск", "region": "Смоленская область", "latitude": 54.782635, "longitude": 32.045287 },
    { "city": "Ставрополь", "region": "Ставропольский край", "latitude": 45.044502, "longitude": 41.969017 },
    { "city": "Тамбов", "region": "Тамбовская область", "latitude": 52.7213021, "longitude": 41.452258 },
    { "city": "Казань", "region": "Татарстан", "latitude": 55.796391, "longitude": 49.108891 },
    { "city": "Тверь", "region": "Тверская область", "latitude": 56.859611, "longitude": 35.911896 },
    { "city": "Томск", "region": "Томская область", "latitude": 56.4847036, "longitude": 84.9481737 },
    { "city": "Тула", "region": "Тульская область", "latitude": 54.193033, "longitude": 37.617752 },
    { "city": "Тюмень", "region": "Тюменская область", "latitude": 57.15222, "longitude": 65.527222 },
    { "city": "Ижевск", "region": "Удмуртия", "latitude": 56.8527444, "longitude": 53.2113961 },
    { "city": "Ульяновск", "region": "Ульяновская область", "latitude": 54.314192, "longitude": 48.403132 },
    { "city": "Хабаровск", "region": "Хабаровский край", "latitude": 48.48271, "longitude": 135.08379 },
    { "city": "Челябинск", "region": "Челябинская область", "latitude": 55.159902, "longitude": 61.402554 },
    { "city": "Грозный", "region": "Чеченская Республика", "latitude": 43.3179243, "longitude": 45.6981102 },
    { "city": "Чебоксары", "region": "Чувашия", "latitude": 56.1439378, "longitude": 47.2488718 },
    { "city": "Якутск", "region": "Саха (Якутия)", "latitude": 62.027833, "longitude": 129.704151 },
    { "city": "Ярославль", "region": "Ярославская область", "latitude": 57.626569, "longitude": 39.893822 }
];

console.log(`✅ Загружено ${citiesData.length} городов России`);

// Глобальные переменные
let map = null;
let currentMarkers = [];
let currentLine = null;

// ПРОСТАЯ ФУНКЦИЯ ИНИЦИАЛИЗАЦИИ
function initMap() {
    console.log('🔄 Начинаем инициализацию карты...');
    
    // 1. Проверяем, существует ли элемент карты
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('❌ Элемент #map не найден!');
        return;
    }
    
    try {
        // 2. Очищаем карту, если уже была инициализирована
        if (map) {
            map.remove();
            map = null;
            currentMarkers = [];
            currentLine = null;
        }
        
        // 3. Создаем карту
        console.log('Создаем карту Leaflet...');
        map = L.map('map').setView([61.5240, 105.3188], 3);
        
        // 4. Добавляем слой карты
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);
        
        console.log('✅ Карта создана успешно');
        
        // 5. Добавляем все города на карту
        addCitiesToMap();
        
        // 6. Инициализируем калькулятор
        initCalculator();
        
        // 7. Делаем доступным для отладки
        window.map = map;
        
    } catch (error) {
        console.error('❌ Ошибка при создании карты:', error);
        showError(error);
    }
}

// ДОБАВЛЕНИЕ ГОРОДОВ НА КАРТУ
function addCitiesToMap() {
    console.log(`Добавляем ${citiesData.length} городов на карту...`);
    
    citiesData.forEach(city => {
        L.marker([city.latitude, city.longitude])
            .addTo(map)
            .bindPopup(`
                <div style="color: #1a1a2e; min-width: 150px;">
                    <strong style="color: #00adb5;">${city.city}</strong><br>
                    <small style="color: #666;">${city.region}</small>
                </div>
            `);
    });
    
    console.log(`✅ Города добавлены на карту`);
}

// ИНИЦИАЛИЗАЦИЯ КАЛЬКУЛЯТОРА
function initCalculator() {
    console.log('Инициализация калькулятора расстояний...');
    
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    
    if (!city1Select || !city2Select) {
        console.error('❌ Элементы select не найдены!');
        return;
    }
    
    // Заполняем списки городов
    fillSelectOptions(city1Select);
    fillSelectOptions(city2Select);
    
    // Назначаем обработчики событий
    document.getElementById('calculate').addEventListener('click', calculateDistance);
    document.getElementById('clear').addEventListener('click', clearCalculator);
    
    console.log('✅ Калькулятор готов к работе');
}

// ЗАПОЛНЕНИЕ ВЫПАДАЮЩИХ СПИСКОВ
function fillSelectOptions(selectElement) {
    // Очищаем список
    selectElement.innerHTML = '<option value="">Выберите город...</option>';
    
    // Добавляем все города
    citiesData.forEach(city => {
        const option = document.createElement('option');
        option.value = city.city;
        option.textContent = `${city.city} (${city.region})`;
        selectElement.appendChild(option);
    });
}

// РАСЧЕТ РАССТОЯНИЯ
function calculateDistance() {
    const city1Name = document.getElementById('city1').value;
    const city2Name = document.getElementById('city2').value;
    const resultDiv = document.getElementById('result');
    
    // Проверки
    if (!city1Name || !city2Name) {
        resultDiv.innerHTML = '<span style="color:#ff5722;">Выберите оба города!</span>';
        return;
    }
    
    if (city1Name === city2Name) {
        resultDiv.innerHTML = '<span style="color:#ff5722;">Выберите разные города!</span>';
        return;
    }
    
    // Находим города в базе данных
    const city1 = citiesData.find(c => c.city === city1Name);
    const city2 = citiesData.find(c => c.city === city2Name);
    
    if (!city1 || !city2) {
        resultDiv.innerHTML = '<span style="color:#ff5722;">Город не найден!</span>';
        return;
    }
    
    // Рассчитываем расстояние
    const distance = getDistanceFromLatLonInKm(
        city1.latitude, city1.longitude,
        city2.latitude, city2.longitude
    );
    
    // Отрисовываем маршрут на карте
    drawRoute(city1, city2, distance);
    
    // Показываем результат
    showResult(city1, city2, distance, resultDiv);
    
    console.log(`📏 Расчет: ${city1.city} → ${city2.city} = ${distance} км`);
}

// ФОРМУЛА РАСЧЕТА РАССТОЯНИЯ
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в км
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance);
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}

// ОТРИСОВКА МАРШРУТА НА КАРТЕ
function drawRoute(city1, city2, distance) {
    // Очищаем предыдущий маршрут
    clearRoute();
    
    // Создаем маркеры для выбранных городов
    const marker1 = L.marker([city1.latitude, city1.longitude], {
        icon: L.divIcon({
            html: '<div style="background: #ff5722; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);">A</div>',
            iconSize: [35, 35],
            className: 'selected-marker'
        })
    }).addTo(map);
    
    const marker2 = L.marker([city2.latitude, city2.longitude], {
        icon: L.divIcon({
            html: '<div style="background: #00adb5; color: white; border-radius: 50%; width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; font-weight: bold; border: 3px solid white; box-shadow: 0 0 10px rgba(0,0,0,0.5);">B</div>',
            iconSize: [35, 35],
            className: 'selected-marker'
        })
    }).addTo(map);
    
    currentMarkers = [marker1, marker2];
    
    // Создаем КРАСНУЮ линию между городами
    currentLine = L.polyline([
        [city1.latitude, city1.longitude],
        [city2.latitude, city2.longitude]
    ], {
        color: '#ff0000', // КРАСНЫЙ ЦВЕТ
        weight: 4,
        opacity: 0.8,
        dashArray: null
    }).addTo(map);
    
    // Добавляем надпись с расстоянием
    const midPoint = [
        (city1.latitude + city2.latitude) / 2,
        (city1.longitude + city2.longitude) / 2
    ];
    
    const distanceMarker = L.marker(midPoint, {
        icon: L.divIcon({
            html: `<div style="
                background: rgba(255, 0, 0, 0.9);
                color: white;
                padding: 8px 12px;
                border-radius: 10px;
                font-weight: bold;
                font-size: 14px;
                border: 2px solid white;
                box-shadow: 0 0 10px rgba(0,0,0,0.5);
            "><strong>${distance.toLocaleString('ru-RU')} км</strong></div>`,
            iconSize: [null, null],
            className: 'distance-label'
        })
    }).addTo(map);
    
    currentMarkers.push(distanceMarker);
    
    // Центрируем карту на маршруте
    const bounds = L.latLngBounds([
        [city1.latitude, city1.longitude],
        [city2.latitude, city2.longitude]
    ]);
    map.fitBounds(bounds, { padding: [50, 50] });
}

// ПОКАЗАТЬ РЕЗУЛЬТАТ
function showResult(city1, city2, distance, resultDiv) {
    resultDiv.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 12px; color: #aaa; margin-bottom: 5px;">
                Кратчайшее расстояние по ортодроме
            </div>
            <div style="font-size: 32px; font-weight: bold; color: #ff5722; margin: 10px 0;">
                ${distance.toLocaleString('ru-RU')} км
            </div>
            <div style="font-size: 16px; margin: 10px 0; color: #e6e6e6;">
                <span style="color: #ff5722; font-weight: bold;">${city1.city}</span> 
                <span style="color: #aaa;">→</span> 
                <span style="color: #00adb5; font-weight: bold;">${city2.city}</span>
            </div>
            <div style="margin-top: 15px; padding: 8px; background: rgba(255, 87, 34, 0.1); border-radius: 8px; font-size: 12px; color: #888;">
                📍 Маршрут отображен на карте красной линией
            </div>
        </div>
    `;
}

// ОЧИСТКА МАРШРУТА
function clearRoute() {
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
}

// ОЧИСТКА КАЛЬКУЛЯТОРА
function clearCalculator() {
    document.getElementById('city1').value = '';
    document.getElementById('city2').value = '';
    document.getElementById('result').innerHTML = 'Выберите два города';
    
    clearRoute();
    
    // Возвращаем карту к виду всей России
    if (map) {
        map.setView([61.5240, 105.3188], 3);
    }
    
    console.log('🧹 Калькулятор очищен');
}

// ПОКАЗАТЬ ОШИБКУ
function showError(error) {
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        mapDiv.innerHTML = `
            <div style="
                padding: 30px;
                text-align: center;
                background: rgba(255, 87, 34, 0.1);
                border-radius: 10px;
                border: 2px solid #ff5722;
                color: #ff5722;
            ">
                <h3>Ошибка загрузки карты</h3>
                <p>${error.message || 'Неизвестная ошибка'}</p>
                <button onclick="initMap()" style="
                    margin-top: 15px;
                    padding: 10px 20px;
                    background: #ff5722;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                ">Попробовать снова</button>
            </div>
        `;
    }
}

// АВТОМАТИЧЕСКАЯ ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ СЛАЙДА
document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 Документ загружен, проверяем карту...');
    
    // Проверяем, если мы уже на слайде с картой
    const checkForMapSlide = () => {
        const activeSlide = document.querySelector('.slide.active');
        if (activeSlide && activeSlide.id === 'slide16') {
            if (!map) {
                console.log('🎯 Слайд с картой активен, инициализируем...');
                setTimeout(initMap, 100);
            }
        }
    };
    
    // Проверяем сразу
    checkForMapSlide();
    
    // Наблюдаем за переключением слайдов
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                checkForMapSlide();
            }
        });
    });
    
    const slidesContainer = document.querySelector('.slides-container');
    if (slidesContainer) {
        observer.observe(slidesContainer, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
});

// ДЕЛАЕМ ФУНКЦИИ ДОСТУПНЫМИ ГЛОБАЛЬНО
window.initMap = initMap;
window.calculateDistance = calculateDistance;
window.clearCalculator = clearCalculator;

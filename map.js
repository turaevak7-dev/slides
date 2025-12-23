// map.js - ПОЛНЫЙ РАБОЧИЙ КОД СО ВСЕМИ ГОРОДАМИ РОССИИ
console.log('🗺️ map.js загружен');

let map = null;
let mapInitialized = false;
let allCities = []; // Все города для поиска

// ВСЕ ГОРОДА РОССИИ (85 городов)
const RUSSIAN_CITIES = [
    { city: "Майкоп", region: "Адыгея", latitude: 44.6098268, longitude: 40.1006527 },
    { city: "Горно-Алтайск", region: "Алтай", latitude: 51.9582681, longitude: 85.9602957 },
    { city: "Барнаул", region: "Алтайский край", latitude: 53.3481145, longitude: 83.7798362 },
    { city: "Благовещенск", region: "Амурская область", latitude: 50.2905935, longitude: 127.5272186 },
    { city: "Архангельск", region: "Архангельская область", latitude: 64.5392985, longitude: 40.5170083 },
    { city: "Астрахань", region: "Астраханская область", latitude: 46.3655808, longitude: 48.0559979 },
    { city: "Уфа", region: "Башкортостан", latitude: 54.734853, longitude: 55.9578647 },
    { city: "Белгород", region: "Белгородская область", latitude: 50.5977351, longitude: 36.5858236 },
    { city: "Брянск", region: "Брянская область", latitude: 53.2420071, longitude: 34.3652716 },
    { city: "Улан-Удэ", region: "Бурятия", latitude: 51.8334378, longitude: 107.5841511 },
    { city: "Владимир", region: "Владимирская область", latitude: 56.1281561, longitude: 40.4082995 },
    { city: "Волгоград", region: "Волгоградская область", latitude: 48.7072005, longitude: 44.5170207 },
    { city: "Вологда", region: "Вологодская область", latitude: 59.2484186, longitude: 39.8356461 },
    { city: "Воронеж", region: "Воронежская область", latitude: 51.6592378, longitude: 39.1968284 },
    { city: "Махачкала", region: "Дагестан", latitude: 42.9848572, longitude: 47.5046303 },
    { city: "Биробиджан", region: "Еврейская Автономная область", latitude: 48.7945975, longitude: 132.9217594 },
    { city: "Чита", region: "Забайкальский край", latitude: 52.0340128, longitude: 113.4994884 },
    { city: "Иваново", region: "Ивановская область", latitude: 56.9994677, longitude: 40.9728231 },
    { city: "Магас", region: "Ингушетия", latitude: 43.1686967, longitude: 44.8130849 },
    { city: "Иркутск", region: "Иркутская область", latitude: 52.2863513, longitude: 104.280655 },
    { city: "Нальчик", region: "Кабардино-Балкарская", latitude: 43.4846312, longitude: 43.6070316 },
    { city: "Калининград", region: "Калининградская область", latitude: 54.7073218, longitude: 20.5072458 },
    { city: "Элиста", region: "Калмыкия", latitude: 46.3082947, longitude: 44.2701417 },
    { city: "Калуга", region: "Калужская область", latitude: 54.5060439, longitude: 36.2515933 },
    { city: "Петропавловск-Камчатский", region: "Камчатский край", latitude: 53.0370213, longitude: 158.6559142 },
    { city: "Черкесск", region: "Карачаево-Черкесская", latitude: 44.2268637, longitude: 42.0467829 },
    { city: "Петрозаводск", region: "Карелия", latitude: 61.78909, longitude: 34.3596263 },
    { city: "Кемерово", region: "Кемеровская область", latitude: 55.3909721, longitude: 86.0467864 },
    { city: "Киров", region: "Кировская область", latitude: 58.6035313, longitude: 49.6679219 },
    { city: "Сыктывкар", region: "Коми", latitude: 61.668789, longitude: 50.8356491 },
    { city: "Кострома", region: "Костромская область", latitude: 57.8029445, longitude: 40.9907282 },
    { city: "Краснодар", region: "Краснодарский край", latitude: 45.040235, longitude: 38.9760801 },
    { city: "Красноярск", region: "Красноярский край", latitude: 56.009466, longitude: 92.8524162 },
    { city: "Курган", region: "Курганская область", latitude: 55.4443448, longitude: 65.3161339 },
    { city: "Курск", region: "Курская область", latitude: 51.7303391, longitude: 36.1926448 },
    { city: "Гатчина", region: "Ленинградская область", latitude: 59.5650861, longitude: 30.1281859 },
    { city: "Липецк", region: "Липецкая область", latitude: 52.6103027, longitude: 39.5946266 },
    { city: "Магадан", region: "Магаданская область", latitude: 59.5681763, longitude: 150.8085289 },
    { city: "Йошкар-Ола", region: "Марий Эл", latitude: 56.6343763, longitude: 47.8998445 },
    { city: "Саранск", region: "Мордовия", latitude: 54.1807601, longitude: 45.1862263 },
    { city: "Москва", region: "Москва", latitude: 55.7538789, longitude: 37.6203735 },
    { city: "Мурманск", region: "Мурманская область", latitude: 69.0076958, longitude: 33.0686019 },
    { city: "Нарьян-Мар", region: "Ненецкий автономный округ", latitude: 67.6381525, longitude: 53.0069336 },
    { city: "Нижний Новгород", region: "Нижегородская область", latitude: 56.3242093, longitude: 44.0053948 },
    { city: "Великий Новгород", region: "Новгородская область", latitude: 58.5214003, longitude: 31.2755051 },
    { city: "Новосибирск", region: "Новосибирская область", latitude: 55.0281016, longitude: 82.9210575 },
    { city: "Омск", region: "Омская область", latitude: 54.9848136, longitude: 73.3674638 },
    { city: "Оренбург", region: "Оренбургская область", latitude: 51.7875191, longitude: 55.1017379 },
    { city: "Орёл", region: "Орловская область", latitude: 52.9672573, longitude: 36.0696479 },
    { city: "Пенза", region: "Пензенская область", latitude: 53.1753884, longitude: 45.0347408 },
    { city: "Пермь", region: "Пермский край", latitude: 58.0103211, longitude: 56.2341778 },
    { city: "Владивосток", region: "Приморский край", latitude: 43.1163807, longitude: 131.882348 },
    { city: "Псков", region: "Псковская область", latitude: 57.819284, longitude: 28.3318188 },
    { city: "Ростов-на-Дону", region: "Ростовская область", latitude: 47.2224364, longitude: 39.7187866 },
    { city: "Рязань", region: "Рязанская область", latitude: 54.625457, longitude: 39.7359992 },
    { city: "Самара", region: "Самарская область", latitude: 53.1951657, longitude: 50.1067691 },
    { city: "Санкт-Петербург", region: "Санкт-Петербург", latitude: 59.939125, longitude: 30.3158225 },
    { city: "Саратов", region: "Саратовская область", latitude: 51.530376, longitude: 45.9530257 },
    { city: "Южно-Сахалинск", region: "Сахалинская область", latitude: 46.959133, longitude: 142.7381252 },
    { city: "Екатеринбург", region: "Свердловская область", latitude: 56.8386326, longitude: 60.6054887 },
    { city: "Владикавказ", region: "Северная Осетия - Алания", latitude: 43.0205039, longitude: 44.6819383 },
    { city: "Смоленск", region: "Смоленская область", latitude: 54.7867168, longitude: 31.8153366 },
    { city: "Ставрополь", region: "Ставропольский край", latitude: 45.0445439, longitude: 41.9690168 },
    { city: "Тамбов", region: "Тамбовская область", latitude: 52.7213021, longitude: 41.452258 },
    { city: "Казань", region: "Татарстан", latitude: 55.7943877, longitude: 49.1115312 },
    { city: "Тверь", region: "Тверская область", latitude: 56.8585396, longitude: 35.9117898 },
    { city: "Томск", region: "Томская область", latitude: 56.4847036, longitude: 84.9481737 },
    { city: "Тула", region: "Тульская область", latitude: 54.192017, longitude: 37.6153885 },
    { city: "Кызыл", region: "Тыва", latitude: 51.7191542, longitude: 94.4377234 },
    { city: "Тюмень", region: "Тюменская область", latitude: 57.1530824, longitude: 65.5343118 },
    { city: "Ижевск", region: "Удмуртская", latitude: 56.8527444, longitude: 53.2113961 },
    { city: "Ульяновск", region: "Ульяновская область", latitude: 54.3080674, longitude: 48.3748717 },
    { city: "Хабаровск", region: "Хабаровский край", latitude: 48.4647991, longitude: 135.0598811 },
    { city: "Абакан", region: "Хакасия", latitude: 53.7223661, longitude: 91.4437792 },
    { city: "Ханты-Мансийск", region: "Ханты-Мансийский автономный округ - Югра", latitude: 61.0024344, longitude: 69.0183322 },
    { city: "Челябинск", region: "Челябинская область", latitude: 55.1603659, longitude: 61.4007858 },
    { city: "Грозный", region: "Чеченская", latitude: 43.3179243, longitude: 45.6981102 },
    { city: "Чебоксары", region: "Чувашская Республика", latitude: 56.1439378, longitude: 47.2488718 },
    { city: "Анадырь", region: "Чукотский автономный округ", latitude: 64.7314347, longitude: 177.5015752 },
    { city: "Якутск", region: "Саха (Якутия)", latitude: 62.0280273, longitude: 129.7325717 },
    { city: "Салехард", region: "Ямало-Ненецкий автономный округ", latitude: 66.5493568, longitude: 66.6083994 },
    { city: "Ярославль", region: "Ярославская область", latitude: 57.6216145, longitude: 39.897878 }
];

// Главная функция инициализации
function initMap() {
    console.log('Инициализируем карту...');
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('❌ Элемент #map не найден!');
        return;
    }
    
    if (map) {
        console.log('Карта уже создана');
        return;
    }
    
    try {
        // Показываем загрузку
        mapElement.innerHTML = `
            <div style="
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
                color: #00adb5;
                font-size: 18px;
                border-radius: 15px;
            ">
                <div style="text-align: center;">
                    <div style="margin-bottom: 15px;">🌍 Загружаем карту России...</div>
                    <div style="font-size: 14px; color: #aaa;">85 городов</div>
                </div>
            </div>
        `;
        
        // Создаем карту
        map = L.map('map').setView([61.5240, 105.3188], 3);
        
        // Добавляем слой карты
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 18
        }).addTo(map);
        
        console.log('✅ Карта создана');
        
        // Добавляем ВСЕ города
        addAllCitiesToMap(map);
        
        // Инициализируем калькулятор
        initDistanceCalculator();
        
        mapInitialized = true;
        
    } catch (error) {
        console.error('❌ Ошибка создания карты:', error);
        mapElement.innerHTML = `
            <div style="
                padding: 40px;
                text-align: center;
                color: white;
                background: #ff5722;
                border-radius: 10px;
                margin: 20px;
            ">
                <h3>⚠️ Ошибка загрузки карты</h3>
                <p><strong>${error.name}:</strong> ${error.message}</p>
                <button onclick="window.location.reload()" style="
                    background: #00adb5;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 20px;
                ">
                    Перезагрузить
                </button>
            </div>
        `;
    }
}

// Функция добавления всех городов
function addAllCitiesToMap(map) {
    console.log(`Добавляем ${RUSSIAN_CITIES.length} городов...`);
    
    RUSSIAN_CITIES.forEach(city => {
        L.marker([city.latitude, city.longitude])
            .addTo(map)
            .bindPopup(`
                <div style="color: #1a1a2e; font-family: Arial, sans-serif; min-width: 200px;">
                    <div style="font-weight: bold; font-size: 16px; color: #00adb5;">
                        ${city.city}
                    </div>
                    <div style="font-size: 12px; color: #666; margin-bottom: 5px;">
                        ${city.region}
                    </div>
                    <div style="font-size: 11px; color: #888;">
                        Ш: ${city.latitude.toFixed(4)}° Д: ${city.longitude.toFixed(4)}°
                    </div>
                </div>
            `)
            .bindTooltip(city.city, {
                permanent: false,
                direction: 'top'
            });
    });
    
    console.log(`✅ Добавлено ${RUSSIAN_CITIES.length} городов`);
    allCities = [...RUSSIAN_CITIES]; // Сохраняем для калькулятора
}

// Калькулятор расстояний
function initDistanceCalculator() {
    console.log('Инициализируем калькулятор...');
    
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const resultDiv = document.getElementById('result');
    
    if (!city1Select || !city2Select) {
        console.warn('Элементы select не найдены');
        return;
    }
    
    // Заполняем списки ВСЕМИ городами
    city1Select.innerHTML = '<option value="">Выберите город...</option>';
    city2Select.innerHTML = '<option value="">Выберите город...</option>';
    
    allCities.forEach(city => {
        const option1 = new Option(`${city.city} (${city.region})`, city.city);
        const option2 = new Option(`${city.city} (${city.region})`, city.city);
        city1Select.appendChild(option1);
        city2Select.appendChild(option2);
    });
    
    // Переменные для элементов на карте
    let currentMarkers = [];
    let currentLine = null;
    
    // Функция расчета расстояния
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const toRad = (degrees) => degrees * Math.PI / 180;
        
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
    
    // Функция отрисовки маршрута
    function drawRoute(city1, city2, distance) {
        // Очищаем предыдущие элементы
        currentMarkers.forEach(marker => {
            if (map.hasLayer(marker)) map.removeLayer(marker);
        });
        if (currentLine && map.hasLayer(currentLine)) {
            map.removeLayer(currentLine);
        }
        
        // Создаем маркеры
        const marker1 = L.marker([city1.latitude, city1.longitude], {
            icon: L.divIcon({
                html: '<div style="color: #00fff5; font-size: 24px;">📍</div>',
                iconSize: [30, 30],
                className: 'selected-marker'
            })
        })
        .addTo(map)
        .bindPopup(`<b>${city1.city}</b><br>${city1.region}`);
        
        const marker2 = L.marker([city2.latitude, city2.longitude], {
            icon: L.divIcon({
                html: '<div style="color: #00fff5; font-size: 24px;">📍</div>',
                iconSize: [30, 30],
                className: 'selected-marker'
            })
        })
        .addTo(map)
        .bindPopup(`<b>${city2.city}</b><br>${city2.region}`);
        
        currentMarkers = [marker1, marker2];
        
        // Создаем линию
        currentLine = L.polyline([
            [city1.latitude, city1.longitude],
            [city2.latitude, city2.longitude]
        ], {
            color: '#00fff5',
            weight: 3,
            opacity: 0.8
        }).addTo(map);
        
        // Центрируем карту
        const bounds = L.latLngBounds([
            [city1.latitude, city1.longitude],
            [city2.latitude, city2.longitude]
        ]);
        map.fitBounds(bounds, { padding: [50, 50] });
        
        return distance;
    }
    
    // Обработчик кнопки "Рассчитать"
    calculateBtn.addEventListener('click', function() {
        const city1Name = city1Select.value;
        const city2Name = city2Select.value;
        
        if (!city1Name || !city2Name) {
            resultDiv.innerHTML = '<span style="color:#ff5722;">Выберите оба города!</span>';
            return;
        }
        
        if (city1Name === city2Name) {
            resultDiv.innerHTML = '<span style="color:#ff5722;">Выберите разные города!</span>';
            return;
        }
        
        const city1 = allCities.find(c => c.city === city1Name);
        const city2 = allCities.find(c => c.city === city2Name);
        
        if (city1 && city2) {
            const distance = calculateDistance(
                city1.latitude, city1.longitude,
                city2.latitude, city2.longitude
            );
            
            // Отрисовываем маршрут
            drawRoute(city1, city2, distance);
            
            // Показываем результат
            resultDiv.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 24px; font-weight: bold; color: #00fff5;">
                        ${distance.toLocaleString('ru-RU')} км
                    </div>
                    <div style="font-size: 16px; margin-top: 5px;">
                        ${city1.city} → ${city2.city}
                    </div>
                    <div style="margin-top: 10px; font-size: 12px; color: #888;">
                        ✈️ Ортодромный путь
                    </div>
                </div>
            `;
            
            console.log(`Расчет: ${city1.city} → ${city2.city} = ${distance} км`);
        }
    });
    
    // Обработчик кнопки "Очистить"
    clearBtn.addEventListener('click', function() {
        city1Select.value = '';
        city2Select.value = '';
        resultDiv.innerHTML = 'Выберите два города';
        
        // Очищаем карту
        currentMarkers.forEach(marker => {
            if (map && map.hasLayer(marker)) map.removeLayer(marker);
        });
        currentMarkers = [];
        
        if (currentLine && map && map.hasLayer(currentLine)) {
            map.removeLayer(currentLine);
            currentLine = null;
        }
        
        // Возвращаем карту в исходное положение
        if (map) {
            map.setView([61.5240, 105.3188], 3);
        }
    });
    
    console.log('✅ Калькулятор готов');
}

// Автоматическая инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('Страница загружена');
    
    // Проверяем, есть ли карта на странице
    if (document.getElementById('map')) {
        setTimeout(initMap, 1000);
    }
});

// Инициализация при переходе на слайд 16
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-link')) {
        const href = e.target.getAttribute('href');
        if (href === '#slide16' && !mapInitialized) {
            setTimeout(initMap, 500);
        }
    }
});

// Экспортируем функцию для глобального доступа
window.initMap = initMap;
window.RUSSIAN_CITIES = RUSSIAN_CITIES;

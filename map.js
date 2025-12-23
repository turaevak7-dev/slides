// map.js - ФИНАЛЬНЫЙ РАБОЧИЙ КОД
console.log('🗺️ map.js загружен');

let map = null;
let isMapInitializing = false;

// Все города России (85 городов)
const CITIES = [
    { city: "Майкоп", region: "Адыгея", lat: 44.6098268, lon: 40.1006527 },
    { city: "Горно-Алтайск", region: "Алтай", lat: 51.9582681, lon: 85.9602957 },
    { city: "Барнаул", region: "Алтайский край", lat: 53.3481145, lon: 83.7798362 },
    { city: "Благовещенск", region: "Амурская область", lat: 50.2905935, lon: 127.5272186 },
    { city: "Архангельск", region: "Архангельская область", lat: 64.5392985, lon: 40.5170083 },
    { city: "Астрахань", region: "Астраханская область", lat: 46.3655808, lon: 48.0559979 },
    { city: "Уфа", region: "Башкортостан", lat: 54.734853, lon: 55.9578647 },
    { city: "Белгород", region: "Белгородская область", lat: 50.5977351, lon: 36.5858236 },
    { city: "Брянск", region: "Брянская область", lat: 53.2420071, lon: 34.3652716 },
    { city: "Улан-Удэ", region: "Бурятия", lat: 51.8334378, lon: 107.5841511 },
    { city: "Владимир", region: "Владимирская область", lat: 56.1281561, lon: 40.4082995 },
    { city: "Волгоград", region: "Волгоградская область", lat: 48.7072005, lon: 44.5170207 },
    { city: "Вологда", region: "Вологодская область", lat: 59.2484186, lon: 39.8356461 },
    { city: "Воронеж", region: "Воронежская область", lat: 51.6592378, lon: 39.1968284 },
    { city: "Махачкала", region: "Дагестан", lat: 42.9848572, lon: 47.5046303 },
    { city: "Биробиджан", region: "Еврейская Автономная область", lat: 48.7945975, lon: 132.9217594 },
    { city: "Чита", region: "Забайкальский край", lat: 52.0340128, lon: 113.4994884 },
    { city: "Иваново", region: "Ивановская область", lat: 56.9994677, lon: 40.9728231 },
    { city: "Магас", region: "Ингушетия", lat: 43.1686967, lon: 44.8130849 },
    { city: "Иркутск", region: "Иркутская область", lat: 52.2863513, lon: 104.280655 },
    { city: "Нальчик", region: "Кабардино-Балкарская", lat: 43.4846312, lon: 43.6070316 },
    { city: "Калининград", region: "Калининградская область", lat: 54.7073218, lon: 20.5072458 },
    { city: "Элиста", region: "Калмыкия", lat: 46.3082947, lon: 44.2701417 },
    { city: "Калуга", region: "Калужская область", lat: 54.5060439, lon: 36.2515933 },
    { city: "Петропавловск-Камчатский", region: "Камчатский край", lat: 53.0370213, lon: 158.6559142 },
    { city: "Черкесск", region: "Карачаево-Черкесская", lat: 44.2268637, lon: 42.0467829 },
    { city: "Петрозаводск", region: "Карелия", lat: 61.78909, lon: 34.3596263 },
    { city: "Кемерово", region: "Кемеровская область", lat: 55.3909721, lon: 86.0467864 },
    { city: "Киров", region: "Кировская область", lat: 58.6035313, lon: 49.6679219 },
    { city: "Сыктывкар", region: "Коми", lat: 61.668789, lon: 50.8356491 },
    { city: "Кострома", region: "Костромская область", lat: 57.8029445, lon: 40.9907282 },
    { city: "Краснодар", region: "Краснодарский край", lat: 45.040235, lon: 38.9760801 },
    { city: "Красноярск", region: "Красноярский край", lat: 56.009466, lon: 92.8524162 },
    { city: "Курган", region: "Курганская область", lat: 55.4443448, lon: 65.3161339 },
    { city: "Курск", region: "Курская область", lat: 51.7303391, lon: 36.1926448 },
    { city: "Гатчина", region: "Ленинградская область", lat: 59.5650861, lon: 30.1281859 },
    { city: "Липецк", region: "Липецкая область", lat: 52.6103027, lon: 39.5946266 },
    { city: "Магадан", region: "Магаданская область", lat: 59.5681763, lon: 150.8085289 },
    { city: "Йошкар-Ола", region: "Марий Эл", lat: 56.6343763, lon: 47.8998445 },
    { city: "Саранск", region: "Мордовия", lat: 54.1807601, lon: 45.1862263 },
    { city: "Москва", region: "Москва", lat: 55.7538789, lon: 37.6203735 },
    { city: "Мурманск", region: "Мурманская область", lat: 69.0076958, lon: 33.0686019 },
    { city: "Нарьян-Мар", region: "Ненецкий автономный округ", lat: 67.6381525, lon: 53.0069336 },
    { city: "Нижний Новгород", region: "Нижегородская область", lat: 56.3242093, lon: 44.0053948 },
    { city: "Великий Новгород", region: "Новгородская область", lat: 58.5214003, lon: 31.2755051 },
    { city: "Новосибирск", region: "Новосибирская область", lat: 55.0281016, lon: 82.9210575 },
    { city: "Омск", region: "Омская область", lat: 54.9848136, lon: 73.3674638 },
    { city: "Оренбург", region: "Оренбургская область", lat: 51.7875191, lon: 55.1017379 },
    { city: "Орёл", region: "Орловская область", lat: 52.9672573, lon: 36.0696479 },
    { city: "Пенза", region: "Пензенская область", lat: 53.1753884, lon: 45.0347408 },
    { city: "Пермь", region: "Пермский край", lat: 58.0103211, lon: 56.2341778 },
    { city: "Владивосток", region: "Приморский край", lat: 43.1163807, lon: 131.882348 },
    { city: "Псков", region: "Псковская область", lat: 57.819284, lon: 28.3318188 },
    { city: "Ростов-на-Дону", region: "Ростовская область", lat: 47.2224364, lon: 39.7187866 },
    { city: "Рязань", region: "Рязанская область", lat: 54.625457, lon: 39.7359992 },
    { city: "Самара", region: "Самарская область", lat: 53.1951657, lon: 50.1067691 },
    { city: "Санкт-Петербург", region: "Санкт-Петербург", lat: 59.939125, lon: 30.3158225 },
    { city: "Саратов", region: "Саратовская область", lat: 51.530376, lon: 45.9530257 },
    { city: "Южно-Сахалинск", region: "Сахалинская область", lat: 46.959133, lon: 142.7381252 },
    { city: "Екатеринбург", region: "Свердловская область", lat: 56.8386326, lon: 60.6054887 },
    { city: "Владикавказ", region: "Северная Осетия - Алания", lat: 43.0205039, lon: 44.6819383 },
    { city: "Смоленск", region: "Смоленская область", lat: 54.7867168, lon: 31.8153366 },
    { city: "Ставрополь", region: "Ставропольский край", lat: 45.0445439, lon: 41.9690168 },
    { city: "Тамбов", region: "Тамбовская область", lat: 52.7213021, lon: 41.452258 },
    { city: "Казань", region: "Татарстан", lat: 55.7943877, lon: 49.1115312 },
    { city: "Тверь", region: "Тверская область", lat: 56.8585396, lon: 35.9117898 },
    { city: "Томск", region: "Томская область", lat: 56.4847036, lon: 84.9481737 },
    { city: "Тула", region: "Тульская область", lat: 54.192017, lon: 37.6153885 },
    { city: "Кызыл", region: "Тыва", lat: 51.7191542, lon: 94.4377234 },
    { city: "Тюмень", region: "Тюменская область", lat: 57.1530824, lon: 65.5343118 },
    { city: "Ижевск", region: "Удмуртская", lat: 56.8527444, lon: 53.2113961 },
    { city: "Ульяновск", region: "Ульяновская область", lat: 54.3080674, lon: 48.3748717 },
    { city: "Хабаровск", region: "Хабаровский край", lat: 48.4647991, lon: 135.0598811 },
    { city: "Абакан", region: "Хакасия", lat: 53.7223661, lon: 91.4437792 },
    { city: "Ханты-Мансийск", region: "Ханты-Мансийский автономный округ - Югра", lat: 61.0024344, lon: 69.0183322 },
    { city: "Челябинск", region: "Челябинская область", lat: 55.1603659, lon: 61.4007858 },
    { city: "Грозный", region: "Чеченская", lat: 43.3179243, lon: 45.6981102 },
    { city: "Чебоксары", region: "Чувашская Республика", lat: 56.1439378, lon: 47.2488718 },
    { city: "Анадырь", region: "Чукотский автономный округ", lat: 64.7314347, lon: 177.5015752 },
    { city: "Якутск", region: "Саха (Якутия)", lat: 62.0280273, lon: 129.7325717 },
    { city: "Салехард", region: "Ямало-Ненецкий автономный округ", lat: 66.5493568, lon: 66.6083994 },
    { city: "Ярославль", region: "Ярославская область", lat: 57.6216145, lon: 39.897878 }
];

// Главная функция - запускается ТОЛЬКО когда виден слайд 16
function initializeMapIfNeeded() {
    const mapElement = document.getElementById('map');
    
    if (!mapElement) {
        console.log('Карта еще не доступна');
        return false;
    }
    
    // Проверяем, виден ли слайд 16
    const slide16 = document.getElementById('slide16');
    if (!slide16 || !slide16.classList.contains('active')) {
        console.log('Слайд 16 не активен');
        return false;
    }
    
    // Проверяем, виден ли элемент карты
    const style = window.getComputedStyle(mapElement);
    if (style.display === 'none' || style.visibility === 'hidden') {
        console.log('Карта скрыта');
        return false;
    }
    
    // Если карта уже создана
    if (map) {
        console.log('Карта уже существует');
        return true;
    }
    
    // Если уже инициализируем
    if (isMapInitializing) {
        console.log('Карта уже инициализируется...');
        return false;
    }
    
    console.log('Начинаем инициализацию карты...');
    isMapInitializing = true;
    
    // Показываем загрузку
    mapElement.innerHTML = `
        <div style="
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            background: #1a1a2e;
            color: #00adb5;
            border-radius: 15px;
            padding: 20px;
            text-align: center;
        ">
            <div style="font-size: 24px; margin-bottom: 20px;">🌍</div>
            <div style="font-size: 18px; margin-bottom: 10px;">Загрузка карты России</div>
            <div style="font-size: 14px; color: #aaa;">${CITIES.length} городов</div>
            <div style="margin-top: 20px; font-size: 12px; color: #666;">
                Пожалуйста, подождите...
            </div>
        </div>
    `;
    
    // Даем время отрисоваться
    setTimeout(() => {
        try {
            createMap();
            isMapInitializing = false;
        } catch (error) {
            console.error('Ошибка создания карты:', error);
            mapElement.innerHTML = `
                <div style="
                    padding: 30px;
                    text-align: center;
                    color: white;
                    background: #ff4444;
                    border-radius: 10px;
                    margin: 20px;
                ">
                    <h3>Ошибка загрузки карты</h3>
                    <p>${error.message}</p>
                    <button onclick="location.reload()" style="
                        background: white;
                        color: #ff4444;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        margin-top: 15px;
                        cursor: pointer;
                    ">
                        Обновить страницу
                    </button>
                </div>
            `;
            isMapInitializing = false;
        }
    }, 100);
    
    return true;
}

// Создание карты
function createMap() {
    console.log('Создаем карту Leaflet...');
    
    const mapElement = document.getElementById('map');
    
    // Создаем карту
    map = L.map('map', {
        preferCanvas: true, // Для производительности
        zoomControl: true
    }).setView([61.5240, 105.3188], 3);
    
    // Добавляем слой карты
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19
    }).addTo(map);
    
    console.log('Карта создана, добавляем города...');
    
    // Добавляем города
    addCitiesToMap();
    
    // Инициализируем калькулятор
    setupCalculator();
    
    console.log('✅ Карта готова!');
}

// Добавление городов
function addCitiesToMap() {
    console.log(`Добавляем ${CITIES.length} городов...`);
    
    // Создаем группу для маркеров
    const markers = L.layerGroup();
    
    CITIES.forEach(city => {
        const marker = L.marker([city.lat, city.lon])
            .bindPopup(`
                <div style="font-family: Arial, sans-serif; min-width: 180px;">
                    <div style="font-weight: bold; color: #00adb5; font-size: 14px;">
                        ${city.city}
                    </div>
                    <div style="color: #666; font-size: 12px; margin: 5px 0;">
                        ${city.region}
                    </div>
                    <div style="color: #888; font-size: 11px;">
                        ${city.lat.toFixed(4)}°, ${city.lon.toFixed(4)}°
                    </div>
                </div>
            `)
            .bindTooltip(city.city, {
                permanent: false,
                direction: 'top'
            });
        
        markers.addLayer(marker);
    });
    
    markers.addTo(map);
    console.log(`✅ Добавлено ${CITIES.length} городов`);
}

// Настройка калькулятора
function setupCalculator() {
    console.log('Настраиваем калькулятор...');
    
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const resultDiv = document.getElementById('result');
    
    if (!city1Select || !city2Select) {
        console.log('Калькулятор не найден на этой странице');
        return;
    }
    
    // Заполняем списки
    city1Select.innerHTML = '<option value="">Выберите город...</option>';
    city2Select.innerHTML = '<option value="">Выберите город...</option>';
    
    CITIES.forEach(city => {
        const option = new Option(`${city.city} (${city.region})`, city.city);
        city1Select.add(option.cloneNode(true));
        city2Select.add(option);
    });
    
    // Переменные для хранения элементов на карте
    let routeMarkers = [];
    let routeLine = null;
    
    // Функция расчета расстояния
    function calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Радиус Земли
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
    
    // Очистка маршрута
    function clearRoute() {
        routeMarkers.forEach(marker => map.removeLayer(marker));
        routeMarkers = [];
        
        if (routeLine) {
            map.removeLayer(routeLine);
            routeLine = null;
        }
    }
    
    // Отрисовка маршрута
    function drawRoute(city1, city2, distance) {
        clearRoute();
        
        // Маркеры для выбранных городов
        const marker1 = L.marker([city1.lat, city1.lon], {
            icon: L.divIcon({
                html: '<div style="color: #00fff5; font-size: 28px;">📍</div>',
                iconSize: [32, 32],
                className: 'selected-city'
            })
        })
        .addTo(map)
        .bindPopup(`<b>${city1.city}</b><br>${city1.region}`);
        
        const marker2 = L.marker([city2.lat, city2.lon], {
            icon: L.divIcon({
                html: '<div style="color: #00fff5; font-size: 28px;">📍</div>',
                iconSize: [32, 32],
                className: 'selected-city'
            })
        })
        .addTo(map)
        .bindPopup(`<b>${city2.city}</b><br>${city2.region}`);
        
        routeMarkers = [marker1, marker2];
        
        // Линия между городами
        routeLine = L.polyline([
            [city1.lat, city1.lon],
            [city2.lat, city2.lon]
        ], {
            color: '#00fff5',
            weight: 4,
            opacity: 0.8,
            dashArray: null
        }).addTo(map);
        
        // Центрируем карту
        const bounds = L.latLngBounds([
            [city1.lat, city1.lon],
            [city2.lat, city2.lon]
        ]);
        map.fitBounds(bounds, { padding: [50, 50] });
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
        
        const city1 = CITIES.find(c => c.city === city1Name);
        const city2 = CITIES.find(c => c.city === city2Name);
        
        if (city1 && city2) {
            const distance = calculateDistance(city1.lat, city1.lon, city2.lat, city2.lon);
            
            // Отрисовываем на карте
            drawRoute(city1, city2, distance);
            
            // Показываем результат
            resultDiv.innerHTML = `
                <div style="text-align: center; padding: 10px;">
                    <div style="font-size: 32px; font-weight: bold; color: #00fff5;">
                        ${distance.toLocaleString('ru-RU')} км
                    </div>
                    <div style="font-size: 16px; margin-top: 8px;">
                        ${city1.city} → ${city2.city}
                    </div>
                    <div style="font-size: 12px; color: #888; margin-top: 5px;">
                        Ортодромное расстояние
                    </div>
                </div>
            `;
            
            console.log(`Расстояние: ${city1.city} → ${city2.city} = ${distance} км`);
        }
    });
    
    // Обработчик кнопки "Очистить"
    clearBtn.addEventListener('click', function() {
        city1Select.value = '';
        city2Select.value = '';
        resultDiv.innerHTML = 'Выберите два города';
        clearRoute();
        
        // Возвращаем исходный вид карты
        if (map) {
            map.setView([61.5240, 105.3188], 3);
        }
    });
    
    console.log('✅ Калькулятор настроен');
}

// ============================================
// ГЛАВНЫЙ ЗАПУСК
// ============================================

// 1. Ждем загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен');
    
    // 2. Периодически проверяем, нужно ли создать карту
    const checkInterval = setInterval(() => {
        if (initializeMapIfNeeded()) {
            clearInterval(checkInterval);
            console.log('Карта инициализирована!');
        }
    }, 1000); // Проверяем каждую секунду
    
    // 3. Также проверяем при клике на навигацию
    document.addEventListener('click', function(e) {
        if (e.target.closest('.nav-link') || e.target.closest('#next') || e.target.closest('#prev')) {
            // Ждем немного, чтобы слайд успел переключиться
            setTimeout(() => {
                if (!map) {
                    initializeMapIfNeeded();
                }
            }, 300);
        }
    });
});

// 4. Также проверяем при изменении видимости слайдов
const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'class') {
            const slide16 = document.getElementById('slide16');
            if (slide16 && slide16.classList.contains('active') && !map) {
                setTimeout(initializeMapIfNeeded, 500);
            }
        }
    });
});

// 5. Начинаем наблюдение, когда DOM загружен
document.addEventListener('DOMContentLoaded', function() {
    const slide16 = document.getElementById('slide16');
    if (slide16) {
        observer.observe(slide16, { attributes: true });
    }
});

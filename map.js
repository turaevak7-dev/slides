console.log('map.js загружен');

const cities = [
    {"city":"Майкоп","region":"Адыгея","latitude":44.6098268,"longitude":40.1006527},
    {"city":"Горно-Алтайск","region":"Алтай","latitude":51.9582681,"longitude":85.9602957},
    {"city":"Барнаул","region":"Алтайский край","latitude":53.3481145,"longitude":83.7798362},
    {"city":"Благовещенск","region":"Амурская область","latitude":50.2905935,"longitude":127.5272186},
    {"city":"Архангельск","region":"Архангельская область","latitude":64.5392985,"longitude":40.5170083},
    {"city":"Астрахань","region":"Астраханская область","latitude":46.3655808,"longitude":48.0559979},
    {"city":"Уфа","region":"Башкортостан","latitude":54.734853,"longitude":55.9578647},
    {"city":"Белгород","region":"Белгородская область","latitude":50.5977351,"longitude":36.5858236},
    {"city":"Брянск","region":"Брянская область","latitude":53.2420071,"longitude":34.3652716},
    {"city":"Улан-Удэ","region":"Бурятия","latitude":51.8334378,"longitude":107.5841511},
    {"city":"Владимир","region":"Владимирская область","latitude":56.1281561,"longitude":40.4082995},
    {"city":"Волгоград","region":"Волгоградская область","latitude":48.7072005,"longitude":44.5170207},
    {"city":"Вологда","region":"Вологодская область","latitude":59.2484186,"longitude":39.8356461},
    {"city":"Воронеж","region":"Воронежская область","latitude":51.6592378,"longitude":39.1968284},
    {"city":"Махачкала","region":"Дагестан","latitude":42.9848572,"longitude":47.5046303},
    {"city":"Биробиджан","region":"Еврейская Автономная область","latitude":48.7945975,"longitude":132.9217594},
    {"city":"Чита","region":"Забайкальский край","latitude":52.0340128,"longitude":113.4994884},
    {"city":"Иваново","region":"Ивановская область","latitude":56.9994677,"longitude":40.9728231},
    {"city":"Магас","region":"Ингушетия","latitude":43.1686967,"longitude":44.8130849},
    {"city":"Иркутск","region":"Иркутская область","latitude":52.2863513,"longitude":104.280655},
    {"city":"Нальчик","region":"Кабардино-Балкарская","latitude":43.4846312,"longitude":43.6070316},
    {"city":"Калининград","region":"Калининградская область","latitude":54.7073218,"longitude":20.5072458},
    {"city":"Элиста","region":"Калмыкия","latitude":46.3082947,"longitude":44.2701417},
    {"city":"Калуга","region":"Калужская область","latitude":54.5060439,"longitude":36.2515933},
    {"city":"Петропавловск-Камчатский","region":"Камчатский край","latitude":53.0370213,"longitude":158.6559142},
    {"city":"Черкесск","region":"Карачаево-Черкесская","latitude":44.2268637,"longitude":42.0467829},
    {"city":"Петрозаводск","region":"Карелия","latitude":61.78909,"longitude":34.3596263},
    {"city":"Кемерово","region":"Кемеровская область","latitude":55.3909721,"longitude":86.0467864},
    {"city":"Киров","region":"Кировская область","latitude":58.6035313,"longitude":49.6679219},
    {"city":"Сыктывкар","region":"Коми","latitude":61.668789,"longitude":50.8356491},
    {"city":"Кострома","region":"Костромская область","latitude":57.8029445,"longitude":40.9907282},
    {"city":"Краснодар","region":"Краснодарский край","latitude":45.040235,"longitude":38.9760801},
    {"city":"Красноярск","region":"Красноярский край","latitude":56.009466,"longitude":92.8524162},
    {"city":"Курган","region":"Курганская область","latitude":55.4443448,"longitude":65.3161339},
    {"city":"Курск","region":"Курская область","latitude":51.7303391,"longitude":36.1926448},
    {"city":"Санкт-Петербург","region":"Ленинградская область","latitude":59.939125,"longitude":30.3158225},
    {"city":"Липецк","region":"Липецкая область","latitude":52.6103027,"longitude":39.5946266},
    {"city":"Магадан","region":"Магаданская область","latitude":59.5681763,"longitude":150.8085289},
    {"city":"Йошкар-Ола","region":"Марий Эл","latitude":56.6343763,"longitude":47.8998445},
    {"city":"Саранск","region":"Мордовия","latitude":54.1807601,"longitude":45.1862263},
    {"city":"Москва","region":"Москва","latitude":55.7558,"longitude":37.6173},
    {"city":"Москва","region":"Московская область","latitude":55.7538789,"longitude":37.6203735},
    {"city":"Мурманск","region":"Мурманская область","latitude":68.9585,"longitude":33.0827},
    {"city":"Нарьян-Мар","region":"Ненецкий автономный округ","latitude":67.6381525,"longitude":53.0069336},
    {"city":"Нижний Новгород","region":"Нижегородская область","latitude":56.3269,"longitude":44.0059},
    {"city":"Великий Новгород","region":"Новгородская область","latitude":58.5256,"longitude":31.2741},
    {"city":"Новосибирск","region":"Новосибирская область","latitude":55.0302,"longitude":82.9204},
    {"city":"Омск","region":"Омская область","latitude":54.9885,"longitude":73.3242},
    {"city":"Оренбург","region":"Оренбургская область","latitude":51.7682,"longitude":55.0970},
    {"city":"Орёл","region":"Орловская область","latitude":52.9703,"longitude":36.0635},
    {"city":"Пенза","region":"Пензенская область","latitude":53.1955,"longitude":45.0187},
    {"city":"Пермь","region":"Пермский край","latitude":58.0104,"longitude":56.2294},
    {"city":"Владивосток","region":"Приморский край","latitude":43.1155,"longitude":131.8855},
    {"city":"Псков","region":"Псковская область","latitude":57.8193,"longitude":28.3326},
    {"city":"Ростов-на-Дону","region":"Ростовская область","latitude":47.2221,"longitude":39.7203},
    {"city":"Рязань","region":"Рязанская область","latitude":54.6269,"longitude":39.6916},
    {"city":"Самара","region":"Самарская область","latitude":53.1955,"longitude":50.1018},
    {"city":"Саратов","region":"Саратовская область","latitude":51.5331,"longitude":46.0342},
    {"city":"Южно-Сахалинск","region":"Сахалинская область","latitude":46.9591,"longitude":142.7381},
    {"city":"Екатеринбург","region":"Свердловская область","latitude":56.8380,"longitude":60.5975},
    {"city":"Владикавказ","region":"Северная Осетия - Алания","latitude":43.0205,"longitude":44.6819},
    {"city":"Смоленск","region":"Смоленская область","latitude":54.7826,"longitude":32.0453},
    {"city":"Ставрополь","region":"Ставропольский край","latitude":45.0445,"longitude":41.9690},
    {"city":"Тамбов","region":"Тамбовская область","latitude":52.7213,"longitude":41.4523},
    {"city":"Казань","region":"Татарстан","latitude":55.7964,"longitude":49.1089},
    {"city":"Тверь","region":"Тверская область","latitude":56.8596,"longitude":35.9119},
    {"city":"Томск","region":"Томская область","latitude":56.4847,"longitude":84.9482},
    {"city":"Тула","region":"Тульская область","latitude":54.1930,"longitude":37.6178},
    {"city":"Кызыл","region":"Тыва","latitude":51.7191542,"longitude":94.4377234},
    {"city":"Тюмень","region":"Тюменская область","latitude":57.1522,"longitude":65.5272},
    {"city":"Ижевск","region":"Удмуртия","latitude":56.8527,"longitude":53.2114},
    {"city":"Ульяновск","region":"Ульяновская область","latitude":54.3142,"longitude":48.4031},
    {"city":"Хабаровск","region":"Хабаровский край","latitude":48.4827,"longitude":135.0838},
    {"city":"Абакан","region":"Хакасия","latitude":53.7223661,"longitude":91.4437792},
    {"city":"Ханты-Мансийск","region":"Ханты-Мансийский АО — Югра","latitude":61.0024344,"longitude":69.0183322},
    {"city":"Челябинск","region":"Челябинская область","latitude":55.1599,"longitude":61.4026},
    {"city":"Грозный","region":"Чеченская Республика","latitude":43.3179,"longitude":45.6981},
    {"city":"Чебоксары","region":"Чувашия","latitude":56.1439,"longitude":47.2489},
    {"city":"Анадырь","region":"Чукотский автономный округ","latitude":64.7314347,"longitude":177.5015752},
    {"city":"Якутск","region":"Саха (Якутия)","latitude":62.0278,"longitude":129.7042},
    {"city":"Салехард","region":"Ямало-Ненецкий автономный округ","latitude":66.5493568,"longitude":66.6083994},
    {"city":"Ярославль","region":"Ярославская область","latitude":57.6266,"longitude":39.8938},
    {"city":"Севастополь","region":"Севастополь","latitude":44.6167,"longitude":33.5254},
    {"city":"Симферополь","region":"Республика Крым","latitude":45.0402,"longitude":34.0059}
];

console.log(` Загружено ${cities.length} городов России`);

let map = null;
let currentMarkers = [];
let currentLine = null;

function initCalculator() {
    console.log(' Инициализация калькулятора...');
    
    const city1 = document.getElementById('city1');
    const city2 = document.getElementById('city2');
    
    if (!city1 || !city2) {
        console.error('Элементы калькулятора не найдены!');
        return;
    }
 
    fillSelect(city1);
    fillSelect(city2);
   
    document.getElementById('calculate').addEventListener('click', calculate);
    document.getElementById('clear').addEventListener('click', clearAll);
    
    console.log('Калькулятор готов!');
}

function fillSelect(select) {
    console.log(`Заполняю select: ${select.id}`);
   
    select.innerHTML = '<option value="">Выберите город...</option>';
   
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.city; // Сохраняем название города
        option.textContent = `${city.city} (${city.region})`;
        select.appendChild(option);
    });
    
    console.log(`Добавлено ${cities.length} городов в ${select.id}`);
}

function initMap() {
    console.log(' Инициализация карты...');
    
    const mapElement = document.getElementById('map');
    if (!mapElement) {
        console.error('Элемент #map не найден!');
        return;
    }
    
    try {
        // Создаем карту
        map = L.map('map').setView([61.5240, 105.3188], 3);
        
        // Добавляем тайлы
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 19
        }).addTo(map);
        
        console.log('Карта создана');
        
        // Добавляем города на карту
        addCitiesToMap();
        
        window.map = map; // Для отладки
        
    } catch (error) {
        console.error('Ошибка карты:', error);
    }
}

function addCitiesToMap() {
    console.log(`Добавляю ${cities.length} городов на карту...`);
    
    cities.forEach(city => {
        L.marker([city.latitude, city.longitude])
            .addTo(map)
            .bindPopup(`<b>${city.city}</b><br>${city.region}`);
    });
}

function calculate() {
    console.log(' Рассчитываю расстояние...');
    
    const city1Name = document.getElementById('city1').value;
    const city2Name = document.getElementById('city2').value;
    const resultDiv = document.getElementById('result');

    if (!city1Name || !city2Name) {
        resultDiv.innerHTML = '<span style="color:red;">Выберите оба города!</span>';
        return;
    }
    
    if (city1Name === city2Name) {
        resultDiv.innerHTML = '<span style="color:red;">Выберите разные города!</span>';
        return;
    }
   
    const city1 = cities.find(c => c.city === city1Name);
    const city2 = cities.find(c => c.city === city2Name);
    
    if (!city1 || !city2) {
        resultDiv.innerHTML = '<span style="color:red;">Город не найден!</span>';
        return;
    }

    const distance = getDistance(city1, city2);
   
    resultDiv.innerHTML = `
        <div style="text-align:center;">
            <div style="font-size:36px;color:#ff5722;font-weight:bold;">
                ${distance.toLocaleString('ru-RU')} км
            </div>
            <div style="font-size:16px;margin-top:10px;">
                ${city1.city} → ${city2.city}
            </div>
        </div>
    `;
 
    if (map) {
        drawRouteOnMap(city1, city2, distance);
    } else {
        console.log('Карта еще не создана, сохраняем данные для отрисовки');
        // Сохраняем данные, чтобы отрисовать когда карта появится
        window.pendingRoute = { city1, city2, distance };
    }
}

function getDistance(city1, city2) {
    const R = 6371;
    const lat1 = city1.latitude * Math.PI / 180;
    const lat2 = city2.latitude * Math.PI / 180;
    const dLat = (city2.latitude - city1.latitude) * Math.PI / 180;
    const dLon = (city2.longitude - city1.longitude) * Math.PI / 180;
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) * 
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return Math.round(R * c);
}

function drawRouteOnMap(city1, city2, distance) {
 
    clearRoute();
 
    const marker1 = L.marker([city1.latitude, city1.longitude], {
        icon: L.divIcon({
            html: '<div style="background:red;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;border:3px solid white;">A</div>',
            iconSize: [35, 35]
        })
    }).addTo(map);
    
    const marker2 = L.marker([city2.latitude, city2.longitude], {
        icon: L.divIcon({
            html: '<div style="background:blue;color:white;border-radius:50%;width:35px;height:35px;display:flex;align-items:center;justify-content:center;font-weight:bold;border:3px solid white;">B</div>',
            iconSize: [35, 35]
        })
    }).addTo(map);
    
    currentMarkers = [marker1, marker2];

    currentLine = L.polyline([
        [city1.latitude, city1.longitude],
        [city2.latitude, city2.longitude]
    ], {
        color: 'red',
        weight: 4,
        opacity: 0.8
    }).addTo(map);
    
    const midLat = (city1.latitude + city2.latitude) / 2;
    const midLon = (city1.longitude + city2.longitude) / 2;
    
    const label = L.marker([midLat, midLon], {
        icon: L.divIcon({
            html: `<div style="background:rgba(255,0,0,0.9);color:white;padding:8px 12px;border-radius:10px;font-weight:bold;border:2px solid white;">${distance} км</div>`,
            iconSize: [null, null]
        })
    }).addTo(map);
    
    currentMarkers.push(label);
   
    const bounds = L.latLngBounds([
        [city1.latitude, city1.longitude],
        [city2.latitude, city2.longitude]
    ]);
    map.fitBounds(bounds, { padding: [50, 50] });
}

function clearRoute() {
    currentMarkers.forEach(marker => {
        if (marker && map.hasLayer(marker)) {
            map.removeLayer(marker);
        }
    });
    currentMarkers = [];
    
    if (currentLine && map.hasLayer(currentLine)) {
        map.removeLayer(currentLine);
        currentLine = null;
    }
}

function clearAll() {
    document.getElementById('city1').value = '';
    document.getElementById('city2').value = '';
    document.getElementById('result').innerHTML = 'Выберите два города';
 
    if (map) {
        clearRoute();
        map.setView([61.5240, 105.3188], 3);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log(' Документ загружен');

    initCalculator();
  
    function checkSlide() {
        const activeSlide = document.querySelector('.slide.active');
        
        if (activeSlide) {
            if (activeSlide.id === 'slide15') {
                console.log(' Активен слайд с калькулятором');
                // Проверим что списки заполнены
                const city1 = document.getElementById('city1');
                if (city1 && city1.options.length <= 1) {
                    console.log('Перезаполняю списки...');
                    fillSelect(city1);
                    fillSelect(document.getElementById('city2'));
                }
            }
            if (activeSlide.id === 'slide16' && !map) {
                console.log(' Перешли на слайд с картой');
                setTimeout(initMap, 300);
             
                if (window.pendingRoute) {
                    setTimeout(() => {
                        drawRouteOnMap(
                            window.pendingRoute.city1,
                            window.pendingRoute.city2,
                            window.pendingRoute.distance
                        );
                        window.pendingRoute = null;
                    }, 500);
                }
            }
        }
    }
    checkSlide();
    
    const observer = new MutationObserver(function() {
        checkSlide();
    });
    
    const container = document.querySelector('.slides-container');
    if (container) {
        observer.observe(container, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
});

window.initMap = initMap;
window.initCalculator = initCalculator;
window.calculate = calculate;
window.clearAll = clearAll;


// Глобальные переменные
let map;
let markers = [];
let currentLine = null;
let selectedCity1 = null;
let selectedCity2 = null;

// Проверка загрузки данных о городах
if (typeof cities === 'undefined') {
    console.error('Файл cities.js не загружен или переменная cities не определена!');
    // Создаем пустой массив для предотвращения ошибок
    var cities = [];
}

// Инициализация карты
function initMap() {
    console.log("Инициализация карты России...");
    console.log("Загружено городов: ", cities.length);
    
    // Проверяем, есть ли данные
    if (!cities || cities.length === 0) {
        console.error("Нет данных о городах!");
        showErrorMessage();
        return;
    }
    
    // Создаем карту (центр России)
    map = L.map('map').setView([61.5240, 105.3188], 3);
    
    // Добавляем слой карты (темная тема)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '©OpenStreetMap, ©CartoDB',
        maxZoom: 19,
        subdomains: 'abcd'
    }).addTo(map);
    
    // Добавляем города на карту
    addCitiesToMap();
    
    console.log("Карта успешно загружена!");
}

// Показать сообщение об ошибке
function showErrorMessage() {
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div class="error-message">
                <h3>Ошибка загрузки данных</h3>
                <p>Не удалось загрузить данные о городах.</p>
                <p>Проверьте наличие файла cities.js</p>
            </div>
        `;
    }
}

// Добавление городов на карту
function addCitiesToMap() {
    // Очищаем старые маркеры
    markers.forEach(marker => map.removeLayer(marker));
    markers = [];
    
    // Добавляем каждый город
    cities.forEach((city, index) => {
        const latitude = parseFloat(city.latitude);
        const longitude = parseFloat(city.longitude);
        
        // Проверяем корректность координат
        if (isNaN(latitude) || isNaN(longitude)) {
            console.warn(`Некорректные координаты для города ${city.city}: ${latitude}, ${longitude}`);
            return;
        }
        
        // Определяем размер маркера
        const isCapital = city.region.includes(city.city) || 
                         city.city === "Москва" || 
                         city.city === "Санкт-Петербург";
        const radius = isCapital ? 8 : 6;
        
        // Создаем маркер (кружок)
        const marker = L.circleMarker([latitude, longitude], {
            radius: radius,
            fillColor: getRegionColor(city.region),
            color: '#ffffff',
            weight: 1.5,
            opacity: 1,
            fillOpacity: 0.8
        });
        
        // Текст для popup
        const text = `
            <div style="min-width: 200px; font-family: Arial, sans-serif;">
                <h3 style="color: #00adb5; margin: 0 0 10px;">
                    ${city.city}
                </h3>
                <p><strong>Регион:</strong> ${city.region}</p>
                <p><strong>Координаты:</strong><br>
                ${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°</p>
                <div style="margin-top: 15px;">
                    <button onclick="selectCityFromMap(${index}, 1)" style="
                        background: #00adb5;
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        width: 100%;
                        margin-bottom: 5px;
                    ">Выбрать как город 1</button>
                    <button onclick="selectCityFromMap(${index}, 2)" style="
                        background: #ff5722;
                        color: white;
                        border: none;
                        padding: 8px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        width: 100%;
                    ">Выбрать как город 2</button>
                </div>
            </div>
        `;
        
        // Привязываем popup
        marker.bindPopup(text);
        
        // Добавляем tooltip при наведении
        marker.bindTooltip(city.city, {
            permanent: false,
            direction: 'top'
        });
        
        // Добавляем на карту
        marker.addTo(map);
        markers.push(marker);
    });
}

// Получение цвета для региона
function getRegionColor(region) {
    const colors = [
        '#00adb5', '#00fff5', '#ff5722', '#ff9800',
        '#8bc34a', '#9c27b0', '#2196f3', '#ffeb3b',
        '#e91e63', '#009688', '#3f51b5', '#795548'
    ];
    const hash = region.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
}

// Расчет расстояния между двумя точками
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радиус Земли в км
    
    const toRad = (deg) => deg * Math.PI / 180;
    
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    
    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return Math.round(distance);
}

// Выбор города с карты
function selectCityFromMap(cityIndex, position) {
    const city = cities[cityIndex];
    if (!city) return;
    
    // Обновляем выпадающий список в калькуляторе
    updateCitySelect(cityIndex, position);
    
    // Сохраняем выбранный город
    if (position === 1) {
        selectedCity1 = {index: cityIndex, ...city};
    } else {
        selectedCity2 = {index: cityIndex, ...city};
    }
    
    // Подсвечиваем выбранный город
    highlightSelectedCity(cityIndex, position);
    
    // Автоматически рассчитываем расстояние
    if (selectedCity1 && selectedCity2) {
        calculateDistanceBetweenCities();
    }
}

// Обновление выпадающего списка
function updateCitySelect(cityIndex, position) {
    const select = document.getElementById(`city${position}`);
    if (select) {
        select.value = cityIndex;
    }
}

// Подсветка выбранного города
function highlightSelectedCity(cityIndex, position) {
    // Сбрасываем предыдущее выделение для этой позиции
    markers.forEach((marker, idx) => {
        const city = cities[idx];
        if (city) {
            const isCapital = city.region.includes(city.city) || 
                            city.city === "Москва" || 
                            city.city === "Санкт-Петербург";
            
            // Проверяем, не выбран ли этот город для другой позиции
            const isOtherSelected = (position === 1 && selectedCity2 && selectedCity2.index === idx) ||
                                   (position === 2 && selectedCity1 && selectedCity1.index === idx);
            
            if (isOtherSelected) {
                // Город выбран для другой позиции
                const otherPosition = position === 1 ? 2 : 1;
                marker.setStyle({
                    fillColor: otherPosition === 1 ? '#00adb5' : '#ff5722',
                    radius: 10,
                    weight: 3
                });
            } else if (idx === cityIndex) {
                // Это выбранный город
                marker.setStyle({
                    fillColor: position === 1 ? '#00adb5' : '#ff5722',
                    radius: 10,
                    weight: 3
                });
            } else {
                // Не выбранный город
                marker.setStyle({
                    fillColor: getRegionColor(city.region),
                    radius: isCapital ? 8 : 6,
                    weight: 1.5
                });
            }
        }
    });
}

// Инициализация калькулятора
function setupCalculator() {
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    
    if (city1Select && city2Select) {
        // Заполняем выпадающие списки
        fillCitySelect(city1Select);
        fillCitySelect(city2Select);
        
        // Устанавливаем обработчики событий
        setupEventListeners();
    }
}

// Заполнение выпадающего списка
function fillCitySelect(select) {
    select.innerHTML = '<option value="">Выберите город</option>';
    cities.forEach((city, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${city.city} (${city.region})`;
        select.appendChild(option);
    });
}

// Настройка обработчиков событий
function setupEventListeners() {
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    
    // Обработчики для выпадающих списков
    city1Select.addEventListener('change', function() {
        if (this.value !== "") {
            const cityIndex = parseInt(this.value);
            selectCityFromDropdown(cityIndex, 1);
        } else {
            selectedCity1 = null;
            resetCityHighlight(1);
            clearResult();
        }
    });
    
    city2Select.addEventListener('change', function() {
        if (this.value !== "") {
            const cityIndex = parseInt(this.value);
            selectCityFromDropdown(cityIndex, 2);
        } else {
            selectedCity2 = null;
            resetCityHighlight(2);
            clearResult();
        }
    });
    
    // Кнопка расчета
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateDistanceBetweenCities);
    }
    
    // Кнопка очистки
    if (clearBtn) {
        clearBtn.addEventListener('click', clearAllSelection);
    }
}

// Выбор города из выпадающего списка
function selectCityFromDropdown(cityIndex, position) {
    const city = cities[cityIndex];
    if (!city) return;
    
    if (position === 1) {
        selectedCity1 = {index: cityIndex, ...city};
    } else {
        selectedCity2 = {index: cityIndex, ...city};
    }
    
    highlightSelectedCity(cityIndex, position);
    
    // Автоматически рассчитываем расстояние
    if (selectedCity1 && selectedCity2) {
        calculateDistanceBetweenCities();
    }
}

// Сброс подсветки города
function resetCityHighlight(position) {
    markers.forEach((marker, idx) => {
        const city = cities[idx];
        if (city) {
            const isCapital = city.region.includes(city.city) || 
                            city.city === "Москва" || 
                            city.city === "Санкт-Петербург";
            
            // Проверяем, не выбран ли этот город для другой позиции
            const isOtherSelected = (position === 1 && selectedCity2 && selectedCity2.index === idx) ||
                                   (position === 2 && selectedCity1 && selectedCity1.index === idx);
            
            if (!isOtherSelected) {
                marker.setStyle({
                    fillColor: getRegionColor(city.region),
                    radius: isCapital ? 8 : 6,
                    weight: 1.5
                });
            }
        }
    });
}

// Расчет расстояния между городами
function calculateDistanceBetweenCities() {
    if (!selectedCity1 || !selectedCity2) {
        showResult('Выберите оба города!', true);
        return;
    }
    
    const lat1 = parseFloat(selectedCity1.latitude);
    const lon1 = parseFloat(selectedCity1.longitude);
    const lat2 = parseFloat(selectedCity2.latitude);
    const lon2 = parseFloat(selectedCity2.longitude);
    
    const distance = calculateDistance(lat1, lon1, lat2, lon2);
    
    // Показываем результат
    showResult(distance);
    
    // Рисуем линию на карте
    drawLineOnMap(selectedCity1, selectedCity2, distance);
}

// Показать результат
function showResult(distance, isError = false) {
    const resultDiv = document.getElementById('result');
    if (!resultDiv) return;
    
    if (isError) {
        resultDiv.innerHTML = `<span style="color: #ff5722;">${distance}</span>`;
        return;
    }
    
    resultDiv.innerHTML = `
        <div style="font-size: 1.2em; margin-bottom: 10px;">
            <strong>${selectedCity1.city}</strong> → <strong>${selectedCity2.city}</strong>
        </div>
        <div style="font-size: 2.5em; color: #00fff5; font-weight: bold;">
            ${distance.toLocaleString()} км
        </div>
        <div style="color: #b0b0b0; margin-top: 10px; font-size: 0.9em;">
            Ортодромное расстояние
        </div>
    `;
}

// Очистить результат
function clearResult() {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = 'Выберите два города';
    }
}

// Рисование линии на карте
function drawLineOnMap(city1, city2, distance) {
    // Удаляем старую линию
    if (currentLine) {
        map.removeLayer(currentLine);
        currentLine = null;
    }
    
    const lat1 = parseFloat(city1.latitude);
    const lon1 = parseFloat(city1.longitude);
    const lat2 = parseFloat(city2.latitude);
    const lon2 = parseFloat(city2.longitude);
    
    const pointA = [lat1, lon1];
    const pointB = [lat2, lon2];
    
    currentLine = L.polyline([pointA, pointB], {
        color: '#00fff5',
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);
    
    // Центрируем карту
    const bounds = L.latLngBounds(pointA, pointB);
    map.fitBounds(bounds, { padding: [100, 100] });
}

// Очистка всего выбора
function clearAllSelection() {
    // Очищаем выпадающие списки
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    
    if (city1Select) city1Select.value = "";
    if (city2Select) city2Select.value = "";
    
    // Очищаем выбранные города
    selectedCity1 = null;
    selectedCity2 = null;
    
    // Очищаем результат
    clearResult();
    
    // Удаляем линию
    if (currentLine) {
        map.removeLayer(currentLine);
        currentLine = null;
    }
    
    // Сбрасываем подсветку всех маркеров
    markers.forEach((marker, idx) => {
        const city = cities[idx];
        if (city) {
            const isCapital = city.region.includes(city.city) || 
                            city.city === "Москва" || 
                            city.city === "Санкт-Петербург";
            marker.setStyle({
                fillColor: getRegionColor(city.region),
                radius: isCapital ? 8 : 6,
                weight: 1.5
            });
        }
    });
    
    // Возвращаем карту к общему виду
    if (map && markers.length > 0) {
        const markersLayer = L.featureGroup(markers);
        map.fitBounds(markersLayer.getBounds(), { padding: [50, 50] });
    }
}

// Проверка и инициализация карты
function checkAndInitMap() {
    const mapElement = document.getElementById('map');
    if (mapElement && mapElement.offsetParent !== null && !map) {
        setTimeout(() => {
            if (typeof cities !== 'undefined' && cities.length > 0) {
                initMap();
                setupCalculator(); // Настраиваем калькулятор тоже
            }
        }, 100);
    }
}

// Экспортируем функции
window.selectCityFromMap = selectCityFromMap;
window.checkAndInitMap = checkAndInitMap;
window.setupCalculator = setupCalculator;

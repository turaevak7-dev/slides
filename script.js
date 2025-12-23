// Основной скрипт презентации
document.addEventListener('DOMContentLoaded', function() {
    console.log("Презентация загружается...");
    
    // Инициализация переменных
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    // Элементы навигации
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const navToggle = document.getElementById('navToggle');
    const sideNav = document.getElementById('sideNav');
    const navLinks = document.querySelectorAll('.nav-link');
    const currentSpan = document.getElementById('current');
    const totalSpan = document.getElementById('total');
    
    // Инициализация
    totalSpan.textContent = totalSlides;
    updateSlideCounter();
    populateCitySelects();
    
    // Навигация по слайдам
    function goToSlide(n) {
        // Проверяем границы
        if (n < 0) n = totalSlides - 1;
        if (n >= totalSlides) n = 0;
        
        // Скрываем текущий слайд
        slides[currentSlide].classList.remove('active');
        slides[currentSlide].classList.add('prev');
        
        // Показываем новый слайд
        currentSlide = n;
        slides[currentSlide].classList.remove('prev');
        slides[currentSlide].classList.add('active');
        
        // Обновляем счетчик
        updateSlideCounter();
        
        // Если перешли на слайд с картой, инициализируем карту
        if (currentSlide === 15) { // Слайд с картой
            setTimeout(() => {
                if (typeof initMap === 'function') {
                    initMap();
                }
            }, 300);
        }
    }
    
    // Обновление счетчика слайдов
    function updateSlideCounter() {
        currentSpan.textContent = currentSlide + 1;
        updateNavLinks();
    }
    
    // Обновление активной ссылки в навигации
    function updateNavLinks() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const targetSlide = parseInt(link.getAttribute('href').replace('#slide', ''));
            if (targetSlide === currentSlide) {
                link.classList.add('active');
            }
        });
    }
    
    // Заполнение выпадающих списков городов
    function populateCitySelects() {
        const city1Select = document.getElementById('city1');
        const city2Select = document.getElementById('city2');
        
        if (!city1Select || !city2Select) return;
        
        // Очищаем списки
        city1Select.innerHTML = '<option value="">Выберите...</option>';
        city2Select.innerHTML = '<option value="">Выберите...</option>';
        
        // Добавляем города
        citiesData.forEach(city => {
            const option1 = document.createElement('option');
            option1.value = city.id;
            option1.textContent = city.name;
            
            const option2 = document.createElement('option');
            option2.value = city.id;
            option2.textContent = city.name;
            
            city1Select.appendChild(option1);
            city2Select.appendChild(option2);
        });
    }
    
    // Расчет расстояния между городами
    function calculateDistanceBetweenCities() {
        const city1Select = document.getElementById('city1');
        const city2Select = document.getElementById('city2');
        const resultDiv = document.getElementById('result');
        
        if (!city1Select || !city2Select || !resultDiv) return;
        
        const city1Id = parseInt(city1Select.value);
        const city2Id = parseInt(city2Select.value);
        
        if (!city1Id || !city2Id) {
            resultDiv.innerHTML = '<span style="color: #ff5722;">Выберите два города!</span>';
            return;
        }
        
        const city1 = citiesData.find(c => c.id === city1Id);
        const city2 = citiesData.find(c => c.id === city2Id);
        
        if (!city1 || !city2) return;
        
        const distance = calculateDistance(city1, city2);
        
        resultDiv.innerHTML = `
            <div style="font-size: 1.2em;">
                <strong>${city1.name}</strong> → <strong>${city2.name}</strong>
            </div>
            <div style="font-size: 2em; color: #00fff5; margin: 10px 0;">
                ${distance.toLocaleString()} км
            </div>
            <div style="font-size: 0.9em; color: #b0b0b0;">
                Ортодромное расстояние по поверхности Земли
            </div>
        `;
        
        // Показываем путь на карте (если карта инициализирована)
        if (typeof showPathBetweenSelectedCities === 'function') {
            showPathBetweenSelectedCities();
        }
    }
    
    // Очистка выбора
    function clearSelection() {
        const city1Select = document.getElementById('city1');
        const city2Select = document.getElementById('city2');
        const resultDiv = document.getElementById('result');
        
        if (city1Select) city1Select.value = '';
        if (city2Select) city2Select.value = '';
        if (resultDiv) resultDiv.innerHTML = 'Выберите два города';
        
        // Очищаем линию на карте
        if (currentLine && map) {
            map.removeLayer(currentLine);
            currentLine = null;
        }
        
        // Восстанавливаем цвета маркеров
        if (markers && markers.length > 0) {
            markers.forEach(marker => {
                const cityId = parseInt(marker._popup._content.match(/selectCity\((\d+)\)/)?.[1]);
                const city = citiesData.find(c => c.id === cityId);
                if (city) {
                    marker.setStyle({ 
                        fillColor: getRegionColor(city.region),
                        radius: city.population > 1000000 ? 8 : 6
                    });
                }
            });
        }
    }
    
    // ===== НАСТРОЙКА СОБЫТИЙ =====
    
    // Кнопки навигации
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        if (e.key === 'Escape') sideNav.classList.remove('active');
    });
    
    // Боковое меню
    navToggle.addEventListener('click', () => {
        sideNav.classList.toggle('active');
    });
    
    // Ссылки навигации
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSlide = parseInt(targetId.replace('#slide', ''));
            goToSlide(targetSlide);
            sideNav.classList.remove('active');
        });
    });
    
    // Калькулятор расстояний
    document.getElementById('calculate')?.addEventListener('click', calculateDistanceBetweenCities);
    document.getElementById('clear')?.addEventListener('click', clearSelection);
    
    // Автоматическое обновление при выборе городов
    document.getElementById('city1')?.addEventListener('change', function() {
        const city2 = document.getElementById('city2').value;
        if (this.value && city2) {
            calculateDistanceBetweenCities();
        }
    });
    
    document.getElementById('city2')?.addEventListener('change', function() {
        const city1 = document.getElementById('city1').value;
        if (this.value && city1) {
            calculateDistanceBetweenCities();
        }
    });
    
    // Закрытие бокового меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !navToggle.contains(e.target) && sideNav.classList.contains('active')) {
            sideNav.classList.remove('active');
        }
    });
    
    // Инициализация карты при загрузке
    if (typeof initMap === 'function') {
        setTimeout(initMap, 1000);
    }
    
    console.log("Презентация готова!");
});

// Функция для получения цвета региона (добавлена для совместимости)
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

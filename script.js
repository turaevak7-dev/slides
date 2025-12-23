// Навигация по презентации
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Навигация по слайдам (без анимаций)
    function goToSlide(n) {
        // Скрываем текущий слайд
        slides[currentSlide].classList.remove('active');
        
        // Показываем новый слайд
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        
        // Обновляем счетчик
        updateSlideCounter();
        
        // Если перешли на слайд с картой, инициализируем карту
        if (currentSlide === 15 && typeof checkAndInitMap === 'function') {
            setTimeout(checkAndInitMap, 100);
        }
        
        // Если перешли на слайд с калькулятором, обновляем списки
        if (currentSlide === 14) { // Слайд 15 - калькулятор
            setTimeout(setupCalculator, 100);
        }
    }
    
    function updateSlideCounter() {
        currentSpan.textContent = currentSlide + 1;
        updateNavLinks();
    }
    
    function updateNavLinks() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#slide${currentSlide + 1}`) {
                link.classList.add('active');
            }
        });
    }
    
    // События
    prevBtn.addEventListener('click', () => {
        let newSlide = currentSlide - 1;
        if (newSlide < 0) newSlide = totalSlides - 1;
        goToSlide(newSlide);
    });
    
    nextBtn.addEventListener('click', () => {
        let newSlide = currentSlide + 1;
        if (newSlide >= totalSlides) newSlide = 0;
        goToSlide(newSlide);
    });
    
    navToggle.addEventListener('click', () => {
        sideNav.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const targetSlide = parseInt(href.replace('#slide', '')) - 1;
            goToSlide(targetSlide);
            sideNav.classList.remove('active');
        });
    });
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            let newSlide = currentSlide - 1;
            if (newSlide < 0) newSlide = totalSlides - 1;
            goToSlide(newSlide);
        }
        if (e.key === 'ArrowRight') {
            let newSlide = currentSlide + 1;
            if (newSlide >= totalSlides) newSlide = 0;
            goToSlide(newSlide);
        }
        if (e.key === 'Escape') sideNav.classList.remove('active');
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !navToggle.contains(e.target)) {
            sideNav.classList.remove('active');
        }
    });
});

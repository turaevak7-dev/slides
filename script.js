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
    
    // Навигация по слайдам
    function goToSlide(n) {
        // Проверяем границы
        if (n < 0) n = totalSlides - 1;
        if (n >= totalSlides) n = 0;
        
        // Скрываем текущий слайд
        slides[currentSlide].classList.remove('active');
        
        // Показываем новый слайд
        currentSlide = n;
        slides[currentSlide].classList.add('active');
        
        // Обновляем счетчик
        updateSlideCounter();
        
        // Если перешли на слайд с картой, инициализируем карту
        if (currentSlide === 15) {
            setTimeout(() => {
                if (typeof initMap === 'function') {
                    initMap();
                }
            }, 100);
        }
    }
    
    function updateSlideCounter() {
        currentSpan.textContent = currentSlide + 1;
        updateNavLinks();
    }
    
    function updateNavLinks() {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const targetSlide = parseInt(link.getAttribute('href').replace('#slide', ''));
            if (targetSlide === currentSlide + 1) {
                link.classList.add('active');
            }
        });
    }
    
    // События
    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    
    navToggle.addEventListener('click', () => {
        sideNav.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSlide = parseInt(targetId.replace('#slide', '')) - 1;
            goToSlide(targetSlide);
            sideNav.classList.remove('active');
        });
    });
    
    // Горячие клавиши
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goToSlide(currentSlide - 1);
        if (e.key === 'ArrowRight') goToSlide(currentSlide + 1);
        if (e.key === 'Escape') sideNav.classList.remove('active');
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !navToggle.contains(e.target)) {
            sideNav.classList.remove('active');
        }
    });
});

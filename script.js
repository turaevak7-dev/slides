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
    showSlide(currentSlide);
    
    // Навигация по слайдам
    function goToSlide(n) {
        if (n < 0) n = totalSlides - 1;
        if (n >= totalSlides) n = 0;
        
        currentSlide = n;
        showSlide(currentSlide);
        updateSlideCounter();
        
        // Если перешли на слайд с картой, инициализируем карту
        if (currentSlide === 15 && typeof initMap === 'function') {
            setTimeout(initMap, 100);
        }
    }
    
    function showSlide(n) {
        // Скрываем все слайды
        slides.forEach(slide => {
            slide.classList.remove('active', 'prev', 'next');
        });
        
        // Показываем текущий слайд
        slides[n].classList.add('active');
    }
    
    function updateSlideCounter() {
        currentSpan.textContent = currentSlide + 1;
        
        // Обновляем активную ссылку в навигации
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#slide${currentSlide + 1}`) {
                link.classList.add('active');
            }
        });
    }
    
    // События
    prevBtn.addEventListener('click', function() {
        goToSlide(currentSlide - 1);
    });
    
    nextBtn.addEventListener('click', function() {
        goToSlide(currentSlide + 1);
    });
    
    navToggle.addEventListener('click', function() {
        sideNav.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSlide = parseInt(targetId.replace('#slide', '')) - 1;
            goToSlide(targetSlide);
            sideNav.classList.remove('active');
        });
    });
    
    // Горячие клавиши
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        }
        if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
        if (e.key === 'Escape') {
            sideNav.classList.remove('active');
        }
    });
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (!sideNav.contains(e.target) && e.target !== navToggle) {
            sideNav.classList.remove('active');
        }
    });
});

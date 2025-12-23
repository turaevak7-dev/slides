document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentSlide = 0;
    
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const currentSpan = document.getElementById('current');
    const totalSpan = document.getElementById('total');
    const navToggle = document.getElementById('navToggle');
    const sideNav = document.getElementById('sideNav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    totalSpan.textContent = totalSlides;
    
    function showSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalSlides) index = totalSlides - 1;
        
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        slides[index].classList.add('active');
        currentSlide = index;
        currentSpan.textContent = index + 1;
    }
    
    showSlide(0);
    
    nextBtn.addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    prevBtn.addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    navToggle.addEventListener('click', function() {
        sideNav.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            const slideId = target.replace('#slide', '');
            const slideIndex = parseInt(slideId) - 1;
            
            showSlide(slideIndex);
            sideNav.classList.remove('active');
        });
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight' || e.key === ' ') {
            showSlide(currentSlide + 1);
            e.preventDefault();
        } else if (e.key === 'ArrowLeft') {
            showSlide(currentSlide - 1);
            e.preventDefault();
        } else if (e.key === 'Escape') {
            sideNav.classList.remove('active');
        }
    });
// Отслеживаем переключение слайдов для карты
function checkForMapSlide() {
    const activeSlide = document.querySelector('.slide.active');
    if (activeSlide && activeSlide.id === 'slide16') {
        // Если есть карта на странице, инициализируем её
        if (document.getElementById('map') && typeof initMap === 'function') {
            setTimeout(initMap, 500);
        }
    }
}

// Проверяем при переключении слайдов
document.addEventListener('slideChange', checkForMapSlide);

// Проверяем при загрузке
document.addEventListener('DOMContentLoaded', checkForMapSlide);
});

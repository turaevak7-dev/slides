document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        try {
            const map = L.map('map').setView([55.7558, 37.6173], 3);
            
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
            }).addTo(map);
            
            const cities = [
                { name: "Москва", lat: 55.7558, lon: 37.6173 },
                { name: "Санкт-Петербург", lat: 59.9343, lon: 30.3351 },
                { name: "Владивосток", lat: 43.1155, lon: 131.8855 },
                { name: "Калининград", lat: 54.7104, lon: 20.4522 },
                { name: "Сочи", lat: 43.5855, lon: 39.7231 },
                { name: "Якутск", lat: 62.0278, lon: 129.7319 },
                { name: "Сахалин (Южно-Сахалинск)", lat: 46.9591, lon: 142.7380 }
            ];
            
            cities.forEach(city => {
                L.marker([city.lat, city.lon])
                    .addTo(map)
                    .bindPopup(`<b style="color:#00adb5">${city.name}</b>`);
            });
            
            initDistanceCalculator(cities);
            
        } catch (error) {
            console.error('Ошибка карты:', error);
            document.getElementById('map').innerHTML = 
                '<div style="color: red; padding: 20px; text-align: center;">Ошибка загрузки карты</div>';
        }
    }
});

function initDistanceCalculator(cities) {
    const city1Select = document.getElementById('city1');
    const city2Select = document.getElementById('city2');
    const calculateBtn = document.getElementById('calculate');
    const clearBtn = document.getElementById('clear');
    const resultDiv = document.getElementById('result');
    
    if (!city1Select || !city2Select) return;
    
    city1Select.innerHTML = '<option value="">Выберите...</option>';
    city2Select.innerHTML = '<option value="">Выберите...</option>';
    
    cities.forEach(city => {
        const option1 = new Option(city.name, city.name);
        const option2 = new Option(city.name, city.name);
        city1Select.add(option1);
        city2Select.add(option2);
    });
    
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
        
        const city1 = cities.find(c => c.name === city1Name);
        const city2 = cities.find(c => c.name === city2Name);
        
        if (city1 && city2) {
            const distance = calculateDistance(city1.lat, city1.lon, city2.lat, city2.lon);
            resultDiv.innerHTML = `
                <div style="color:#00fff5; font-size:1.2rem;">
                    <b>${city1Name} → ${city2Name}</b><br>
                    <span style="font-size:2rem; font-weight:bold;">${distance.toLocaleString('ru-RU')} км</span>
                </div>
            `;
        }
    });
    
    clearBtn.addEventListener('click', function() {
        city1Select.value = '';
        city2Select.value = '';
        resultDiv.innerHTML = 'Выберите два города';
    });
    
    resultDiv.innerHTML = 'Выберите два города';
}
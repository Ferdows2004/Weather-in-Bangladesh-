// বাংলাদেশের সকল জেলার তালিকা
const districts = [
    "ঢাকা", "ফরিদপুর", "গাজীপুর", "গোপালগঞ্জ", "কিশোরগঞ্জ", "মাদারীপুর", "মানিকগঞ্জ", "মুন্সিগঞ্জ", 
    "নারায়ণগঞ্জ", "নরসিংদী", "রাজবাড়ী", "শরীয়তপুর", "টাঙ্গাইল", "বাগেরহাট", "চুয়াডাঙ্গা", "যশোর", 
    "ঝিনাইদহ", "খুলনা", "কুষ্টিয়া", "মাগুরা", "মেহেরপুর", "নড়াইল", "সাতক্ষীরা", "বগুড়া", "জয়পুরহাট", 
    "নওগাঁ", "নাটোর", "নবাবগঞ্জ", "পাবনা", "রাজশাহী", "সিরাজগঞ্জ", "দিনাজপুর", "গাইবান্ধা", "কুড়িগ্রাম", 
    "লালমনিরহাট", "নীলফামারী", "পঞ্চগড়", "রংপুর", "ঠাকুরগাঁও", "বরগুনা", "বরিশাল", "ভোলা", 
    "ঝালকাঠি", "পটুয়াখালী", "পিরোজপুর", "বান্দরবান", "ব্রাহ্মণবাড়িয়া", "চাঁদপুর", "চট্টগ্রাম", "কুমিল্লা", 
    "কক্সবাজার", "ফেনী", "খাগড়াছড়ি", "লক্ষ্মীপুর", "নোয়াখালী", "রাঙ্গামাটি", "হবিগঞ্জ", "মৌলভীবাজার", 
    "সুনামগঞ্জ", "সিলেট", "জামালপুর", "ময়মনসিংহ", "নেত্রকোণা", "শেরপুর"
];

// বাংলায় আবহাওয়ার অবস্থা
const weatherConditions = {
    "Sunny": "সূর্যালোক",
    "Partly Cloudy": "আংশিক মেঘলা",
    "Cloudy": "মেঘলা",
    "Rainy": "বৃষ্টি",
    "Thunderstorm": "বজ্রবৃষ্টি",
    "Foggy": "কুয়াশা",
    "Hot": "গরম",
    "Clear": "পরিষ্কার",
    "Mild": "মৃদু"
};

// বাংলায় সপ্তাহের দিন
const banglaDays = ["সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র"];

// একটি জেলার জন্য আবহাওয়ার তথ্য তৈরির ফাংশন
function generateWeatherData(district) {
    // প্রতিটি জেলার জন্য সামঞ্জস্যপূর্ণ কিন্তু ভিন্ন তথ্য তৈরির জন্য একটি সাধারণ হ্যাশ
    let hash = 0;
    for (let i = 0; i < district.length; i++) {
        hash = district.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // হ্যাশের উপর ভিত্তি করে তাপমাত্রা তৈরি (২৫-৩৮°C এর মধ্যে)
    const temperature = 25 + (hash % 14);
    
    // হ্যাশের উপর ভিত্তি করে আবহাওয়ার অবস্থা
    const conditions = [
        { description: "Sunny", icon: "fa-sun" },
        { description: "Partly Cloudy", icon: "fa-cloud-sun" },
        { description: "Cloudy", icon: "fa-cloud" },
        { description: "Rainy", icon: "fa-cloud-rain" },
        { description: "Thunderstorm", icon: "fa-bolt" },
        { description: "Foggy", icon: "fa-smog" }
    ];
    const condition = conditions[Math.abs(hash) % conditions.length];
    
    // অন্যান্য আবহাওয়ার মেট্রিক্স তৈরি
    const humidity = 50 + (Math.abs(hash) % 40); // ৫০-৯০%
    const windSpeed = 5 + (Math.abs(hash) % 15); // ৫-২০ কিমি/ঘন্টা
    const feelsLike = temperature + 2 + (Math.abs(hash) % 5); // ২-৬°C উষ্ণতর
    const pressure = 1005 + (Math.abs(hash) % 15); // ১০০৫-১০২০ hPa
    
    // পূর্বাভাস তথ্য তৈরি
    const forecast = banglaDays.map((day, i) => {
        const dayTemp = temperature + (i - 2) + (Math.abs(hash + i) % 3);
        const dayConditionIndex = (Math.abs(hash + i) % conditions.length);
        return {
            day: day,
            icon: conditions[dayConditionIndex].icon,
            temp: dayTemp
        };
    });
    
    return {
        temperature: temperature,
        description: condition.description,
        icon: condition.icon,
        humidity: humidity,
        windSpeed: windSpeed,
        feelsLike: feelsLike,
        pressure: pressure,
        forecast: forecast
    };
}

// DOM এলিমেন্ট
const citySelect = document.getElementById('citySelect');
const searchBtn = document.getElementById('searchBtn');
const cityName = document.getElementById('cityName');
const weatherIcon = document.getElementById('weatherIcon');
const temperature = document.getElementById('temperature');
const weatherDescription = document.getElementById('weatherDescription');
const windSpeed = document.getElementById('windSpeed');
const humidity = document.getElementById('humidity');
const feelsLike = document.getElementById('feelsLike');
const pressure = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecastContainer');

// জেলা ড্রপডাউন পপুলেট করুন
districts.forEach(district => {
    const option = document.createElement('option');
    option.value = district;
    option.textContent = district;
    citySelect.appendChild(option);
});

// সংখ্যাকে বাংলা সংখ্যায় রূপান্তরের ফাংশন
function toBanglaNumber(num) {
    const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, digit => banglaDigits[digit]);
}

// আবহাওয়া প্রদর্শন আপডেট করার ফাংশন
function updateWeather(district) {
    const data = generateWeatherData(district);
    
    cityName.textContent = district;
    weatherIcon.innerHTML = `<i class="fas ${data.icon}"></i>`;
    temperature.textContent = `${toBanglaNumber(data.temperature)}°C`;
    weatherDescription.textContent = weatherConditions[data.description] || data.description;
    windSpeed.textContent = `${toBanglaNumber(data.windSpeed)} কিমি/ঘন্টা`;
    humidity.textContent = `${toBanglaNumber(data.humidity)}%`;
    feelsLike.textContent = `${toBanglaNumber(data.feelsLike)}°C`;
    pressure.textContent = `${toBanglaNumber(data.pressure)} hPa`;
    
    // পূর্বাভাস আপডেট করুন
    forecastContainer.innerHTML = '';
    data.forecast.forEach(day => {
        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <div class="day">${day.day}</div>
            <div class="forecast-icon"><i class="fas ${day.icon}"></i></div>
            <div class="temp">${toBanglaNumber(Math.round(day.temp))}°C</div>
        `;
        forecastContainer.appendChild(forecastDay);
    });
}

// ইভেন্ট লিসেনার
searchBtn.addEventListener('click', () => {
    updateWeather(citySelect.value);
});

// ডিফল্ট জেলা দিয়ে ইনিশিয়ালাইজ করুন
updateWeather('ঢাকা');
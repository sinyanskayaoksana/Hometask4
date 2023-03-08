//Progressbar
let fullHeight, innerHeight;
const progressBar = document.querySelector('.progressbar>.progressbar-line');

window.addEventListener('scroll', fillProgressLine);
window.addEventListener('resize', fillProgressLine);

function fillProgressLine() {
    fullHeight = document.body.scrollHeight;
    innerHeight = window.innerHeight;
    progressBar.style.width = (scrollY * 100 / (fullHeight - innerHeight)) + '%';
}
fillProgressLine();

// Preloader

let preloader = document.querySelector(".preloader");
  
function hidding () {
    preloader.classList.add('preloader_hide');
    header.classList.remove('header_hide');
    nav.classList.remove('nav_hide');
}
setTimeout(hidding, 4500);

let header = document.querySelector("header");
let nav = document.querySelector(".nav");
function hideHeader () {
    header.classList.add('header_hide');
    nav.classList.add('nav_hide');
}
hideHeader();

// Weather

const weatherBlock = document.querySelector(".weather");
async function loadWeather(e) {
    const server = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kharkiv&appid=291374af4525520d1a4ea97c963b0f25";
    const response = await fetch(server, {
        method: "GET",
    });
    const responseResult = await response.json();
    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}

function getWeather (data){
    const location = data.name;
    const temp = Math.round(data.main.temp);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
        <div class="weather__content">
            <div class="weather__city">${location}</div>
            <div class="weather__icon">
                 <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherStatus}">
            </div>
            <div class="weather__temp">${temp}</div>
        </div>`

    weatherBlock.innerHTML = template;    
}

if (weatherBlock) {
    loadWeather();
};

// Slider in Testimonials

const sliderImages=document.querySelectorAll('.testimonials__card_wrapper');
const sliderLine=document.querySelector(".testimonials__items");
const sliderBtnNext=document.querySelector(".btn_next");
const sliderBtnPrev=document.querySelector(".btn_prev");
let sliderCount = 0;

window.addEventListener("resize",showSlide);
sliderBtnNext.addEventListener("click",nextSlide);
sliderBtnPrev.addEventListener("click",prevSlide);
    function showSlide () {
        sliderWidth=document.querySelector(".testimonials").offsetWidth;
        sliderLine.style.width=sliderWidth*sliderImages.length+"px";
        sliderImages.forEach(item => item.style.width=sliderWidth+"px");
        rollSlider();
    }
    showSlide();

    function nextSlide () {
        sliderCount++;
        if (sliderCount >= sliderImages.length) sliderCount=0;
        rollSlider();
    }

    function prevSlide () {
        sliderCount--;
        if (sliderCount<0) sliderCount=sliderImages.length-1;
        rollSlider();
    }
    function rollSlider () {
        sliderLine.style.transform=`translateX(${-sliderCount*sliderWidth}px)`;
    }
  

 // Form validation

const form = document.querySelector('.sign-up__form');
form.addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.querySelector('.sign-up__form_name').value;
  const surname = document.querySelector('.sign-up__form_surname').value;
  const email = document.querySelector('.sign-up__form_email').value;
  const error = document.querySelector('.error');
  const errorMsg = [];

  const nameRegex = /^[A-Z][a-z]*$/;
  const isValidName = nameRegex.test(name);
  
  const surnameRegex = /^[A-Z][a-z]*$/;
  const isValidSurname = surnameRegex.test(surname);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

  if (isValidName && isValidSurname && isValidEmail) {
    
    localStorage.setItem('name', name);
    localStorage.setItem('surname', surname);
    localStorage.setItem('email', email);
    form.reset();
    error.innerText = '';

  } else {
    
    if (!isValidName) {
      errorMsg.push("Name is not correct. Use only latin letters");
    }
    if (!isValidSurname) {
      errorMsg.push("Surname is not correct. Use only latin letters");
    }
    if (!isValidEmail) {
      errorMsg.push("Email is not correct");
    }
    if (errorMsg.length>0) {
      error.innerText = errorMsg.join('\n');
    }
  }
});

 // Animation in News

const elements = document.querySelectorAll('.news__card_description');
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
function animateElements() {
  elements.forEach(element => {
    if (isInViewport(element)) {
      element.classList.add('animate');
    } else {
      element.classList.remove('animate');
    }
  });
}
window.addEventListener('scroll', animateElements);

// Service

const btnAll = document.querySelector(".btn-all");
const btnDesign = document.querySelector(".btn-design");
const btnArchitecture = document.querySelector(".btn-architecture");
const btnPlanning = document.querySelector(".btn-planning");
const allService = document.querySelector(".service__all");
const design = document.querySelector(".service__design");
const architecture = document.querySelector(".service__architecture");
const planning = document.querySelector(".service__planning");


 function serviceFilter (){
  btnDesign.addEventListener("click", ()=>{
    btnDesign.classList.toggle('btn-active');
    btnAll.classList.remove('btn-active');
    btnArchitecture.classList.remove('btn-active');
    btnPlanning.classList.remove('btn-active');
    design.style.display = "flex";
    allService.style.display = "none";
    architecture.style.display = "none";
    planning.style.display = "none";
  });
  btnArchitecture.addEventListener("click", ()=>{
    btnArchitecture.classList.toggle('btn-active');
    btnAll.classList.remove('btn-active');
    btnDesign.classList.remove('btn-active');
    btnPlanning.classList.remove('btn-active');
    design.style.display = "none";
    allService.style.display = "none";
    architecture.style.display = "flex";
    planning.style.display = "none";
  });
  btnPlanning.addEventListener("click", ()=>{
    btnPlanning.classList.toggle('btn-active');
    btnAll.classList.remove('btn-active');
    btnDesign.classList.remove('btn-active');
    btnArchitecture.classList.remove('btn-active');
    design.style.display = "none";
    allService.style.display = "none";
    architecture.style.display = "none";
    planning.style.display = "flex";
  });
  btnAll.addEventListener("click", ()=>{
    btnAll.classList.toggle('btn-active');
    btnPlanning.classList.remove('btn-active');
    btnDesign.classList.remove('btn-active');
    btnArchitecture.classList.remove('btn-active');
    design.style.display = "none";
    allService.style.display = "flex";
    architecture.style.display = "none";
    planning.style.display = "none";
  });
 };
 serviceFilter();

// Services all

  fetch('./json/db.json')
  .then(response => response.json())
  .then(data => {
    const services = ['design', 'architecture', 'planning'];
   
    services.forEach(service => {
      const lastIndex = data.services[services.indexOf(service)][service].length - 1;
      const titleMain = data.services[services.indexOf(service)][service][lastIndex].title;
      const imgMain = data.services[services.indexOf(service)][service][lastIndex].img;
      const imgBigMain = data.services[services.indexOf(service)][service][lastIndex].imgBig;
      const descrMain = data.services[services.indexOf(service)][service][lastIndex].description;
      const element = document.querySelector(`.service__all_${service}`);
      element.innerHTML = `
      
      <div class="service__all_img">
          <img src=${imgMain} alt="icon" class="little">
          <img src=${imgBigMain} alt="icon" class="big">
      </div>
      <div class=${service}>
        <h4>${titleMain}</h4>
        <p>${descrMain}</p>
      </div>`;
     });
  })
  .catch(error => console.error(error));

// Services items

  fetch('./json/db.json')
  .then(response => response.json())
  .then(data => {
    const services = ['design', 'architecture', 'planning'];

    services.forEach(service => {
      const items = data.services[services.indexOf(service)][service].slice(-5).reverse();
      const container = document.querySelector(`.service__${service}`);

      for (let i = 0; i < items.length; i++) {
        const title = items[i].title;
        const descr = items[i].description;
        const img = items[i].img;
        const imgBig = items[i].imgBig;
        const div = document.createElement('div');
        div.className = (`service__${service}_card service__all_${service}`);
        div.innerHTML = `
                <div class="service__all_img">
                    <img src=${img} alt="icon" class="little">
                    <img src=${imgBig} alt="icon" class="big">
                </div>
                <div>
                    <h4>${title}</h4>
                    <p>${descr}</p>
                </div>`;
        container.appendChild(div);
      }
    });
  })
  .catch(error => console.error(error));


// Burger menu
let menuBtn = document.querySelector('.menu-btn');
let menu = document.querySelector('.nav__menu');

menuBtn.addEventListener('click', () => {
	menu.classList.toggle('active');
  menuBtn.classList.toggle('active');
});
menu.addEventListener('click', () => {
  menu.classList.remove('active');
});

// 'Are you still there?'

const timeoutDuration = 60000;

let isActive = false;
let isConfirmDisplayed = false;

let timeout = setTimeout(() => {
  if (!isConfirmDisplayed) {
    isConfirmDisplayed = true;
    const response = confirm('Are you still there?');
    if (response) {
      isActive = true;
      isConfirmDisplayed = false;
    } else {
      window.close();
    }
  }
}, timeoutDuration);

function handleUserActivity() {
  isActive = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    if (!isConfirmDisplayed) {
      isConfirmDisplayed = true;
      const response = confirm('Are you still there?');
      if (response) {
        isActive = true;
        isConfirmDisplayed = false;
      } else {
        window.close();
      }
    }
  }, timeoutDuration);
}

document.addEventListener('mousemove', handleUserActivity);
document.addEventListener('keypress', handleUserActivity);
window.addEventListener('scroll', handleUserActivity);


let educationHeader = document.getElementById("educationHeader");

educationHeader.addEventListener("click", function() {
  // this.classList.toggle("active");
  let content = this.nextElementSibling;
  let contentDisplay = window.getComputedStyle(content).display;
  if (contentDisplay === "block"){
    content.style.display = "none";
  } else {
    content.style.display = "block";
  }
});


// SLIDER

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("slider--item");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
}

// SWIPER

const swiper = document.getElementById('swiper'),
      swiperItems = document.getElementById('swiperSlides');


function swipe(wrapper, items) {
  let posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slides = items.getElementsByClassName('swiper--slide'),
      slidesLength = slides.length,
      slideSize = items.getElementsByClassName('swiper--slide')[0].offsetWidth,
      firstSlide = slides[0],
      lastSlide = slides[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);

  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');
    
    if (allowShift) {
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize) + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) + "px";
        index--;      
      }
    };
    
    allowShift = false;
  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) + "px";
      index = 0;
    }
    
    allowShift = true;
  }
};

document.getElementsByClassName('swiper--button')[0].addEventListener("touchstart", function(){
  const desc = document.getElementsByClassName('swiper--description')[1];
  const text = document.getElementsByClassName('swiper--button--text')[1];
  if(desc.style.display==='block') {
    desc.style.display = 'none';
    text.innerText = 'show description';
  } else {
    desc.style.display = 'block';
    text.innerText = 'hide description';
  }
});

document.getElementsByClassName('swiper--button')[1].addEventListener("touchstart", function(){

  const desc = document.getElementsByClassName('swiper--description')[2];
  const text = document.getElementsByClassName('swiper--button--text')[2];
  if(desc.style.display==='block') {
    desc.style.display = 'none';
    text.innerText = 'show description';
  } else {
    desc.style.display = 'block';
    text.innerText = 'hide description';
  }
});

swipe(swiper, swiperItems);

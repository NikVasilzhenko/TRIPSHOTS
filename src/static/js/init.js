//is touch
if (Modernizr.touchevents){
   console.log('touch');
} else {
   console.log('no touch');
}

if( (window.innerWidth > 1023) && !(Modernizr.touchevents)){
  //SmoothScroll
  SmoothScroll({ 
    stepSize: 100,
    animationTime: 1500,
    ускорениеDelta: 50,
    pulseAlgorithm: true,
    PulseScale: 4,
    pulseNormalize: 1
  });
}

//wow
new WOW().init();

//gallery swiper
if (document.querySelector('#js-gallery-main')){
  let galleryNext = new Swiper('#js-gallery-next', {
    watchSlidesProgress: true,
    speed: 500,
    loop: true,
  });
  let galleryTop = new Swiper('#js-gallery-top', {
    watchSlidesProgress: true,
    speed: 500,
    loop: true,
  });
  let galleryBottom = new Swiper('#js-gallery-bottom', {
    watchSlidesProgress: true,
    speed: 500,
    loop: true,
  });
  let galleryText = new Swiper('#js-gallery-text', {
    watchSlidesProgress: true,
    speed: 500,
    loop: true,
    effect: 'fade',
  });
  let galleryMain = new Swiper('#js-gallery-main', {
    watchSlidesProgress: true,
    speed: 500,
    loop: true,
    navigation: {
      nextEl: '#js-gallery-next-btn'
    }
  });
  galleryMain.controller.control = galleryNext;
  galleryNext.controller.control = galleryTop;
  galleryTop.controller.control = galleryBottom;
  galleryBottom.controller.control = galleryText;
}
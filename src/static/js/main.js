//main map
if( (window.innerWidth > 1023) && !(Modernizr.touchevents) && (document.getElementById('js-main-map'))){
  let app = new PIXI.Application({width: window.innerWidth, height: (window.innerWidth / 3) * 2});
  document.getElementById('js-main-map').appendChild(app.view);

  let img = new PIXI.Sprite.from("img/pic/main-map/main.jpg");
  img.width = window.innerWidth;
  img.height = (window.innerWidth / 3) * 2;
  app.stage.addChild(img);

  depthMap = new PIXI.Sprite.from("img/pic/main-map/main-map.jpg");
  depthMap.width = window.innerWidth;
  depthMap.height = (window.innerWidth / 3) * 2;
  app.stage.addChild(depthMap);

  displacementFilter = new PIXI.filters.DisplacementFilter(depthMap);
  app.stage.filters = [displacementFilter];

  window.onmousemove = function(e) {
    displacementFilter.scale.x = (window.innerWidth / 2 - e.clientX) /70;
    displacementFilter.scale.y = (window.innerHeight / 2 - e.clientY) /24;
  };
}


/******* КУРСОР (GSAP) *******/
if( (window.innerWidth > 1023) && !(Modernizr.touchevents)){
  const cursor   = document.getElementById('js-cursor'),
        follower = document.getElementById('js-aura'),
        links    = document.getElementsByTagName('a'),
        drops    = document.querySelectorAll('.drop'),
        buttons  = document.getElementsByTagName('button');

  document.body.addEventListener('mousemove', e => {
    mouseCoords(e);
    cursor.classList.remove('hidden');
    follower.classList.remove('hidden');
  });

  let mouseX = 0, 
      mouseY = 0, 
      posX = 0, 
      posY = 0;

  function mouseCoords(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
  }

  gsap.to({}, .01, {
     repeat: -1,
     onRepeat: () => {
       posX += (mouseX - posX) / 5; //степень отставания ауры от курсора
       posY += (mouseY - posY) / 5; //степень отставания ауры от курсора

       gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY
      }
       });
       gsap.set(follower, {
         css: {
        left: posX - 24,
        top: posY - 24
      }
       });
     }
    });
  for(let i = 0; i < links.length; i++) {
    links[i].addEventListener('mouseover', () => {
      cursor.classList.add('islink');
      follower.classList.add('islink');
    });
    links[i].addEventListener('mouseout', () => {
      cursor.classList.remove('islink');
      follower.classList.remove('islink');
    });
  };
  for(let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseover', () => {
      cursor.classList.add('isbutton');
      follower.classList.add('isbutton');
    });
    buttons[i].addEventListener('mouseout', () => {
      cursor.classList.remove('isbutton');
      follower.classList.remove('isbutton');
    });
  };
  for(let i = 0; i < drops.length; i++) {
    drops[i].addEventListener('mouseover', () => {
      cursor.classList.add('isdrop');
      follower.classList.add('isdrop');
    });
    drops[i].addEventListener('mouseout', () => {
      cursor.classList.remove('isdrop');
      follower.classList.remove('isdrop');
    });
  };

  document.body.addEventListener('mouseout', (e) => {
    cursor.classList.add('hidden');
    follower.classList.add('hidden');
  });  
}

//open bar
function openBar(){
  document.querySelector('body').classList.toggle('open-bar');
}

//slides functions
function slideDown($this, animationTime) {
  let overlay = $this;
    
  if(getComputedStyle(overlay, true).display === 'none'){
    if( !(overlay.classList.contains('inAnimate')) ){
      overlay.classList.add('inAnimate');
        
      let paddingTopSize = parseInt(getComputedStyle(overlay, true).paddingTop);
      let paddingBottomSize = parseInt(getComputedStyle(overlay, true).paddingBottom);
      let marginTopSize = parseInt(getComputedStyle(overlay, true).marginTop);
      let marginBottomSize = parseInt(getComputedStyle(overlay, true).marginBottom); 

      overlay.style.paddingTop = '0';
      overlay.style.paddingBottom = '0';
      overlay.style.marginTop = '0';
      overlay.style.marginBottom = '0';
      overlay.style.display = 'block';
      overlay.style.overflow = 'hidden';
      overlay.style.height = '0';

      let scrollSize = overlay.scrollHeight + paddingTopSize + paddingBottomSize;

      overlay.style.transition = 'all ' + animationTime + 'ms ease-in-out';
      overlay.style.height = scrollSize + "px";
      overlay.style.paddingTop = paddingTopSize + "px";
      overlay.style.paddingBottom = paddingBottomSize + "px";
      overlay.style.marginTop = marginTopSize + "px";
      overlay.style.marginBottom = marginBottomSize + "px";
      setTimeout(
        (function(){
          overlay.style.overflow = '';
          overlay.style.height = '';
          overlay.style.paddingTop = '';
          overlay.style.paddingBottom = '';
          overlay.style.marginTop = '';
          overlay.style.marginBottom = '';
          overlay.classList.remove('inAnimate');
        }), animationTime
      )
    }
  }
}
function slideUp($this, animationTime) {
  let overlay = $this;
    
  if(getComputedStyle(overlay, true).display !== 'none'){
      
    if( !(overlay.classList.contains('inAnimate')) ){
      overlay.classList.add('inAnimate');

      let paddingTopSize = parseInt(getComputedStyle(overlay, true).paddingTop);
      let paddingBottomSize = parseInt(getComputedStyle(overlay, true).paddingBottom); 
      let marginTopSize = parseInt(getComputedStyle(overlay, true).marginTop);
      let marginBottomSize = parseInt(getComputedStyle(overlay, true).marginBottom);
      let containerHeight = overlay.clientHeight; 

      overlay.style.height = containerHeight + 'px';
      overlay.style.overflow = 'hidden';      
      overlay.style.paddingTop = paddingTopSize + 'px';
      overlay.style.paddingBottom = paddingBottomSize + 'px';
      overlay.style.marginTop = marginTopSize + 'px';
      overlay.style.marginBottom = marginBottomSize + 'px';
      overlay.style.transition = 'all ' + animationTime + 'ms ease-in-out';

      setTimeout(
        (function(){
          overlay.style.paddingTop = 0;
          overlay.style.paddingBottom = 0;
          overlay.style.marginTop = 0;
          overlay.style.marginBottom = 0;
          overlay.style.height = 0;
        }), 100
      )      
      setTimeout(
        (function(){
          overlay.style.overflow = '';
          overlay.style.height = '';
          overlay.style.paddingTop = '';
          overlay.style.paddingBottom = '';
          overlay.style.marginTop = '';
          overlay.style.marginBottom = '';
          overlay.style.display = 'none';
          overlay.classList.remove('inAnimate');
        }), animationTime
      )
    }
  }
}
function slideToggle($this, animationTime){
  let overlay = $this;
  if(getComputedStyle(overlay, true).display !== 'none'){
    slideUp($this, animationTime);
  } else{
    slideDown($this, animationTime);
  }
}

//drop catalog list
function openDrop($this){
  const animationTime = 350;
  if($this.classList.contains('open')){
    slideToggle($this.nextElementSibling, animationTime);
    $this.classList.remove('open'); 
  } else{
    if(document.querySelector('.catalog-header.open')){
      slideToggle(document.querySelector('.catalog-header.open').nextElementSibling, animationTime);
      document.querySelector('.catalog-header.open').classList.remove('open');    
    }
    $this.classList.add('open');
    slideToggle($this.nextElementSibling, animationTime);
  }
}

//get top position
function getCoords(elem) {
  var box = elem.getBoundingClientRect();

  return box.top + pageYOffset;
}

if(window.innerWidth > 767){
  //cite animation
  if (document.getElementById('js-cite')){

    let c = document.querySelectorAll('#js-cite span'),
        cc = document.getElementById('js-cite-caption')
        ccLength = c.length;

    for (let i = 0; i < c.length; i++) { 
      c[i].style.transitionDelay = (3 + i * .05) + 's';
    };

    cc.style.transitionDelay = (3 + ccLength * .05) + 's';  
  }
  
  //paralax hero
  if (document.getElementById('js-main-wrap')){
    
    let mainWrap = document.getElementById('js-main-wrap'),
        winTop = window.pageYOffset;
    
    mainWrap.style.opacity = (1 - winTop * 0.002);
    window.addEventListener('scroll', () => {
      console.log('hero');
      winTop = window.pageYOffset;
      mainWrap.style.opacity = (1 - winTop * 0.002);
    });
  }  
}

if( (window.innerWidth > window.innerHeight) && (window.innerWidth > 767) ){
  // paralax portfolio item
  if (document.querySelector('.js-paralax-portfolio-item')){
    let paralaxPortfolioItems = document.querySelectorAll('.js-paralax-portfolio-item');
    
    
    window.addEventListener('scroll', () => {
      let winTop = window.pageYOffset,
          winHeight = document.documentElement.clientHeight,
          winBottom = winTop + winHeight;
      
      for (let i = 0; i < paralaxPortfolioItems.length; i++) {
        let topPos = getCoords(paralaxPortfolioItems[i]);
        
        if(topPos < winBottom){
          let position = winTop - topPos;
          
          paralaxPortfolioItems[i].firstElementChild.style.transform = ('translate3d(0, ' + -((position / 4) + 70) + 'px, 0)');
        }
      }
    });
    
  }
}

//loaded window
document.addEventListener('DOMContentLoaded', () => {
  function readyPage(){
    document.querySelector('body').classList.add('loaded');
  };
  setTimeout(
    readyPage, 250
  );
});
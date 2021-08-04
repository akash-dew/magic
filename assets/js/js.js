let firstSlide = true;
const mainAnimEle = document.querySelector('.lottie1');
const mainAnimEle2 = document.querySelector('.lottie2');
const header = document.querySelector('.header-dark');
const headingMain = document.querySelector('.heading-main');
const myMenuOuter = document.querySelector('.myMenuOuter');
 
const loader = document.querySelector(".loader")


AOS.init();
window.onload = function () {
  lax.init();

  // Add a driver that we use to control our animations
  lax.addDriver("scrollY", function () {
    return window.scrollY;
  });

  // Add animation bindings to elements
  lax.addElements(".selector", {
    scrollY: {
      translateX: [
        ["elInY", "elCenterY", "elOutY"],
        [0, "screenWidth/2", "screenWidth"],
      ],
    },
  });


//Loader
  loader.classList.add("hide");
  payAfterLLoad();
  document.body.classList.remove('body-hidden')
  setTimeout(function () {
    loader.remove();
  }, 1000);

};

new fullpage("#fullpage", {
  licenseKey: "YOUR_KEY_HERE",
  sectionsColor: ["#000", "#000", "#444", "#fff", "#18181a","#18181a","#fff","#333333","#18181a","#000000"],
  navigation: false,
//   navigationPosition: "left",
//   navigationTooltips: [
//     "firstSlide",
//     "secondSlide",
//     "thirdSlide",
//     "fourSlide",
//   ],
  scrollBar: true,
  onLeave: function (origin, destination, direction) {
      console.log('leave')
  },
  afterLoad: function (origin, destination, direction) {
    console.log('load')

    // console.log(destination);
    // console.log(destination.index);
    if (destination.index != 0) {
        sideNav('hide')
    }
    if(destination.isFirst){
        firstSlide = true;    
    }else{
        firstSlide = false;    
    }

    navTheme(destination.index)

  },
  anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage', 'fifthPage', 'sixthPage', 'seventhPage'],
    menu: '#myMenu',
    lazyLoading: true    
});





let splide = new Splide(".splide",{
    pauseOnHover : false, // must be false
    pauseOnFocus : false, // must be false
    resetProgress: false,
    pagination : true,
    arrows:false,
    autoplay:true,
    type   : 'loop',
    interval: 6000,
    speed: 1400,
    drag:false,
    perPage  : 1,
    focus    : 'center'
});





splide.on( 'move', function() { 
    console.dir(splide)
    if(firstSlide){

        if(splide.index == 0){
            sideNav('hide')
        }else{
            sideNav('show')
        }  
    }
});

splide.on( 'active', function() { 
    console.log(splide.index)
});

 
let mainAnim = bodymovin.loadAnimation({
    container: mainAnimEle, // the dom element that will contain the animation
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'assets/js/anim-large.json',
    
  });

  let mainAnim2 = bodymovin.loadAnimation({
    container: mainAnimEle2, // the dom element that will contain the animation
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'assets/js/anim.json',
  });
  
function payAfterLLoad(){
    // Hero slider
      splide.mount();
      mainAnim.play();
      mainAnim2.play();
      mainAnim.playSegments(100,true)

      mainAnim.addEventListener('complete', function(){
            mainAnim.goToAndPlay(220, true);
            console.log('complete')
        });

      let i = 0;

    setTimeout(function () {  
        headingMain.classList.add('active')
    },1800);
    setTimeout(function () {
        sideNav('firstShow');
      },2800);

 

}



// Expand Colapse menu
myMenuOuter.addEventListener('mouseenter', function(){
    sideNav('show')
})
myMenuOuter.addEventListener('mouseleave', function(){
    sideNav('hide')
})

function sideNav(opt){

    console.log(firstSlide)

    if(opt == 'show'){
        myMenuOuter.classList.remove('small')
        animateItems('add');
        document.querySelector('.section.active').classList.add('menu-open');
    }
    if(opt == 'hide'){
        myMenuOuter.classList.add('small')
        animateItems('remove');
        document.querySelector('.section.active').classList.remove('menu-open');
    }
    if(opt == 'firstShow'){
        myMenuOuter.classList.remove('small')
        myMenuOuter.classList.add('show');
        animateItems('add')
    }    
}


 


let lineItem = Array.from (document.querySelectorAll('#myMenu li .fp-tooltip'));


// lineItem[index].classList.add("active");

function animateItems(opt){

    lineItem.forEach((arrayElement, index) => {
   
    setTimeout(function(){
        if(opt == 'add'){
            // lineItem[index].classList.add("active");
            lineItem[index].setAttribute("data-active", "true");
           
        }
        if(opt == 'remove'){
            lineItem[index].classList.remove("active");
            lineItem[index].setAttribute("data-active", "false");

        }
    }, index * 100);
    });
}

 


// Header Small
window.addEventListener('scroll',function(){
    if(window.pageYOffset > 10){
        header.classList.add('small-header')
    }else{
        header.classList.remove('small-header')
    }    
})

// Nav theme
function navTheme(opt){
    if(opt == 3){
        myMenuOuter.classList.remove('theme-dark'); 
        myMenuOuter.classList.add('theme-light');
    }else{
        myMenuOuter.classList.remove('theme-light');
        myMenuOuter.classList.add('theme-dark');
       
    }

}






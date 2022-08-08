const secondPage = document.getElementById('second-page');
const lightSwitch = document.getElementById('switch-holder');
lightSwitch.addEventListener('click', flipSwitch);

function flipSwitch(){
    for (let i = 0; i < 2; i++){
        lightSwitch.children[i].classList.toggle('switchOn');
        lightSwitch.children[i].classList.toggle('switchOff');

    }
    secondPage.classList.toggle('second-page-on');
    secondPage.classList.toggle('second-page-off');
}
 
const sliderHolder = document.getElementById('sliderHolder');
const sliderSlider = document.getElementById('sliderSlider');

sliderHolder.addEventListener('click', sliderClicked);

function sliderClicked(){
    sliderSlider.classList.toggle('slide');
}
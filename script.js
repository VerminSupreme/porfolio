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

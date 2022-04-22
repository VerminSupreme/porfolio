//reset 
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetStats);
function resetStats(){
    localStorage.removeItem('initializedUser');
    addPopUp();
    generateNewData();
    setCharacterData();
    setClock();
    saveData();
}


const beginGameButton = document.getElementById('beginGame');
const introPopUp = document.getElementById('introPopUp');
const stats = document.getElementById('stats');
const clock = document.getElementById('clock');
const dayCounter = document.getElementById('daysSinceGraduation');
const workButton = document.getElementById('workButton');
const saveDataButton = document.getElementById('saveData');


workButton.addEventListener('click', work);
saveDataButton.addEventListener('click', saveData);
beginGameButton.addEventListener('click', beginGame);

let userName;
let money;
let health;
let age;
let time;
let daysSinceGraduation;




checkForPastSave();
setCharacterData();
setClock();
setWorkButton();



function checkForPastSave(){
    if (localStorage.initializedUser == undefined){
        generateNewData();
    } else {
        loadPastData();
    }
}

function beginGame(){
    removePopUp();
}

function removePopUp(){
    introPopUp.classList.add('hidden');
}
function addPopUp(){
    introPopUp.classList.remove('hidden');
}

function generateNewData(){
    userName = prompt('Enter Name');
    money = 0;
    health = 100;
    age = 18;
    time = 1;
    daysSinceGraduation = 0;
    hourlyWage = 10;
    saveData();
}

function saveData(){
    setStorage('money', money);
    setStorage('name', userName);
    setStorage('health', health);
    setStorage('age', age);
    setStorage('initializedUser', '');
    setStorage('time', time);
    setStorage('daysSinceGraduation', daysSinceGraduation);
    setStorage('hourlyWage', hourlyWage);
}

function loadPastData(){
    removePopUp();
    userName = localStorage.name;
    money = +localStorage.money;
    health = localStorage.health;
    age = localStorage.age;
    time = localStorage.time;
    daysSinceGraduation = localStorage.daysSinceGraduation;
    hourlyWage = localStorage.hourlyWage;
}

function setCharacterData(){
    stats.children[0].innerHTML= `Name: ${userName}`;
    stats.children[1].innerHTML= `Money: $${money}`;
    stats.children[2].innerHTML=`Health: ${health}%`;
    stats.children[3].innerHTML=`Age: ${age} years old`;
}

function setClock(){
    clock.innerText = `${time}:00`;
    dayCounter.innerText = `${daysSinceGraduation} days since graduation`;
}

function setWorkButton(){
    workButton.innerText = `+${hourlyWage}`;
}

function work(){
    money += +hourlyWage;
    time ++;
    if (time == 24){
        time = 1;
        daysSinceGraduation++;
    }
    setClock();   
    setCharacterData(); 
}


function setStorage(location, data){
    localStorage.setItem(location, data);
}
//reset 
let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', resetStats);

function resetStats(){
    localStorage.removeItem('initializedUser');
    checkForPastSave();
}


const beginGameButton = document.getElementById('beginGame');
const introPopUp = document.getElementById('introPopUp');
const stats = document.getElementById('stats');
const clock = document.getElementById('clock');
const dayCounter = document.getElementById('daysSinceGraduation');
const workButton = document.getElementById('workButton');
const saveDataButton = document.getElementById('saveData');
const lastNames = document.getElementsByClassName('lastName');

workButton.addEventListener('click', work);
saveDataButton.addEventListener('click', saveData);
beginGameButton.addEventListener('click', beginGame);

let userName;
let money;
let health;
let age;
let time;
let daysSinceGraduation;
let job;


let daysWorked = 0;


checkForPastSave();
updateAllData();



function checkForPastSave(){
    if (localStorage.initializedUser == undefined){
        addPopUp();
    } else {
        loadPastData();
    }
}

function generateNewData(){
    userName = 'Antony';
    money = 0;
    health = 100;
    age = 18;
    time = 0;
    job = "Dog Walker";
    daysSinceGraduation = 0;
    hourlyWage = 10;
    saveData();
}

function updateCharacterData(){
    stats.children[0].innerText = `Name: ${userName}`;
    stats.children[1].innerText = `Money: $${money}`;
    stats.children[2].innerText = `Health: ${health}%`;
    stats.children[3].innerText = `Age: ${age} years old`;
    stats.children[4].innerText = `Job: ${job}`;
}

function updateClock(){
    clock.innerText = `${time}:00`;
    dayCounter.innerText = `${daysSinceGraduation} days since graduation`;
}

function setWorkButton(){
    workButton.innerText = `+${hourlyWage}/hour`;
}

function beginGame(){
    removePopUp();
    generateNewData();
    updateAllData();
    saveData();
}

function removePopUp(){
    introPopUp.classList.add('hidden');

}
function addPopUp(){
    introPopUp.classList.remove('hidden');
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
    setStorage('daysWorked', daysWorked);
    setStorage('job', job);
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
    daysWorked = localStorage.daysWorked;
    job = localStorage.job;
}





function updateAllData(){
    updateCharacterData();
    updateClock();
    setWorkButton();
}

function work(){
    money += +hourlyWage;
    time ++;
    if (time == 24){
        time = 0;
        daysSinceGraduation++;
    }
    updateClock();   
    updateCharacterData(); 
    daysWorked++;
}


function setStorage(location, data){
    localStorage.setItem(location, data);
}
const game = document.getElementById('game');
const arrHolder = document.createElement('array');
const page = document.getElementById('grid-container');
const end = document.getElementById('end');
const endWin = document.getElementById('win');
const endLose = document.getElementById('lose');
const solved = getNewWord();

//keyboard constants
const keyboardContainer = document.getElementById('keyboard');
const keys = [
    ['q','w','e','r','t','y','u','i','o','p'],
    ['a','s','d','f','g','h','j','k','l'],
    ['z','x','c','v','b','n','m']
];
const keyCodes = [
    [81, 87, 69, 82, 84, 89, 85, 73, 79, 80],
    [65, 83, 68, 70, 71, 72, 74, 75, 76],
    [90, 88, 67, 86, 66, 78, 77]
];
const keyRow = document.createElement('array');

window.addEventListener('keydown', keyboardKey);

let c = 0;
let u = 0;


//settup blank cubes
for (let i = 0; i < 6; i++){
    arrHolder[i] = document.createElement('div');
    arrHolder[i].classList.add('row');
    for (let j = 0; j < 5; j++){
        const arr = [];
        arr[j] = document.createElement('div');
        arr[j].classList.add('letter-box');
        arrHolder[i].appendChild(arr[j]);
    }
    game.appendChild(arrHolder[i]);
}
//settup keyboard
for (let i = 0; i < keys.length; i++){
    keyRow[i] = document.createElement('div');
    keyRow[i].classList.add('rowOfKeys');
    
    for (let j = 0; j < keys[i].length; j++){
        const keysByRow = [];
        keysByRow[j] = document.createElement('button');
        keysByRow[j].classList.add('key');
        keysByRow[j].classList.add('letterKey');
        keysByRow[j].textContent = keys[i][j];
        keyRow[i].appendChild(keysByRow[j]);

        keysByRow[j].addEventListener('mousedown', (e) => {
            keyIsPressed(e, keys[i][j], i, j);
        });
    }
    keyboardContainer.appendChild(keyRow[i]);

}

keyRow[3] = document.createElement('div');
keyRow[3].classList.add('important-buttons');
const deleteButton = document.createElement('button');
deleteButton.classList.add('key');
deleteButton.textContent = 'Delete';
deleteButton.addEventListener('click', () => {
    keyDown('Backspace', 8);
})
keyRow[3].appendChild(deleteButton);

const enterButton = document.createElement('button');
enterButton.classList.add('key');
enterButton.textContent = 'Enter';
enterButton.addEventListener('click', () => {
    keyDown('Enter', 13);
})
keyRow[3].appendChild(enterButton);

keyboardContainer.appendChild(keyRow[3]);


function keyIsPressed(keyPressed, letterOfKey, i, j){
    const valueOfKeyPressed = keyPressed.target.innerHTML;
    keyDown(letterOfKey, keyCodes[i][j]);
}


const backgroundMatthew = document.getElementById('background-video');


function isValidKey(val){
    switch(true){
        case (val == 13): //enter
        case (val == 8): //backspace
        case (val ==16):
            break;

        case (val < 65):
        case (val > 90):
            return false;
    }
}

function keyboardKey(keyPressedOnKeyboard){
    const key = keyPressedOnKeyboard.key;
    const val = keyPressedOnKeyboard.keyCode;
    keyDown(key, val);
}

function keyDown(key, val){
    if (isValidKey(val) == false){
        return;
    }    

    if (key == 'Shift'){
        backgroundMatthew.classList.toggle('hidden');
    }

    if (key == 'Backspace' && c>0){
        c--;
        arrHolder[u].children[c].textContent = '';
    }

    if (key == 'Enter' && c>=5){
        

        checkWord();

        
        
        
        c=0;
        u++;
    }

    if (key != 'Backspace' && key != 'Enter' && key != 'Shift'){
        const letter = document.createElement('h1');
        letter.classList.add('letter')
        letter.textContent=key.toUpperCase();
        arrHolder[u].children[c].appendChild(letter);
        arrHolder[u].childNodes[c].classList.add('newLetter');

        c++;
    }
}

function isCorrect(){

}

function isPartiallyCorrect(){

}

function checkWord(){
    let correctCount = 0;
    let exactCount = 0;
    let tempSolved = solved.slice();

    for (let c = 4; c >= 0; c--){
        if (arrHolder[u].childNodes[c].textContent.toLowerCase() == tempSolved[c]){
            arrHolder[u].childNodes[c].classList.add('fully-guessed');
            updateKeyboard(arrHolder[u].childNodes[c].firstChild.innerHTML.toLowerCase(), 'green');

            tempSolved[c] = '';
            exactCount++;
        }    
    }
    console.log(tempSolved);

    for (c = 4; c >= 0; c--){
        let value = arrHolder[u].childNodes[c].firstChild.innerHTML.toLowerCase();
        let correct = false;
        arrHolder[u].childNodes[c].classList.add('rotate-x');
        if (arrHolder[u].childNodes[c].classList.contains('fully-guessed')){
            correct = true;
        }else{
            console.log(tempSolved);
            for (let j = 4; j >= 0; j--){
                if (value == tempSolved[j]){
                        arrHolder[u].childNodes[c].classList.add('partial-guessed');
                        updateKeyboard(value, 'yellow');
                        correct = true;
                        tempSolved[j]="";

                    }
                
                
            }
        }

        if (correct == false){
            updateKeyboard(value, 'gray');

            arrHolder[u].childNodes[c].classList.add('not-in-word');

        }else{
            correctCount++;
        }
    }
    checkForWin(exactCount, correctCount);
}

function checkForWin(exactCount, correctCount){
    if (exactCount == 5){
        win();
    }
    if (exactCount < 5 && u==5){
        lose();
    }
}

function win(){
    window.removeEventListener('keydown', keyDown);
    end.classList.toggle('hidden');
    let thing = document.createElement('h1');
    thing.textContent = 'It took ' + (u+1) + ' tries.';
    endWin.appendChild(thing);
    endWin.classList.toggle('hidden');
}

function lose(){
    window.removeEventListener('keydown', keyDown);
    end.classList.toggle('hidden');
    page.classList.add('lose');
    endLose.classList.toggle('hidden');


}

function updateKeyboard(value, color){
    for (let i = 0; i < keys.length; i++){
        for (let j = 0; j < keys[i].length; j++){
            if (keys[i][j] == value){
                keyboardContainer.childNodes[i].childNodes[j].classList.add(color);
            }
        }
    }
}

function getNewWord(){
    const date = new Date();
    const wordBank = [
        ['smoke', 'earth', 'milks', 'crate', 'worms', 'edict', 'jumby', 'zilch', 'jumpy', 'fazed', 'elope', 'jacks', 'gauzy', 'kyack', 'alone', 'arise', 'badly', 'audit', 'baker', 'award', 'awake', 'aware', 'block', 'bench', 'break', 'brief', 'build', 'child', 'chase']
    ];
    const wordOfTheDay = wordBank[0][date.getDate()-1];
    console.log("Word of the day: " + wordOfTheDay);
    const returnedArray = [];
    for (let index = 0; index < 5; index++){
        returnedArray.push(wordOfTheDay.charAt(index));
    }
    return returnedArray;
}

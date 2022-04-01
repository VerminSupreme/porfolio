const game = document.getElementById('game');
const arrHolder = document.createElement('array');
const page = document.getElementById('grid-container');
const end = document.getElementById('end');
const endWin = document.getElementById('win');
const endLose = document.getElementById('lose');

const solved = ['h', 'e', 'l', 'p', 's'];
let c = 0;
let u = 0;

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

window.addEventListener('keydown', keydown);

function keydown(keyCode){    
    const key = keyCode.key;
    const val = keyCode.keyCode;
    console.log(val);
    
    switch(true){
        case (val == 13): //enter
        case (val == 8): //backspace
            break;

        case (val < 65):
        case (val > 90):
            return;
    }

    

    if (key == 'Backspace' && c>0){
        c--;
        arrHolder[u].children[c].textContent = '';
    }

    let correctCount = 0;
    if (key == 'Enter' && c>=5){
        let exactCount = 0;
        let tempSolved = solved.slice();
        console.log(keyCode);

        for (c = 4; c >= 0; c--){
            let correct = false;
            for (let j = 4; j >= 0; j--){
                if (arrHolder[u].childNodes[c].firstChild.innerHTML.toLowerCase() == tempSolved[j]){
                    if (j == c){
                        arrHolder[u].childNodes[c].classList.add('fully-guessed');
                        correct = true;
                        exactCount++;
                    }else{
                        arrHolder[u].childNodes[c].classList.add('partial-guessed');
                        correct = true;
                    }
                    tempSolved[j]="";
                    console.log(tempSolved);
                    j=-1;
                }
                 
            }
            if (correct == false){
                arrHolder[u].childNodes[c].classList.add('not-in-word');
            }else{
                correctCount++;
            }
        }
        
        if (exactCount == 5){
            win();
        }
        if (exactCount < 5 && u==5){
            lose();
        }
        c=0;
        u++;
    }

    if (key != 'Backspace' && key != 'Enter'){
        const letter = document.createElement('h1');
        letter.classList.add('letter')
        letter.textContent=key.toUpperCase();
        arrHolder[u].children[c].appendChild(letter);
        arrHolder[u].childNodes[c].classList.add('newLetter');

        c++;
    }
}

function win(){
    window.removeEventListener('keydown', keydown);
    end.classList.toggle('hidden');
    let thing = document.createElement('h1');
    thing.textContent = 'It took ' + (u+1) + ' tries.';
    endWin.appendChild(thing);
    endWin.classList.toggle('hidden');
}

function lose(){
    window.removeEventListener('keydown', keydown);
    end.classList.toggle('hidden');
    page.classList.add('lose');
    endLose.classList.toggle('hidden');


}

/*
function getNewWord(){
    const listOfWords = 'radio plant faces happy farce elope';
    const todaysWord = listOfWords.substring((Math.floor(Math.random())*6)*6, ());
    console.log(todaysWord);
    return ['a', 'b', 'c', 'd', 'e']
}
*/
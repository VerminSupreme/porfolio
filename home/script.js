const game = document.getElementById('game');
const arr = [];
const solved = ['h', 'e', 'a', 'r', 't'];
let c = 0;

for (let i = 0; i < 5; i++){
    arr[i] = document.createElement('div');
    arr[i].classList.add('letter-box');
    game.appendChild(arr[i]);
}

window.addEventListener('keydown', keydown);

function keydown(keyCode){    
    const key = keyCode.key;
    if (key == 'Backspace'){
        c--;
        arr[c].textContent = '';
    }

    if (key == 'Enter' && c==5){
        for (c = 4; c >= 0; c--){
            for (let j = 0; j < 5; j++){
                if (arr[c].childNodes[0].innerHTML == solved[j]){
                    if (j == c){
                        arr[c].classList.add('fully-guessed');
                    }else{
                        arr[c].classList.add('partial-guessed');
                    }
                } 
            }
        }

    }

    if (key != 'Backspace' && key != 'Enter'){
        const letter = document.createElement('h1');
        letter.classList.add('letter')
        letter.textContent=key;
        arr[c].appendChild(letter);
        c++;
    }
}
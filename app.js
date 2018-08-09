/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var roundScore,roundResult,Score,isPlaying,previousRoll,winScore;

init();

//Initializing

function init() {
  Score=[0,0];
  roundResult=0;
  activePlayer=0;
  roundScore=0;
  previousRoll=[0,0];
  isPlaying=true;
  winScore=100;
  document.querySelector('#score-0').textContent=0;
  document.querySelector('#score-1').textContent=0;
  document.querySelector('#current-0').textContent=0;
  document.querySelector('#current-1').textContent=0;
  document.getElementById('name-0').textContent="Player-0";
  document.getElementById('name-1').textContent="Player-1";
  document.querySelector('.dice').style.visibility='hidden';
  document.querySelector('.dice2').style.visibility='hidden';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.winScore').value='';
  document.querySelector('.winScore').classList.remove('disabled');
  document.querySelector('.winScore').readOnly = false;
  document.querySelector('.v').style.zIndex=0;
}

document.querySelector('.btn-rule').addEventListener('click',function(){
  document.querySelector('.v').style.zIndex=1;
});
document.querySelector('.btn-close').addEventListener('click',function(){
  document.querySelector('.v').style.zIndex=0;
});
//Roll button
document.querySelector('.btn-roll').addEventListener('click',function() {
  if(isPlaying)
    roll();
});

//Hold Button
document.querySelector('.btn-hold').addEventListener('click',function(){
  if(isPlaying)
    hold();
});

//New Game button

document.querySelector('.btn-new').addEventListener('click',init);

//New Winning Score Event EventListener

document.querySelector('.winScore').addEventListener('keypress',function (k) {
    if(k.key==='Enter'){
      winScore=document.querySelector('.winScore').value;
      document.querySelector('.winScore').readOnly = true;
      document.querySelector('.winScore').classList.add('disabled');
    }
});

//Roll Mechanism

function roll(){
  var rand=[];
//Random Number Genaretion from 1-6
  rand[0]=Math.floor(Math.random()*6+1);
  rand[1]=Math.floor(Math.random()*6+1);
  //Changing Dice1 Image
  document.querySelector('.dice').style.visibility='visible';
  document.querySelector('.dice').srcset="dice-"+rand[0]+".png"
  //Changing Dice2 Image
  document.querySelector('.dice2').style.visibility='visible';
  document.querySelector('.dice2').srcset="dice-"+rand[1]+".png"
  //checking for 1
  if(rand[0]==1||rand[1]==1)
    lose();
  //Two consequent 6
  else if ((rand[0]===previousRoll[0]&&previousRoll[0]===6)||(rand[1]===previousRoll[1]&&previousRoll[1]===6)) {
    lose();
  } else{  //Adding round scores and updating DOM
    previousRoll=[rand[0],rand[1]];
    roundScore+=rand[0]+rand[1];
    document.querySelector('#current-'+activePlayer).textContent=roundScore;
  }
}

//Hold Mechanism

function hold(){
  //Adding Round Score to Player Score and Updating DOM
  Score[activePlayer]+=roundScore;
  //Checking If Winner
  if(Score[activePlayer]>=winScore)
    winner();
  else{ //Switching Between Players
    togglePlayer();
  }
}

//Looses For 1 or 6-6
function lose(){
  if (previousRoll[0]===6||previousRoll[1]===6){
    //Two 6 makes Total Score to 0
    Score[activePlayer]=0;
    previousRoll=[0,0];
  }
  togglePlayer();
}

//Toggling Between PLAYERS

function togglePlayer(){
  previousRoll=[0,0];
  roundScore=0;
  document.querySelector('#current-'+activePlayer).textContent=0;
  document.querySelector('#score-'+activePlayer).textContent=Score[activePlayer];
  document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
}
//Winner Mechanism

function winner(){
  document.querySelector('#score-'+activePlayer).textContent=Score[activePlayer];
  document.querySelector('#name-'+activePlayer).textContent="Winner";
  document.querySelector('.dice').style.visibility='hidden';
  document.querySelector('.dice2').style.visibility='hidden';
  document.querySelector('.player-'+activePlayer+'-panel').classList.toggle('active');
  document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
  isPlaying=false;
}

//Global Constants


//Global Variables
var clueHoldTime = 1500; //how long each button will be held by computer (milliseconds)
var cluePauseTime = 333; //how long to wait between clues (milisecons)
var nextClueWaitTime = 1300; // how long to wait before playing the next sequence (miliseconds)

var pattern = []; //stores game pattern
var patternLength = 8; //how long the game pattern is (Easy: 4  Medium: 8  Hard: 14)
var buttonAmount = 4; //number of buttons in game area
var progress = 0; //how far into pattern 
var guessCounter = 0; //how many guess player made
var healthCounter = 3; //health amount
var gamePlaying = false; //game state
var gameDifficulty = 'E';

var tonePlaying = false; //tone state
var volume = 0.5; //Between 0.0 and 1.0

var timerValue = 25; //length of screen timer in seconds
var turnStatus;
var timerId;
var timerEndId;


/*** GAME BUTTONS ***/

//Sets the number of buttons in game area (btn: 4-8)
function setButtonAmount (setAmount) {
  
  //Do nothing if game in progress
  if (gamePlaying) return;
  
  //Do nothing if invalid button amount
  if (setAmount > 8 || setAmount < 4) return;
  
  //Do nothing if button amount is already set
  if (setAmount === buttonAmount) return;
  
  
  //If setting more buttons
  if (buttonAmount < setAmount) {
    for (let amount = buttonAmount; amount <= setAmount; amount++) 
      addButton(amount);
    
    buttonAmount = setAmount;
    return;
  }
  
  //If setting less buttons
  for (let amount = buttonAmount; amount > setAmount; amount--) 
    removeButton(amount);
  
  buttonAmount = setAmount;
  return;
}

//Displays specific game area button (btn: 1-8)
function addButton (btn) {
  
  document.getElementById("button" + btn).classList.remove("hidden");
}

//Hides specific game area button (btn: 1-8)
function removeButton (btn) {
  
  document.getElementById("button" + btn).classList.add("hidden");
}

//Lights up a button (btn: 1-8)
function lightButton(btn) {
  document.getElementById("button" + btn).classList.add("lit");
}

//Clears lit up button (btn: 1-8)
function clearButton(btn) {
  document.getElementById("button" + btn).classList.remove("lit");
}

//Disable a game button (btn: 1-8) 
function disableBtn (btn) {
  
  document.getElementById("button" + btn).setAttribute("onclick", "");
  document.getElementById("button" + btn).setAttribute("onmousedown", "");
  document.getElementById("button" + btn).setAttribute("onmouseup", "");
}

//Enable a game button (btn: 1-8)
function enableBtn (btn) {
  
  document.getElementById("button" + btn).setAttribute("onclick", "guess("+btn+")");
  document.getElementById("button" + btn).setAttribute("onmousedown", "startTone(" + btn + ")");
  document.getElementById("button" + btn).setAttribute("onmouseup", "stopTone(" + btn + ")");
}

//Disable all game buttons 
function disableAllBtns () {
  
  for (let i = 1; i <= buttonAmount; i++) 
    disableBtn(i);
  
}

//Enable all game buttons 
function enableAllBtns () {
  
  for (let i = 1; i <= buttonAmount; i++) 
    enableBtn(i);
}

/********************************/

/*** GAME MECHANICS ***/

//Start the game
function startGame() {
  
  //initialize game variables
  progress = 0;
  gamePlaying = true;
  pattern.length = 0;
  initPattern(pattern, patternLength);
  
  //reset hearts
  healthCounter = 3;
  document.getElementById("heart1").classList.remove("hidden");
  document.getElementById("heart2").classList.remove("hidden");
  document.getElementById("heart3").classList.remove("hidden");
  
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  playClueSequence();
}

//Stop the game
function stopGame() {
  
  //terminates current game
  gamePlaying = false;
  clearTimeout(turnStatus);
  resetTimer();
  updateTurnStatus('i');
  setDifficulty(gameDifficulty);
  document.getElementById("startBtn").classList.remove("hidden");
  document.getElementById("stopBtn").classList.add("hidden");
}

//Generates random pattern
function initPattern(pattern, patternLength) {
  
  //Fill pattern with amount of values as specified by patternLength
  for (let i = 0; i < patternLength; i++) {
    pattern.push( Math.floor(Math.random() * buttonAmount) + 1 )
  }
}

//Sets the difficulty (E, M, H, or D)
function setDifficulty(difficulty) {
  
  if (gamePlaying) { return; } 
  
  difficulty = difficulty.toUpperCase();
  if ( !((difficulty === 'E') || (difficulty === 'M') || (difficulty === 'H') || (difficulty === 'D')) ) {   //If inncorrect difficulty value, return
    return; 
  }
  
  gameDifficulty = difficulty;
  
  switch (difficulty) {
      
    case 'E':
      patternLength = 4;
      clueHoldTime = 1500;
      cluePauseTime = 333;
      timerValue = 25;
      resetTimer();
      document.getElementById("difficultyButton").innerHTML = 'Easy';
      break;
      
    case 'M':
      patternLength = 8;
      clueHoldTime = 500;
      cluePauseTime = 333;
      timerValue = 20;
      resetTimer();
      document.getElementById("difficultyButton").innerHTML = 'Medium';
      break;
      
    case 'H':
      patternLength = 14;
      clueHoldTime = 100;
      cluePauseTime = 333;
      timerValue = 15;
      resetTimer();
      document.getElementById("difficultyButton").innerHTML = 'Hard';
      break;
      
      case 'D':
      patternLength = 10;
      clueHoldTime = 1100;
      cluePauseTime = 333;
      timerValue = 20;
      resetTimer();
      document.getElementById("difficultyButton").innerHTML = 'Dynamic';
      break;
  }
}

//Plays a single clue for the specified button
function playSingleClue(btn) {
  
  if (gamePlaying) {
    lightButton(btn);
    playTone(btn, clueHoldTime);
    setTimeout(clearButton, clueHoldTime, btn);
  }
}

//Plays a sequence of clues 
function playClueSequence() {
    
  guessCounter = 0;
  disableAllBtns();
  turnStatus = updateTurnStatus('w');

  let delay = nextClueWaitTime; //set delay for the initial wait time
  for (let i = 0; i <= progress; i++) { //for each clue that is revealed thus far: 
    setTimeout(playSingleClue, delay, pattern[i]) //set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime; 
  }
  
  setTimeout(enableAllBtns, delay);
  turnStatus = setTimeout(updateTurnStatus, delay+100, 'g');
  
  //if gamemode is dynamic, incrament the playback speed
  if (gameDifficulty === 'D')
    clueHoldTime -= 100;
  
  timerId = setTimeout(startTimer, delay); //start timer and store timer's id 
}

//Analyze player input
function guess(btn) {
    
  //wrong guess
  if (!gamePlaying)
    return;
  
  //If guess doesn't equal the correct answer
  if ( !(btn == pattern[guessCounter]) ) {
    penalty();
    return;
  }
  
  //If the guess is right: 
  guessCounter++;
  
  //If it's the last guess of the turn
  if (guessCounter > progress) {
    
    //If it is the last turn and the guess is right, win game
    if (progress == patternLength - 1) {
      winGame();
      return;
    }
    
    //If not the last turn, play the next sequence
    resetTimer();
    progress++;
    playClueSequence();
  }
}  

//Penalizes player for wrong guess; reduces heart count; accounts for game over
function penalty () {
  
  if (healthCounter > 0) {
    document.getElementById("heart" + healthCounter).classList.add("hidden");
    healthCounter--;
    
    if (healthCounter === 0) { setTimeout(loseGame, 10); }
  }
}

//Changes turn status (I: invisible  W: wait  G: go)
function updateTurnStatus (status) {
  
  status = status.toUpperCase();
  if ( !((status === 'I') || (status === 'W') || (status === 'G')) ) {   //If inncorrect status value, return
    return; 
  }
  
  switch (status) {
      
    case 'I':
      document.getElementById("turnStatus").classList.add("hidden");
      break;
      
    case 'W':
      document.getElementById("turnStatus").classList.remove("hidden");
      document.getElementById("turnStatus").innerHTML = 'Wait . . .';
      document.getElementById("turnStatus").style.color = 'red';
      break;
      
    case 'G':
      document.getElementById("turnStatus").classList.remove("hidden");
      document.getElementById("turnStatus").innerHTML = 'Go!';
      document.getElementById("turnStatus").style.color = 'green';
      document.getElementById("turnStatus").style.fontStyle = 'italic';
      break;
  }  
}


//Starts the screen timer
function startTimer () {
  
  var time = timerValue;
  
  timerId = setInterval( function() {
    time--;
    document.getElementById("timer").innerHTML = time;
  }, 1000);
   
  timerEndId = setTimeout(loseGame, timerValue*1000); 
  return timerId;
}

//Resets the screen timer
function resetTimer () {
  
  clearTimeout(timerEndId);
  clearInterval(timerId);
  document.getElementById("timer").innerHTML = timerValue;
}

//Display lose message
function loseGame() {
  
  stopGame();
  alert("Game Over.\nYou Lost.");
}

//Display win message
function winGame() {
  
  stopGame();
  alert("Congradulations!!!\nYou Win!");
}

/*********************************/

/*** SOUND MECHANICS ***/

//Page Initialization
//  Initialize Sound Synthesizer
var context = new AudioContext();
var oscillator = context.createOscillator();
var gain = context.createGain();
gain.connect(context.destination);
gain.gain.setValueAtTime(0, context.currentTime);
oscillator.connect(gain);
oscillator.start(0);

var soundTheme = "Melody";


//List of sound themes
const soundThemeList = {
  1: "melody",
  2: "pokemon",
  3: "nintendo"
}

//Frequency values for each button
const freqMap = {
  1: 261.626,
  2: 293.665,
  3: 329.628,
  4: 349.228,
  5: 391.995,
  6: 440.000,
  7: 493.883,
  8: 523.251
}

const pokemonAudio = {
  1: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fbulbasaur.mp3?v=1616431001915',  //Bulbasaur
  2: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fsquirtle.mp3?v=1616431002413',   //Squirtle
  3: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fcharmander.mp3?v=1616431114006', //Charmander
  4: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fpikachu.mp3?v=1616431002258',    //Pikachu
  5: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fgrowlithe.mp3?v=1616440410867',  //Growlithe
  6: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fjigglypuff.mp3?v=1616440683317', //Jigglypuff
  7: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fditto.mp3?v=1616451947068',      //Ditto
  8: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fsnorlax.mp3?v=1616431002607'     //Snorlax
}

const pokemonIcon = {
  1: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fbulbasaur.png?v=1616440926976',  //Bulbasaur
  2: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fsquirtle.png?v=1616440926860',   //Squirtle
  3: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fcharmander.png?v=1616440927144', //Charmander
  4: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fpikachu.png?v=1616440926860',    //Pikachu
  5: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fgrowlithe.png?v=1616440928379',  //Growlithe
  6: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fjigglypuff.png?v=1616440928531', //Jigglypuff
  7: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2F132.png?v=1616451945955',        //Ditto
  8: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2Fsnorlax.png?v=1616440928648'     //Snorlax
}

const nintendoAudio = {
  1: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FLuigi.mp3?v=1616470005405',       //Luigi
  2: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FSonic.mp3?v=1616472792604',       //Sonic
  3: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FMario.mp3?v=1616470006143',       //Mario
  4: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FWario.mp3?v=1616470006733',       //Wario
  5: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FDonkeyKong.mp3?v=1616470006114',  //Donkey Kong
  6: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FKirby.mp3?v=1616470006553',       //Kirby
  7: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FFox.mp3?v=1616470005754',         //Fox
  8: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FYoshi.mp3?v=1616470005405'        //Yoshi
}

const nintendoIcon = {
  1: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FLuigi.png?v=1616470098159',       //Luigi
  2: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FSonic.png?v=1616470098159',       //Sonic
  3: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FMario.png?v=1616470099443',       //Mario
  4: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FWario.png?v=1616470098315',       //Wario
  5: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FDonkey_Kong.png?v=1616470098159', //Donkey Kong
  6: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FKirby.png?v=1616470098159',       //Kirby
  7: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FFox.png?v=1616470099474',         //Fox
  8: 'https://cdn.glitch.com/cc06d791-c5d4-45d2-a133-dc4ef737ddd2%2FYoshi.png?v=1616470098186'        //Yoshi
}

//Set specified theme
function setSoundTheme (theme) {
  
  //game not running
  if (gamePlaying) { return; } 
  
  //check for correct input
  theme = theme.toLowerCase();
  let listLength = Object.keys(soundThemeList).length;
  
  for (let i = 1; i <= listLength; i++) {
    if (theme == soundThemeList[i])
      break;
    
    if (i == listLength)
      return;
  }
  
  //Set image sources to corresponding theme
  switch (theme) {
      
    case "melody":
      break;
      
    case "pokemon":
      setPokemonImages();
      break;
      
    case "nintendo":
      setNintendoImages();
      break;
  }
  
  soundTheme = theme.charAt(0).toUpperCase() + theme.substring(1);
  document.getElementById("soundsButton").innerHTML = soundTheme;
}

//Takes in button number to be pressed (1-8) and the length of time (miliseconds)
function playTone(btn, len) {
  
  switch (soundTheme) {
      
    case "Melody":
      playMelody(btn, len);
      break;
      
    case "Pokemon":
      playPokemon(btn);
      break;
      
    case "Nintendo":
      playNintendo(btn);
      break;
  }
}

//Takes in button number to be played (1-8)
function startTone(btn) {
  
  switch (soundTheme) {
      
    case "Melody":
      startMelody(btn);
      break;

    case "Pokemon":
      startPokemon(btn);
      break;

    case "Nintendo":
      startNintendo(btn);
      break;
  }
}

//Stops any tones being played
function stopTone(btn) {
  
  switch (soundTheme) {
      
    case "Melody":
      stopMelody();
      break;

    case "Pokemon":
      stopPokemon(btn);
      break;
    
    case "Nintendo":
      stopNintendo(btn);
      break;
  }
}




/*MELODY*/

//Play melody sounds (btn: 1-8)
function playMelody(btn, len) {
  
  oscillator.frequency.value = freqMap[btn];
  gain.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
  tonePlaying = true;
  setTimeout(function() {
    stopTone(btn);
  }, len);
}

//Starts playing a specific melody button (btn: 1-8)
function startMelody(btn) {
  
  if(!tonePlaying) {
    //play sound
    oscillator.frequency.value = freqMap[btn];
    gain.gain.setTargetAtTime(volume, context.currentTime + 0.05, 0.025);
    tonePlaying = true;
  }
}

//Stops playing a melody button
function stopMelody() {
  
  gain.gain.setTargetAtTime(0, context.currentTime + 0.05, 0.025);
  tonePlaying = false;
}



/*POKEMON*/

//Play pokemon sounds (btn: 1-8)
function playPokemon(btn) {
  
  startPokemon(btn);
  setTimeout(stopPokemon, clueHoldTime,btn);
}

//Starts pokemon sound and shows image
function startPokemon(btn) {
  
  document.getElementById("buttonImg" + btn).classList.remove("hidden");
  let audio = new Audio(pokemonAudio[btn]);
  audio.play();
}

//Hides pokemon image
function stopPokemon(btn) {
  
  document.getElementById("buttonImg" + btn).classList.add("hidden");
}

//Set button images to pokemon
function setPokemonImages() {
  
  let listLength = Object.keys(pokemonIcon).length;
  for (let i = 1; i <= listLength; i++) {
    document.getElementById("buttonImg" + i).src = pokemonIcon[i];
  }
}



/*NINTENDO*/

//Play nintendo sounds (btn: 1-8)
function playNintendo(btn) {
  
  startNintendo(btn);
  setTimeout(stopNintendo, clueHoldTime,btn);
}

//Starts nintendo sound and shows image
function startNintendo(btn) {
  
  document.getElementById("buttonImg" + btn).classList.remove("hidden");
  let audio = new Audio(nintendoAudio[btn]);
  audio.play();
}

//Hides nintendo image
function stopNintendo(btn) {
  
  document.getElementById("buttonImg" + btn).classList.add("hidden");
}

//Set button images to nintendo
function setNintendoImages() {
  
  let listLength = Object.keys(nintendoIcon).length;
  for (let i = 1; i <= listLength; i++) {
    document.getElementById("buttonImg" + i).src = nintendoIcon[i];
  }
}

/*********************************/
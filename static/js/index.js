let all_elts = Array.from(document.querySelectorAll("a.elts"))
const doneBtn = document.querySelector('button.doneBtn')
const replay = document.getElementById('replay')
const yes_add = document.getElementById('yes')
const no_add = document.getElementById('no')
const showMix = document.getElementById('showMixes')
const modal = document.getElementById("myModal");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

let mix = [];
let answer;
let userdata;
// doneBtn.addEventListener('click', done)
doneBtn.addEventListener('click', doneButn)
replay.addEventListener('click', playAgain)
yes_add.addEventListener('click', addLocal)

let recipeBook = {  //all the chemicals that can be formed with the given recipies
  'saltwater': 'saltwater', 
  'alcoholbleach': 'Chlorform',
  'bleachvinegar': 'Toxic Chlorine Gas',
  'ammoniableach': 'Toxic Chloramine Vapors',
  'hydrogenperoxidevinegar': 'Peracetic Acid',
  'sodiumchlorine': 'Salt'
}

if (localStorage.getItem("don't_mix_that")) {
  userdata = JSON.parse(localStorage.getItem("don't_mix_that"))
} else {
  userdata = { //new mix holds the new recipies the user makes
    mix: []
  }
}

function addLocal(){ //adds it to local storage
  console.log(userdata)
  console.log(answer)
  userdata.mix.push(answer)
  console.log(userdata)
  // Convert to JSON
  const json = JSON.stringify(userdata)
  // Save to localStorage
  localStorage.setItem("don't_mix_that", json)
}

function displayMix(){
  console.log('########mixes#######')
  console.log(userdata.mix)
  console.log(JSON.stringify(userdata.mix[0]))
  console.log(JSON.stringify({data: userdata.mix[0] }))
  showMix.innerHTML = JSON.stringify(userdata.mix[0]); 
}

function checkSelect(){ //checks wether the element is clicked and adds it into an array
  all_elts.forEach(elt => elt.addEventListener('click', () => {
    console.log(elt)
    elt.style.opacity = 0.2;  //when you click an element, change opacity
    mix.push(elt.getAttribute('id'))
    console.log(mix)
  }))
}

function doneButn(){ //when the done button is clicked
  modal.style.display = "block";
  game()
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function game(){
  //will have the game logic 
  const ab = mix[0] + mix[1] //changes the array index to mixed strings
  const ba = mix[1] + mix[0] //changes the array index to mixed strings
  //checks wether either of these two mixes exist in the recipie book
  answer = recipeBook[ab] === undefined ? recipeBook[ba] : recipeBook[ab]
  console.log(answer)
  checkDone(answer) //call done function to check wether your mixture worked or not
  return answer
}

function checkDone(answer){ //once the done button is clicked checks win/loss
  if (answer == null){
    document.getElementById("message").innerHTML = `You didn't make anything lethal`;    
  }
  
  else{
    document.getElementById("message").innerHTML = `You made ${answer}! Add it to your new mix list?`;
    document.getElementById("yes").innerHTML = `Yes`
    document.getElementById("no").innerHTML = `No`
  }
}

function playAgain() { //reloads the page for a new game
  document.location.reload();
}


checkSelect()
displayMix()
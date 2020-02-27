let all_elts = Array.from(document.querySelectorAll("a.elts"))
const doneBtn = document.querySelector('button.doneBtn')
const replay = document.getElementById('replay')
const yes_add = document.getElementById('yes')
const no_add = document.getElementById('no')
const showMix = document.getElementById('showMixes')
const modal = document.getElementById("myModal");
const alertfull = document.getElementById("alertfull");
// Get the <cancelBtn> element that closes the modal
let cancelBtn = document.getElementsByClassName("close")[0];

let mix = [];
let answer;
let userdata;
getUserData();
console.log()
let recipeBook = {  //all the chemicals that can be formed with the given recipies
  'saltwater': 'saltwater', 
  'alcoholbleach': 'Chlorform',
  'bleachvinegar': 'Toxic Chlorine Gas',
  'ammoniableach': 'Toxic Chloramine Vapors',
  'hydrogenperoxidevinegar': 'Peracetic Acid',
  'sodiumchlorine': 'Salt'
}

// doneBtn.addEventListener('click', done)
doneBtn.addEventListener('click', showModal)
replay.addEventListener('click', playAgain)
yes_add.addEventListener('click', addLocal)
// When the user clicks on <cancelBtn> (x), close the modal
cancelBtn.addEventListener('click', function() {
  modal.style.display = "none";
})
// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
})
//when you click an element, change opacity
all_elts.forEach(elt => elt.addEventListener('click', () => {
      console.log(elt)
      if(mix.length < 2){
        elt.style.opacity = 0.2;  
        mix.push(elt.getAttribute('id'))
      }
      else{
        // alert("don't do that")
        alertfull.innerHTML = "You can't click morethan two elements"
      }
      console.log(mix)
    }))

// let background = JSON.parse(localStorage.getItem("SETTINGS"))
// //changing background of the getAnswer based on the characters
// console.log(background.character)
// if (background.character == 'chef'){
//   body.style.backgroundImage = "url(static/images/background-chef.jpeg)";

// }else if (background.character == 'madscientist'){
//   body.style.backgroundImage = "url(static/images/background-scientist.jpeg)";

// }else if (background.character == 'alchemist'){
//   body.style.backgroundImage = "url(static/images/background-alchemist.jpeg)";

// }else{
//   body.style.backgroundImage = "url(static/images/background-witch.jpeg)";
// }

function getUserData() {
  if (localStorage.getItem("don't_mix_that")) {
    userdata = JSON.parse(localStorage.getItem("don't_mix_that"))
  } else {
    userdata = { //new mix holds the new recipies the user makes
      mix : [] //empty out the mixed array
    }
  }
}

//adds it to local storage
function addLocal(){ 
  userdata.mix.push(answer)
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

//Displays a modal for the user after the game is done
function showModal(){ 
  modal.style.display = "block";
 getAnswer()
}

//will have the getAnswer logic 
function getAnswer(){
  const mixOne = mix[0] + mix[1] //changes the array index to mixed strings
  const mixTwo = mix[1] + mix[0] //changes the array index to mixed strings
  //checks wether either of these two mixes exist in the recipe book
  answer = recipeBook[mixOne] === undefined ? recipeBook[mixTwo] : recipeBook[mixOne]
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

function playAgain() { //reloads the page for a new getAnswer
  //clear local storage
  //don't reload the page
  mix = []; //empty out the mix array
  all_elts.forEach(function (elt) { //change the element opacity to 1
    elt.style.opacity = 1;  
  })
  modal.style.display = "none"; //hide the modal
  alertfull.innerHTML = "" //deletes the alert message from the selection bar

}

displayMix()

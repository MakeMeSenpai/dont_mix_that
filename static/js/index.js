let all_elts = Array.from(document.querySelectorAll("a.elts"))
const doneBtn = document.querySelector('button.doneBtn')
const replay = document.getElementById('replay')
const yes_add = document.getElementById('yes')
const no_add = document.getElementById('no')
let mix = [];
let answer;
// doneBtn.addEventListener('click', done)
doneBtn.addEventListener('click', game)
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

let userdata = localStorage.getItem("don't_mix_that")

userdata = { //new mix holds the new recipies the user makes
  mix: []
}

function addLocal(){
  console.log(answer)
  userdata.mix.push(answer)
  console.log(userdata)
  // Convert to JSON
  const json = JSON.stringify(userdata)
  // Save to localStorage
  localStorage.setItem("don't_mix_that", json)

}

function checkSelect(){ //checks wether the element is clicked and adds it into an array
  all_elts.forEach(elt => elt.addEventListener('click', () => {
    console.log(elt)
    // elt.style.backgroundColor = 'pink';
    elt.style.opacity = 0.2;  //when you click an element, change opacity
    mix.push(elt.getAttribute('id'))
    console.log(mix)
  }))
}

function game(){
  //will have the game logic 
  const ab = mix[0] + mix[1] //changes the array index to mixed strings
  const ba = mix[1] + mix[0] //changes the array index to mixed strings
  //checks wether either of these two mixes exist in the recipie book
  answer = recipeBook[ab] === undefined ? recipeBook[ba] : recipeBook[ab]
  console.log(answer)
  done(answer) //call done function to check wether your mixture worked or not
  return answer
}

function done(answer){ //once the done button is clicked checks win/loss
  if (answer == null){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("message").innerHTML = `You didn't make anything lethal`;    
  }
  
  else{
    // alert(`Congrats! Score: ${score}`)
    document.getElementById("overlay").style.display = "block";
    document.getElementById("message").innerHTML = `You made ${answer}! Add it to your new mix list?`;
    document.getElementById("yes").innerHTML = `Yes`
    document.getElementById("no").innerHTML = `No`
  }
}

function playAgain() { //reloads the page for a new game
  document.location.reload();
}

checkSelect()

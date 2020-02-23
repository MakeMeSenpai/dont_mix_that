let all_elts = Array.from(document.querySelectorAll("a.elts"))
const doneBtn = document.querySelector('button.doneBtn')
const replay = document.getElementById('replay')
let mix = [];
// doneBtn.addEventListener('click', done)
doneBtn.addEventListener('click', game)
replay.addEventListener('click', playAgain)

let recipeBook = {
  'saltwater': 'saltwater', 
  'alcoholbleach': 'Chlorform',
  'bleachvinegar': 'Toxic Chlorine Gas',
  'ammoniableach': 'Toxic Chloramine Vapors',
  'hydrogenperoxidevinegar': 'Peracetic Acid',
  'sodiumchlorine': 'Salt'
}

let newMix = {

}
function checkSelect(){
  all_elts.forEach(elt => elt.addEventListener('click', () => {
    console.log(elt)
    elt.style.backgroundColor = 'pink'; 
    mix.push(elt.getAttribute('id'))
    console.log(mix)
  }))
}

function game(){
  //will have the game logic 
  const ab = mix[0] + mix[1] //changes the array index to mixed strings
  const ba = mix[1] + mix[0] //changes the array index to mixed strings
  //checks wether either of these two mixes exist in the recipie book
  const answer = recipeBook[ab] === undefined ? recipeBook[ba] : recipeBook[ab]
  console.log(answer)
  done(answer) //call done function to check wether your mixture worked or not
  return answer
}

function done(answer){
  if (answer == null){
    document.getElementById("overlay").style.display = "block";
    document.getElementById("message").innerHTML = `You didn't make anything lethal`;    
  }
  
  else{
    // alert(`Congrats! Score: ${score}`)
    document.getElementById("overlay").style.display = "block";
    document.getElementById("message").innerHTML = `You made ${answer}! Add it to your new mix list?`;
    
  }
}

function playAgain() {
  document.location.reload();
}

checkSelect()

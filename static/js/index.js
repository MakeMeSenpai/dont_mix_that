let all_elts = Array.from(document.querySelectorAll("a.elts"))
const doneBtn = document.querySelector('button.doneBtn')
const replay = document.getElementById('replay')
let score = 0
doneBtn.addEventListener('click', done)
replay.addEventListener('click', playAgain)

function check(){
  all_elts.forEach(elt => elt.addEventListener('click', () => {
    console.log(elt)
    elt.style.backgroundColor = 'pink'; 
    score += parseInt(elt.getAttribute('data-points'))
    console.log(score)
  }))
  }

function done(){
  if (score >= 100){
    // alert(`Congrats! Score: ${score}`)
    document.getElementById("overlay").style.display = "block";
    document.getElementById("message").innerHTML = "You win!";


  }
  else{
    // alert(`You lose! Score: ${score}`)
    document.getElementById("overlay").style.display = "block";
    document.getElementById("message").innerHTML = "You lose!";
  }
}

function playAgain() {
  document.location.reload();
}

check()

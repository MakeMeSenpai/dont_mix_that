let all_elts = Array.from(document.querySelectorAll("a.elts"))
const doneBtn = document.querySelector('button.doneBtn')
let score = 0
doneBtn.addEventListener('click', done)

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
    alert(`Congrats! Score: ${score}`)
  }
  else{
    alert(`You lose! Score: ${score}`)
  }
}

check()

let elt1 = document.getElementById('elt1')
let elt2 = document.getElementById('elt2')
let elt3 = document.getElementById('elt3')

console.log(elt1.style.backgroundColor)
function el1() {
    elt1.style.backgroundColor = "blue";
    // document.getElementById("demo1").style.visibility="hidden";
  }
  
  function el2() {
    elt2.style.backgroundColor = "blue";
  }

  function el3() {
    elt3.style.backgroundColor = "blue";
  }
  console.log('**************')
  const style = getComputedStyle(elt1)
//   console.log(style)
  console.log(elt1.style.backgroundColor)

  function change_color(){
    if (elt1.style.backgroundColor == 'blue'){
        console.log("don't mix that");
        alert("game over")
      }
      else{
        console.log("no");
        //   alert('no')
      }
  }

// console.log(elts)
// function allowDrop(ev) {
//     ev.preventDefault();
//   }
  
//   function drag(ev) {
//     ev.dataTransfer.setData("Text", ev.target.id);
//     var elts = ev.target.id
//     console.log(elts)
//     ev.style.visibility="hidden";
//   }
  
//   function drop(ev) {
//     ev.preventDefault();
//     console.log(ev.target)
//     elt1.style.visibility="hidden";
  
    // elt2.style.visibility="hidden";
    // elt3.style.visibility="hidden";
    // var data = ev.dataTransfer.getData("Text");
    // ev.target.appendChild(document.getElementById(data));
//   }

setInterval(change_color(), 10);
// setInterval()
//   change_color()
const showMix = document.getElementById('showMixes')

if (localStorage.getItem("don't_mix_that")) {
    userdata = JSON.parse(localStorage.getItem("don't_mix_that"))
}

function displayMixes(){
  console.log('########mixes#######')
  console.log(userdata.mix)
  console.log(JSON.stringify(userdata.mix[0]))
  console.log(JSON.stringify({data: userdata.mix[0] }))
  showMix.innerHTML = JSON.stringify(userdata.mix); 
}

displayMixes()

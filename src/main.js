// put some gay shit on top with a name or something
// add a system to report the hex of the color
// detect element clicked on to copy color of element to clippy boy
// split up the sliders and the generate button so that the sliders are seperate
// find some way to show the slider variables next to the label
// im only doing 3 columns for the future... maybe
// I need to figure out my color scheme, probably something with warm/cool grey material
// use the enter and space key to generate colors
// I need to change the scheme so it looks like a webpage
// save colors to the right and move the generator to the left
<<<<<<< HEAD
// make a function to convert hsl to rgb you lazy heck
// live update the colors with value sliders
=======
>>>>>>> 7e4a6ff1a9c8221ced67c4fec79d519b2c6c40be

function init() {
  // event listeners

  // click generate
  document.getElementById("generate").addEventListener("click", drawBoxesPass);

  // click in the input sliders area
  // this has the potential to be really slow so I should change it later
  // or not I don't care that much
  document.getElementById("variables").addEventListener("mousemove", updateSliders);

  // change in range changes color
  document.getElementById("range").addEventListener("mouseup", updateRange)

  // generate a box on load
  drawBoxes(generateColorHSL())

  // add slider variables on load
  document.getElementById("rangeVar").innerHTML = " "+document.getElementById("range").value
}

function parseRGB(rgb) {
  return "rgb("+rgb[0]+", "+rgb[1]+", "+rgb[2]+")"

}

function parseHSL(hsl) {
  return "hsl("+hsl[0]+", "+hsl[1]+"%, "+hsl[2]+"%)"

}

function burn(base, fac) {
  if(fac == undefined){
    fac = 20
  }
  return [base[0], base[1], base[2]-fac]
}

function dodge(base, fac) {

  if(fac == undefined){
    fac = 20
  }
  return [base[0], base[1], base[2]+fac]
}

function generateColorHSL(type, columns) {
  range = parseInt(document.getElementById("range").value);

  if(parseInt(columns) == NaN || columns == undefined){
    columns = 3
  }

  if(type == undefined){
    type = "base"
  }
  if(type == "base"){
    baseColor=[
      Math.floor(Math.random()*360),
      100,
      50]
  }
  //consider shifting range slider to higher values
  colors = [burn(baseColor, range), baseColor, dodge(baseColor, range)]
  light = dodge(baseColor, range)
  console.log("generated the following colors:"+colors[0]+", "+colors[1]+", "+colors[2])
  return colors
}

function drawBoxes(colors) {
  // dynamic width for more colors
  document.getElementById("center").style.width = colors.length*100+"px"

  document.getElementById("output").innerHTML = ""

  var l = colors.length
  while(l > 0) {

    // maybe this adds a div
    var box = '<div class="colorBox" id="colorNum'+l+'"></div>'
    document.getElementById("output").innerHTML += box

    // maybe this adds color to the div that might have been added
    document.getElementById("colorNum"+l).style.background = parseHSL(colors[--l])
  }
}

function drawBoxesPass() {
  drawBoxes(generateColorHSL())
}

function clearColumns() {
  document.getElementById("columns").value = ""
}

function updateSliders(pass) {
  document.getElementById(pass.toElement.id+"Var").innerHTML = " "+document.getElementById(pass.toElement.id).value
}

function updateRange(_) {

}
//setInterval(loop, 100)

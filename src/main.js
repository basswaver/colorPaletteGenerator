// put some gay shit on top with a name or something
// add a system to report the hex of the color
// detect element clicked on to copy color of element to clippy boy
// split up the sliders and the generate button so that the sliders are seperate
// find some way to show the slider variables next to the label
// im only doing 3 columns for the future
function init() {
  // event listeners
  document.getElementById("generate").addEventListener("click", drawBoxesPass);
  //document.getElementById("output").addEventListener("click", drawBoxesPass);

  //generate a box on load
  drawBoxes(generateColorHSL())
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

//setInterval(loop, 100)

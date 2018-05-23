// TODO

// put some gay shit on top with a name or something
// detect element clicked on to copy color of element to clippy boy
// im only doing 3 columns for the future... maybe
// I need to figure out my color scheme, probably something with warm/cool grey material
// use the enter and space key to generate colors
// I need to change the scheme so it looks like a webpage
// save colors to the right and move the generator to the left
// live update the colors with value sliders

// DONE

// add a system to report the hex of the color
// find some way to show the slider variables next to the label
// make a function to convert hsl to rgb you lazy heck
// split up the sliders and the generate button so that the sliders are seperate

function init() {

  alignVertical()

  // click generate
  document.getElementById("generate").addEventListener("click", drawBoxesPass);

  // click in the input sliders area
  // this has the potential to be really slow so I should change it later
  // or not I don't care that much
  document.getElementById("variables").addEventListener("mousemove", updateSliders);
  document.getElementById("variables").addEventListener("click", updateSliders);

  // change in range changes color
  document.getElementById("range").addEventListener("mouseup", updateRange)

  // add color value to color on click
  document.getElementById("output").addEventListener("click", drawBoxColor)

  // generate a box on load
  drawBoxes(generateColorHSL())

  // add slider variables on load
  document.getElementById("rangeVar").innerHTML = " "+document.getElementById("range").value
}

function alignVertical() {
  // center element
  document.getElementById("center").style.marginTop = (-1 * (document.getElementById("center").clientHeight / 2)) + "px"

  // right element
  // this makes me want to kill myself
  document.getElementById("right").style.marginTop = (-1 * (document.getElementById("right").clientHeight / 2)) + "px"
  rightMarginLeft = 2*parseInt(window.getComputedStyle(document.getElementById("right")).marginLeft.slice(0, -2))

  document.getElementById("right").style.marginLeft = (rightMarginLeft + (document.getElementById("center").clientWidth )) + "px"

}

function parseHEX(rgb) {
  // be able to do hsl to rgb
  if (rgb.slice(0, 1) == "r") {
    rgb = deparse(rgb)
  }
  console.log(rgb)
  l = 2
  while (l!=-1) {
    rgb[l]=parseInt(rgb[l]).toString(16)
    if (rgb[l].length < 2) {
      rgb[l] = "0" + rgb[l]
    }
    console.log(rgb[l])
    --l
  }
  return "#"+rgb[0]+rgb[1]+rgb[2]
}

function parseHSL(hsl) {
  return "hsl("+hsl[0]+", "+hsl[1]+"%, "+hsl[2]+"%)"

}

function parseRGB(rgb) {
  console.log(rgb+" to parse")
  return "rgb("+rgb[0]+", "+rgb[1]+", "+rgb[2]+")"

}

function deparse(color) {
  color = color.split(" ")
  color[0] = color[0].slice(4, color[0].length-1)
  color[1] = color[1].slice(0, color[1].length-1)
  color[2] = color[2].slice(0, color[2].length-1)
  return color
}

function burn(base, fac) {
  if (fac == undefined){
    fac = 20
  }
  return [base[0], base[1], base[2] - fac]
}

function dodge(base, fac) {

  if (fac == undefined){
    fac = 20
  }
  return [base[0], base[1], base[2]+fac]
}

function generateColorHSL(type, columns) {
  range = parseInt(document.getElementById("range").value);

  if (parseInt(columns) == NaN || columns == undefined){
    columns = 3
  }

  if (type == undefined){
    type = "base"
  }
  if (type == "base"){
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
  // perhaps this adds dynamic width for more colors
  document.getElementById("center").style.width = colors.length*100+"px"

  document.getElementById("output").innerHTML = ""

  var l = colors.length
  while (l > 0) {
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

function drawBoxColor (loc) {
  rgb = document.getElementById(loc.path[0].id).style.background
  hex = parseHEX(rgb)
  // put it in the side
  document.getElementById("hex").innerHTML = hex
  document.getElementById("rgb").innerHTML = rgb
}

function clearColumns() {
  document.getElementById("columns").value = ""
}

function updateSliders(pass) {
  pass = pass.toElement.id
  values = ["range"]
  if (values.indexOf(pass)){
    return 0
  }
  document.getElementById(pass+"Var").innerHTML = " "+document.getElementById(pass).value
}

function updateRange(_) {
  boxes = document.getElementsByClassName("colorBox")
  center = boxes[(boxes.length - 1)/2]

  //base =
  //colors = [burn()]
  //drawBoxes()
}

function HSLtoRGB(h, s, l, format=false) {

  if (s==0) {
    l=l/100
    return [Math.round(l*255), Math.round(l*255), Math.round(l*255)]
  }
  s=s/100
  l=l/100

  var l_temp_1
  var l_temp_2

  if (l<.5) {
    l_temp_1 = l*(1+s)
  } else {
    l_temp_1 = l+s - l*s
  }

  l_temp_2 = 2*l - l_temp_1

  h=h/360

  r_temp_1 = h + .333
  g_temp_1 = h
  b_temp_1 = h - .333

  var r_set
  var g_set
  var b_set

  b_temp_1 = .203
  rgb_temp = [r_temp_1, g_temp_1, b_temp_1]
  rgb = [r_set, g_set, b_set]
  l = 0

  while (l!=rgb.length) {
    if (6 * rgb_temp[l] < 1) {
      rgb[l] = l_temp_2 + (l_temp_1 - l_temp_2) * 6 * rgb_temp[l]
      console.log("case "+l)
    } else if (2 * rgb_temp[l] < 1) {
      rgb[l] = l_temp_1
      console.log("case "+l)
    } else if (3 * rgb_temp[l] < 2) {
      rgb[l] = l_temp_2 + (l_temp_1 - l_temp_2) * (.666 - rgb_temp[l]) * 6
      console.log("case "+l)
    } else {
      rgb[l] = l_temp_2
      console.log("case "+l)
    }
    rgb[l]=Math.round(rgb[l]*255)
    l++
  }
  return[rgb]
}

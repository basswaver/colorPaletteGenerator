// works
function init(){
  // event listeners
  document.getElementById("generate").addEventListener("click", drawBoxPass);
  document.getElementById("variables").addEventListener("click", updateSliders);
  document.getElementById("variables").addEventListener("mousemove", updateSliders);
  document.getElementById("output").addEventListener("click", drawBoxPass);
  // draw elements on load
  drawBox(generateColorHSL());
  // set slider values
  document.getElementById("rangeVar").innerHTML=" "+document.getElementById("range").value;
  document.getElementById("columnsVar").innerHTML=" "+document.getElementById("columns").value;
}

// parsing

function parseHSL(color){
  return `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
}

// generating

function dodge(base, range){
  var ret=[];
  var l=range.length;
  while(l>0){
    ret.push([base[0], base[1], base[2]-range[--l]]);
  }
  return ret;
}

function burn(base, range){
  var ret=[];
  var l=range.length;
  while(l>0){
    ret.push([base[0], base[1], base[2]+range[--l]]);
  }
  return ret;
}

function generateRange(range, count){
  range=range/count
  list=[]
  while(count>0){
    list.push(range*count--)
  }
  return list
}

function generateColorHSL(count, theme){
  range=parseInt(document.getElementById("range").value);
  if(parseInt(count)==NaN || count==undefined){
    count=3;
  }
  base=[
    Math.floor(Math.random()*360),
    100,
    50];
  c=(count-1)/2
  dark=burn(base, generateRange(range, c));
  light=dodge(base, generateRange(range, c));
  var l=c;
  var ret=[];
  while(l>0){
    ret.push(light[--l]);
  }
  ret.push(base);
  while(l<c){
    ret.push(dark[l++]);
  }
  return ret;
}

// DOM interaction

function drawBox(colors){
  var l=colors.length
  var width=`${500/l}px`
  document.getElementById("output").innerHTML="";
  while(l>0){
    box='<div class="colorBox" id="colorNum'+l+'"></div>';
    document.getElementById("output").innerHTML+=box;
    document.getElementById("colorNum"+l).style.width=width;
    console.log(parseHSL(colors[l-1]))
    document.getElementById("colorNum"+l).style.backgroundColor=parseHSL(colors[--l]);
  }
}

function drawBoxPass(){
  drawBox(generateColorHSL(document.getElementById("columns").value));
}

function updateSliders(loc){
  loc=loc.toElement.id;
  values=["range", "columns"];
  if(values.indexOf(loc)==-1){
    return;
  }
  document.getElementById(loc+"Var").innerHTML=" "+document.getElementById(loc).value;
}

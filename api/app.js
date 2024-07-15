var change = 0;
var colorName = "blue" ;
let Button_text;
var dropped=false;

function buttonsColor(){
var buttons = document.getElementsByClassName('Buttons');
var colors =[]

for (var i=0; i<buttons.length;i++){
    buttons[i].style.backgroundColor = colorName;
}
}
function changeImage(){
    
 if(change==0){
  let image = document.getElementById("mult_images").src= "images/Melbourne_at_night.png";
  change++;
 }
 else if(change==1){
  let image = document.getElementById("mult_images").src= "images/475669-Jersey-City.png";
  change++;
 }
 else if(change==2){
  let image = document.getElementById("mult_images").src= "images/city_night2.png";
  change = 0;
 }

}
window.onload = function(){
    setInterval(changeImage,5000);
 }

function chose_color(){
    switch(colorName){
    case "blue":
        colorName = "red"
        Button_text = document.getElementById("Button32").innerText = colorName;
        break
    case "red":
        colorName="green"
        Button_text = document.getElementById("Button32").innerText = colorName;
        break
    case "green":
        colorName="black"
        Button_text = document.getElementById("Button32").innerText = colorName;
        break
    case "black":
        colorName="blue"
        Button_text = document.getElementById("Button32").innerText = colorName;
        break
   }
}
function Dropdown(){

    let drop = document.getElementById("dropDisplay").classList.toggle("show");
}
console.log(firebase)
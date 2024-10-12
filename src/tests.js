const input = document.getElementById("yinput")
const btn = document.getElementById("ybutton")
const vid =document.getElementById("yvid")
//const source = vid.src
function lul()
{
console.log(input.value)
if (input.value===""||input.value===null){
    window.alert("input is empty")
    return
}
const newsource =input.value.split("https://www.youtube.com/watch?v=")

const real =newsource[1].split("&t=")
let vidstring

if(real===undefined){

    vidstring ="https://www.youtube.com/embed/"+newsource[1]+"?controls=1"
    console.log(vidstring)
    vid.src= vidstring
}
else
{
vidstring =  "https://www.youtube.com/embed/"+real[0]+"?controls=1"
console.log(vidstring)
vid.src= vidstring
}
}

btn.addEventListener("click",lul)
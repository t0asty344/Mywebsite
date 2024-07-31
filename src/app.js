import {createClient} from '@supabase/supabase-js'
import 'emoji-picker-element';

import '../public/styles.css';
import { TextureHelper } from 'three/examples/jsm/Addons.js';


const supabaseUrl = "https://qevylhyljnxgbrbqpikc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldnlsaHlsam54Z2JyYnFwaWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3OTA5MTMsImV4cCI6MjAzNzM2NjkxM30.TI4vWDL7MioDd_HghD_uX2W6Cc_n7-Cm84CVbOfzleQ"
const supabase = createClient(supabaseUrl, supabaseKey)

let usernamestor =localStorage.getItem("name")
let onlinecounter;
let textbox;
let heighttb;
let textboxesarray =[]; 
let righclickedtext
let isreplying =false;

console.log(usernamestor)

async function getdata(){
    const { data, error } = await supabase
    .from('testmessages')
    .select('*')
    if(error){
        console.log(error)
    }
    data.forEach(dat=>{console.log(dat.id,dat.created_at,dat.user)})
}

async function createuser(){
    const { data, error } = await supabase.auth.signUp({
        email: 'example@email.com',
        password: 'example-password',
    })
}

const chatdisplay=document.getElementById("texts")
        
async function createelements(input,name){
    let replydiv = document.getElementById("replydiv")
    let replytext = document.getElementById("reply")
    var textcontainer = document.createElement("div");
    var textlayout = document.createElement("div");
    var newtext = document.createElement("p");
    var nametext = document.createElement("p");
    
    if(name==usernamestor)
    {
            textcontainer.classList.add("yourchatbox")
    }
    else
    {
        textcontainer.classList.add("chattextbox")
    }
    textlayout.classList.add("textlayout")
    newtext.classList.add("chattext")
    newtext.classList.add("text")
    nametext.classList.add("name")
    nametext.innerHTML= name
    newtext.innerHTML = input
    
    chatdisplay.append(textcontainer)
    textcontainer.append(textlayout)
    textlayout.append(newtext);
    textlayout.append(nametext)
    if(isreplying)
    {

    }
    let textboxes = document.querySelector(".chattextbox").offsetHeight
    textcontainer.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (event.button==2){

        
            if (replydiv.classList.contains("hidden")){

                replydiv.classList.remove("hidden")

            }
            rightclickmenut(event)
            righclickedtext=textcontainer.querySelector(".text").innerHTML
        }
       
      })
   
    textboxesarray.push(textboxes)

}

async function createnewelements(input,name){

    var textcontainer = document.createElement("div");
    var textlayout = document.createElement("div");
    var newtext = document.createElement("p");
    var nametext = document.createElement("p");
    if(name==usernamestor)
    {
            textcontainer.classList.add("yourchatbox")
    }
    else
    {
        textcontainer.classList.add("chattextbox")
    }
    textlayout.classList.add("textlayout")
    newtext.classList.add("chattext")
    newtext.classList.add("text")
    nametext.classList.add("name")

    nametext.innerHTML= name
    newtext.innerHTML = input
    
    chatdisplay.append(textcontainer)
    textcontainer.append(textlayout)
    textlayout.append(newtext);
    textlayout.append(nametext)
    let textboxes = document.querySelector(".chattextbox").offsetHeight
    
    textboxesarray.push(textboxes)
    textcontainer.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (event.button==2){

        
            if (replydiv.classList.contains("hidden")){

                replydiv.classList.remove("hidden")

            }
            rightclickmenut(event)
            righclickedtext=textcontainer.querySelector(".text").innerHTML
        }
       
      })
    scroll()
}

async function loadelements()
{
    const { data, error } = await supabase
    .from('testmessages')
    .select('*')
    .order('id', { ascending: true })
    if(error){
        console.log(error)
    }
    data.forEach(dat=>{
        createelements(dat.message,dat.user)
        }
    )
}

async function creatingtext(){
            let inputs = document.getElementById("inputtext")
            if(inputs.value=="")
            {
                return
            }   
            const {error} = await supabase
            .from('testmessages')
            .insert({message:inputs.value,user:localStorage.getItem("name")})
            if(error){
                console.log(error)
            }
            inputs.value = ""
        }
function checkusername()
{
    usernamestor =localStorage.getItem("name")
    const popup = document.getElementById("usernamepopup")

    if(usernamestor===undefined || usernamestor===null || usernamestor==="" )
        {
            if(popup.classList.contains("hidden")){
                popup.classList.remove("hidden")
            }
        }
        else
        {
            popup.classList.add("hidden")
        }
}

function cancelsbtn()
{
    const popup = document.getElementById("usernamepopup")

    popup.classList.add("hidden")
    checkusername()
}

function putclass(){
    
    const user =document.getElementById("usernameenter").value
    localStorage.setItem("name",user)
  
    checkusername()
}

async function  realtimemessage(){
    const { data, error } = await supabase
    .from('testmessages')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)
    data.forEach( da =>{createnewelements(da.message,da.user)})
}

function currentOnlineusers(state)
{
    const onlinestat=document.getElementById("onlinestatus")
    let onlinestatnumb=document.createElement("p")
    if(state==="pos")
    {

    }
    else if(state==="neg")
    {

    }
}

function changeusername()
{
    const popup = document.getElementById("usernamepopup")
    popup.classList.remove("hidden")
}

const roomOne =supabase.channel('room1')
  roomOne
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testmessages' }, payload => {
    realtimemessage()
  })
  .on('presence', { event: 'sync' }, () => {
    const newState = roomOne.presenceState()
    console.log('sync', newState)
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log('join', key, newPresences)
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    console.log('leave', key, leftPresences)
  })
  .subscribe()

function height(){
    const surrounduih = document.querySelector(".surroundui").offsetHeight;
    const navbarh = document.querySelector(".navbar").offsetHeight;
    document.getElementById("chatdiv").style.height=surrounduih-navbarh-3+"px";
    document.getElementById("texts").style.height =surrounduih-146+"px"
}
window.onresize =function(){
    height()
}
function textboxheight() {
    let textbox = document.getElementById("texts")
    let textsheight =textbox.style.height
    let heightpx =textsheight.split("px")

    heighttb = parseInt(heightpx[0])

}
function scroll(){
    let textboxs = document.getElementById("texts")
    textboxheight()
    textboxesarray.forEach(textboxes =>{heighttb+= textboxes})

    const scrollOptions ={
        left:0,
        top:heighttb,
        behavior: 'auto'

    }
    textboxs.scrollBy(scrollOptions)
}
function hide(id){
    const ids = document.getElementById(id)
    if(ids.classList.contains("hidden"))
    ids.classList.remove("hidden")
    else{
        ids.classList.add("hidden")
    }
}
function rightclickmenut(event){
    const menu = document.getElementById("rightclickmenu")
    if(menu.classList.contains("hidden"))
        menu.classList.remove("hidden")


    var posX = event.clientX;
    var posY = event.clientY;


    const menuval = menu.getBoundingClientRect();

    menu.style.top = posY +"px"
    menu.style.left = posX +"px"

}
function reply()
{
    let replytext = document.getElementById("reply")

    replytext.innerHTML =righclickedtext
}
document.getElementById("username_display").innerHTML = "username: " + usernamestor;

document.getElementById("scrolldown").addEventListener("click",scroll)
document.getElementById("btnusernamechange").addEventListener("click",changeusername);
document.getElementById("addButton").addEventListener("click",creatingtext);
document.getElementById("submitusername").addEventListener("click",putclass);
document.getElementById("cancel").addEventListener("click",cancelsbtn)
document.getElementById("replyoption").addEventListener("click",reply)

document.getElementById("getprofil").addEventListener("click",()=>{
    hide("profil")
})

document.getElementById("showemojibtn").addEventListener("click",()=>{
    hide("emodiv")
})
document.addEventListener("keydown",(event)=>{
    if(event.key=="Enter")
    {
        creatingtext();
    }
    
});

let emoji =document.getElementById("emojis")
let inputs = document.getElementById("inputtext");

emoji.addEventListener("emoji-click",event=>{inputs.value +=event.detail.unicode});
height();
checkusername();
loadelements();
textboxheight();

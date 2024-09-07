import {createClient} from '@supabase/supabase-js';
import 'emoji-picker-element';
import '../public/styles.css';



const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_APIKEY
const supabase = createClient(supabaseUrl, supabaseKey);

let usernamestor =localStorage.getItem("name");

let heighttb;
let textboxesarray =[]; 
let righclickedtext;
let isreplying = false;

console.log(usernamestor);

// async function getdata(){
//     const { data, error } = await supabase
//     .from('testmessages')
//     .select('*')
//     if(error){
//         console.log(error)
//     }
//     data.forEach(dat=>{console.log(dat.id,dat.created_at,dat.user)})
// }

// async function createuser(){
//     const { data, error } = await supabase.auth.signUp({
//         email: 'example@email.com',
//         password: 'example-password',
//     })
// }

const chatdisplay=document.getElementById("texts");
        
async function createelements(input,name,replied,repliedtext,newelement)
{
    let replydiv = document.getElementById("replydiv");

    var textcontainer = document.createElement("div");
    var textlayout = document.createElement("div");
    var textreplycontainer= document.createElement("div");

    var textsepcontainer = document.createElement("div")
    var newtext = document.createElement("p");
    var nametext = document.createElement("p");
    
    if(name==usernamestor)
    {
            textcontainer.classList.add("yourchatbox");
            textsepcontainer.classList.add("textsepcontainerr")

    }
    else
    {
        textcontainer.classList.add("chattextbox");
        textsepcontainer.classList.add("textsepcontainerl")

    }
    textlayout.classList.add("textlayout");
    newtext.classList.add("chattext");
    newtext.classList.add("text");
    nametext.classList.add("name");
    textreplycontainer.classList.add("textreplycontainer")
    nametext.innerHTML= escapeHTML(name);
    newtext.innerHTML = escapeHTML(input);
    
    chatdisplay.append(textcontainer);
    if(replied===true)
    {
        let replydivtext= document.createElement("div");
        let replydivcontainer =document.createElement("div");
        let replyp=document.createElement("p");
        replyp.innerHTML = escapeHTML(repliedtext);
 

        textreplycontainer.append(replydivcontainer)
        replydivcontainer.append(replydivtext)
        replydivtext.append(replyp)
        replydivcontainer.classList.add("replydivcontainer")
        replydivtext.classList.add("replydivcon")
        replyp.classList.add("backgroundbltr")
        replyp.classList.add("replytextcon")
        isreplying=false
        replydiv.classList.add("hidden")
    }

    
    textcontainer.append(textreplycontainer)
    textreplycontainer.append(textsepcontainer)
    textsepcontainer.append(textlayout)
    textlayout.append(newtext);
    textlayout.append(nametext);

    let textboxes = document.querySelector(".chattextbox").offsetHeight;
    textcontainer.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        if (event.button==2){

        

            rightclickmenut(event);
            righclickedtext=textcontainer.querySelector(".text").innerHTML;
        }
       
      })
    if(newelement===true)
    {
        scroll();
    }
    textboxesarray.push(textboxes);
    console.log(replied)

}


async function loadelements()
{
    const { data, error } = await supabase
    .from('testmessages')
    .select('*')
    .order('id', { ascending: true })
    if(error){
        console.log(error);
    }
    data.forEach(dat=>{
        createelements(dat.message,dat.user,dat.hasreply,dat.replytext,false);
        }
    )
};

async function creatingtext()
{
    let inputs = document.getElementById("inputtext")
    if(inputs.value=="")
    {
        return
    }   
    if(isreplying)
    {
        const {error} = await supabase
        .from('testmessages')
        .insert({message:inputs.value,user:localStorage.getItem("name"),hasreply:true,replytext:righclickedtext})
        if(error){
            console.log(error);
        }
    }
    else
    {
    const {error} = await supabase
    .from('testmessages')
    .insert({message:inputs.value,user:localStorage.getItem("name"),hasreply:false,})
    if(error){
        console.log(error);
    }
    }
    inputs.value = "";
};

function checkusername()
{
    usernamestor =localStorage.getItem("name");
    const popup = document.getElementById("usernamepopup");

    if(usernamestor===undefined || usernamestor===null || usernamestor==="" )
        {
            if(popup.classList.contains("hidden")){
                popup.classList.remove("hidden");
            }
        }
        else
        {
            popup.classList.add("hidden");
        }
};

function cancelsbtn()
{
    const popup = document.getElementById("usernamepopup");
    popup.classList.add("hidden");
    checkusername();
};

function putclass(){
    const user =document.getElementById("usernameenter").value;
    localStorage.setItem("name",user);
    checkusername();
};

async function  realtimemessage(){
    const { data, error } = await supabase
    .from('testmessages')
    .select('*')
    .order('id', { ascending: false })
    .limit(1)

    data.forEach( da =>{createelements(da.message,da.user,da.hasreply,da.replytext,true)});
    if(error)
    {
        console.log(error);
    }
};

// function currentOnlineusers(state)
// {
//     const onlinestat=document.getElementById("onlinestatus")
//     let onlinestatnumb=document.createElement("p")
//     if(state==="pos")
//     {

//     }
//     else if(state==="neg")
//     {

//     }
// }

function changeusername()
{
    const popup = document.getElementById("usernamepopup");
    popup.classList.remove("hidden");
};

const roomOne =supabase.channel('room1')
  roomOne
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testmessages' }, payload => {
    realtimemessage();
  })
  .on('presence', { event: 'sync' }, () => {
    const newState = roomOne.presenceState();
    console.log('sync', newState);
  })
  .on('presence', { event: 'join' }, ({ key, newPresences }) => {
    console.log('join', key, newPresences);
  })
  .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
    console.log('leave', key, leftPresences);
  })
  .subscribe()

function height()
{
    const surrounduih = document.querySelector(".surroundui").offsetHeight;
    const navbarh = document.querySelector(".navbar").offsetHeight;
    document.getElementById("chatdiv").style.height=surrounduih-navbarh-3+"px";
    document.getElementById("texts").style.height =surrounduih-125+"px";
};

window.onresize =function()
{
    height();
};

function textboxheight() 
{
    let textbox = document.getElementById("texts");
    let textsheight =textbox.style.height;
    let heightpx =textsheight.split("px");
    heighttb = parseInt(heightpx[0]);
};

function scroll()
{
    let textboxs = document.getElementById("texts");
    textboxheight();
    textboxesarray.forEach(textboxes =>{heighttb+= textboxes});

    const scrollOptions ={
        left:0,
        top:heighttb,
        behavior: 'auto'

    }
    textboxs.scrollBy(scrollOptions);
};

function hide(id)
{
    const ids = document.getElementById(id);
    if(ids.classList.contains("hidden"))
    ids.classList.remove("hidden");
    else{
        ids.classList.add("hidden");
    }
}
function rightclickmenut(event)
{
    const menu = document.getElementById("rightclickmenu");
    if(menu.classList.contains("hidden"))
        menu.classList.remove("hidden");


    var posX = event.clientX;
    var posY = event.clientY;

    menu.style.top = posY +"px";
    menu.style.left = posX +"px";

}
function reply()
{
    let replydiv = document.getElementById("replydiv");

    if (replydiv.classList.contains("hidden")){

        replydiv.classList.remove("hidden");

    }
    let replytext = document.getElementById("reply");
    replytext.innerHTML =escapeHTML(righclickedtext);
}
function escapeHTML(input) {
    return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


document.getElementById("username_display").innerHTML = escapeHTML("username: " + usernamestor);
document.getElementById("username_profil").innerHTML = escapeHTML("username:<br>" + usernamestor);

document.getElementById("scrolldown").addEventListener("click",scroll);
document.getElementById("btnusernamechange").addEventListener("click",changeusername);
document.getElementById("addButton").addEventListener("click",creatingtext);
document.getElementById("submitusername").addEventListener("click",putclass);
document.getElementById("cancel").addEventListener("click",cancelsbtn);
document.getElementById("replyoption").addEventListener("click",()=>{
    const menu = document.getElementById("rightclickmenu");

    menu.classList.add("hidden");
    isreplying=true;
    reply()
});
document.getElementById("activatechangebiodiv").addEventListener("click",()=>{
    if(document.getElementById("changebiodiv").classList.contains("hidden"))
    {
    document.getElementById("changebiodiv").classList.remove("hidden")
    document.getElementById("activatechangebiodiv").innerHTML = "cancel"
    }
    else
    {
        document.getElementById("changebiodiv").classList.add("hidden")
        document.getElementById("activatechangebiodiv").innerHTML = "change bio"
    }
   

})
document.getElementById("changebiobtn").addEventListener("click",()=>{
    let biotext= document.getElementById("changebioinput").value
    document.getElementById("biotext").innerHTML = escapeHTML(biotext)
    document.getElementById("changebiodiv").classList.add("hidden")
    document.getElementById("activatechangebiodiv").innerHTML = "change bio"


})
document.getElementById("getprofil").addEventListener("click",()=>{
    hide("profil");
})

document.getElementById("showemojibtn").addEventListener("click",()=>{
    hide("emodiv");
});

document.addEventListener("keydown",(event)=>{
    if(event.key=="Enter")
    {
        creatingtext();
    }
});
document.addEventListener("mousedown",(e)=>{
    const menu = document.getElementById("rightclickmenu");
    switch(e.button)
    {
        case 0:
            
            if(menu)
            {
                console.log(menu)
            }
            break
    }
})
let emoji =document.getElementById("emojis");
let inputs = document.getElementById("inputtext");
emoji.addEventListener("emoji-click",event=>{inputs.value +=event.detail.unicode});

height();
checkusername();
loadelements();
textboxheight();
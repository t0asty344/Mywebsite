import {createClient} from '@supabase/supabase-js'

import '../public/styles.css';

const supabaseUrl = "https://qevylhyljnxgbrbqpikc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldnlsaHlsam54Z2JyYnFwaWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3OTA5MTMsImV4cCI6MjAzNzM2NjkxM30.TI4vWDL7MioDd_HghD_uX2W6Cc_n7-Cm84CVbOfzleQ"
const supabase = createClient(supabaseUrl, supabaseKey)

let usernamestor =localStorage.getItem("name")

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

    var textcontainer = document.createElement("div");
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
    newtext.classList.add("chattext")
    nametext.innerHTML= name
    newtext.innerHTML = input
    
    chatdisplay.append(textcontainer)
    textcontainer.append(newtext)
    textcontainer.append(nametext)
    
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
    data.forEach( da =>{createelements(da.message,da.user)})
}




supabase
  .channel('room1')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'testmessages' }, payload => {
    
    realtimemessage()

  })
  .subscribe()

document.getElementById("username_display").innerHTML = "username: " + usernamestor;

document.getElementById("addButton").addEventListener("click",creatingtext);
document.getElementById("submitusername").addEventListener("click",putclass)
checkusername()
loadelements();




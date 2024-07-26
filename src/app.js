import {createClient} from '@supabase/supabase-js'

import '../public/styles.css';

const supabaseUrl = "https://qevylhyljnxgbrbqpikc.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFldnlsaHlsam54Z2JyYnFwaWtjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3OTA5MTMsImV4cCI6MjAzNzM2NjkxM30.TI4vWDL7MioDd_HghD_uX2W6Cc_n7-Cm84CVbOfzleQ"
const supabase = createClient(supabaseUrl, supabaseKey)



console.log(localStorage.getItem("name"))
if(localStorage.getItem("name")!=="" || localStorage.getItem("name")!==null)
{
    document.getElementById("usernamepopup").classList.add("hidden")
}
else
{
    document.getElementById("usernamepopup").classList.remove("hidden")
}
async function getdata(){
    const { data, error } = await supabase
    .from('testtable')
    .select('*')
    if(error){
        console.log(error)
    }
    data.forEach(dat=>{console.log(dat.id,dat.created_at,dat.name)})
}
async function createuser(){
    const { data, error } = await supabase.auth.signUp({
        email: 'example@email.com',
        password: 'example-password',
    })
}
const chatdisplay=document.getElementById("texts")
        
async function createelements(input){

    var textcontainer = document.createElement("div");
    var newtext = document.createElement("p");
    var nametext = document.createElement("p");
    textcontainer.classList.add("chattextbox")
    newtext.classList.add("chattext")
    nametext.innerHTML= localStorage.getItem("name")
    newtext.innerHTML = input
    
    textcontainer.append(chatdisplay)
    newtext.append(textcontainer)
    nametext.append(textcontainer)
    
}
async function loadelements()
{
    const { data, error } = await supabase
    .from('testmessages')
    .select('*')
    if(error){
        console.log(error)
    }
    data.forEach(dat=>{
        createelements(dat.message)
    }
)
}
async function creatingtext(){
            let inputs = document.getElementById("inputtext").value
            const {error} = await supabase
            .from('testmessages')
            .insert({message:inputs,user:localStorage.getItem("name")})
            if(error){
                console.log(error)
            }
            createelements(inputs)
        }
function putclass(){
    
    const user =document.getElementById("usernameenter").value
    
    if(user!==""){
        document.getElementById("usernamepopup").classList.add("hidden")
        localStorage.setItem("name", user);
        console.log(localStorage.getItem("name"))
    }
    
}
document.getElementById("addButton").addEventListener("click",creatingtext);

document.getElementById("submitusername").addEventListener("click",putclass)
getdata()
loadelements();

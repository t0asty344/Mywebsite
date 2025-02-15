import {createClient} from '@supabase/supabase-js';

import '../public/styles.css';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_APIKEY;
const supabase = createClient(supabaseUrl, supabaseKey);

function add(div,input)
{
    let newlistelement =document.createElement("li")
    let newdiv = document.createElement("div")
    let para = document.createElement("p")
    let sect = document.createElement("select")
    let option1 = document.createElement("option")
    let newbutton = document.createElement("button") 
    let editbutton = document.createElement("button")
    editbutton.innerHTML="edit"
    para.innerHTML = input
    option1.innerHTML= "finished"
    newbutton.innerHTML = "X"
    //classes
    para.classList.add("textleft")
    newdiv.classList.add("todolistitem")
    sect.classList.add("selectstatus")


    div.append(newlistelement)
    newlistelement.append(newdiv)
    newdiv.append(para)
    newdiv.append(editbutton)
    newdiv.append(sect)
    newdiv.append(newbutton)
    sect.append(option1)
    newbutton.addEventListener("click",()=>
    {
        newlistelement.remove()
    })
    editbutton.addEventListener("click",()=>{
        edit(editbutton,para)
    })
}
function addlist(titleinput,onload)
{
    let tododiv = document.getElementById("todolistsdiv")
    let titleh1 = document.createElement("h1"); 
    let newtodolist = document.createElement("div")
    let newtodobutton = document.createElement("button")
    let input = document.createElement("input")
    let newlist = document.createElement("ul")
    titleh1.innerHTML = titleinput
    newtodobutton.innerHTML = "add todo"
    newtodolist.classList.add("tododiv")
    newtodolist.classList.add("todolistdiv")
    titleh1.classList.add("marginleft")
    tododiv.append(titleh1)
    tododiv.append(newtodolist)
    newtodolist.append(newtodobutton)
    newtodolist.append(input)
    newtodolist.append(newlist)
    newtodobutton.addEventListener("click",()=>{
        if(input.value=="")
        {
            window.alert("please dont leave it empty")
        }
        else
        {
        inputlistdb(input.value,"inprogress",titleinput);
        add(newlist,input.value);
        input.value="";
        }
    if(onload==true)
    {
        loadlist(newlist,titleinput)
    }
    })
    
    
}
function edit(editbutton,edittext)
{
    editbutton
    edittext
}
//Database shit
//inserts
async function inputsubjectdb(title)
{
    const{ error } = await supabase
    .from("todolistsubject")
    .insert({Subject:title})
    if (error) {
        console.log(error);
      }
}
async function inputlistdb(todotext,statustext,subject)
{
    const{ error } = await supabase
    .from("todotable")
    .insert({todo:todotext,status:statustext,Subject:subject})
    if (error) {
        console.log(error);
      }
}
//Selects
async function loadlist(div,Subject){
    const{data,error} = await supabase
    .from("todotable")
    .select("*")
    .eq("Subject",Subject)
    if (error) {
        console.log(error);
      }
      data.forEach((dat)=>{add(div,dat.Subject)})
}

async function loadSubjects()
{
const{data,error} = await supabase
    .from("todolistsubject")
    .select("*")
    if (error) {
        console.log(error);
      }
      data.forEach((dat)=>{isload(dat.Subject)})
}
function isload(info)
{
    addlist(info,true);
}
loadSubjects()
document.getElementById("addelementbutton").addEventListener("click",add)
document.getElementById("addlistelementbutton").addEventListener("click",()=>{
    let inputvalue =document.getElementById("addlistelementtext").value
    if(inputvalue=="")
    {
        window.alert("please dont leave it empty")
    } 
    else
    {
    inputsubjectdb(inputvalue)
    addlist(inputvalue);
    }
})
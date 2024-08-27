import {createClient} from '@supabase/supabase-js';

import '../public/styles.css';


function add()
{
    let newlistelement =document.createElement("li")
    let newdiv = document.createElement("div")
    let para = document.createElement("p")
    let sect = document.createElement("select")
    let option1 = document.createElement("option")
    let newbutton = document.createElement("button") 
    let list = document.getElementById("todolist")
    let text= document.getElementById("addelementtext")
    para.innerHTML = text.value
    text.value=""
    option1.innerHTML= "finished"
    newbutton.innerHTML = "X"
    //classes
    newdiv.classList.add("todolistitem")
    sect.classList.add("selectstatus")


    list.append(newlistelement)
    newlistelement.append(newdiv)
    newdiv.append(para)
    newdiv.append(sect)
    newdiv.append(newbutton)
    sect.append(option1)
    newbutton.addEventListener("click",()=>
    {
        newlistelement.remove()
    })
}
function addlist()
{
    let tododiv = document.getElementById("todolistsdiv")
    let newtodolist = document.createElement("div")
    let newtodobutton = document.createElement("button")
    let input = document.createElement("input")
    let newlist = document.createElement("ul")
    
    tododiv.append(newtodolist)
    newtodolist.append(newtodobutton)
    newtodolist.append(input)
    newtodolist.append(newlist)
    
    
}
function edit(editbutton,edittext)
{
    document.getElementById("editbutton")
    document.getElementById()
}
document.getElementById("addelementbutton").addEventListener("click",add)
document.getElementById("addlistelementbutton").addEventListener("click",addlist)
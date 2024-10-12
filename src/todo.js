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
    para.innerHTML = input
    option1.innerHTML= "finished"
    newbutton.innerHTML = "X"
    //classes
    newdiv.classList.add("todolistitem")
    sect.classList.add("selectstatus")


    div.append(newlistelement)
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
    newtodobutton.innerHTML = "add todo"
    newtodolist.classList.add("tododiv")
    tododiv.append(newtodolist)
    newtodolist.append(newtodobutton)
    newtodolist.append(input)
    newtodolist.append(newlist)
    newtodobutton.addEventListener("click",()=>{
        add(newlist,input.vlaue);
    })
    
    
}
function edit(editbutton,edittext)
{
    document.getElementById("editbutton")
    document.getElementById()
}
document.getElementById("addelementbutton").addEventListener("click",add)
document.getElementById("addlistelementbutton").addEventListener("click",()=>{
    addlist();
})
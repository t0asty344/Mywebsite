
import '../public/styles.css'; // Adjust the path if necessary
import {createClient} from '@supabase/supabase-js';


const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_APIKEY
const supabase = createClient(supabaseUrl, supabaseKey);

let namearray =["intersting stuff","currently learning","learned"] 

function createnewSection(sectionname,onload)
{
    
let mainsector = document.getElementById("sectors")
let mainSection = document.createElement("div");
let mainsectionname =document.createElement("h1")
mainsectionname.innerHTML=sectionname
mainSection.classList.add("learningsubject")
mainsector.append(mainSection)
mainSection.append(mainsectionname)

for(let item =0;item<namearray.length;item++)
{
    let divsector= document.createElement("div")
    let divh2=   document.createElement("h2")
    let divadd = document.createElement("div")
    let divbutton=    document.createElement("button")
    let titlemessage = document.createElement("p")
    let titleinput = document.createElement("input")
    let textmessage = document.createElement("p")
    let textinput = document.createElement("input")
    let divdiv=    document.createElement("div")

    divbutton.innerHTML ="add"
    divh2.innerHTML = namearray[item];
    titlemessage.innerHTML ="title:";
    textmessage.innerHTML ="text:";

    divadd.classList.add("inputadd")
    divdiv.classList.add("normalborder")
    titleinput.classList.add("inputtitle")
    textinput.classList.add("inputtextarea")

    mainSection.append(divsector)
    divsector.append(divh2)
    divsector.append(divadd)
    divadd.append(titlemessage)
    divadd.append(titleinput)
    divadd.append(textmessage)
    divadd.append(textinput)
    divadd.append(divbutton)
    divsector.append(divdiv)
    let name = namearray[item]
    divbutton.addEventListener(("click"),()=>
    {
        
        add(divdiv,titleinput.value,textinput.value,sectionname,name,true)
    })

    if(onload==true)
    {
        Loadads(sectionname,divdiv,name);
    }

}

}

function add(items,text,info,section,group,newitem)
{
    let divobject= document.createElement("div")
    let objecttitle=document.createElement("p")
    let objectinfo=document.createElement("p")
    let objectselect=document.createElement("select")
    let enddiv = document.createElement("div")
    let objectbuttonfin = document.createElement("button")
    let objectbutton= document.createElement("button")
    objectinfo.classList.add("infotext")
    divobject.classList.add("infoobject")
    objectselect.classList.add("learningselect")
    objecttitle.innerHTML = "title: " +text.toString()
    objectinfo.innerHTML= "info: " +info
    objectbuttonfin.innerHTML="finished"
    objectbutton.innerHTML ="X"
    items.append(divobject)
    divobject.append(objecttitle)
    divobject.append(objectinfo)
    divobject.append(objectselect)
    divobject.append(enddiv)
    if(group=="learned")
    {
    enddiv.append(objectbuttonfin)
    }
    enddiv.append(objectbutton)
    if(newitem==true)
    {
    Insertaddtable(text,info,section,group)
    }
    objectbuttonfin.addEventListener("click",()=>{
        finishedlearining(text,info,section)
    })
    objectbutton.addEventListener("click",()=>
    {
        
        divobject.remove()
        removefromtable(text)
    })

}
async function finishedlearining(title,content,subject) {
    const {error} = await supabase
    .from('Documentation')
    .insert({Title:title,Content:content,Subject:subject})
    if(error)
    {
        console.log(error)
    }
    check(subject)
    removefromtable(title)
}
async function check(subject)
{

    const {data,error} = await supabase
    .from('Docusubjects')
    .select("*")
    .eq("Subject",subject)
    if(error)
        {
            console.log(error)
        }
    if (data>0)
    {
        newsubject(subject)
    }
}
async function newsubject(subject) {
    const {error} = await supabase
    .from('Subjects')
    .insert({Subject:subject})
    if(error)
    {
        console.log(error)
    }
}
async function removefromtable(remove)
{
    const response = await supabase
        .from('learning')
        .delete()
        .eq('title',remove)
    console.log(response)
}

async function Loadsections() 
{
    const{data, error} = await supabase
    .from('Subjects')
    .select('*')
    .order('id',{ascending:true})
    if(error){
        console.log(error);
    }
    data.forEach(dat=>{
        createnewSection(dat.Mainsubject,true);

        }
    )

}
async function Loadads(subject,divdi,loadedlements)
{ 
    console.log("log")
    const {data,error} = await supabase
    .from('learning')
    .select("*")
    .eq('section',subject)
    .eq('group',loadedlements)
    .order('id',{ascending:true})
    if(error){
        console.log(error);
    }
    data.forEach(dat=>{
        add(divdi,dat.title,dat.info,dat.section,dat.group);
        }
    )
}
async function InsertSectiontable(value) {
    const {error} = await supabase
    .from('Subjects')
    .insert({Mainsubject:value})
    if(error)
    {
        console.log(error);
    }
}
async function Insertaddtable(value,infos,sections,groups) {
    const {error} = await supabase
    .from('learning')
    .insert({title:value,info:infos,section:sections,group:groups})
    if(error)
    {
        console.log(error);
    }
}

document.getElementById("addbuttonsection").addEventListener("click",()=>
{
var value =document.getElementById("addinputsection").value;
createnewSection(value);
InsertSectiontable(value);
})

Loadsections()

import { createClient } from "@supabase/supabase-js";

import "../public/styles.css";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_APIKEY;
const supabase = createClient(supabaseUrl, supabaseKey);
let currentsubject;
let currentdocu = [];

function additem(input) {
  const navbarding = document.getElementById("navbardoc");
  const navbardoc = document.getElementById("navbarbodydoc");
  let clone = navbardoc.cloneNode(true);
  clone.classList.remove("collapse");
  clone.innerHTML = escapeHTML(input);
  navbarding.append(clone);
    clone.addEventListener("click",()=>{
      let Titledocs = document.getElementById("titledocs")
      currentsubject = clone.innerHTML
      Titledocs.innerHTML = currentsubject
      doculoaddb()
      console.log("sus")
      console.log(currentsubject)
      clearbody();
    }
    )
}

async function additemdb(item) {
  const { error } = await supabase
    .from("Docusubjects")
    .insert({ Subject: item });
  if (error) {
    console.log(error);
  }
}
function height() {
  const surrounduih = document.querySelector(".documentationdiv").offsetHeight;
  document.getElementById("navbardoc").style.height = surrounduih - 5 + "px";
}


function escapeHTML(input) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function loadsubjects() {
  const { data, error } = await supabase
    .from("Docusubjects")
    .select("*")
    .order("id", { ascending: true });
  if (error) {
    console.log(error);
  }
  data.forEach((dat) => {
    additem(dat.Subject);
  });
}
async function doculoaddb()
{
  const{data,error} = await supabase
  .from("Documentation")
  .select("*")
  .eq("Subject",currentsubject)
  if(error)
  {
    console.log(error)
  }
  data.forEach(dat=>{
    createdocumain(dat.Title,dat.Content,dat.difficulty,dat.Usecases,dat.related_categories,dat.links)
  })
  appendtobody();
}
function createdocumain(Title,Content,difficulty,Usecases,related,links)
{
 const categories = document.getElementById("docucategories");
 let clone = categories.cloneNode(true)
 clone.classList.remove("collapse")
 clone.childNodes[1].innerHTML =Title
 clone.childNodes[3].innerHTML =Content
 clone.childNodes[5].childNodes[1].innerHTML = difficulty
 clone.childNodes[5].childNodes[3].innerHTML = Usecases
 clone.childNodes[5].childNodes[5].innerHTML =  related
 currentdocu.push(clone)
console.log("difficulty")

}
function appendtobody()
{
  const bodys = document.getElementById("arraydocubody");
  
  currentdocu.forEach(doc =>{
    bodys.append(doc)
  })

}
function clearbody()
{
  currentdocu = []
  const bodys = document.getElementById("arraydocubody");
  bodys.innerHTML= "";
}
window.onresize = function () {
  height();
};

document.getElementById("addsection").addEventListener("click", () => {
  const input = document.getElementById("addinput").value;
  if (input != "") {
    additemdb(input);
    additem(escapeHTML(input));
  }
});

loadsubjects();
height();

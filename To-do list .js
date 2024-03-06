var add_btn = document.getElementById("add-btn");
var myInput = document.getElementById("myInput");
var list = document.getElementById("list");
if (localStorage.getItem("list")!=null)
{
var arr_list=JSON.parse(localStorage.getItem("list"));
arr_list.forEach(task => {
    newToDoList(task)
});
}
add_btn.onclick=function(){
    if(myInput.value!=""){
        newToDoList()
    }
    else{
        alert("Empty Field")
    }
}
function newToDoList(task){
    var item_name=myInput.value;
    if(task){
        item_name=task.name
    }
    var item_name = myInput.value;
    var li = document.createElement("LI");
    var span = document.createElement("SPAN");
    span.innerText = item_name;
    span.className="text";
    li.appendChild(span);
    var lable = document.createElement("LABLE");
    lable.innerHTML='<i class="fa-regular fa-square-check"></i>&nbsp;<i class="fa-regular fa-trash-can"></i>';
    list.append(lable)
    list.appendChild(li);
    myInput.value="";

    var check_tag=lable.getElementsByTagName("I");
    check_tag[0].onclick=function(){
        li.classList.toggle("checked");
        updateLocalStorage()
    }
    check_tag[1].onclick=function(){
        var cnf=confirm("Do you wanna delete");
        if(cnf){
            li.remove();
            lable.remove();
        }
        else {
            alert("your data is safe");
        }
        updateLocalStorage()
    }
    updateLocalStorage()
}
function updateLocalStorage(){
    var li_el=document.querySelectorAll("li");
    var i;
    var arr_list=[];
    for(i=0;i<li_el.length;i++)
    {
        var span=li_el[i].getElementsByTagName("span");
        arr_list.push({
            name : span[0].innerText,
            checked :li_el[i].classList.contains("checked")
        });
    }
    localStorage.setItem("list",JSON.stringify(arr_list));
}
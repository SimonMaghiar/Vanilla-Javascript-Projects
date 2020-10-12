// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");
// edit option
let editElement; 
let editFlag = false;
let editID;

//Get from local storage

window.addEventListener("DOMContentLoaded", function(){
    for(i=0;localStorage.key(i) != null; i++){
        const key = localStorage.key(i);
        populateItems(localStorage.getItem(key),key);
    }
});


// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit",addItem);
//clear items
clearBtn.addEventListener("click",clearItems);


               
// ****** FUNCTIONS **********
function addItem(e){
    e.preventDefault();
    const value = grocery.value;
    
    const id = new Date().getTime().toString();
    if(value !== "" && !editFlag){  //we add item
        const element = document.createElement("article");
        //add class
        element.classList.add("grocery-item");
        //add id
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = ` <p class="title">${value}</p>
                              <div class="btn-container">
                              <button type="button" class="edit-btn">
                              <i class="fas fa-edit"></i>
                              </button>
                              <button type="button" class="delete-btn">
                              <i class="fas fa-trash"></i>
                              </button>
                              </div>`;
        const deleteBtn = element.querySelector(".delete-btn");
        const editBtn = element.querySelector(".edit-btn");
        deleteBtn.addEventListener("click",deleteItem);
        editBtn.addEventListener("click",editItem);                     
        list.appendChild(element);
        displayAlert("item added to the list", "success");
        container.classList.add("show-container");
        //add to local storage
        addToLocalStorage(id,value);
        //set back to default
        setBackToDefault();
    }
    else if(value !== "" && editFlag){  //we edit item
        editElement.innerHTML = value;
        setBackToDefault();
    }
    else
    {
        displayAlert("Empty Value","danger");
    }
    grocery.value = "";
}
//display alert
function displayAlert(text,action){
    alert.textContent = text;
    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function(){
        alert.textContent = "";
        alert.classList.remove(`alert-${action}`);
    },1000);
}
function clearItems(){
    const items = document.querySelectorAll(".grocery-item");
    if(items.length > 0){
        items.forEach(function(item){
            list.removeChild(item);
        });
    }
    container.classList.remove("show-container");
    displayAlert("items deleted","danger");
}
//set back to default
function setBackToDefault(){
    editFlag = false;
    editId = "";
    submitBtn.textContent = "submit";
}

function deleteItem(e)
{
    const element = e.currentTarget.parentElement.parentElement;
    const id = element.dataset.id;
    list.removeChild(element);
    if(list.children.length === 0){
        container.classList.remove("show-container");
    }
    displayAlert("item removed","danger");
    setBackToDefault();
    //remove from local storage
    console.log(id);
    removeFromLocalStorage(id);
}

function editItem(e)
{
    const element = e.currentTarget.parentElement.parentElement;
    //set edit item
    editElement = e.currentTarget.parentElement.previousElementSibling;
    //set form value 
    grocery.value = editElement.innerHTML;
    editFlag = true;
    editID = element.dataset.id;
    submitBtn.textContent = "Edit";
}


// ****** LOCAL STORAGE **********
function addToLocalStorage(id,value){
    console.log("added to local storage");
    localStorage.setItem(id,value);
}

function removeFromLocalStorage(id)
{
    localStorage.removeItem(id);
}

// ****** SETUP ITEMS **********

function populateItems(value,id)
{
    const element = document.createElement("article");
        //add class
        element.classList.add("grocery-item");
        //add id
        const attr = document.createAttribute("data-id");
        attr.value = id;
        element.setAttributeNode(attr);
        element.innerHTML = ` <p class="title">${value}</p>
                              <div class="btn-container">
                              <button type="button" class="edit-btn">
                              <i class="fas fa-edit"></i>
                              </button>
                              <button type="button" class="delete-btn">
                              <i class="fas fa-trash"></i>
                              </button>
                              </div>`;
        const deleteBtn = element.querySelector(".delete-btn");
        const editBtn = element.querySelector(".edit-btn");
        deleteBtn.addEventListener("click",deleteItem);
        editBtn.addEventListener("click",editItem);                     
        list.appendChild(element);
        displayAlert("item added to the list", "success");
        container.classList.add("show-container");
}
"use strict";

window.onload = initial;
let details = ["Mountain", "Height"];
let array = [
    {
        mountain: "Mount Everest ",
        height: "123ft"
    },
    {
        mountain: "Mount Fuji",
        height: "321ft"
    }
];

function initial(){
    //create options
    loadMountains();
    //get dropdown and assign an event handler to it
    const mountainDropdown = document.getElementById("listOfMountains");
    mountainDropdown.onchange = displaySelectedMountainDetails;
    // mountainDropdown.onclick = test;
}
//load options
function loadMountains(){
    const mountainDropdown = document.getElementById("listOfMountains");
    for(let i in array){
        let createOption = new Option(array[i].mountain, array[i].mountain.toLowerCase());
        mountainDropdown.appendChild(createOption);
    }
}
function displaySelectedMountainDetails(){
    //get dropdown value and all elements that'll display info
    const selectedMountain = document.getElementById("listOfMountains").value;
    const displayTable = document.getElementById("displayMountainDetails");
    const getRows = document.querySelectorAll("tbody tr");
    const test = document.querySelector("#test");
    let index = 0;
    
    Array.from(getRows).forEach(row => displayTable.removeChild(row));
    //test each objects's property with the value to find ut
    for(let i in array){
        //once it's found loop through the properties and display any available info
        if(array[i].mountain.toLowerCase() === selectedMountain){
           for(let property in array[i]){
            let row = displayTable.insertRow(-1);
            let cellLabel = row.insertCell(0);
            let cellData = row.insertCell(1);
            cellLabel.innerHTML = details[index];
            cellData.innerHTML = array[i][property];
            index++;
           }
        }
    }
}

/*
function test(){
    const test = document.querySelector("#test");
    test.innerHTML = "hello";
}
*/  

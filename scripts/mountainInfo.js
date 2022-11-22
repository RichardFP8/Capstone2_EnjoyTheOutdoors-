"use strict";
window.onload = initial;

function initial() {
    // create options
    loadMountains();
    // get dropdown and assign an event handler to it
    const mountainDropdown = document.getElementById("listOfMountains");
    mountainDropdown.onchange = displaySelectedMountainDetails;
}
function loadMountains() {
    const mountainDropdown = document.getElementById("listOfMountains");
    const sortedArray = mountainsArray.sort((x, y) => {
        if (x.name < y.name) return -1;
        else if (x.name === y.name) return 0;
        else return 1;
    });
    for (let i in sortedArray) {
        let createOption = new Option(sortedArray[i].name, sortedArray[i].name.toLowerCase());
        mountainDropdown.appendChild(createOption);
    }
}
function displaySelectedMountainDetails() {
    //I'm going to append the card component before the last column
    const childColumn = document.getElementById("theOtherChildColumn");
    const parentRow = document.getElementById("parentRow");
    //get the selected value from the dropdown
    const selectedValue = document.getElementById("listOfMountains").value;
    //before creating one, delete any before
    const deleteCard = document.querySelector("#parentRow > div:not([id])");
    //in the first run, the value is null since there was no card component already displayed
    if (deleteCard !== null) {
        parentRow.removeChild(deleteCard);
    }
    //create the elements required for the card component
    const cardComponent = document.createElement("div");
    const mountainImage = document.createElement("img");
    const cardBody = document.createElement("div");
    const cardTitle = document.createElement("h5");
    const cardTable = document.createElement("table");
    const cardText = document.createElement("p");
    //set the attributes
    cardComponent.classList.add("card");
    cardComponent.classList.add("w-50");
    cardComponent.classList.add("mt-5");
    mountainImage.classList.add("card-img-top");
    cardBody.classList.add("card-body");
    cardTitle.classList.add("card-title");
    cardTitle.classList.add("text-center");
    cardText.classList.add("card-text");
    cardTable.classList.add("table");
    cardTable.classList.add("table-striped");
    //add the child hiearchy(?)
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardTable);
    cardBody.appendChild(cardText);
    cardComponent.appendChild(mountainImage);
    cardComponent.appendChild(cardBody);
    parentRow.insertBefore(cardComponent, childColumn);

    for (let i in mountainsArray) {
        let current = mountainsArray[i];
        //compare each of name properties with the selected value 
        if (current.name.toLowerCase() === selectedValue) {
            //go through each of that mountain's objects properties
            for (let property in current) {
                if (property === "name") {
                    cardTitle.innerHTML = current["name"];
                }
                else if (property === "effort") {
                    let effortRow = cardTable.insertRow(-1);
                    let cellLabel = effortRow.insertCell(0);
                    let cellData = effortRow.insertCell(1);
                    cellLabel.innerHTML = "Effort";
                    cellData.innerHTML = current["effort"];
                    if (current["effort"] === "Strenuous") {
                        cellData.className = "text-warning";
                    }
                    else if (current["effort"] === "Moderate") {
                        cellData.className = "text-secondary";
                    }
                    else {
                        cellData.className = "text-info";
                    }
                }
                else if (property === "coords") {
                    const axisArray = ["Latitude", "Longitude"];
                    let x = 0;
                    for (let index in current['coords']) {
                        let row = cardTable.insertRow(-1);
                        let cellLabel = row.insertCell(0);
                        let cellData = row.insertCell(1);
                        cellLabel.innerHTML = axisArray[x];
                        cellData.innerHTML = current["coords"][index];
                        x++;
                    }
                    //for sunrise
                    let sunriseRow = cardTable.insertRow(-1);
                    let sunriseCellLabel = sunriseRow.insertCell(0);
                    let sunriseCellData = sunriseRow.insertCell(1);
                    sunriseCellLabel.innerHTML = "Sunrise";
                    getSunsetForMountain(current["coords"].lat, current["coords"].lng).then(data => sunriseCellData.innerHTML = data.results.sunrise);
                    
                    //for sunset
                    let sunsetRow = cardTable.insertRow(-1);
                    let sunsetCellLabel = sunsetRow.insertCell(0);
                    let sunsetCellData = sunsetRow.insertCell(1);
                    sunsetCellLabel.innerHTML = "Sunset";
                    getSunsetForMountain(current["coords"].lat, current["coords"].lng).then(data => sunsetCellData.innerHTML = data.results.sunset + "UTC");
                }
                else if (property === "img") {
                    mountainImage.src = "./images/" + current["img"];
                    mountainImage.alt = current["name"];
                }
                else if (property === "desc") {
                    cardText.innerHTML = current["desc"];
                }
            }
        }
    }

}
async function getSunsetForMountain(lat, lng){
    let response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${lat}&lng=${lng}&date=today`);
    let data = await response.json();
    return data;
   }
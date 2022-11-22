"use strict";
window.onload = init;

const justEntireAddresses = nationalParksArray.map((park) => {
    return `(${(park.LocationID).toUpperCase()}) - ${park.Address}, ${park.City}, ${park.State} ${park.ZipCode}`;
});
function init() {
    loadDropdowns();
    const locationButton = document.getElementById("locationSearch");
    const parkButton = document.getElementById("parkSearch");
    const viewAllButton = document.getElementById("viewAll");
    locationButton.onclick = displayLocationsDropdown;
    parkButton.onclick = displayParkTypesDropdown;
    viewAllButton.onclick = showAllParks;

}
function loadDropdowns() {
    const locationDropdown = document.getElementById("searchLocation");
    const parkTypeDropdown = document.getElementById("searchParkType");
    //for the location dropdown
    for (let i in locationsArray) {
        let option = new Option(locationsArray[i], locationsArray[i].toLowerCase());
        locationDropdown.appendChild(option);
    }
    //for the park type dropdown
    for (let i in parkTypesArray) {
        let option = new Option(parkTypesArray[i], parkTypesArray[i].toLowerCase());
        parkTypeDropdown.appendChild(option);
    }
}
function displayLocationsDropdown() {
    let valuesArray = getAllHTMLElementsRequired();
    //[4] - this is the style for the <p> that will display additional data
    valuesArray[4].innerHTML = "";
    valuesArray[4].style.borderTop = "0";
    valuesArray[4].style.margin = "0";
    valuesArray[4].style.paddingTop = "0";

    //[0] - is the park type dropdown, [1] is the location dropdown; hide one and display the other with "Select..." as the first option
    valuesArray[1].onchange = displayAllParksByLocation;
    valuesArray[1].style.display = "block";
    valuesArray[0].style.display = "none";
    valuesArray[1].selectedIndex = 0;
    deletePreviousParentAccordion(valuesArray[2], valuesArray[3]);
}
function displayParkTypesDropdown() {
    //[4] - this is the style for the <p> that will display additional data
    let valuesArray = getAllHTMLElementsRequired();
    valuesArray[4].innerHTML = "";
    valuesArray[4].style.borderTop = "0";
    valuesArray[4].style.margin = "0";
    valuesArray[4].style.paddingTop = "0";

    //[0] - is the park type dropdown, [1] is the location dropdown; hide one and display the other with "Select..." as the first option
    valuesArray[0].onchange = displayAllParksByParkType;
    valuesArray[0].selectedIndex = 0;
    valuesArray[0].style.display = "block";
    valuesArray[1].style.display = "none";
    deletePreviousParentAccordion(valuesArray[2], valuesArray[3]);
}
function displayAllParksByLocation() {
    //accessing all elements in a function and returning that to use less lines 
    const beforeCompute = new Date();
    let valuesArray = getAllHTMLElementsRequired();
    let totalParks = 0;
    let wholeState;

    //[4] - this is the style for the <p> that will display additional data
    setStylesToExtraDataParagraph(valuesArray[4]);

    deletePreviousParentAccordion(valuesArray[2], valuesArray[3]);
    const parentAccordion = createParentAccordion(valuesArray[2]);

    //compare the selected value with the State property to make the accordion per each 
    for (let i in nationalParksArray) {
        let currentPark = nationalParksArray[i];
        if (currentPark["State"].toLowerCase() === valuesArray[1].value) {
            wholeState = currentPark["State"];
            createAccordionItems(nationalParksArray[i], parentAccordion, i);
            totalParks++;
        }
    }
    const afterCompute = new Date();
    const millieSecsComputing = afterCompute.getTime() - beforeCompute.getTime();
    valuesArray[4].innerHTML = `It took ${millieSecsComputing} millieseconds to find all ${totalParks} parks located in ${wholeState}`;
}
function displayAllParksByParkType() {
    const beforeCompute = new Date();
    let valuesArray = getAllHTMLElementsRequired();
    let splitSelectedValue = valuesArray[0].value.split(" ");             //I converted the selected value into an array
    let totalParks = 0;
    //[4] - this is the style for the <p> that will display additional data
    setStylesToExtraDataParagraph(valuesArray[4]);

    deletePreviousParentAccordion(valuesArray[2], valuesArray[3]);
    const parentAccordion = createParentAccordion(valuesArray[2]);

    //compare the selected value with the State property to make the accordion per each 
    for (let i in nationalParksArray) {
        let splitParkName = nationalParksArray[i].LocationName.split(" ");
        let breakCount = 0;
        for (let x in splitSelectedValue) {
            for (let y in splitParkName) {
                if (splitSelectedValue[x] === splitParkName[y].toLowerCase()) {
                    // this is for the selected values that are two words, once one of the words match break and test for the second
                    // this will help prevent making the accordion, as long as one of the words in the selected value matches
                    if ( (splitSelectedValue.length == 2) && (breakCount == 0) ) {
                            breakCount++;
                            break;     
                    }
                    createAccordionItems(nationalParksArray[i], parentAccordion, i);
                    totalParks++;
                    break;
                }
            }
        }
    }
    const afterCompute = new Date();
    const millieSecsComputing = afterCompute.getTime() - beforeCompute.getTime();
    valuesArray[4].innerHTML = `It took ${millieSecsComputing} millieseconds to find all ${totalParks} that matched the description`;
}
function showAllParks() {
    let valuesArray = getAllHTMLElementsRequired();
    const beforeCompute = new Date();

    //[4] - this is the style for the <p> that will display additional data
    valuesArray[4].style.borderTop = "0";
    valuesArray[4].style.marginBottom = "1.5em";
    valuesArray[4].style.paddingTop = "1rem";

    //[0] - is the park type dropdown, [1] is the location dropdown; hide one and display the other with "Select..." as the first option
    valuesArray[0].selectedIndex = 0;
    valuesArray[1].selectedIndex = 0;
    valuesArray[0].style.display = "none";
    valuesArray[1].style.display = "none";
    //[2] - is the div that contains 
    deletePreviousParentAccordion(valuesArray[2], valuesArray[3]);
    const parentAccordion = createParentAccordion(valuesArray[2]);

    for (let i in nationalParksArray) {
        createAccordionItems(nationalParksArray[i], parentAccordion, i);
    }
    const afterCompute = new Date();
    const millieSecsComputing = afterCompute.getTime() - beforeCompute.getTime();
    valuesArray[4].innerHTML = "It took " + millieSecsComputing + " millieseconds to show all parks";
}

//these functions are used repeatedly
function getAllHTMLElementsRequired() {
    const parkTypeDropdown = document.getElementById("searchParkType"),
        locationDropdown = document.getElementById("searchLocation"),
        accordionContainer = document.getElementById("showAllParks"),
        accordionDiv = document.querySelector("#showAllParks div"),
        extraData = document.getElementById("extraData");
    return [parkTypeDropdown, locationDropdown, accordionContainer, accordionDiv, extraData];
}
function deletePreviousParentAccordion(accordionContainer, parentAccordion) {
    if (parentAccordion !== null) {
        accordionContainer.removeChild(parentAccordion);
    }
}
function createParentAccordion(divToContainAccordion) {
    const parentAccordion = document.createElement("div");
    parentAccordion.className = "accordion w-75 mx-auto";
    parentAccordion.id = "containingAllAccordionItems";
    divToContainAccordion.appendChild(parentAccordion);
    return parentAccordion;
}
function setStylesToExtraDataParagraph(para) {
    para.style.borderTop = "1px solid rgba(127, 127, 127, 0.6)";
    para.style.margin = "2em 0 1em 0";
    para.style.paddingTop = "2rem";
}
function createAccordionItems(currentPark, parentAccordion, nationalParksArrayIndex) {

    //create the elements needed
    const childAccordionItem = document.createElement("div");
    const accordionHeader = document.createElement("h2");
    const accordionButton = document.createElement("button");
    const collapseInfo = document.createElement("div");
    const accordionBody = document.createElement("div");
    const innerTable = document.createElement("table");

    //add the classes and the other attributes needed
    childAccordionItem.classList.add("accordion-item");
    accordionHeader.classList.add("accordion-header");
    accordionHeader.id = "heading" + currentPark["LocationID"];
    accordionBody.className = "accordion-body table-responsive";
    innerTable.classList.add("table");

    accordionButton.className = "accordion-button collapsed";
    accordionButton.type = "button";
    accordionButton.setAttribute("data-bs-toggle", "collapse");
    accordionButton.setAttribute("data-bs-target", "#" + currentPark["LocationID"]);
    accordionButton.setAttribute("aria-controls", currentPark["LocationID"]);
    accordionButton.setAttribute("aria-expanded", "false");
    accordionButton.innerHTML = currentPark["LocationName"];

    collapseInfo.id = currentPark["LocationID"];
    collapseInfo.className = "accordion-collapse collapse";
    collapseInfo.setAttribute("aria-labelledby", "heading" + currentPark["LocationID"]);
    collapseInfo.setAttribute("data-bs-parent", "#containingAllAccordionItems");

    //now, append the children(what?)   
    accordionBody.appendChild(innerTable);
    collapseInfo.appendChild(accordionBody);
    accordionHeader.appendChild(accordionButton);
    childAccordionItem.appendChild(accordionHeader);
    childAccordionItem.appendChild(collapseInfo);
    parentAccordion.appendChild(childAccordionItem);

    //create a few rows for the parks that match the selected option 
    addInnerRows(currentPark, nationalParksArrayIndex, innerTable, ["Phone", "Fax"], 0, 0);
    
}
function addInnerRows(currentPark, nationalParksArrayIndex, innerTable, remainingProperties, remainingPropertiesIndex, tableRowIndex) {

    for (let property in currentPark) {

        if ((property !== "Visit")) {
            if (property === "LocationName") {
                let row = innerTable.insertRow(tableRowIndex);
                let cellLabel = row.insertCell(0);
                let cellData = row.insertCell(1);
                cellLabel.innerHTML = "Located in:";
                cellData.innerHTML = justEntireAddresses[nationalParksArrayIndex];
                tableRowIndex++;
            }
            else if (property === "Location") {
                let row = innerTable.insertRow(tableRowIndex);
                let cellLabel = row.insertCell(0);
                let cellData = row.insertCell(1);
                cellLabel.innerHTML = "Coordinates: ";
                cellData.innerHTML = `${currentPark["Longitude"]}° N, ${currentPark["Latitude"]}° W`;
                tableRowIndex;
            }
            else if (property === "Phone" || property === "Fax") {
                let row = innerTable.insertRow(tableRowIndex);
                let cellLabel = row.insertCell(0);
                let cellData = row.insertCell(1);
                cellLabel.innerHTML = remainingProperties[remainingPropertiesIndex];
                cellData.innerHTML = currentPark[property];
                remainingPropertiesIndex++;
                tableRowIndex++;
            }
        }
        else {
            let row = innerTable.insertRow(-1);
            let cellLabel = row.insertCell(0);
            let cellData = row.insertCell(1);
            let link = document.createElement("a");
            link.innerHTML = currentPark.Visit;
            link.target = "_blank";
            link.href = currentPark["Visit"];
            cellLabel.innerHTML = "For more information visit";
            cellData.appendChild(link);
        }

    }
}
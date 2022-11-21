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
    const locationDropdown = document.getElementById("searchLocation");
    const parkTypeDropdown = document.getElementById("searchParkType");
    const parentContainingAccordion = document.getElementById("showAllParks");
    const deletePreviousParentAccordion = document.querySelector("#showAllParks div");
    const extraData = document.getElementById("extraData");
    extraData.innerHTML = "";
    extraData.style.borderTop = "0";
    extraData.style.margin = "0";
    extraData.style.paddingTop = "0";

    // locationDropdown.onchange = displayParksByLocation;
    locationDropdown.onchange = displayAllParksByLocation;
    locationDropdown.style.display = "block";
    parkTypeDropdown.style.display = "none";
    locationDropdown.selectedIndex = 0;
    if (deletePreviousParentAccordion !== null) {
        parentContainingAccordion.removeChild(deletePreviousParentAccordion);
    }


}
function displayParkTypesDropdown() {
    const parkTypeDropdown = document.getElementById("searchParkType");
    const locationDropdown = document.getElementById("searchLocation");
    const parentContainingAccordion = document.getElementById("showAllParks");
    const deletePreviousParentAccordion = document.querySelector("#showAllParks div");
    const extraData = document.getElementById("extraData");
    extraData.innerHTML = "";
    extraData.style.borderTop = "0";
    extraData.style.margin = "0";
    extraData.style.paddingTop = "0";

    parkTypeDropdown.onchange = displayAllParksByParkType;
    parkTypeDropdown.selectedIndex = 0;
    parkTypeDropdown.style.display = "block";
    locationDropdown.style.display = "none";
    if (deletePreviousParentAccordion !== null) {
        parentContainingAccordion.removeChild(deletePreviousParentAccordion);
    }
}
function displayAllParksByLocation() {
    const stateSelected = document.getElementById("searchLocation").value;
    const parentContainingAccordion = document.getElementById("showAllParks");
    const deletePreviousParentAccordion = document.querySelector("#showAllParks div");
    const extraData = document.getElementById("extraData");
    const beforeCompute = new Date();
    let headingNum = 0;
    let totalParks = 0;
    let wholeState;
    //starting from the second time the dropdown is changed, there will already be an accordion so I need to remove it before the next one appears
    if (deletePreviousParentAccordion !== null) {
        parentContainingAccordion.removeChild(deletePreviousParentAccordion);
    }
    //adding a border under the dropdown for more styling
    extraData.style.borderTop = "1px solid rgba(127, 127, 127, 0.6)";
    extraData.style.margin = "2em 0 1em 0";
    extraData.style.paddingTop = "2rem";
    //only one parent is needed
    const parentAccordion = document.createElement("div");
    parentAccordion.className = "accordion w-75 mx-auto";
    parentAccordion.id = "containingAllAccordionItems";
    parentContainingAccordion.appendChild(parentAccordion);

    //compare the selected value with the State property to make the accordion per each 
    for (let i in nationalParksArray) {
        let currentPark = nationalParksArray[i];
        if (currentPark["State"].toLowerCase() === stateSelected) {
            wholeState = currentPark["State"];
            totalParks++;
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
            accordionHeader.id = "heading" + headingNum;
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
            collapseInfo.setAttribute("aria-labelledby", "heading" + headingNum);
            collapseInfo.setAttribute("data-bs-parent", "#containingAllAccordionItems");

            //now, append the children(what?)
            accordionBody.appendChild(innerTable);
            collapseInfo.appendChild(accordionBody);
            accordionHeader.appendChild(accordionButton);
            childAccordionItem.appendChild(accordionHeader);
            childAccordionItem.appendChild(collapseInfo);
            parentAccordion.appendChild(childAccordionItem);
            headingNum++;
            //create a few rows for the parks that match the selected option
            let remaningProperties = ["Phone", "Fax"];
            let remainPropindex = 0;
            let rowIndex = 0;
            for (let property in currentPark) {
                if ((property !== "Visit")) {
                    if (property === "LocationName") {
                        let row = innerTable.insertRow(rowIndex);
                        let cellLabel = row.insertCell(0);
                        let cellData = row.insertCell(1);
                        cellLabel.innerHTML = "Located in:";
                        cellData.innerHTML = justEntireAddresses[i];
                        rowIndex++;
                    }
                    else if (property === "Location") {
                        let row = innerTable.insertRow(rowIndex);
                        let cellLabel = row.insertCell(0);
                        let cellData = row.insertCell(1);
                        cellLabel.innerHTML = "Coordinates: ";
                        cellData.innerHTML = `${currentPark["Longitude"]}° N, ${currentPark["Latitude"]}° W`;
                        rowIndex;
                    }
                    else if (property === "Phone" || property === "Fax") {
                        let row = innerTable.insertRow(rowIndex);
                        let cellLabel = row.insertCell(0);
                        let cellData = row.insertCell(1);
                        cellLabel.innerHTML = remaningProperties[remainPropindex];
                        cellData.innerHTML = currentPark[property];
                        remainPropindex++;
                        rowIndex++;
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
    }
    const afterCompute = new Date();
    const millieSecsComputing = afterCompute.getTime() - beforeCompute.getTime();
    extraData.innerHTML = `It took ${millieSecsComputing} millieseconds to find all ${totalParks} parks located in ${wholeState}`;
}
function displayAllParksByParkType() {
    const selectedValue = document.getElementById("searchParkType").value;
    const parentContainingAccordion = document.getElementById("showAllParks");
    const deletePreviousParentAccordion = document.querySelector("#showAllParks div");
    const extraData = document.getElementById("extraData");
    const beforeCompute = new Date();
    let splitSelectedValue = selectedValue.split(" ");             //I converted the selected value into an array
    let headingNum = 0;
    let totalParks = 0;
    extraData.style.borderTop = "1px solid rgba(127, 127, 127, 0.6)";
    extraData.style.margin = "2em 0 1em 0";
    extraData.style.paddingTop = "2rem";

    //starting from the second time the dropdown is changed, there will already be an accordion so I need to remove it before the next one appears
    if (deletePreviousParentAccordion !== null) {
        parentContainingAccordion.removeChild(deletePreviousParentAccordion);
    }

    //only one parent is needed
    const parentAccordion = document.createElement("div");
    parentAccordion.className = "accordion w-75 mx-auto";
    parentAccordion.id = "containingAllAccordionItems";
    parentContainingAccordion.appendChild(parentAccordion);


    //compare the selected value with the State property to make the accordion per each 
    for (let i in nationalParksArray) {
        let currentPark = nationalParksArray[i];
        let splitParkName = currentPark.LocationName.split(" ");
         let breakCount = 0;
        for (let x in splitSelectedValue) {
            for (let y in splitParkName) {
                if (splitSelectedValue[x] === splitParkName[y].toLowerCase()) {
                    // this is for the selected values that are two words, once one of the words match break and test for the second
                    // this will help prevent making the accordion, as long as one of the words in the selected value matches
                    if(splitSelectedValue.length == 2){
                        if(breakCount == 0){
                            breakCount++;
                            break;
                        }
                    }

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
                    accordionHeader.id = "heading" + headingNum;
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
                    collapseInfo.className = "accordion-collapse collapse ";
                    collapseInfo.setAttribute("aria-labelledby", "heading" + headingNum);
                    collapseInfo.setAttribute("data-bs-parent", "#containingAllAccordionItems");

                    //now, append the children(what?)
                    accordionBody.appendChild(innerTable);
                    collapseInfo.appendChild(accordionBody);
                    accordionHeader.appendChild(accordionButton);
                    childAccordionItem.appendChild(accordionHeader);
                    childAccordionItem.appendChild(collapseInfo);
                    parentAccordion.appendChild(childAccordionItem);
                    headingNum++;
                    //create a few rows for the parks that match the selected option
                    let remaningProperties = ["Phone", "Fax"];
                    let remainPropindex = 0;
                    let rowIndex = 0;
                    for (let property in currentPark) {
                        if ((property !== "Visit")) {
                            if (property === "LocationName") {
                                let row = innerTable.insertRow(rowIndex);
                                let cellLabel = row.insertCell(0);
                                let cellData = row.insertCell(1);
                                cellLabel.innerHTML = "Located in:";
                                cellData.innerHTML = justEntireAddresses[i];
                                rowIndex++;
                            }
                            else if (property === "Location") {
                                let row = innerTable.insertRow(rowIndex);
                                let cellLabel = row.insertCell(0);
                                let cellData = row.insertCell(1);
                                cellLabel.innerHTML = "Coordinates: ";
                                cellData.innerHTML = `${currentPark["Longitude"]}° N, ${currentPark["Latitude"]}° W`;
                                rowIndex;
                            }
                            else if (property === "Phone" || property === "Fax") {
                                let row = innerTable.insertRow(rowIndex);
                                let cellLabel = row.insertCell(0);
                                let cellData = row.insertCell(1);
                                cellLabel.innerHTML = remaningProperties[remainPropindex];
                                cellData.innerHTML = currentPark[property];
                                remainPropindex++;
                                rowIndex++;
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
                    totalParks++;
                    break;   
                }
            }
        }
    }
    const afterCompute = new Date();
    const millieSecsComputing = afterCompute.getTime() - beforeCompute.getTime();
    extraData.innerHTML = `It took ${millieSecsComputing} millieseconds to find all ${totalParks} that matched the description`;
}
function showAllParks() {
    const beforeCompute = new Date();
    const parkTypeDropdown = document.getElementById("searchParkType");
    const locationDropdown = document.getElementById("searchLocation");
    const parentContainingAccordion = document.getElementById("showAllParks");
    const deletePreviousParentAccordion = document.querySelector("#showAllParks div");
    const extraData = document.getElementById("extraData"); 
    let headingNum = 0;

    extraData.style.borderTop = "0";
    extraData.style.marginBottom = "1.5em";
    extraData.style.paddingTop = "1rem";

    parkTypeDropdown.selectedIndex = 0;
    locationDropdown.selectedIndex = 0;
    parkTypeDropdown.style.display = "none";
    locationDropdown.style.display = "none";

    if (deletePreviousParentAccordion !== null) {
        parentContainingAccordion.removeChild(deletePreviousParentAccordion);
    }

    //only one parent is needed
    const parentAccordion = document.createElement("div");
    parentAccordion.className = "accordion w-75 mx-auto";
    parentAccordion.id = "containingAllAccordionItems";
    parentContainingAccordion.appendChild(parentAccordion);
   

    for (let i in nationalParksArray) {
        let currentPark = nationalParksArray[i];

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
        accordionHeader.id = "heading" + headingNum;
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
        collapseInfo.setAttribute("aria-labelledby", "heading" + headingNum);
        collapseInfo.setAttribute("data-bs-parent", "#containingAllAccordionItems");

        //now, append the children(what?)
        accordionBody.appendChild(innerTable);
        collapseInfo.appendChild(accordionBody);
        accordionHeader.appendChild(accordionButton);
        childAccordionItem.appendChild(accordionHeader);
        childAccordionItem.appendChild(collapseInfo);
        parentAccordion.appendChild(childAccordionItem);
        headingNum++;
        //create a few rows for the parks that match the selected option
        let remaningProperties = ["Phone", "Fax"];
        let remainPropindex = 0;
        let rowIndex = 0;
        for (let property in currentPark) {
            if ((property !== "Visit")) {
                if (property === "LocationName") {
                    let row = innerTable.insertRow(rowIndex);
                    let cellLabel = row.insertCell(0);
                    let cellData = row.insertCell(1);
                    cellLabel.innerHTML = "Located in:";
                    cellData.innerHTML = justEntireAddresses[i];
                    rowIndex++;
                }
                else if (property === "Location") {
                    let row = innerTable.insertRow(rowIndex);
                    let cellLabel = row.insertCell(0);
                    let cellData = row.insertCell(1);
                    cellLabel.innerHTML = "Coordinates: ";
                    cellData.innerHTML = `${currentPark["Longitude"]}° N, ${currentPark["Latitude"]}° W`;
                    rowIndex;
                }
                else if (property === "Phone" || property === "Fax") {
                    let row = innerTable.insertRow(rowIndex);
                    let cellLabel = row.insertCell(0);
                    let cellData = row.insertCell(1);
                    cellLabel.innerHTML = remaningProperties[remainPropindex];
                    cellData.innerHTML = currentPark[property];
                    remainPropindex++;
                    rowIndex++;
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
    const afterCompute = new Date();
    const millieSecsComputing = afterCompute.getTime() - beforeCompute.getTime();
    extraData.innerHTML = "It took " + millieSecsComputing + " millieseconds to show all parks";
}
"use strict";
window.onload = initial;

function initial(){
    const locationButton = document.getElementById("locationSearch");
    const parkButton = document.getElementById("parkSearch");
    locationButton.onclick = displayLocations;
    parkButton.onclick = displayParkTypes;
    
}
function displayLocations(){
    const locationDropdown = document.getElementById("searchLocation");
    const parkTypeDropdown = document.getElementById("searchParkType");
    locationDropdown.style.display = "block";
    parkTypeDropdown.style.display = "none";

}
function displayParkTypes(){
    const parkTypeDropdown = document.getElementById("searchParkType");
    const locationDropdown = document.getElementById("searchLocation");
    parkTypeDropdown.style.display = "block";
    locationDropdown.style.display = "none";
}


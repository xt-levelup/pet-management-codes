"use strict";

//-----TẠO BIẾN GLOBAL------

const id = document.getElementById("input-id");
const namePet = document.getElementById("input-name");
const age = document.getElementById("input-age");
const type = document.getElementById("input-type");
const weight = document.getElementById("input-weight");
const length = document.getElementById("input-length");
const color = document.getElementById("input-color-1");

const vaccinated = document.getElementById("input-vaccinated");
const dewormed = document.getElementById("input-dewormed");
const sterilized = document.getElementById("input-sterilized");
const submitbtn = document.getElementById("submit-btn");
const healthybtn = document.getElementById("healthy-btn");

const sidebar = document.getElementById("sidebar");
const submitBreed = document.getElementById("submit-btn-breed");
const breed = document.getElementById("input-breed");
const breedType = document.getElementById("input-type-breed");
const tbody = document.getElementById("tbody");
const petArr = getFromStorage("petArr") ?? [];
let breedArr = getFromStorage("breedJson") ?? [];

const dogBreed = [];
const catBreed = [];

const petHealthy = [];

const breedPetArr = petArr
    .filter(
        (br, index, arr1) =>
            index === arr1.findIndex((x) => x.breedPet === br.breedPet)
    )
    .map((br) => br.breedPet);

//------TẠO MẢNG BREED THEO LOẠI------
for (let i = 0; i < breedArr.length; i++) {
    if (breedArr[i].typeOfBreed === "Dog") {
        dogBreed.push(breedArr[i]);
    } else {
        catBreed.push(breedArr[i]);
    }
}

//----TẠO RESET FORM--------
function defaultPetForm() {
    id.value = "";
    namePet.value = "";
    age.value = "";
    type.value = "Select Type";
    weight.value = "";
    length.value = "";
    breed.value = "Select Breed";
    vaccinated.checked = false;
    dewormed.checked = false;
    sterilized.checked = false;
}

//-------TẠO EVENT Ở TRƯỜNG TYPE --------
type.addEventListener("change", function () {
    while (breed.firstChild) {
        breed.removeChild(breed.firstChild);
    }

    const breedOption = document.createElement("option");
    breedOption.innerHTML = "Select Breed";
    breed.appendChild(breedOption);
    if (type.value === "Dog") {
        for (let i = 0; i < dogBreed.length; i++) {
            const breedOption = document.createElement("option");
            breedOption.innerHTML = dogBreed[i].breedValue;
            breed.appendChild(breedOption);
        }
    } else if (type.value === "Cat") {
        for (let i = 0; i < catBreed.length; i++) {
            const breedOption = document.createElement("option");
            breedOption.innerHTML = catBreed[i].breedValue;
            breed.appendChild(breedOption);
        }
    }
});

//-----TẠO ANIAMTION Ở SIDEBAR--------
sidebar.addEventListener("click", function (e) {
    this.classList.toggle("active");
});

//-----TẠO HÀM LƯU VÀO LOCAL STORAGE-----
function saveToStorage(key, value) {
    const jsonFile = JSON.stringify(value);
    localStorage.setItem(key, jsonFile);
}

//------TẠO HÀM LẤY DỮ LIỆU TỪ LOCAL STORAGE--------
function getFromStorage(key) {
    const jsonFile = localStorage.getItem(key);
    return JSON.parse(jsonFile);
}

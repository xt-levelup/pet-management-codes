"use strict";

const formEdit = document.getElementById("container-form");

//-------TẠO HÀM CHỈNH SỬA THÔNG TIN PET--------
function petEdit(idPet) {
    formEdit.classList.remove("hide");
    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].petId === idPet) {
            id.value = petArr[i].petId;
            namePet.value = petArr[i].petName;
            age.value = petArr[i].agePet;
            type.value = petArr[i].typePet;
            weight.value = petArr[i].weightPet;
            length.value = petArr[i].lengthPet;
            color.value = petArr[i].colorPet;

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

            breed.value = petArr[i].breedPet;
            vaccinated.checked = petArr[i].vaccinatedPet;
            dewormed.checked = petArr[i].dewormedPet;
            sterilized.checked = petArr[i].sterilizedPet;
        }
    }
}

//---------TẠO SỰ KIỆN LÊN BUTTON SUBMIT EDIT------
submitbtn.addEventListener("click", function () {
    const petObjectEdit = {
        petId: id.value,
        petName: namePet.value,
        agePet: age.value,
        typePet: type.value,
        weightPet: weight.value,
        lengthPet: length.value,
        breedPet: breed.value,
        colorPet: color.value,
        vaccinatedPet: vaccinated.checked,
        dewormedPet: dewormed.checked,
        sterilizedPet: sterilized.checked,
    };

    for (let i = 0; i < petArr.length; i++) {
        if (petArr[i].petId === petObjectEdit.petId) {
            petArr[i].petName = petObjectEdit.petName;
            petArr[i].agePet = petObjectEdit.agePet;
            petArr[i].typePet = petObjectEdit.typePet;
            petArr[i].weightPet = petObjectEdit.weightPet;
            petArr[i].lengthPet = petObjectEdit.lengthPet;
            petArr[i].breedPet = petObjectEdit.breedPet;
            petArr[i].colorPet = petObjectEdit.colorPet;
            petArr[i].vaccinatedPet = petObjectEdit.vaccinatedPet;
            petArr[i].dewormedPet = petObjectEdit.dewormedPet;
            petArr[i].sterilizedPet = petObjectEdit.sterilizedPet;
        }
    }

    saveToStorage("petArr", petArr);
    defaultPetForm();
    formEdit.classList.add("hide");
    showPetEdit(petArr);
});

//-----TẠO HÀM HIỂN THỊ PET Ở TRANG EDIT PET-------
function showPetEdit(petArr) {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    for (let i = 0; i < petArr.length; i++) {
        const trChild = document.createElement("tr");
        const trNew = tbody.appendChild(trChild);
        const td1 = document.createElement("th");
        td1.innerHTML = petArr[i].petId;
        trNew.appendChild(td1);
        const td2 = document.createElement("td");
        td2.innerHTML = petArr[i].petName;
        trNew.appendChild(td2);

        const td3 = document.createElement("td");
        td3.innerHTML = petArr[i].agePet;
        trNew.appendChild(td3);
        const td4 = document.createElement("td");
        td4.innerHTML = petArr[i].typePet;
        trNew.appendChild(td4);
        const td5 = document.createElement("td");
        td5.innerHTML = petArr[i].weightPet;
        trNew.appendChild(td5);
        const td6 = document.createElement("td");
        td6.innerHTML = petArr[i].lengthPet;
        trNew.appendChild(td6);
        const td8 = document.createElement("td");
        td8.innerHTML = petArr[i].breedPet;
        trNew.appendChild(td8);
        const td7 = document.createElement("td");
        const bgColor = document.createElement("div");
        bgColor.style.backgroundColor = petArr[i].colorPet;
        bgColor.style.width = "30px";
        bgColor.style.height = "30px";
        bgColor.style.borderRadius = "5px";

        td7.appendChild(bgColor);

        trNew.appendChild(td7);
        const td9 = document.createElement("td");
        td9.innerHTML = petArr[i].vaccinatedPet;
        td9.innerHTML = petArr[i].vaccinatedPet ? "🆗" : "🛑";

        trNew.appendChild(td9);
        const td10 = document.createElement("td");
        td10.innerHTML = petArr[i].dewormedPet ? "🆗" : "🛑";

        trNew.appendChild(td10);
        const td11 = document.createElement("td");
        td11.innerHTML = petArr[i].sterilizedPet ? "🆗" : "🛑";

        trNew.appendChild(td11);
        const td12 = document.createElement("td");
        td12.innerHTML = petArr[i].dateAdd;

        trNew.appendChild(td12);
        const td13 = document.createElement("td");
        td13.innerHTML = `<button style='border-radius:5px;background-color:blue;color:white;border:none;' onclick=petEdit('${petArr[i].petId}')>Edit</button>`;

        trNew.appendChild(td13);
    }
}
showPetEdit(petArr);

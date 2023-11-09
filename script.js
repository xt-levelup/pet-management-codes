"use strict";

//----TẠO BIẾN GLOBAL----

let today = new Date();
let day = String(today.getDate()).padStart(2, "0");
let month = String(today.getMonth() + 1).padStart(2, "0");
let year = today.getFullYear().toString();
today = day + "/" + month + "/" + year;

let petSubmitValid = true;

//------TẠO HÀM HIỂN THỊ TẤT CẢ CÁC PET LÊN TRANG CHÍNH------
function showPet(petArr) {
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
        td13.innerHTML = `<button style='border-radius:5px;background-color:red;color:white;border:none;' onclick=deletePet('${petArr[i].petId}')>Delete</button>`;

        trNew.appendChild(td13);
    }
}

//---------TẠO HÀM XOÁ PET------
function deletePet(idPet) {
    if (confirm("Ban muon xoa that chu?")) {
        for (let i = 0; i < petArr.length; i++) {
            if (petArr[i].petId === idPet) {
                petArr.splice(i, 1);
                for (let j = 0; j < petHealthy.length; j++) {
                    if (petHealthy[j].petId === idPet) {
                        petHealthy.splice(j, 1);
                    }
                }
            }
        }

        saveToStorage("petArr", petArr);

        if (healthybtn.textContent === "Show Healthy Pet") {
            showPet(petArr);
        } else if (healthybtn.textContent === "Show All Pet") {
            showPet(petHealthy);
        }
    }
}

//--------TẠO SỰ KIỆN LÊN NÚT SUBMIT CẬP NHẬT PET VÀO DANH SÁCH-----
submitbtn.addEventListener("click", function (e) {
    const petObject = {
        petId: id.value,
        petName: namePet.value,
        agePet: age.value,
        typePet: type.value,
        weightPet: weight.value,
        lengthPet: length.value,
        colorPet: color.value,
        breedPet: breed.value,
        vaccinatedPet: vaccinated.checked,
        dewormedPet: dewormed.checked,
        sterilizedPet: sterilized.checked,
        dateAdd: today,
    };

    if (!id.value) {
        alert("ID khong de trong");
        petSubmitValid = false;
        return;
    } else if (!namePet.value) {
        alert("Ten khong de trong");
        petSubmitValid = false;
        return;
    } else if (!age.value) {
        alert("Tuoi khong de trong");
        petSubmitValid = false;
        return;
    } else if (type.value === "Select Type") {
        console.log(type.value);
        alert("Hay chon loai Dog/Cat");
        petSubmitValid = false;
        return;
    } else if (!weight.value) {
        alert("Can nang khong de trong");
        petSubmitValid = false;
        return;
    } else if (!length.value) {
        alert("Chieu dai khong de trong");
        petSubmitValid = false;
        return;
    } else if (breed.value === "Select Breed") {
        alert("Hay chon giong Breed");
        petSubmitValid = false;
        return;
    } else if (petArr.some((e) => e.petId === id.value)) {
        alert("ID da ton tai, hay chon ID khac");
        petSubmitValid = false;
        return;
    } else if (age.value < 1) {
        alert("Age la mot so duong! Hay xem lai!");
        petSubmitValid = false;
        return;
    } else if (weight.value < 1) {
        alert("Weight la mot so duong! Hay xem lai!");
        petSubmitValid = false;
        return;
    } else if (length.value < 1) {
        alert("Length la mot so duong! Hay xem lai!");
        petSubmitValid = false;
        return;
    } else {
        petSubmitValid = true;
    }

    if (petSubmitValid) {
        petArr.push(petObject);
        saveToStorage("petArr", petArr);
        defaultPetForm();
    }

    showPet(petArr);
});

//--------TẠO SỰ KIỆN LỌC NHỮNG PET KHOẺ MẠNH--------
healthybtn.addEventListener("click", function () {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    let checkHealthy = true;

    for (let i = 0; i < petArr.length; i++) {
        if (petHealthy.some((e) => e.petId === petArr[i].petId)) {
            checkHealthy = false;
        } else {
            checkHealthy = true;
        }
        if (
            petArr[i].vaccinatedPet &&
            petArr[i].dewormedPet &&
            petArr[i].sterilizedPet &&
            checkHealthy
        ) {
            petHealthy.push(petArr[i]);
        }
    }

    if (healthybtn.textContent === "Show Healthy Pet") {
        showPet(petHealthy);
        healthybtn.textContent = "Show All Pet";
    } else {
        showPet(petArr);
        healthybtn.textContent = "Show Healthy Pet";
    }
});

showPet(petArr);

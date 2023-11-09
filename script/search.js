"use strict";

const findbtn = document.getElementById("find-btn");

//------TẠO ARRAY BREED CHO TRANG SEARCH-------
const breedOptionFull = breedArr
    .filter(
        (br, index, brAr) =>
            index === brAr.findIndex((t) => t.breedValue === br.breedValue)
    )
    .map((br) => br.breedValue);

for (let i = 0; i < breedPetArr.length; i++) {
    if (!breedOptionFull.includes(breedPetArr[i])) {
        breedOptionFull.push(breedPetArr[i]);
    }
}

//----TẠO HÀM HIỂN THỊ TẤT CẢ CÁC BREED HIỆN CÓ-----
function showBreedAll() {
    for (let i = 0; i < breedOptionFull.length; i++) {
        const breedOption = document.createElement("option");
        breedOption.innerHTML = breedOptionFull[i];
        breed.appendChild(breedOption);
    }
}

//------TẠO HÀM HIỂN THỊ PET DÀNH CHO TRANG SEARCH-------
function showPetFind(petArr) {
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
    }
}

//------TẠO HÀM CLEAR FORM SAU KHI FIND XONG---------
function formClearFind() {
    id.value = "";
    namePet.value = "";
    type.value = "Select Type";
    breed.value = "Select Breed";
    vaccinated.checked = false;
    dewormed.checked = false;
    sterilized.checked = false;
}

//-----HIỂN THỊ TUỲ CHỌN BREED ĐẦY ĐỦ VỚI BẤT KỲ TYPE NÀO-------
type.addEventListener("change", function () {
    while (breed.firstChild) {
        breed.removeChild(breed.firstChild);
    }

    const breedOption = document.createElement("option");
    breedOption.innerHTML = "Select Breed";
    breed.appendChild(breedOption);
    showBreedAll();
});

showBreedAll();

//------TẠO SỰ KIỆN LÊN BUTTON FIND---------
findbtn.addEventListener("click", function () {
    let petFilter = [];
    showPetFind(petFilter);
    const findObject = {
        petId: id.value,
        petName: namePet.value,
        typePet: type.value,
        breedPet: breed.value,
        vaccinatedPet: vaccinated.checked,
        dewormedPet: dewormed.checked,
        sterilizedPet: sterilized.checked,
    };

    const typeFindValid = findObject.typePet === "Select Type" ? false : true;
    const breedFindValid =
        findObject.breedPet === "Select Breed" ? false : true;

    const filter1 =
        findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        !breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter2 =
        !findObject.petId &&
        findObject.petName &&
        !typeFindValid &&
        !breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter3 =
        !findObject.petId &&
        !findObject.petName &&
        typeFindValid &&
        !breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter4 =
        !findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;

    const filter5 =
        findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet &&
        !findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        !breedFindValid
            ? true
            : false;
    const filter6 =
        findObject.dewormedPet &&
        !findObject.vaccinatedPet &&
        !findObject.sterilizedPet &&
        !findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        !breedFindValid
            ? true
            : false;
    const filter7 =
        findObject.sterilizedPet &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        !breedFindValid
            ? true
            : false;

    const filter8 =
        findObject.dewormedPet &&
        findObject.vaccinatedPet &&
        !findObject.sterilizedPet &&
        !findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        !breedFindValid
            ? true
            : false;

    const filter9 =
        findObject.sterilizedPet &&
        findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        !breedFindValid
            ? true
            : false;

    const filter10 =
        findObject.dewormedPet &&
        findObject.sterilizedPet &&
        !findObject.vaccinatedPet &&
        !findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        !breedFindValid
            ? true
            : false;
    const filter11 =
        findObject.vaccinatedPet &&
        findObject.dewormedPet &&
        findObject.sterilizedPet &&
        !findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        !breedFindValid
            ? true
            : false;

    const filter12 =
        findObject.petId &&
        findObject.petName &&
        !typeFindValid &&
        !breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter13 =
        findObject.petId &&
        !findObject.petName &&
        typeFindValid &&
        !breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter14 =
        findObject.petId &&
        !findObject.petName &&
        !typeFindValid &&
        breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter15 =
        findObject.petId &&
        findObject.petName &&
        typeFindValid &&
        !breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter16 =
        findObject.petId &&
        findObject.petName &&
        !typeFindValid &&
        breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter17 =
        !findObject.petId &&
        findObject.petName &&
        typeFindValid &&
        breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter18 =
        findObject.petId &&
        findObject.petName &&
        typeFindValid &&
        breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;

    const filter19 =
        !findObject.petId &&
        findObject.petName &&
        typeFindValid &&
        !breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;
    const filter20 =
        !findObject.petId &&
        !findObject.petName &&
        typeFindValid &&
        breedFindValid &&
        !findObject.vaccinatedPet &&
        !findObject.dewormedPet &&
        !findObject.sterilizedPet
            ? true
            : false;

    petFilter = petArr.filter(function (pet) {
        return (
            (filter1 &&
                pet.petId
                    .toLowerCase()
                    .includes(findObject.petId.toLowerCase())) ||
            (filter2 &&
                pet.petName
                    .toLowerCase()
                    .includes(findObject.petName.toLowerCase())) ||
            (filter3 &&
                pet.typePet
                    .toLowerCase()
                    .includes(findObject.typePet.toLowerCase())) ||
            (filter4 &&
                pet.breedPet
                    .toLowerCase()
                    .includes(findObject.breedPet.toLowerCase())) ||
            (filter5 && pet.vaccinatedPet === findObject.vaccinatedPet) ||
            (filter6 && pet.dewormedPet === findObject.dewormedPet) ||
            (filter7 && pet.sterilizedPet === findObject.sterilizedPet) ||
            (filter8 &&
                pet.dewormedPet === findObject.dewormedPet &&
                pet.vaccinatedPet === findObject.vaccinatedPet) ||
            (filter9 &&
                pet.sterilizedPet === findObject.sterilizedPet &&
                pet.vaccinatedPet === findObject.vaccinatedPet) ||
            (filter10 &&
                pet.sterilizedPet === findObject.sterilizedPet &&
                pet.dewormedPet === findObject.dewormedPet) ||
            (filter11 &&
                pet.sterilizedPet === findObject.sterilizedPet &&
                pet.dewormedPet === findObject.dewormedPet &&
                pet.vaccinatedPet === findObject.vaccinatedPet) ||
            (filter12 &&
                pet.petId
                    .toLowerCase()
                    .includes(findObject.petId.toLowerCase()) &&
                pet.petName
                    .toLowerCase()
                    .includes(findObject.petName.toLowerCase())) ||
            (filter13 &&
                pet.petId
                    .toLowerCase()
                    .includes(findObject.petId.toLowerCase()) &&
                pet.typePet
                    .toLowerCase()
                    .includes(findObject.typePet.toLowerCase())) ||
            (filter14 &&
                pet.petId
                    .toLowerCase()
                    .includes(findObject.petId.toLowerCase()) &&
                pet.breedPet
                    .toLowerCase()
                    .includes(findObject.breedPet.toLowerCase())) ||
            (filter15 &&
                pet.petId
                    .toLowerCase()
                    .includes(findObject.petId.toLowerCase()) &&
                pet.typePet
                    .toLowerCase()
                    .includes(findObject.typePet.toLowerCase()) &&
                pet.petName
                    .toLowerCase()
                    .includes(findObject.petName.toLowerCase())) ||
            (filter16 &&
                pet.petId
                    .toLowerCase()
                    .includes(findObject.petId.toLowerCase()) &&
                pet.breedPet
                    .toLowerCase()
                    .includes(findObject.breedPet.toLowerCase()) &&
                pet.petName
                    .toLowerCase()
                    .includes(findObject.petName.toLowerCase())) ||
            (filter17 &&
                pet.typePet
                    .toLowerCase()
                    .includes(findObject.typePet.toLowerCase()) &&
                pet.breedPet
                    .toLowerCase()
                    .includes(findObject.breedPet.toLowerCase()) &&
                pet.petName
                    .toLowerCase()
                    .includes(findObject.petName.toLowerCase())) ||
            (filter18 &&
                pet.typePet
                    .toLowerCase()
                    .includes(findObject.typePet.toLowerCase()) &&
                pet.petId
                    .toLowerCase()
                    .includes(findObject.petId.toLowerCase()) &&
                pet.breedPet
                    .toLowerCase()
                    .includes(findObject.breedPet.toLowerCase()) &&
                pet.petName
                    .toLowerCase()
                    .includes(findObject.petName.toLowerCase())) ||
            (filter19 &&
                pet.typePet
                    .toLowerCase()
                    .includes(findObject.typePet.toLowerCase()) &&
                pet.petName
                    .toLowerCase()
                    .includes(findObject.petName.toLowerCase())) ||
            (filter20 &&
                pet.typePet
                    .toLowerCase()
                    .includes(findObject.typePet.toLowerCase()) &&
                pet.breedPet
                    .toLowerCase()
                    .includes(findObject.breedPet.toLowerCase()))
        );
    });

    showPetFind(petFilter);

    petFilter = [];

    formClearFind();
});

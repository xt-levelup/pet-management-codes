"use strict";

function breedArrUpdate() {
    const breedTypePetArr = petArr.map((brTy) => ({
        breedValue: brTy.breedPet,
        typeOfBreed: brTy.typePet,
    }));

    const breedArrTemp = breedArr.concat(breedTypePetArr);
    const breedArrTempFilter = breedArrTemp.filter(
        (br, index, self) =>
            index === self.findIndex((t) => t.breedValue === br.breedValue)
    );

    breedArr = breedArrTempFilter;
    saveToStorage("breedJson", breedArr);
}

breedArrUpdate();

//-----TẠO HÀM HIỂN THỊ DANH SÁCH CÁC BREED------
function createTd() {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }

    for (let i = 0; i < breedArr.length; i++) {
        const trChild = document.createElement("tr");
        const tdChild1 = document.createElement("td");
        const tdChild2 = document.createElement("td");
        const tdChild3 = document.createElement("td");
        const tdChild4 = document.createElement("td");

        const tr = tbody.appendChild(trChild);

        tdChild1.innerHTML = i + 1;
        tr.appendChild(tdChild1);
        tdChild2.innerHTML = breedArr[i].breedValue;
        tr.appendChild(tdChild2);
        tdChild3.innerHTML = breedArr[i].typeOfBreed;
        tr.appendChild(tdChild3);
        tdChild4.innerHTML = `<button class="delete" onclick="deleteBreed('${breedArr[i].breedValue}')">Delete</button>`;
        tr.appendChild(tdChild4);
    }
}

//------TẠO HÀM XOÁ BREED------
function deleteBreed(breedValue) {
    if (confirm("Ban muon xoa that chu?")) {
        for (let i = 0; i < breedArr.length; i++) {
            if (breedArr[i].breedValue === breedValue) {
                breedArr.splice(i, 1);
            }
        }
        saveToStorage("breedJson", breedArr);
        createTd();
    }
}

//-------TẠO HÀM RESET FORM Ở TRANG BREED-------
function clearFormBreed() {
    breed.value = "";
    breedType.value = "Select Type";
}

//-----TẠO SỰ KIỆN LÊN NÚT SUBMIT TẠO BREED-------
submitBreed.addEventListener("click", function (e) {
    breedArrUpdate();
    const breedObject = {
        breedValue: breed.value,
        typeOfBreed: breedType.value,
    };

    const breedValid = {
        breedCheck: breed.value ? true : false,
        breedTypeCheck: breedType.value != "Select Type" ? true : false,
        breedArrValueCheck: true,
    };
    breedArr.forEach(function (br) {
        if (
            br.breedValue === breedObject.breedValue &&
            br.typeOfBreed === breedObject.typeOfBreed
        ) {
            alert("Breed va Type da ton tai!");
            breedValid.breedArrValueCheck = false;
        }
    });

    const breedValidCheck =
        breedValid.breedCheck &&
        breedValid.breedTypeCheck &&
        breedValid.breedArrValueCheck;

    if (breedValidCheck) {
        breedArr.push(breedObject);

        saveToStorage("breedJson", breedArr);
    } else if (!breedValid.breedCheck) {
        alert("Breed khong de trong");
        return;
    } else if (!breedValid.breedTypeCheck) {
        alert("Hay chon Type: Dog/Cat");
        return;
    }

    createTd();
    clearFormBreed();
});

createTd();

"use strict";

const exportbtn = document.getElementById("export-btn");
const importbtn = document.getElementById("import-btn");
const pets = getFromStorage("pets") ?? [];

//-----TẠO HÀM EXPORT FILE ------
function exportFile() {
    const filename = "pets.json";
    const json = JSON.stringify(petArr);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
}

//------TẠO EVENT LÊN BUTTON EXPORT FILE------
exportbtn.addEventListener("click", exportFile);

//-----TẠO HÀM IMPORT FILE---------
function importFile() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = function () {
        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            const pets = JSON.parse(reader.result);

            for (let i = 0; i < pets.length; i++) {
                let found = false;
                for (let j = 0; j < petArr.length; j++) {
                    if (pets[i].petId === petArr[j].petId) {
                        Object.assign(petArr[j], pets[i]);
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    petArr.push(pets[i]);
                }
            }

            saveToStorage("pets", pets);

            saveToStorage("petArr", petArr);
        };
        reader.readAsText(file);
    };

    input.click();
}

//-----TẠO EVENT LÊN BUTTON IMPORT FILE-------
importbtn.addEventListener("click", importFile);

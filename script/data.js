"use strict";

// Export data

const exportBtn = document.getElementById("export-btn");

function saveDataToFile() {
  let blob = new Blob([`${getFromStorage("petArr")}`], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "petList.txt");
}

exportBtn.addEventListener("click", saveDataToFile);

//Import data

// Phần import data này mình chỉ làm được load data mới lên chứ chưa push thêm vào data cũ, cũng như ghi đè thú cưng có sẵn

let petArr;

const importBtn = document.getElementById("import-btn");

function readFile() {
  const [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      petArr = JSON.parse(reader.result);
      saveToStorage("petArr", JSON.stringify(petArr));
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
}

importBtn.addEventListener("click", readFile);

"use strict";

// Select element

const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const typeInput = document.getElementById("input-type");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const findBtn = document.getElementById("find-btn");

// khai bao bien

let petArr, breedArr;

// Event Handler

findBtn.addEventListener("click", function () {
  petArr = JSON.parse(getFromStorage("petArr"));
  if (idInput.value) {
    petArr = petArr.filter((pet) => pet.id.includes(idInput.value));
  }
  if (nameInput.value) {
    petArr = petArr.filter((pet) => pet.name.includes(nameInput.value));
  }
  if (typeInput.value === "Dog") {
    petArr = petArr.filter((pet) => pet.type === "Dog");
  }
  if (typeInput.value === "Cat") {
    petArr = petArr.filter((pet) => pet.type === "Cat");
  }
  if (breedInput.value !== "Select Breed") {
    petArr = petArr.filter((pet) => pet.breed === breedInput.value);
  }
  if (vaccinatedInput.checked) {
    petArr = petArr.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInput.checked) {
    petArr = petArr.filter((pet) => pet.dewormed === true);
  }
  if (sterilizedInput.checked) {
    petArr = petArr.filter((pet) => pet.sterilized === true);
  }
  clearInput();
  renderTableData(petArr);

  // Reset petArr để khi search pet khác không bị chồng data

  petArr = [];
});

// Function

function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  petArr.forEach((pet) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <th scope="row">${pet.id}</th>
              <td>${pet.name}</td>
              <td>${pet.age}</td>
              <td>${pet.type}</td>
              <td>${pet.weight} kg</td>
              <td>${pet.length} cm</td>
              <td>${pet.breed}</td>
              <td>
                <i class="bi bi-square-fill" style="color: ${pet.color}"></i>
              </td>
              <td><i class="bi bi-${
                pet.vaccinated == true ? "check" : "x"
              }-circle-fill"></i></td>
              <td><i class="bi bi-${
                pet.dewormed == true ? "check" : "x"
              }-circle-fill"></i></td>
              <td><i class="bi bi-${
                pet.sterilized == true ? "check" : "x"
              }-circle-fill"></i></td>
              <td>${pet.date}</td>`;
    tableBodyEl.appendChild(row);
  });
}

function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  typeInput.value = "Select Type";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Hiển thị Breed

function resetBreed() {
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.innerHTML = `<option>Select Breed</option>`;
  breedInput.appendChild(option);
}
function renderBreed(breedArr) {
  breedArr.forEach((brd) => {
    const option = document.createElement("option");
    option.innerHTML = `<option>${brd.breed}</option>`;
    breedInput.appendChild(option);
  });
}

typeInput.addEventListener("change", (event) => {
  if (typeInput.value === "Cat") {
    breedArr = JSON.parse(getFromStorage("breedArr")).filter(
      (brd) => brd.type === "Cat"
    );
    resetBreed();
    renderBreed(breedArr);
  }
});
typeInput.addEventListener("change", (event) => {
  if (typeInput.value === "Dog") {
    breedArr = JSON.parse(getFromStorage("breedArr")).filter(
      (brd) => brd.type === "Dog"
    );
    resetBreed();
    renderBreed(breedArr);
  }
});

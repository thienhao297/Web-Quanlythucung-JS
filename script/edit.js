"use strict";

// select element

const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const formEl = document.getElementById("container-form");
const tableBodyEl = document.getElementById("tbody");
const editBtn = document.querySelector(".navbar-brand");

// Khai bao bien

let petArr = JSON.parse(getFromStorage("petArr"));
renderEditData(JSON.parse(getFromStorage("petArr")));
let curPet, breedArr;
const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();
if (dd < 10) dd = "0" + dd;
if (mm < 10) mm = "0" + mm;

//Event handler

editBtn.addEventListener("click", function () {
  formEl.classList.toggle("hide");
});

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

submitBtn.addEventListener("click", function () {
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: dd + "/" + mm + "/" + yyyy,
  };

  // điều kiện validate

  let validate = validateData(data);
  if (
    !nameInput.value ||
    !ageInput.value ||
    !weightInput.value ||
    !lengthInput.value
  )
    alert("Please fill out the form below!");

  if (ageInput.value > 15 || ageInput.value < 1) {
    alert("Age must be between 1 and 15");
  }
  if (typeInput.value === "Select Type") {
    alert("Please select Type!");
  }
  if (weightInput.value > 15 || weightInput.value < 1) {
    alert("Weight must be between 1 and 15");
  }
  if (lengthInput.value > 100 || lengthInput.value < 1) {
    alert("Length must be between 1 and 100");
  }
  if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
  }

  if (validate) {
    petArr[petArr.findIndex((x) => x.id === data.id)] = data;
    saveToStorage("petArr", JSON.stringify(petArr));
    clearInput();
    renderEditData(petArr);
  }
});

// Function

function renderEditData(petArr) {
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
              <td>${pet.date}</td>
              <td>
                <button type="button" class="btn btn-warning"onclick="editPet('${
                  pet.id
                }')">Edit</button>
              </td>`;
    tableBodyEl.appendChild(row);
  });
}

function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#212529";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

function validateData(data) {
  if (
    !idInput.value ||
    !nameInput.value ||
    !ageInput.value ||
    !weightInput.value ||
    !lengthInput.value ||
    ageInput.value > 15 ||
    ageInput.value < 1 ||
    typeInput.value === "Select Type" ||
    weightInput.value > 15 ||
    weightInput.value < 1 ||
    lengthInput.value > 100 ||
    lengthInput.value < 1 ||
    breedInput.value === "Select Breed"
  ) {
    return false;
  } else {
    return true;
  }
}

function editPet(petid) {
  let petID = petid;
  curPet = petArr[petArr.findIndex((x) => x.id === petID)];
  editInput(curPet);
}

function editInput(curPet) {
  idInput.value = curPet.id;
  nameInput.value = curPet.name;
  ageInput.value = curPet.age;
  typeInput.value = curPet.type;
  if (typeInput.value === "Cat") {
    breedArr = JSON.parse(getFromStorage("breedArr")).filter(
      (brd) => brd.type === "Cat"
    );
    resetBreed();
    renderBreed(breedArr);
  } else if (typeInput.value === "Dog") {
    breedArr = JSON.parse(getFromStorage("breedArr")).filter(
      (brd) => brd.type === "Dog"
    );
    resetBreed();
    renderBreed(breedArr);
  }
  weightInput.value = curPet.weight;
  lengthInput.value = curPet.length;
  colorInput.value = curPet.color;
  breedInput.value = curPet.breed;
  vaccinatedInput.checked = curPet.vaccinated;
  dewormedInput.checked = curPet.dewormed;
  sterilizedInput.checked = curPet.sterilized;
}

// Lọc breed theo type
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

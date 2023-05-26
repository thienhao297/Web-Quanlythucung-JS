"use strict";

// Select Element

const breedInput = document.getElementById("input-breed");
const typeInput = document.getElementById("input-type");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");

let breedArr = [];
let breedID = [];

if (getFromStorage("breedArr")) {
  breedArr = JSON.parse(getFromStorage("breedArr"));
  breedArr.forEach((breed) => breedID.push(breed.id));
}
renderTableData(breedArr);

// Event Handler

submitBtn.addEventListener("click", function () {
  const data = {
    type: typeInput.value,
    breed: breedInput.value,
    id: breedID.length + 1,
  };
  let validate = validateData(data);
  if (!breedInput.value) {
    alert("Please input Breed!");
  }
  if (typeInput.value === "Select Type") {
    alert("Please select Type!");
  }
  if (validate) {
    breedArr.push(data);
    saveToStorage("breedArr", JSON.stringify(breedArr));
    breedID.push(data.id);
    clearInput();
    renderTableData(breedArr);
  }
});

// Function

function validateData(data) {
  if (typeInput.value === "Select Type" || !breedInput.value) {
    return false;
  } else {
    return true;
  }
}
///////////////////////////////////

function clearInput() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

///////////////////////////////
function renderTableData(breedArr) {
  tableBodyEl.innerHTML = "";
  breedArr.forEach((breed) => {
    const row = document.createElement("tr");
    row.innerHTML = `
  <th scope="row">${breed.id}</th>
              <td>${breed.breed}</td>
              <td>${breed.type}</td>
              <td>
                <button type="button" class="btn btn-danger"onclick="deleteBreed('${breed.id}')">Delete</button>
              </td>`;
    tableBodyEl.appendChild(row);
  });
}

function deleteBreed(breedid) {
  let brID = breedid;
  if (confirm("Are you sure?")) {
    function spliceArr(arr) {
      arr.splice(
        arr.findIndex((x) => x.id === brID),
        1
      );
    }
    spliceArr(breedArr);
    spliceArr(breedID);
  }
  saveToStorage("breedArr", JSON.stringify(breedArr));
  renderTableData(breedArr);
}

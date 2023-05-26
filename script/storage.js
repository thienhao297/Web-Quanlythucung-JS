"use strict";

// Thêm animation cho sidebar, vì 4 file html đều link storage.js nên thêm event handler sidebar cho file js chung
const sidebar = document.getElementById("sidebar");
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

// Function Storage

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

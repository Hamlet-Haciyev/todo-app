const form = document.getElementById("form");
const input = document.getElementById("input");
let list = document.getElementById("list");
const sort = document.querySelector(".sort");
const add = document.querySelector(".add");
let isSorted = false;

showData();
function showData() {
  let arrData = [];
  let tags = "";
  const LocalStData = JSON.parse(localStorage.getItem("datas"));
  if (LocalStData == null) {
    arrData = [];
  } else {
    for (let i = 0; i < LocalStData.length; i++) {
      arrData.push(LocalStData[i]);
    }
  }

  if (arrData != null) {
    arrData.forEach((data, index) => {
      tags += `<li><span>${data}</span><i onclick="deleteData(${index})" class="fa-solid fa-trash-can"></i></li>`;
    });
  }
  list.innerHTML = tags;
}

function updateData() {
  isSorted = !isSorted;

  let LSdata = JSON.parse(localStorage.getItem("datas"));
  let getDataLSArr = [];
  for (let i = 0; i < LSdata.length; i++) {
    getDataLSArr.push(LSdata[i]);
  }
  // getDataLSArr.sort(); localstorage den gelen datalari bir array atib sonra siralayiriq.Normal sort yazanda alfabeye gore siralayir.Amma asagida kimi yazsaq isteyimize esasen siralaya bilerik.
  if (isSorted) {
    getDataLSArr.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });
  } else if (!isSorted) {
    getDataLSArr.sort((a, b) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    });
  }

  localStorage.setItem("datas", JSON.stringify(getDataLSArr));
  showData();
}
function deleteData(index) {
  let newData = [];
  let dataLS = JSON.parse(localStorage.getItem("datas"));

  for (let i = 0; i < dataLS.length; i++) {
    newData.push(dataLS[i]);
  }
  newData = newData.filter((d, ind) => ind != index);

  localStorage.setItem("datas", JSON.stringify(newData));
  showData();
}
function addData() {
  let val = input.value;
  let getDataLSArr = [];

  let LSdata = JSON.parse(localStorage.getItem("datas"));

  if (LSdata != null) {
    for (let i = 0; i < LSdata.length; i++) {
      getDataLSArr.push(LSdata[i]);
    }
  } else {
    getDataLSArr.push(val);
  }
  if (val !== "") {
    getDataLSArr.push(val);
  }
  localStorage.setItem("datas", JSON.stringify(getDataLSArr));
  showData();
  input.value = "";
}
add.addEventListener("click", (e) => {
  e.preventDefault();
  addData();
});
sort.addEventListener("click", (e) => {
  e.preventDefault();
  updateData();
});

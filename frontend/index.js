var txt = "Cyber-Squad";
var txt2 = "CPEN 442 Final Project";
var i = 0;

// show and hide search bar with scroll
var prevScrollPos = window.scrollY;
window.onscroll = function () {
  var currentScrollPos = window.scrollY;
  if (prevScrollPos > currentScrollPos) {
    document.getElementById("search-bar").style.top = "0";
  } else {
    document.getElementById("search-bar").style.top = "-4rem";
  }
  prevScrollPos = currentScrollPos;
};

// modal
var modal = document.getElementById("modal");
var createPostBtn = document.getElementById("create-post-btn");
var closeModalBtn = document.getElementById("modal__close-btn");

createPostBtn.onclick = function () {
  modal.style.display = "block";
};

closeModalBtn.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

function onCreatePost() {
  // TODO: make backend call
  console.log("making backend API call");
}

// header text typing effect
function typeHeaderText() {
  if (i < txt.length) {
    var currHeaderText = document.getElementById("header-text").innerHTML;
    document.getElementById("header-text").innerHTML =
      currHeaderText.substring(0, currHeaderText.length - 1) +
      txt.charAt(i) +
      "_";
    i++;
    setTimeout(typeHeaderText, 200);
  } else {
    i = 0;
    setTimeout(typeHeaderText2, 200);
  }
}

function typeHeaderText2() {
  if (i < txt2.length) {
    var currHeaderText = document.getElementById("header-text2").innerHTML;
    document.getElementById("header-text2").innerHTML =
      currHeaderText.substring(0, currHeaderText.length - 1) +
      txt2.charAt(i) +
      "_";
    i++;
    setTimeout(typeHeaderText2, 150);
  }
}

// search bar API call
async function onSearchSubmit() {
  try {
    var searchQuery = document.getElementById("search-query").value;
    console.log(searchQuery);

    const res = await fetch("http://127.0.0.1:5000"); // TODO: make request to backend GET /search
    if (!res.ok) {
      throw new Error("HTTP error: status ${res.status}");
    } else {
      console.log("Fetch OK!");
    }

    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  return false;
}

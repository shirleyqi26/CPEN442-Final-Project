var txt = "Cyber-Squad";
var txt2 = "CPEN 442 Final Project";
var i = 0;

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

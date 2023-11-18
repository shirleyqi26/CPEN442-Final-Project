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

function checkCookies(){
  let cookie = document.cookie
  console.log(cookie)
  if(cookie != ""){
    //if user has a cookie, then they're logged in so don't show the login button
    let loginButton = document.getElementById("login-button");
    loginButton.style.visibility = "hidden";

    //show the profile button
    let profileButton = document.getElementById("profile-button")
    profileButton.style.visibility = "visible"

    //fill in profile info here too
  }
}

var show = false
function toggleProfilePopup(){
  var profilePopup = document.getElementById("profile-popup-body")
  if(!show){
    profilePopup.style.visibility = "visible"
  }else{
    profilePopup.style.visibility = "hidden"
  }
  show = !show
}

function toggleLoginPopup(){
  let loginPopup =  document.getElementById("login-popup-body")
  loginPopup.style.visibility = "visible";
}

let loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", (e => {
  e.preventDefault();
  let username = loginForm.elements['username'].value
  let password = loginForm.elements['password'].value

  if(username != "" && password != ""){
    console.log(username)
    console.log(password)

    // check creds with database
    // if credentials are valid, then hide the login popup, create the user's cookie, and fill profile popup with info
    let loginPopup =  document.getElementById("login-popup-body")
    loginPopup.style.visibility = "hidden";
    var expirationTime = new Date(new Date().getTime() + 60*60*1000);
    document.cookie = "username=" + username + "; expires=" + expirationTime.toUTCString();

    checkCookies()
    //if credentials aren't valid, don't do anything, or we could show error if we want to
    //rlly make it look nice
  }else{
    alert("Please do not leave username or password blank!");
  }
}))
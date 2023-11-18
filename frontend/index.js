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
  if(cookie != ""){
    //if user has a cookie, then they're logged in so don't show the login button
    let loginButton = document.getElementById("login-button");
    loginButton.style.display = "none"

    //show the logout button
    let logoutButton = document.getElementById("logout-button");
    logoutButton.style.display = "inline"

    //show the profile button
    let profileButton = document.getElementById("profile-button")
    profileButton.style.display = "inline"

    // conveniently, cookie value is the user's username, so we can simply query the
    // database by username to get back the user's information to store in the
    // profile information pop up
  }
}

//for convenience so we don't have to manually delete the cookie each time to log out
function logOut(){
  let oldCookie = document.cookie;
  document.cookie = oldCookie.split(";")[0] + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";

  let loginButton = document.getElementById("login-button");
  loginButton.style.display = "inline"

  let logoutButton = document.getElementById("logout-button");
  logoutButton.style.display = "none"

  let profileButton = document.getElementById("profile-button")
  profileButton.style.display = "none"

  var profilePopup = document.getElementById("profile-popup-body")
  profilePopup.style.visibility = "hidden"
}

var showProfile = false
function toggleProfilePopup(){
  var profilePopup = document.getElementById("profile-popup-body")
  if(!showProfile){
    profilePopup.style.visibility = "visible"
  }else{
    profilePopup.style.visibility = "hidden"
  }
  showProfile = !showProfile
}

var showLogin = false
function toggleLoginPopup(){
  let loginPopup =  document.getElementById("login-popup-body")
  if(!showLogin){
    loginPopup.style.visibility = "visible"
  }else{
    loginPopup.style.visibility = "hidden";
  }
  showLogin = !showLogin
}

let loginForm = document.getElementById("login-form")

loginForm.addEventListener("submit", (e => {
  let username = loginForm.elements['username'].value
  let password = loginForm.elements['password'].value

  if(username != "" && password != ""){
    console.log(username)
    console.log(password)

    /**
     * If credentials are correct, then:
     * - hide login button
     * - show profile button
     * - create cookie (set to 2 hours expiry)
     */

    // for now just unconditionally "log" them in since backend isn't set up
    let loginPopup =  document.getElementById("login-popup-body")
    loginPopup.style.visibility = "hidden";
    var expirationTime = new Date(new Date().getTime() + 60*60*1000);
    document.cookie = "username=" + username + "; expires=" + expirationTime.toUTCString();

    checkCookies()
  }else{
    alert("Please do not leave username or password blank!");
  }
}))
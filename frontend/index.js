const baseUrl = "http://localhost:3000";

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

window.onload = function () {
  checkCookies();
  checkURL();
};

function checkURL() {
  console.log(window.location.search);
  const params = new URLSearchParams(window.location.search);
  console.log(params.toString());

  if (params.size == 1) {
    if (params.has("username")) {
      console.log("yes");
      displayPosts(params.get("username"));
    }
  }
}

// modal
var modal = document.getElementById("modal");
var modalContent = document.getElementById("post-content");
var modalSubject = document.getElementById("post-subject");
var createPostBtn = document.getElementById("create-post-btn");
var closeModalBtn = document.getElementById("modal__close-btn");

//TODO: reset to empty string when user logs out
var usernameGlobal = "";

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
  console.log(usernameGlobal);
  if (!usernameGlobal) {
    alert("Please log in before posting!");
  } else {
    fetch(baseUrl + "/postPosts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: usernameGlobal,
        subject: modalSubject.value,
        content: modalContent.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error:", error));
  }
}

window.addEventListener("DOMContentLoaded", function () {
  displayPosts();

  // search bar
  const searchBarForm = document.getElementById("search-bar__form");
  const searchBarInput = document.getElementById("search-bar__input");
  searchBarForm.addEventListener("submit", function (event) {
    event.preventDefault();
    displayPosts(searchBarInput.value);
  });
});

function displayPosts(query) {
  const postsList = document.getElementById("blog-container");
  postsList.innerHTML = "";
  if (query) {
    fetch(baseUrl + "/getPostsFiltered?username=" + query, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error!");
        }
        return res.json();
      })
      .then((posts) => {
        console.log(posts);
        if (posts.length == 0) {
          const div = document.createElement("div");
          div.classList.add("blog-post");
          div.innerHTML = "Sorry, no results for " + query;
          postsList.appendChild(div);
        }
        posts.forEach((post) => {
          const li = document.createElement("li");
          li.classList.add("blog-post");
          li.innerHTML = `
			<div class="tab"></div>
			<h2>Users\\${post.username} > <b>${post.subject}</b></h2>
			<p>${post.content}</p>`;
          postsList.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  } else {
    fetch(baseUrl + "/getPosts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error!");
        }
        return res.json();
      })
      .then((posts) => {
        posts.forEach((post) => {
          // console.log(post)
          // console.log(post.username)
          const li = document.createElement("li");
          li.classList.add("blog-post");
          li.innerHTML = `
			<div class="tab"></div>
			<h2>Users\\${post.username} > <b>${post.subject}</b></h2>
			<p>${post.content}</p>`;
          postsList.appendChild(li);
        });
      })
      .catch((error) => console.error("Error fetching data: ", error));
  }
}

function checkCookies() {
  let cookie = document.cookie;
  console.log(cookie);
  if (cookie != "") {
    let username = cookie.split("=")[1];
    console.log(username);

    fetch(baseUrl + "/getUserByUserName?username=" + username, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error!");
        }
        console.log("response is ok-checkcookies");
        return res.json();
      })
      .then((user) => {
        if (user.length != 0) {
          console.log(user);
          populateProfile(user);
          let loginButton = document.getElementById("login-button");
          loginButton.style.display = "none";

          //show the logout button
          let logoutButton = document.getElementById("logout-button");
          logoutButton.style.display = "inline";

          //show the profile button
          let profileButton = document.getElementById("profile-button");
          profileButton.style.display = "inline";
        }
      });
  }
}

//for convenience so we don't have to manually delete the cookie each time to log out
function logOut() {
  usernameGlobal = "";
  document.cookie = "username= ;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";

  console.log(document.cookie);

  console.log(document.cookie);

  let loginButton = document.getElementById("login-button");
  loginButton.style.display = "inline";

  let logoutButton = document.getElementById("logout-button");
  logoutButton.style.display = "none";

  let profileButton = document.getElementById("profile-button");
  profileButton.style.display = "none";

  var profilePopup = document.getElementById("profile-popup-body");
  profilePopup.style.visibility = "hidden";

  location.reload();
}

var showProfile = false;
function toggleProfilePopup() {
  var profilePopup = document.getElementById("profile-popup-body");
  if (!showProfile) {
    profilePopup.style.visibility = "visible";
  } else {
    profilePopup.style.visibility = "hidden";
  }
  showProfile = !showProfile;
}

var showLogin = false;
function toggleLoginPopup() {
  let loginPopup = document.getElementById("login-popup-body");
  if (!showLogin) {
    loginPopup.style.visibility = "visible";
  } else {
    loginPopup.style.visibility = "hidden";
  }
  showLogin = !showLogin;
}

let loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = loginForm.elements["username"].value;
  let password = loginForm.elements["password"].value;

  if (username != "" && password != "") {
    fetch(baseUrl + "/getUser?username=" + username + "&password=" + password, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("HTTP error!");
        }
        console.log("response is ok-login");
        return res.json();
      })
      .then((user) => {
        if (user.length != 0) {
          populateProfile(user);
          console.log("HELLO");
          console.log(user);
          var expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);
          document.cookie =
            "username=" +
            user[0].username +
            "; expires=" +
            expirationTime.toUTCString() +
            "; path=/";
          let loginButton = document.getElementById("login-button");
          loginButton.style.display = "none";
          console.log("HERE");
          console.log(document.cookie);
          //show the logout button
          let logoutButton = document.getElementById("logout-button");
          logoutButton.style.display = "inline";

          //show the profile button
          let profileButton = document.getElementById("profile-button");
          profileButton.style.display = "inline";
          location.reload();
        } else {
          alert("Error: incorrect username or password");
        }
      });
  } else {
    e.preventDefault();
    alert("Please do not leave username or password blank!");
  }
});

function populateProfile(user) {
  usernameGlobal = user[0].username;

  const date = new Date(user[0].birthday);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  document.getElementById("profile-name").innerText = user[0].name;
  document.getElementById("profile-birthday").innerText =
    month + "/" + day + "/" + year;
  document.getElementById("profile-email").innerText = user[0].email;
  document.getElementById("profile-secret").innerText = user[0].secretinfo;
}

function onResetAdversaryDB() {
	fetch("http://localhost:4000/resetAdversaryDB", {
		method: 'DELETE'
	}).then().catch(error => console.error('Error:', error));
	window.location.reload();
}

function onResetBlogDB() {
	fetch("http://localhost:3000/resetBlogDB", {
		method: 'DELETE'
	}).then().catch(error => console.error('Error:', error));
	window.location.reload();
}

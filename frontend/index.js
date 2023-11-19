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
  posts = [
    {
      author: "TEST",
      subject: "This is my posts",
      content: "stuff stuff stuff",
    },
  ];

  return false;
}

window.addEventListener("DOMContentLoaded", function () {
  const postsList = document.getElementById("blog-container");
  // TODO: change this to backend url
  const baseUrl = "localhost:5000";

  // TODO: append query to baseUrl and make request
  function displayPosts(query) {
    postsList.innerHTML = "";
    // fetch("test api")
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("HTTP error!");
    //     }
    //     return res.json();
    //   })
    //   .then((posts) => {
    //     posts.forEach((post) => {
    //       const li = document.createElement("li");
    //       li.classList.add("blog-post");
    //       li.innerHTML = `
    //     <div class="tab"></div>
    //     <h2>Users\\${post.author} > <b>${post.subject}</b></h2>
    //     <p>${post.content}</p>`;
    //     });
    //   })
    //   .catch((error) => console.error("Error fetching data: ", error));

    // TODO: remove this is just test
    if (query === "test") {
      posts = [
        {
          author: "SecretMan123",
          subject: "This is my posts",
          content: "stuff stuff stuff",
        },
      ];
    }
    posts.forEach((post) => {
      const li = document.createElement("li");
      li.classList.add("blog-post");
      li.innerHTML = `
      <div class="tab"></div>
      <h2>Users\\${post.author} > <b>${post.subject}</b></h2>
      <p>${post.content}</p>`;
      postsList.appendChild(li);
    });
  }

  displayPosts();

  // search bar
  const searchBarForm = document.getElementById("search-bar__form");
  const searchBarInput = document.getElementById("search-bar__input");
  searchBarForm.addEventListener("submit", function (event) {
    event.preventDefault();
    displayPosts(searchBarInput.value);
  });
});

function checkCookies() {
  let cookie = document.cookie;
  if (cookie != "") {
    //if user has a cookie, then they're logged in so don't show the login button
    let loginButton = document.getElementById("login-button");
    loginButton.style.display = "none";

    //show the logout button
    let logoutButton = document.getElementById("logout-button");
    logoutButton.style.display = "inline";

    //show the profile button
    let profileButton = document.getElementById("profile-button");
    profileButton.style.display = "inline";

    // conveniently, cookie value is the user's username, so we can simply query the
    // database by username to get back the user's information to store in the
    // profile information pop up
  }
}

//for convenience so we don't have to manually delete the cookie each time to log out
function logOut() {
  let oldCookie = document.cookie;
  document.cookie =
    oldCookie.split(";")[0] + ";expires=Thu, 01 Jan 1970 00:00:01 GMT";

  let loginButton = document.getElementById("login-button");
  loginButton.style.display = "inline";

  let logoutButton = document.getElementById("logout-button");
  logoutButton.style.display = "none";

  let profileButton = document.getElementById("profile-button");
  profileButton.style.display = "none";

  var profilePopup = document.getElementById("profile-popup-body");
  profilePopup.style.visibility = "hidden";
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
  let username = loginForm.elements["username"].value;
  let password = loginForm.elements["password"].value;

  if (username != "" && password != "") {
    console.log(username);
    console.log(password);

    /**
     * If credentials are correct, then:
     * - hide login button
     * - show profile button
     * - create cookie (set to 2 hours expiry)
     */

    // for now just unconditionally "log" them in since backend isn't set up
    let loginPopup = document.getElementById("login-popup-body");
    loginPopup.style.visibility = "hidden";
    var expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);
    document.cookie =
      "username=" + username + "; expires=" + expirationTime.toUTCString();

    checkCookies();
  } else {
    alert("Please do not leave username or password blank!");
  }
});

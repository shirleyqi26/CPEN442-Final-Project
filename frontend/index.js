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
// TODO: make backend call
	console.log(usernameGlobal)
	if (!usernameGlobal) {
		alert("Please log in before posting!");
	} else {
		fetch(baseUrl + '/postPosts', {
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	        },
	        body: JSON.stringify(
				{ 
					'username': usernameGlobal,
					'subject': modalSubject.value,
					'content': modalContent.value,
			}),
	    })
	    .then(response => response.json())
	    .then(data => {
	        console.log(data)
	    })
	    .catch(error => console.error('Error:', error));
	}
  }

window.addEventListener("DOMContentLoaded", function () {
	const postsList = document.getElementById("blog-container");
	// TODO: append query to baseUrl and make request
	function displayPosts(query) {
		postsList.innerHTML = "";
		if (query) {
			fetch(baseUrl + '/getPostsFiltered?username=' + query, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			}).then((res) => {
			if (!res.ok) {
				throw new Error("HTTP error!");
			}
			return res.json();
			}).then((posts) => {
			posts.forEach((post) => {
				const li = document.createElement("li");
				li.classList.add("blog-post");
				li.innerHTML = `
				<div class="tab"></div>
				<h2>Users\\${post.username} > <b>${post.subject}</b></h2>
				<p>${post.content}</p>`;
				postsList.appendChild(li)
			});
			})
			.catch((error) => console.error("Error fetching data: ", error));
		} else {
			fetch(baseUrl + '/getPosts', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				}
			}).then((res) => {
			if (!res.ok) {
				throw new Error("HTTP error!");
			}
			return res.json();
			}).then((posts) => {
			posts.forEach((post) => {
				// console.log(post)
				// console.log(post.username)
				const li = document.createElement("li");
				li.classList.add("blog-post");
				li.innerHTML = `
				<div class="tab"></div>
				<h2>Users\\${post.username} > <b>${post.subject}</b></h2>
				<p>${post.content}</p>`;
				postsList.appendChild(li)
			});
			})
			.catch((error) => console.error("Error fetching data: ", error));
		}
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
	usernameGlobal = "";
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
	e.preventDefault();
	let username = loginForm.elements["username"].value;
	let password = loginForm.elements["password"].value;

	if (username != "" && password != "") {

		/**
		 * If credentials are correct, then:
		 * - hide login button
		 * - show profile button
		 * - create cookie (set to 2 hours expiry)
		 */

		// for now just unconditionally "log" them in since backend isn't set up
		fetch(baseUrl + '/getUser?username=' + username + '&password=' + password, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then((res) => {
			if (!res.ok) {
				console.log("not ok")
				throw new Error("HTTP error!");
			}
			return res.json();
		}).then((user) => {
			if (user.length != 0) {
				usernameGlobal = user[0].username
				
				const date = new Date(user[0].birthday);
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
  				const day = date.getDate().toString().padStart(2, '0');
  				const year = date.getFullYear();
				

				document.getElementById("profile-name").innerText = user[0].name;
				document.getElementById("profile-birthday").innerText = month + '/' + day + '/' + year;
				document.getElementById("profile-email").innerText = user[0].email;
				document.getElementById("profile-secret").innerText = user[0].secretinfo;
				
				//loginPopup.style.visibility = "hidden";
				var expirationTime = new Date(new Date().getTime() + 60 * 60 * 1000);
				document.cookie = "username=" + username + "; expires=" + expirationTime.toUTCString();
				checkCookies();
			} else {
				console.log("goodbye")
				alert("Error: incorrect username or password");
			}
		})

	} else {
		alert("Please do not leave username or password blank!");
	}
});

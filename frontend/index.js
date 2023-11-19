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
  posts = [
	{
	  author: "TEST",
	  subject: "This is my posts",
	  content: "stuff stuff stuff",
	},
  ];

  return false;
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

// TODO: this should be returned from the backend
var posts1 = [
  {
	author: "SecretMan123",
	subject: "This is my posts",
	content: "stuff stuff stuff",
  },
  {
	author: "Test user 1",
	subject: "This is my post",
	content:
	  "I bring all the drama-ma-ma-ma, all the drama-ma-ma-ma, with my girls in the back girls in the back",
  },
  {
	author: "Test user 1",
	subject: "",
	content: `[Intro] (Ba-ba-ba-ba-ba-ba-ba) [Chorus: Leeseo, Gaeul] I'm a baddie,
	ba-ba-baddie, baddie Pretty little risky baddie 뭐든 될 대로 되라지
	Catch me if you can Baddie, ba-ba-baddie, baddie 나는 없어 거기 이미
	어차피 못 찾을 테니 Catch me if you can [Verse 1: Jang Wonyoung, Liz,
	Rei] Nothing like the regulars 내 DNA엔 blue blood runs 더 솔직하게
	말해줘 착한 척은 지겨워 우리 앞에선 룰이 의미 없었어 굳이 유행이 돌고
	돌아도 난 그 틀에 없어 이미 I wanna break, I wanna kick, 뛰어 놀래
	시끄럽게 다채로운 매력 수많은 변칙 위에 더 빛을 발하지 [Pre-Chorus: An
	Yujin] 답답한 건 벗어 던져 고개 숙일 필요 없어 (Ba-ba-ba-ba-ba-ba-ba)
	[Chorus: Jang Wonyoung, An Yujin] I'm a baddie, ba-ba-baddie, baddie
	Pretty little risky baddie 뭐든 될 대로 되라지 Catch me if you can
	Baddie, ba-ba-baddie, baddie 나는 없어 거기 이미 어차피 못 찾을 테니
	Catch me if you can`,
  },
];

window.addEventListener("DOMContentLoaded", function () {
  const postsList = document.getElementById("blog-container");
  // TODO: change this to backend url
  const baseUrl = "localhost:3000";
  console.log("hello")
  // TODO: append query to baseUrl and make request
  function displayPosts(query) {
	console.log("hello")
	postsList.innerHTML = "";

		fetch(baseUrl + '/getPosts', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			}
		}).then((res) => {
		if (!res.ok) {
		  throw new Error("HTTP error!");
		}
		print(res.json())
		return res.json();
	  })
	  .then((posts) => {
		posts.forEach((post) => {
			console.log(post)
			const li = document.createElement("li");
			li.classList.add("blog-post");
			li.innerHTML = `
		<div class="tab"></div>
		<h2>Users\\${post.author} > <b>${post.subject}</b></h2>
		<p>${post.content}</p>`;
		});
	  })
	  .catch((error) => console.error("Error fetching data: ", error));

	// TODO: remove this is just test
	// if (query === "test") {
	//   posts = [
	//     {
	//       author: "SecretMan123",
	//       subject: "This is my posts",
	//       content: "stuff stuff stuff",
	//     },
	//   ];
	// }

	// posts.forEach((post) => {
	//   const li = document.createElement("li");
	//   li.classList.add("blog-post");
	//   li.innerHTML = `
	//   <div class="tab"></div>
	//   <h2>Users\\${post.author} > <b>${post.subject}</b></h2>
	//   <p>${post.content}</p>`;
	//   postsList.appendChild(li);
	// });
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
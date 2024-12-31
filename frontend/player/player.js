//global user variable
let user = "";

function loadUser() {
  const temp = sessionStorage.getItem("user");

  if (temp) {
    user = temp;
  }
}

function saveUser() {
  sessionStorage.setItem("user", user);
}

loadUser();

//call after player selects character
function playerReady() {
  document.body.innerHTML = `
  <div class="ready-background"></div>
  <div class="fluid-container ready-box">
    <div class="row justify-content-center">
      <img class="col-10 check-mark" src="./imgs/checkMarkIcon.webp">
    </div>
    <div class="row justify-content-center text-center">
      <p class="col-10 ready-text">Welcome ${user}! Please wait while others select their character...</p>
    </div>
  </div>
  `;
}

//Home Page
document.querySelector('.play-button').addEventListener('click', () => {
  if (user === "") {
    document.body.innerHTML = `
    <div class="select-background"></div>
    <div class="select-background-2"></div>
    <div class="fluid-container">
      <div class="row justify-content-center select-title">
        Select your player:
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Andy">
          <img class="select-pfp" src="./imgs/select-ekko.jpg">
          <p class="select-name">Andy</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Antonio">
          <img class="select-pfp" src="./imgs/select-heimerdinger.webp">
          <p class="select-name">Antonio</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Aurora">
          <img class="select-pfp" src="./imgs/select-mel.jpg">
          <p class="select-name">Aurora</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Conall">
          <img class="select-pfp" src="./imgs/select-sevika.jpeg">
          <p class="select-name">Conall</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="David">
          <img class="select-pfp" src="./imgs/select-yordle.png">
          <p class="select-name">David</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Julia">
          <img class="select-pfp" src="./imgs/select-caitlyn.webp">
          <p class="select-name">Julia</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Luke">
          <img class="select-pfp" src="./imgs/select-jinx.png">
          <p class="select-name">Luke</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Mar">
          <img class="select-pfp" src="./imgs/select-lest.png">
          <p class="select-name">Mar</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Phong">
          <img class="select-pfp" src="./imgs/select-cassandra.webp">
          <p class="select-name">Phong</p>
        </button>
      </div>
    </div>
    `;

    //Select Page
    document.getElementById('Andy').addEventListener('click', () => {
      user = "Andy";
      saveUser();
      playerReady();
    });

    document.getElementById('Antonio').addEventListener('click', () => {
      user = "Antonio";
      saveUser();
      playerReady();
    });

    document.getElementById('Aurora').addEventListener('click', () => {
      user = "Aurora";
      saveUser();
      playerReady();
    });

    document.getElementById('Conall').addEventListener('click', () => {
      user = "Conall";
      saveUser();
      playerReady();
    });

    document.getElementById('David').addEventListener('click', () => {
      user = "David";
      saveUser();
      playerReady();
    });

    document.getElementById('Julia').addEventListener('click', () => {
      user = "Julia";
      saveUser();
      playerReady();
    });

    document.getElementById('Luke').addEventListener('click', () => {
      user = "Luke";
      saveUser();
      playerReady();
    });

    document.getElementById('Mar').addEventListener('click', () => {
      user = "Mar";
      saveUser();
      playerReady();
    });

    document.getElementById('Phong').addEventListener('click', () => {
      user = "Phong";
      saveUser();
      playerReady();
    });
  }
  else {
    loadUser();
    playerReady();
  }
});


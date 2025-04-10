//global user variable
let user = "";
//global socket
const socket = io();

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

function endGame() {
  socket.off(nextQuestion);
  socket.off(endGame);
  document.body.innerHTML = `
  <div class="end-background"></div>
  <div class="fluid-container end-box">
    <div class="row justify-content-center text-center">
      <p class="col-10 end-text">Thank you for playing!</p>
    </div>
  </div>
  `;
}

function nextQuestion() {
  socket.off(nextQuestion);
  socket.off(endGame);
  document.body.innerHTML = `
    <div class="vote-background"></div>
    <div class="vote-background-2"></div>
    <div class="fluid-container vote-container">
      <div class="row justify-content-center">
        <button class="select-card" id="Andy">
          <img class="select-pfp" src="../static/imgs/select-ekko.jpg">
          <p class="select-name">Andy</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Antonio">
          <img class="select-pfp" src="../static/imgs/select-heimerdinger.webp">
          <p class="select-name">Antonio</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Aurora">
          <img class="select-pfp" src="../static/imgs/select-mel.jpg">
          <p class="select-name">Aurora</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Conall">
          <img class="select-pfp" src="../static/imgs/select-sevika.jpeg">
          <p class="select-name">Conall</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="David">
          <img class="select-pfp" src="../static/imgs/select-yordle.png">
          <p class="select-name">David</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Julia">
          <img class="select-pfp" src="../static/imgs/select-caitlyn.webp">
          <p class="select-name">Julia</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Luke">
          <img class="select-pfp" src="../static/imgs/select-jinx.png">
          <p class="select-name">Luke</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Mar">
          <img class="select-pfp" src="../static/imgs/select-lest.png">
          <p class="select-name">Mar</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Phong">
          <img class="select-pfp" src="../static/imgs/select-cassandra.webp">
          <p class="select-name">Phong</p>
        </button>
      </div>
    </div>
  `; 

  document.querySelectorAll(".select-card").forEach(card => {
    card.addEventListener('click', (event) => {
        const selection = event.currentTarget.id;  // Get the id of the clicked button 
        console.log(selection);
        const vote = {
            username: user,    // user who made this vote
            choice: selection  // The id of the clicked button
        };
        socket.emit('vote', vote);  // Send the vote data to the server
        answerSubmitted();
    });
  });
}

function answerSubmitted() {
  socket.on("next_question", nextQuestion);
  socket.on("end_game", endGame);
  document.body.innerHTML = `
  <div class="submitted-background"></div>
  <div class="fluid-container submitted-box">
    <div class="row justify-content-center text-center">
      <p class="col-10 submitted-text">Answer submitted. Waiting for host...</p>
    </div>
  </div>
  `;
}

function startGame() {
  socket.off(startGame);
  document.body.innerHTML = `
    <div class="vote-background"></div>
    <div class="vote-background-2"></div>
    <div class="fluid-container vote-container">
      <div class="row justify-content-center">
        <button class="select-card" id="Andy">
          <img class="select-pfp" src="../static/imgs/select-ekko.jpg">
          <p class="select-name">Andy</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Antonio">
          <img class="select-pfp" src="../static/imgs/select-heimerdinger.webp">
          <p class="select-name">Antonio</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Aurora">
          <img class="select-pfp" src="../static/imgs/select-mel.jpg">
          <p class="select-name">Aurora</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Conall">
          <img class="select-pfp" src="../static/imgs/select-sevika.jpeg">
          <p class="select-name">Conall</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="David">
          <img class="select-pfp" src="../static/imgs/select-yordle.png">
          <p class="select-name">David</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Julia">
          <img class="select-pfp" src="../static/imgs/select-caitlyn.webp">
          <p class="select-name">Julia</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Luke">
          <img class="select-pfp" src="../static/imgs/select-jinx.png">
          <p class="select-name">Luke</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Mar">
          <img class="select-pfp" src="../static/imgs/select-lest.png">
          <p class="select-name">Mar</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Phong">
          <img class="select-pfp" src="../static/imgs/select-cassandra.webp">
          <p class="select-name">Phong</p>
        </button>
      </div>
    </div>
  `; 

  document.querySelectorAll(".select-card").forEach(card => {
    card.addEventListener('click', (event) => {
        const selection = event.currentTarget.id;  // Get the id of the clicked button 
        console.log(selection);
        const vote = {
            username: user,    // user who made this vote
            choice: selection  // The id of the clicked button
        };
        socket.emit('vote', vote);  // Send the vote data to the server
        answerSubmitted();
    });
  });
}

//call after player selects character
function playerReady() {
  document.body.innerHTML = `
  <div class="ready-background"></div>
  <div class="fluid-container ready-box">
    <div class="row justify-content-center">
      <img class="col-10 check-mark" src="../static/imgs/checkMarkIcon.webp">
    </div>
    <div class="row justify-content-center text-center">
      <p class="col-10 ready-text">Welcome ${user}! Please wait while others select their character...</p>
    </div>
  </div>
  `;
  socket.emit('new_user', user);

  socket.on('start_game', startGame);
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
          <img class="select-pfp" src="../static/imgs/select-ekko.jpg">
          <p class="select-name">Andy</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Antonio">
          <img class="select-pfp" src="../static/imgs/select-heimerdinger.webp">
          <p class="select-name">Antonio</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Aurora">
          <img class="select-pfp" src="../static/imgs/select-mel.jpg">
          <p class="select-name">Aurora</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Conall">
          <img class="select-pfp" src="../static/imgs/select-sevika.jpeg">
          <p class="select-name">Conall</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="David">
          <img class="select-pfp" src="../static/imgs/select-yordle.png">
          <p class="select-name">David</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Julia">
          <img class="select-pfp" src="../static/imgs/select-caitlyn.webp">
          <p class="select-name">Julia</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Luke">
          <img class="select-pfp" src="../static/imgs/select-jinx.png">
          <p class="select-name">Luke</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Mar">
          <img class="select-pfp" src="../static/imgs/select-lest.png">
          <p class="select-name">Mar</p>
        </button>
      </div>
      <div class="row justify-content-center">
        <button class="select-card" id="Phong">
          <img class="select-pfp" src="../static/imgs/select-cassandra.webp">
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


let QUESTIONS = ['Who is the smartest?']
let index = 0;
let results = {
  Andy: [],
  Antonio: [],
  Aurora: [],
  Conall: [],
  David: [],
  Julia: [],
  Luke: [],
  Mar: [],
  Phong: []
};

const names = ["Andy", "Antonio", "Aurora", "Conall", "David", "Julia", "Luke", "Mar", "Phong"];

function resetResults() {
  results = {
    Andy: [],
    Antonio: [],
    Aurora: [],
    Conall: [],
    David: [],
    Julia: [],
    Luke: [],
    Mar: [],
    Phong: []
  };
}
//home page
function receiveUser(user) {
  document.querySelector('.players-divider').innerHTML += `
  <p class="player-names">${user}</p>
  `;
}

function updateVote(vote) {
  console.log(vote);
  results[vote.choice].push(vote.username);
}

function showResults() {
  document.body.innerHTML = `
  <div class="results-bg"></div>
  <div class="results-box">
    <div class="results-row">
      <p class="results-row-text">Andy</p>
    </div>
    <div class="results-row">
      <p class="results-row-text">Antonio</p>
    </div>
    <div class="results-row">
      <p class="results-row-text">Aurora</p>
    </div>
    <div class="results-row">
      <p class="results-row-text">Conall</p>
    </div>
    <div class="results-row">
      <p class="results-row-text">David</p>
    </div>
    <div class="results-row">
      <p class="results-row-text">Julia</p>
    </div>
    <div class="results-row">
      <p class="results-row-text">Luke</p>
    </div>
    <div class="results-row">
      <p class="results-row-text">Mar</p>
    </div>
    <div class="results-row">
      <p class="results-row-text">Phong</p>
    </div>
  </div>
  
  <button class="next-button">Next Question</button>
  `;

  const resultRows = document.querySelectorAll('.results-row');
  for (let i = 0; i < resultRows.length; i++) {
    const size = results[names[i]].length;

    for (let j = 0; j < size; j++) {
      resultRows[i].innerHTML += `
      <div class=${results[names[i]][j]}></div>
      `;
    }
  }

  


  if (index < QUESTIONS.length) {
    document.querySelector('.next-button').addEventListener('click', showQuestion);
  }
  else {
    document.querySelector('.next-button').addEventListener('click', () => {
      //end game page
      document.body.innerHTML = `
      <div class="end-bg"></div>
      <p class="end-text">Thanks for Playing</p>
      `;
    });
  }
  
}

function showQuestion() {
  resetResults();
  document.body.innerHTML = `
  `;
  socket.on('update_vote', updateVote);

  document.querySelector('.results-button').addEventListener('click', () => {
    socket.off('update_vote', updateVote);
    showResults();
  });
  index += 1;
}

document.querySelector('.play-button').addEventListener('click', () => {
  document.body.innerHTML = `
  <div class="waiting-background"></div>
  <div class="players-divider"></div>
  <div class="waiting-text-bg">
    <p class="waiting-text">Waiting for Players...</p>
  </div>
  <button class="start-button">Start Game!</button>
  `;

  const socket = io();  // Connect to the server
  // Listen for the 'send_user' event from the server

  socket.on('send_user', receiveUser);

  document.querySelector('.start-button').addEventListener('click', () => {
    //turn off listening for connected users
    socket.off('send_user', receiveUser);

    socket.emit('start_game');

    document.body.innerHTML = `
    <p class="">${QUESTIONS[index]}</p>

    <div class="host-question-bg"></div>
    <div class="question-box">
      <p class="question-text">${QUESTIONS[index]}</p>
      <p class="vote-text">Please place your vote</p>
    </div>
    
    <button class="results-button">Show Results</button>
    `;
    index += 1;

    socket.on('update_vote', updateVote)

    document.querySelector('.results-button').addEventListener('click', showResults)
  })
});
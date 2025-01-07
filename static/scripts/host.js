let QUESTIONS = ['Who is the smartest?', "Who is the hottest?", "Who will get married first?", "Who will be the most successful?",
  "Who will have kids first?", "Who is most likely to get a face tattoo?", "Who is the most likely to get punched?", "Who is most likely to get a tattoo that they will regret?", "Who is the most likely to take a body shot off a stranger?", "Who would own the most sex toys?", "Who is most likely to die first in a horror movie?", "Who's douche water would be the clearest?", "Who is most likely to join a gang?", "Who is the best liar", "Most likely to get pregnant?", "Who has the stinkiest vagina?", "Most likely to die in a car accident?", "Worst interviewee?"
]
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

let socket = null;

let num_players = 0;

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
  num_players += 1;
  document.querySelector('.players-divider').innerHTML += `
  <p class="player-names">${user}</p>
  `;
}

function updateVote(vote) {
  console.log(vote);
  let hasVoted = false;
  for (let i = 0; i < results[vote.choice].length; i++) {
    if (results[vote.choice][i] === vote.username) {
      hasVoted = true;
    }
  }
  if (!hasVoted) {
    results[vote.choice].push(vote.username);
  }
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
      socket.emit("end_game");
      document.body.innerHTML = `
      <div class="end-bg"></div>
      <div class="end-box">
        <p class="end-text">Thanks for playing <3</p>
      </div>
      `;
    });
  }
  
}

function showQuestion() {
  resetResults();
  socket.emit("next_question");
  document.body.innerHTML = `
  `;
  document.body.innerHTML = `
  <div class="host-question-bg"></div>
  <div class="question-box">
    <p class="question-text">${QUESTIONS[index]}</p>
    <p class="vote-text">Please place your vote</p>
  </div>
  
  <button class="results-button">Show Results</button>
  `;
  index += 1;
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

  socket = io();  // Connect to the server
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
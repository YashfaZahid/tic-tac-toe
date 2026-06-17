let board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
let player1Symbol;
let player2Symbol;
let player_x_score = 0;
let player_o_score = 0;
let currentPlayer;

function chooseSymbol() {
  let dialog = document.getElementById("symbol-dialog");
  dialog.style.display = "flex";
  let turnBoardText = document.querySelector(".turn-board-txt");

  document.getElementById("pick-x").onclick = function () {
    player1Symbol = "X";
    player2Symbol = "O";
    dialog.style.display = "none";
    console.log("player1 selected x");
    currentPlayer = player1Symbol;
    console.log(currentPlayer);

    turnBoardText.innerText = `Player ${currentPlayer} Turn`;
  };

  document.getElementById("pick-o").onclick = function () {
    player1Symbol = "O";
    player2Symbol = "X";
    dialog.style.display = "none";
    currentPlayer = player1Symbol;

    turnBoardText.innerText = `Player ${currentPlayer} Turn`;
  };

  // let turnBoardText=document.querySelector(".turn-board-txt")
  // turnBoardText.innerText=`Player ${currentPlayer} Turn`
}

function event_listeners() {
  const btns = document.querySelectorAll(".game-btns");
  btns.forEach((element) => {
    element.addEventListener("click", handleClick);
  });
}
function handleClick(event) {
  let row = event.target.dataset.row;
  let col = event.target.dataset.col;

  if (board[row][col] !== "") return;

  board[row][col] = currentPlayer;

  if (event.target.innerText === "") {
    console.log("clicked");
    event.target.innerText = currentPlayer;
    console.log("done clicking");
  }
  let win = winner();

  if (win !== undefined) {
    console.log(currentPlayer);
    if (currentPlayer === "X") {
      player_x_score++;
      let score = document.getElementById("score-x");
      score.innerText = player_x_score;
      console.log("score updated");
    } else {
      player_o_score++;
      let score = document.getElementById("score-o");
      score.innerText = player_o_score;
    }
    const winner_array = winner();

    console.log(winner_array);
    let btns = [];
    for (let i = 0; i < 3; i++) {
      btns.push(
        document.querySelector(
          `[data-row="${winner_array[i][0]}"][data-col="${winner_array[i][1]}"]`,
        ),
      );
    }
    btns.forEach(function (b) {
      b.style.backgroundColor = "#00885d";
      b.style.color = "white";
    });
    setTimeout(function () {
      clearBoard();
    }, 2000);
  } else if (tie()) {
    let tieBox = document.getElementById("tie-dialog");
    tieBox.style.display = "flex";

    setTimeout(function () {
      tieBox.style.display = "none";
      clearBoard();
    }, 2000);
  }
  
  currentPlayer =(currentPlayer == player1Symbol) ? player2Symbol : player1Symbol;
  turnBoardText.innerText = `Player ${currentPlayer} Turn`;
  console.log(board);
}

function winner() {
  //rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] != "" &&
      board[i][0] == board[i][1] &&
      board[i][1] == board[i][2]
    ) {
      return [
        [i, 0],
        [i, 1],
        [i, 2],
      ];
    }
    //cols
    else if (
      board[0][i] != "" &&
      board[0][i] == board[1][i] &&
      board[1][i] == board[2][i]
    ) {
      return [
        [0, i],
        [1, i],
        [2, i],
      ];
    }
  }
  //diagonals
  if (
    board[0][0] != "" &&
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2]
  ) {
    return [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
  } else if (
    board[0][2] != "" &&
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0]
  ) {
    return [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
  }
}

function tie() {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        return false;
      }
    }
  }
  return true;
}

function clearBoard() {
  let gameButtons = document.querySelectorAll(".game-btns");
  gameButtons.forEach(function (btn) {
    btn.innerText = "";
    btn.style.backgroundColor = "white";
    btn.style.color = "black";
  });
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board[i][j] = "";
    }
  }
}
function resetgame() {
  console.log("inside reset game");
  clearBoard();
  player_o_score = 0;
  player_x_score = 0;
  let score = document.getElementById("score-x");
  score.innerText = player_x_score;
  score = document.getElementById("score-o");
  score.innerText = player_o_score;
  chooseSymbol();
}

chooseSymbol();

console.log("currplay " + currentPlayer);
let turnBoardText = document.querySelector(".turn-board-txt");
turnBoardText.innerText = `Player ${currentPlayer} Turn`;
event_listeners();

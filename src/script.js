let board = [null, null, null, null, null, null, null, null];
let squares = Array.from(document.getElementsByClassName("square"));
let turn = false;
let moveCount = 0;


function checkState() {
  if (moveCount < 5) return "in progress";
  let combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const combo of combinations) {
    const [a, b, c] = combo;
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return board[a] ? "O" : "X";
    }
  }
  if (moveCount === 9) return "Draw";
  else return "in progress";
}


function move(ev) {
  if (ev.target.hasChildNodes()) return;
  if (turn == false) ev.target.innerHTML = "<span class='x'>X</span>";
  else ev.target.innerHTML = "<span class='o'>O</span>";

  board[squares.indexOf(ev.target)] = turn;
  moveCount++;
  turn = !turn;
  document.getElementById("board").dataset.turn = turn.toString();

  if (checkState() !== "in progress") {
    for (let i = 0; i < squares.length; i++) {
      squares[i].removeEventListener("click", move);
      squares[i].style.pointerEvents = "none";
    }
    document.getElementById("text").innerHTML =
    checkState() + (checkState() !== "Draw" ? " wins!" : "");
  }
}


function restart() {
  for (let i = 0; i < squares.length; i++) {
    squares[i].innerHTML = "";
    squares[i].addEventListener("click", move, { once: true });
    squares[i].style.pointerEvents = "auto";
  }
  document.getElementById("text").innerHTML = "In progress";
  board = [null, null, null, null, null, null, null, null];
  moveCount = 0;
  turn = false;
  document.getElementById("board").dataset.turn = turn.toString();
  document.getElementById("restart").blur();
}


for (let i = 0; i < squares.length; i++) {
squares[i].addEventListener("click", move, { once: true });
}

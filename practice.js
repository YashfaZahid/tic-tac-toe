let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let player1Symbol;
let player2Symbol;

function chooseSymbol(){
    do{
        player1Symbol=prompt("Player 1 symbol (X or O) ?").toUpperCase()
        console.log(player1Symbol)
    } while(player1Symbol!=="X"&&player1Symbol!=="O")  
    player2Symbol=(player1Symbol==="O")? "X":"O"
    console.log(player2Symbol)
}

function personTurn(){
    const btns=document.querySelectorAll("button")
    btns.forEach(element => {
        element.addEventListener("click",handleClick)
});
}
function handleClick(event){
        let row = event.target.dataset.row;
        let col = event.target.dataset.col;
        if (board[row][col] !== "") return;
        board[row][col] = currentPlayer;
        if (event.target.innerText===""){
            console.log("clicked")
        event.target.innerText=currentPlayer
        let win=winner();
        if(win!==undefined){
            alert(win+" has won the game!")
        }
        currentPlayer=(currentPlayer==player1Symbol)? player2Symbol:player1Symbol;
        console.log(board)
    }
}


function winner(){
    //rows
    for (let i=0;i<3;i++){
        if(board[i][0]!=""&&board[i][0]==board[i][1] && board[i][1]==board[i][2] ){
           return board[i][0]
        }
        //cols
        else if(board[0][i]!=""&&board[0][i]==board[1][i] && board [1][i]==board[2][i]){ 
            return board[0][i];
        }

}
//diagonals
        if(board[0][0]!=""&&board[0][0]==board[1][1]&&board[1][1]==board[2][2]){
        return board[0][0];
        }
        else if(board[0][2]!=""&&board[0][2]==board[1][1]&&board[1][1]==board[2][0]){
        return board[0][2];
    }
    }

chooseSymbol();
let currentPlayer=player1Symbol;
personTurn();

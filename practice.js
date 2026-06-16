let board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];
let player1Symbol;
let player2Symbol;
let player_x_score=0;
let player_o_score=0;

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
        console.log("done clicking")
}
        let win=winner();

        if(win!==undefined){
            console.log(currentPlayer)
            if(currentPlayer==="X"){
                player_x_score++;
                let score=document.getElementById("score-x")
                score.innerText=player_x_score
                console.log("score updated")
            }
            else{
                player_o_score++;
                let score=document.getElementById("score-o")
                score.innerText=player_o_score
            }
            const winner_array = winner();

            console.log(winner_array)
            let btns=[];
            for (let i=0;i<3;i++){
                btns.push(document.querySelector(`[data-row="${winner_array[i][0]}"][data-col="${winner_array[i][1]}"]`))
            }
            btns.forEach(function(b){
                b.style.backgroundColor="#00885d"
                b.style.color="white"
            })
            setTimeout(function(){
                resetgame();
            },2000)
        }

        else if(tie()){
            alert("The game has been tied!")
            resetgame();
        }
        currentPlayer=(currentPlayer==player1Symbol)? player2Symbol:player1Symbol;
        turnBoardText.innerText=`Player ${currentPlayer} Turn`;
        console.log(board)
    }



function winner(){
    //rows
    for (let i=0;i<3;i++){
        if(board[i][0]!=""&&board[i][0]==board[i][1] && board[i][1]==board[i][2] ){
           return [[i, 0], [i, 1], [i, 2]];
        }
        //cols
        else if(board[0][i]!=""&&board[0][i]==board[1][i] && board [1][i]==board[2][i]){ 
            return [[0,i],[1,i],[2,i]]
        }

}
//diagonals
        if(board[0][0]!=""&&board[0][0]==board[1][1]&&board[1][1]==board[2][2]){
        return [[0,0],[1,1],[2,2]]
        }
        else if(board[0][2]!=""&&board[0][2]==board[1][1]&&board[1][1]==board[2][0]){
        return [[0,2],[1,1],[2,0]]
    }
}

function tie(){
    for (let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            if(board[i][j]==""){
                return false
            }
            
        }
    }
    return true;
}

function resetgame(){
    let gameButtons=document.querySelectorAll(".game-btns")
    gameButtons.forEach(function(btn){
        btn.innerText="";
        btn.style.backgroundColor="white"
        btn.style.color="black"
    })
    for (let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            board[i][j]=""
        }
    }
}
chooseSymbol();
let currentPlayer=player1Symbol;
let turnBoardText=document.querySelector(".turn-board-txt")
turnBoardText.innerText=`Player ${currentPlayer} Turn`
personTurn();

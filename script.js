
var hangman = {
  word: ["f","o","o","d"],
  letter: "",
  length: 0,
  wordlength: function(){
    this.length = this.word.length;
  },
  blanks: $("#word-area").children(),
  turns: 0,
  wincount: 0,
};

hangman.wordlength();

console.log(hangman.blanks);
console.log(hangman.length);

$(".keyboard button").click(function(){
  hangman.letter = $(this).html().toLowerCase();
  console.log(hangman.letter);
  hangmanCheck(hangman.letter);
})

function hangmanCheck(letter) {
  if (hangman.word.indexOf(letter) === -1) {
    // wrong answer
    hangman.turns++;
    var turnId = "#turn" + hangman.turns;
    $(turnId).fadeIn("slow");
    console.log("wrong!");
  } else {
    for (var i=0; i < hangman.length; i++) {
      if (letter == hangman.word[i]) {
        // insert into blank area
        hangman.blanks.eq(i).html(letter);
        // add to wincount to check if game has been won yet
        hangman.wincount++;
        if (hangman.wincount == hangman.length) {
          console.log("You win!");
        }
      }
    }
  }
}

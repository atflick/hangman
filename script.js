var blank = '<div class="letter"></div>';
var letterSelected, timerCount, seconds;
var hangman = {
  word: [],
  letter: "",
  length: 0,
  wordlength: function(){
    this.length = this.word.length;
  },
  blanks: [],
  turns: 0,
  wincount: 0,
};

$("#1player").click(function(){
  getRandomWord();
  $(".two-player").css("z-index", 0);
  $(".welcome").css("z-index", -1);
  timer();
});

$("#2player").click(function(){
  $(".welcome").css("z-index", -1);
});


$("#setword").click(function(){
  event.preventDefault();
  hangman.word = $("#answer").val().split("");
  $("#answer").val("");
  hangman.wordlength();
  buildBlanks();
  console.log(hangman.word)
  $(".two-player").css("z-index", 0);
  timer();
})


$(".keyboard button").click(function(){
  if ($(this).hasClass("x") || $(this).hasClass("check")) {
    return;
  } else {
    letterSelected = $(this);
    hangman.letter = $(this).html().toLowerCase();
    hangmanCheck(hangman.letter);
  }
})

function hangmanCheck(letter) {
  if (hangman.word.indexOf(letter) === -1) {
    wrongResponse();
    // wrong answer increments game counter which adds a hangman part
    hangman.turns++;
    var turnId = "#turn" + hangman.turns;
    $(turnId).fadeIn("slow");
    console.log("wrong!");
    if (hangman.turns == 11) {
      // you lose
      setTimeout(function() {
        clearInterval(timerCount);
        $("#result").html("You lose!");
        $("#play-again").before("<h3>The correct word was <strong>" + hangman.word.join("") + "</strong></h3>");
        $(".result-screen").css("z-index", 2);
      },
      1000);
    }
  } else {
    // correct response
    correctResponse();
    for (var i=0; i < hangman.length; i++) {
      if (letter == hangman.word[i]) {
        // insert letter into blanks area
        hangman.blanks.eq(i).html(letter);
        // add to wincount to check if game has been won yet
        hangman.wincount++;
        if (hangman.wincount == hangman.length) {
          // you win
          clearInterval(timerCount);
          $("#result").html("You win!");
          $(".result-screen").css("z-index", 2);
          $("#play-again").before('<h3>Your time was ' + seconds + ' seconds');
        }
      }
    }
  }
}

// Function that builds the blanks for the word that is entered by player
function buildBlanks() {
  for (var i=0; i < hangman.length; i++) {
    $("#word-area").append(blank);
  }
  hangman.blanks = $("#word-area").children();
}

// Resetting game instead of refreshing, called by play again button
function reset() {
  var keyArray = $(".keyboard").children()
  for (var i = 1;i < 28; i++){
    keyArray.eq(i).removeClass("x");
    keyArray.eq(i).removeClass("check");
    // removes hangman body parts
    var turnId = "#turn" + i;
    $(turnId).css("display","none");
  }
  //  Reset z-index ordering and game counters
  $("#word-area").html("");
  $(".result-screen").css("z-index", 0);
  $(".two-player").css("z-index", 2);
  $(".welcome").css("z-index", 3);
  $(".result-screen").children().find($("h3")).remove();
  console.log($(".result-screen"));
  hangman.turns = 0;
  hangman.wincount = 0;
}

$("#play-again").click(reset);

// Random word getting function using Wordnik API http://developer.wordnik.com/docs.html#!/words/getRandomWords_get_3

function getRandomWord() {
  $.ajax({
    url: "http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&minCorpusCount=0&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=4&maxLength=12&limit=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5",
    dataType: "json",
    success: function(response) {
      // fetches word from API, splits to array and assigns to the word
      // some words contain hyphens, so this loop filters those out
      console.log(response[0].word);
      for (var i = 0; i < 10; i++) {
        if (response[i].word.indexOf("-") == -1 || response[i].word.indexOf(" ") == -1  ) {
          hangman.word = response[i].word.toLowerCase().split("");
          break;
        }
      }
      hangman.wordlength();
      buildBlanks();
    }
  })
}


function correctResponse() {
  $(letterSelected).addClass("check");
  $("#correct").css("opacity", .8);
  $("#correct").animate({
    opacity: 0,
    "font-size": 200
  }, 700, function(){
      $("#correct").css("font-size", "16px")
  })
}

function wrongResponse() {
  $(letterSelected).addClass("x");
  $("#nope").css("opacity", .8);
  $("#nope").animate({
    opacity: 0,
    "font-size": 200
  }, 700, function(){
      $("#nope").css("font-size", "16px")
  })
}

function timer() {
  seconds = 0;
  timerCount = setInterval(function() {
    seconds++;
    $("#timer").html(seconds);
  }, 1000);
}

console.log($(".result-screen").children().find($("h3")))

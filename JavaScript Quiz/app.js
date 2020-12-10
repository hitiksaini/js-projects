(function() {



  var questions = [

    {
      question: "Which crop is sown on the largest area in India?",
      choices: ["Rice", "Wheat", "Sugarcane", "Maize"],
      correctAnswer: 0
    },
    {
      question: "Entomology is the science that studies",
      choices: ["Behaviour of human beings", "Insects", "The origin and history of technical and scientific terms", "The formation of rocks"],
      correctAnswer: 1
    },
    {
      question: "Grand Central Terminal, Park Avenue, New York is the world's",
      choices: ["highest railway station", "longest railway station", "largest railway station", "None of the above"],
      correctAnswer: 2
    },
    {
      question: "Galileo was an astronomer who",
      choices: ["developed the telescope", "discovered four satellites of Jupiter", "discovered that the movement of pendulum produces a regular time measurement", "All the above."],
      correctAnswer: 1
    },
    {
      question: "The world smallest country is",
      choices: ["Canada", "Russia", "Maldives", "Vatican City"],
      correctAnswer: 3
    },
    {
      question: "What is the second largest country (in size) in the world?",
      choices: ["Canada", "USA", "China", "Russia"],
      correctAnswer: 0
    },
    {
      question: "For which of the following disciplines is Nobel Prize awarded?",
      choices: ["Literature, Peace and Economics", "Physics and Chemistry", "Physiology or Medicine", "All of the above"],
      correctAnswer: 3
    },
    {
      question: "Durand Cup is associated with the game of",
      choices: ["Cricket", "Football", "Hockey", "Volleyball"],
      correctAnswer: 1
    },
    {
      question: "Ball pen function on which one of the following principal?",
      choices: ["Boyle’s law", "Gravitational force", "Surface tension", "Viscosity"],
      correctAnswer: 2
    },
    {
      question: "The currency notes are printed in",
      choices: ["New Delhi", "Nasik", "Nagpur", "Bombay"],
      correctAnswer: 1
    },


  ];

  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object

  // Display initial question
  displayNext();

  // Click handler for the 'next' button
  $('#next').on('click', function(e) {
    e.preventDefault();

    // Suspend click listener during fade animation
    if (quiz.is(':animated')) {
      return false;
    }
    choose();

    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('You have not answered the Question ! ');
    } else {
      questionCounter++;
      displayNext();
    }
  });

  // Click handler for the 'prev' button
  $('#prev').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });

  // Click handler for the 'Start Over' button
  $('#start').on('click', function(e) {
    e.preventDefault();

    if (quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });

  // Animates buttons on hover
  $('.button').on('mouseenter', function() {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function() {
    $(this).removeClass('active');
  });

  // Creates and returns the div that contains the questions and
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });

    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);

    var question = $('<p>').append(questions[index].question);
    qElement.append(question);

    var radioButtons = createRadios(index);
    qElement.append(radioButtons);

    return qElement;
  }

  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }

  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }

  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();

      if (questionCounter < questions.length) {
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
        }

        // Controls display of 'prev' button
        if (questionCounter === 1) {
          $('#prev').show();
        } else if (questionCounter === 0) {

          $('#prev').hide();
          $('#next').show();
        }
      } else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }

  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>', {
      id: 'question'
    });
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    score.append('You got ' + numCorrect + ' out of ' +
      questions.length + '.');
    return score;
  }
})();

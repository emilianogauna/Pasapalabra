// Variables
// -----------------------------------------------------------------------------
var words = [];
var count = 0;
var remainingWords = 25;

// Cargar palabras desde JSON
fetch("words.json")
  .then(response => response.json())
  .then(data => {
    // Elegir una palabra al azar por letra
    const letrasVistas = new Set();
    data.forEach((item) => {
      const letra = item.letra.toUpperCase();
      if (!letrasVistas.has(letra)) {
        letrasVistas.add(letra);
       // Filtrar todas las palabras con esa letra
const opciones = data.filter(w => w.letra.toUpperCase() === letra);

// Elegir una al azar
const elegida = opciones[Math.floor(Math.random() * opciones.length)];

words.push(new Word(
  words.length,
  letra,
  elegida.pista,
  elegida.definicion,
  elegida.respuesta
));

      }
    });
    document.getElementById("js--new-game").classList.remove("disabled");
  })
  .catch(error => {
    console.error("Error al cargar palabras:", error);
  });
// Functions
// ----------------------------------------- Disciplina filosófica que estudia las ideas, sus caracteres y especialmente su origen.", "Ideologia"------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == words[pos].word.toLowerCase()) {
		words[pos].correct = true;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--success");

	} else {
		words[pos].correct = false;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
	}
	remainingWords--;
	$("js--score").html(remainingWords);

	return count++;
}

function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying() {
	if (count != 25) {
		$("#js--user-answer").val("");
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Fin de partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has conseguido un total de " + counter + " aciertos.";
}


// Main Program
// ----------------------------------------------------------------------------- */
// New game - Iniciar juego
var count = 0; // Contador de palabras respondidas
$("#js--new-game").click(function() {
    $("#js--ng-controls").addClass("hidden"); // Oculta la pantalla inicial
    $("#js--question-controls").removeClass("hidden").addClass("show"); // 🔥 Activa la animación
    $("#js--close").removeClass("hidden"); // Muestra el botón de cerrar

    showDefinition(count); // Muestra la primera pista y definición
    countdown(); // Inicia el temporizador

    let inputField = $("#js--user-answer");
    setTimeout(() => {
        inputField.focus();
        inputField.select();
    }, 100);
});

// Permitir empezar el juego con ENTER en la pantalla inicial
$(document).keydown(function(event) {
    if (event.key === "Enter" && $("#js--ng-controls").is(":visible")) {
        $("#js--new-game").click(); // Simula un clic en el botón "Jugar"
    }
});


// Enviar la respuesta al presionar "Enviar"
$("#js--send").click(function() {
    checkAnswer(count);
    continuePlaying();
    $("#js--user-answer").focus(); // 🔥 Mantiene el cursor en el input
});

// Capturar ENTER para enviar la respuesta
$("#js--user-answer").keydown(function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Evita que la página haga scroll o recargue
        checkAnswer(count);
        continuePlaying();
        $("#js--user-answer").focus(); // 🔥 Mantiene el cursor en el input
    }
});

// Capturar ESPACIO para pasar palabra
$("#js--user-answer").keydown(function(event) {
    if (event.key === " ") {
        event.preventDefault(); // Evita que la página haga scroll hacia abajo
        pasapalabra(count);
        continuePlaying();
        $("#js--user-answer").focus(); // 🔥 Mantiene el cursor en el input
    }
});

// Pasapalabra con el botón
$("#js--pasapalabra").click(function() {
    pasapalabra(count);
    continuePlaying();
    $("#js--user-answer").focus(); // 🔥 Mantiene el cursor en el input
});

// Jugar de nuevo
$("#js--pa").click(function() {
    location.reload();
});

// Terminar juego
$("#js--close").click(function() {
    endGame();
});

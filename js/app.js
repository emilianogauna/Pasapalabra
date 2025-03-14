// Variables
// -----------------------------------------------------------------------------

var words = [ 
    new Word(0, "A", "Empieza con A:", "Programa que se usa en celulares o computadoras.", "Aplicacion"),
    new Word(1, "B", "Empieza con B:", "Tecnología para conectar dispositivos sin cables.", "Bluetooth"),
    new Word(2, "C", "Empieza con C:", "Máquina que procesa información y realiza tareas.", "Computadora"),
    new Word(3, "D", "Empieza con D:", "Acción de bajar archivos desde internet.", "Descarga"),
    new Word(4, "E", "Contiene E:", "Red que conecta computadoras en todo el mundo.", "Internet"),
    new Word(5, "F", "Empieza con F:", "Imagen tomada con una cámara.", "Foto"),
    new Word(6, "G", "Empieza con G:", "Buscador de información en internet.", "Google"),
    new Word(7, "H", "Empieza con H:", "Componentes físicos de una computadora.", "Hardware"),
    new Word(8, "I", "Empieza con I:", "Dispositivo que convierte archivos digitales en papel.", "Impresora"),
    new Word(9, "J", "Empieza con J:", "Control usado para jugar videojuegos.", "Joystick"),
    new Word(10, "L", "Empieza con L:", "Computadora portátil.", "Laptop"),
    new Word(11, "M", "Empieza con M:", "Pantalla de una computadora.", "Monitor"),
    new Word(12, "N", "Empieza con N:", "Espacio de almacenamiento en internet.", "Nube"),
    new Word(13, "Ñ", "Contiene Ñ:", "Acción de compartir conocimientos en la escuela.", "Enseñar"),
    new Word(14, "O", "Empieza con O:", "Sinónimo de computadora.", "Ordenador"),
    new Word(15, "P", "Empieza con P:", "Superficie donde se muestra información visual.", "Pantalla"),
    new Word(16, "Q", "Empieza con Q:", "Código de barras que almacena información.", "QR"),
    new Word(17, "R", "Empieza con R:", "Dispositivo que envía internet a otros equipos.", "Router"),
    new Word(18, "S", "Empieza con S:", "Conjunto de programas que hacen funcionar una computadora.", "Software"),
    new Word(19, "T", "Empieza con T:", "Dispositivo táctil portátil.", "Tablet"),
    new Word(20, "U", "Empieza con U:", "Conector universal de datos y energía.", "USB"),
    new Word(21, "V", "Empieza con V:", "Archivo con imágenes en movimiento.", "Video"),
    new Word(22, "X", "Empieza con X:", "Consola de videojuegos de Microsoft.", "Xbox"),
    new Word(23, "Y", "Empieza con Y:", "Plataforma para ver y compartir videos.", "YouTube"),
    new Word(24, "Z", "Empieza con Z:", "Archivo comprimido.", "Zip"),
];


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

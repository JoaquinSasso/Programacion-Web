let tablero = [];
let turno = "O";
let victoria = "N";
let cantidadCasillas = 3;
let posX;
let posY;
let timeoutId;
let timeoutIA;
let modo;
let jugadas;

function inicializarVariables(tipoPartida)
{
	victoria = "N";
	turno = "O";
	modo = tipoPartida;
	jugadas = 0;
	posX = 0;
	posY = 0;
	document.getElementById("turno").innerHTML = "Turno de: O";
	cantidadCasillas = document.getElementById("cantCasillas").value;
}

function crearTablero(tipoPartida) {
	if (tipoPartida == undefined && modo == undefined) {
		tipoPartida = 0;
	}
	else if (tipoPartida == undefined && modo != undefined) {
		tipoPartida = modo;
	}
	inicializarVariables(tipoPartida);
	var docTablero = document.getElementById("tablero");
	tablero = [];
	docTablero.innerHTML = "";
	for (let i = 0; i < cantidadCasillas; i++) { //Este for crea las columnas y las añade al tablero
		tablero[i] = [];
		let columna = document.createElement("div");
		columna.className = "columna";
		columna.id = "col" + i;
		docTablero.appendChild(columna);
		for (let j = 0; j < cantidadCasillas; j++) { //Este for crea las casillas y las añade a la columna
			tablero[i][j] = 0;
			let casilla = document.createElement("div");
			casilla.className = "casilla";
			casilla.id = "c" + i + j;
			casilla.addEventListener("click", () => toque(i, j));//Se agrega la función toque a cada casilla al hacer click
			columna.appendChild(casilla);
		}
	}
}

function toque(columna, fila)
{
	if (modo == 0) // Modo jugador contra jugador, no hay que esperar
	{
		agregarFicha(fila, columna);
	}
	else if (!timeoutIA) // Modo jugador contra IA, se espera 1 segundo
	{
		agregarFicha(fila, columna);
		if (jugadas < cantidadCasillas * cantidadCasillas) {
			jugadaMaquina(fila, columna);
		}
		document.getElementById("turno").innerHTML = "Turno de: " + turno;
		hayGanador();
	}
}

function agregarFicha(fila, columna)
{
	if (tablero[fila][columna] == 0 && victoria == "N") {
		jugadas++;
		casilla = document.getElementById("c" + columna + fila);
		if (turno == "O") {
			casilla.innerHTML = "O";
			tablero[fila][columna] = turno;
			turno = "X";
		} else {
			casilla.innerHTML = "X";
			tablero[fila][columna] = turno;
			turno = "O";
		}
	}
}

function jugadaMaquina(fila, columna) {
	let x = columna;
	let y = fila;
	while (tablero[x][y] != 0) {
		x = Math.floor(Math.random() * cantidadCasillas);
		y = Math.floor(Math.random() * cantidadCasillas);
	}
	timeoutIA = true; //Se bloque el juego 1 segundo
	setTimeout(() => {
		agregarFicha(x, y);
		timeoutIA = false; //Se desbloquea el juego
	}, 1000);
}

function hayGanador() {
   verificarFilas();
   verificarColumnas();
   verificarDiagonales();
   if (victoria == "X" || victoria == "O") {
      document.getElementById("turno").innerHTML =
         "El jugador " + victoria + " ha ganado la partida";
   }
   else if (cantidadCasillas * cantidadCasillas == jugadas) {
      document.getElementById("turno").innerHTML = "Empate";
      victoria = "E";
   }
}

function verificarFilas() {
	for (let i = 0; i < cantidadCasillas; i++) {
		let contador = 0;
		for (let j = 0; j < cantidadCasillas; j++) {
			casilla = tablero[i][j];
			if (casilla == "O") {
				contador++;
			}
			else if (casilla == "X") {
				contador--;
			}
		}
		if (contador == cantidadCasillas) {
			victoria = "O";
		}
		else if (contador == -cantidadCasillas) {
			victoria = "X";
		}
	}
}

function verificarColumnas() {
	for (let i = 0; i < cantidadCasillas; i++) {
		let contador = 0;
		for (let j = 0; j < cantidadCasillas; j++) {
			casilla = tablero[j][i];
			if (casilla == "O") {
				contador++;
			}
			else if (casilla == "X") {
				contador--;
			}
		}
		if (contador == cantidadCasillas) {
			victoria = "O";
		}
		else if (contador == -cantidadCasillas) {
			victoria = "X";
		}
	}
}

function verificarDiagonales() {
	let contador = 0;
	let contador2 = 0;
	for (let i = 0; i < cantidadCasillas; i++) {
		diagonal = tablero[i][i];
		antiDiagonal = tablero[i][cantidadCasillas - i - 1];
		if (diagonal == "O") {
			contador++;
		}
		else if (diagonal == "X") {
			contador--;
		}
		if (antiDiagonal == "O") {
			contador2++;
		}
		else if (antiDiagonal == "X") {
			contador2--;
		}
	}

	if (contador == cantidadCasillas || contador2 == cantidadCasillas) {
		victoria = "O";
	}
	else if (contador == -cantidadCasillas || contador2 == -cantidadCasillas) {
		victoria = "X";
	}
}

document.addEventListener("keydown", (event) => {
	if (event.key === "Enter" || event.key === " " || event.key === "ArrowUp" ||  event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "r") {
		event.preventDefault();
	}
	casilla = document.getElementById("c" + posX + posY);
	casilla.style.backgroundColor = "white";
	if (event.key === "ArrowUp") {
		if (posY > 0) {
			posY--;
		}
	} else if (event.key === "ArrowDown") {
		if (posY < cantidadCasillas - 1) {
			posY++;
		}
	} else if (event.key === "ArrowLeft") {
		if (posX > 0) {
			posX--;
		}
	} else if (event.key === "ArrowRight") {
		if (posX < cantidadCasillas - 1) {
			posX++;
		}
	} else if (event.key === " ") { // Barra espaciadora
		toque(posX, posY);
	} else if (event.key === "r") {
		crearTablero(modo);
	}

	casilla = document.getElementById("c" + posX + posY);
	casilla.style.backgroundColor = "aquamarine";

	if (timeoutId) {
		clearTimeout(timeoutId);
	}
	timeoutId = setTimeout(() => {
		let casillas = document.getElementsByClassName("casilla");
		for (let i = 0; i < casillas.length; i++) {
			casillas[i].style.backgroundColor = "white";
		}
	}, 3000);
});

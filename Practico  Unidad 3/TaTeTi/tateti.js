let tablero = [];
let turno = "O";
let victoria = "N";
let cantidadCasillas = 3;
let posX;
let posY;
let timeoutId;
let modo;
let jugadas;
function crearTablero(tipoPartida) {
	victoria = "N";
	turno = "O";
   modo = tipoPartida;
   jugadas = 0;
   posX = 0
   posY = 0;
	document.getElementById("turno").innerHTML = "Turno de: O";
	cantidadCasillas = document.getElementById("cantCasillas").value;
	var docTablero = document.getElementById("tablero");
	console.log(cantidadCasillas);
	tablero = [];
	docTablero.innerHTML = "";
	for (var i = 0; i < cantidadCasillas; i++) {
		tablero[i] = [];
		let columna = document.createElement("div");
		columna.className = "columna";
		columna.id = "col" + i;
		docTablero.appendChild(columna);
		for (var j = 0; j < cantidadCasillas; j++) {
			tablero[i][j] = 0;
			let casilla = document.createElement("div");
			casilla.className = "casilla";
			casilla.id = "c" + i + j;
			casilla.addEventListener(
				"click",
				(function (i, j) {
					return function () {
						toque(i, j);
					};
				})(i, j)
			);
			columna.appendChild(casilla);
		}
	}
}

function toque(columna, fila) {
	if (victoria == "N") {
      if (tablero[fila][columna] == 0) {
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
			document.getElementById("turno").innerHTML = "Turno de: " + turno;
			hayGanador();
			if (modo == 1 && turno == "X") {
				jugadaMaquina(fila, columna);
			}
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
	setTimeout(() => {
		toque(y,x);
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
	for (var i = 0; i < cantidadCasillas; i++) {
		let contador = 0;
		for (var j = 0; j < cantidadCasillas; j++) {
			casilla = tablero[i][j];
			if (casilla == "O") {
				contador++;
			}
			if (casilla == "X") {
				contador--;
			}
		}
		if (contador == cantidadCasillas) {
			victoria = "O";
		}
		if (contador == -cantidadCasillas) {
			victoria = "X";
		}
	}
}

function verificarColumnas() {
	for (var i = 0; i < cantidadCasillas; i++) {
		let contador = 0;
		for (var j = 0; j < cantidadCasillas; j++) {
			casilla = tablero[j][i];
			if (casilla == "O") {
				contador++;
			}
			if (casilla == "X") {
				contador--;
			}
		}
		if (contador == cantidadCasillas) {
			victoria = "O";
		}
		if (contador == -cantidadCasillas) {
			victoria = "X";
		}
	}
}

function verificarDiagonales() {
	let contador = 0;
	let contador2 = 0;
	for (var i = 0; i < cantidadCasillas; i++) {
		diagonal = tablero[i][i];
		antiDiagonal = tablero[i][cantidadCasillas - i - 1];
		if (diagonal == "O") {
			contador++;
		}
		if (diagonal == "X") {
			contador--;
		}
		if (antiDiagonal == "O") {
			contador2++;
		}
		if (antiDiagonal == "X") {
			contador2--;
		}
	}

	if (contador == cantidadCasillas || contador2 == cantidadCasillas) {
		victoria = "O";
	}
	if (contador == -cantidadCasillas || contador2 == -cantidadCasillas) {
		victoria = "X";
	}
}

document.addEventListener("keydown", (event) => {
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
	} else if (event.key === "Enter") {
		toque(posX, posY);
	} else if (event.key === "r") {
		crearTablero(modo);
	}
	console.log("posX: " + posX + " posY: " + posY);
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

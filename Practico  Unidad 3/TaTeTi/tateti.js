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
			casilla.id = "c" + j + i;
			casilla.addEventListener("click", () => toque(j, i));//Se agrega la función toque a cada casilla al hacer click
			columna.appendChild(casilla);
		}
	}
}

function toque(fila, columna)
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
	}
	hayGanador();
}

function agregarFicha(fila, columna)
{
	if (tablero[fila][columna] == 0 && victoria == "N") {
		jugadas++;
		casilla = document.getElementById("c" + fila + columna);
		casilla.innerHTML = turno;
		if (turno == "O") {	
			tablero[fila][columna] = turno;
			turno = "X";
		} else {
			tablero[fila][columna] = turno;
			turno = "O";
		}
		hayGanador();
	}
}

function jugadaMaquina(filaPlayer, columnaPlayer) {
	filas = verificarFilas() % cantidadCasillas;
	columnas = verificarColumnas() % cantidadCasillas;
	diagonales = verificarDiagonales() % cantidadCasillas;
	if (cantidadCasillas == 3 && jugadas == 1 && (tablero[0][0] == "O" || tablero[0][cantidadCasillas - 1] == "O" || tablero[cantidadCasillas - 1][0] == "O" || tablero[cantidadCasillas - 1][cantidadCasillas - 1] == "O")) {
		x = Math.floor(1);
		y = Math.floor(1);
	}
	else if (cantidadCasillas == 3 && jugadas == 1 && tablero[1][1] == "O") {
		x = 0;
		y = 0;
	}
	else if (cantidadCasillas == 3 && jugadas == 1 && tablero[1][1] == 0) {
		x = 1;
		y = 1;
	}
	else if (cantidadCasillas == 3 && jugadas == 3 && tablero[1][1] == "O" && tablero[2][2] == "O") {
		x = 2;
		y = 0;
	} else if (filas != -1) {
		x = filas;
		y = 0;
		while (tablero[x][y] != 0) {
			y++;
		}
	} else if (columnas != -1) {
		y = columnas;
		x = 0;
		while (tablero[x][y] != 0) {
			x++;
		}
	} else if (diagonales != 0) {
		if (diagonales == 1) {
			x = 0;
			while (tablero[x][x] != 0) {
				x++;
			}
			y = x;
		}
		if (diagonales == -1) {
			x = cantidadCasillas - 1;
			while (tablero[x][cantidadCasillas - x - 1] != 0) {
				x--;
			}
			y = cantidadCasillas - x - 1;
		}
	} else if (cantidadCasillas == 3 && jugadas == 3 && tablero[1][1] == "X") {
		if (tablero[0][1] == 0)
		{	
			x = 0;
			y = 1;
		}
		else if (tablero[2][1] == 0)
		{
			x = 2;
			y = 1;
		}
		else
		{
			x = 1;
			y = 0;
		}
	}
	 else {
		opcion = Math.floor(Math.random() * 10);
		if (opcion > 5) {
			x = filaPlayer;
			y = 0;
			while (tablero[x][y] != 0) {
				y++;
				if (y == cantidadCasillas) {
					y = Math.floor(Math.random() * cantidadCasillas);
					x = 0;
				}
			}
		} else {
			y = columnaPlayer;
			x = 0;
			while (tablero[x][y] != 0) {
				x++;
				if (x == cantidadCasillas) {
					x = Math.floor(Math.random() * cantidadCasillas);
					y = 0;
				}
			}
		}
	}

	timeoutIA = true; // Se bloquea el juego 1 segundo
	setTimeout(() => {
		if (jugadas > 0) {
			agregarFicha(x, y);
		}
		timeoutIA = false; // Se desbloquea el juego
	}, 1000); // Añadido el tiempo de espera de 1 segundo
}

function hayGanador() {
   verificarFilas();
   verificarColumnas();
   verificarDiagonales();
   if (victoria == "X" || victoria == "O") {
      document.getElementById("turno").innerHTML =
         "El jugador " + victoria + " ha ganado la partida";
   }
   else if (cantidadCasillas * cantidadCasillas <= jugadas) {
      document.getElementById("turno").innerHTML = "Empate";
      victoria = "E";
	}
	else {
		document.getElementById("turno").innerHTML = "Turno de: " + turno;
	}
}

function verificarFilas() {
	let maximaFila = -1;
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
		if (contador == cantidadCasillas - 1 || contador == -cantidadCasillas + 1)
		{
			if (contador > maximaFila) {
				maximaFila = i;
			}
			if (tablero[i][0] == "X" || tablero[i][1] == "X") {
				maximaFila = i + cantidadCasillas;
			}
		
		}
		if (contador == cantidadCasillas) {
			victoria = "O";
		}
		else if (contador == -cantidadCasillas) {
			victoria = "X";
		}
	}
	return maximaFila;
}

function verificarColumnas() {
	let maximaColumna = -1;
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
		if (contador == cantidadCasillas - 1 || contador == -cantidadCasillas + 1) {
			if (contador > maximaColumna) {
				maximaColumna = i;
			}
			if (tablero[0][i] == "X" || tablero[1][i] == "X") {
				maximaColumna = i + cantidadCasillas;
			}
		}
		if (contador == cantidadCasillas) {
			victoria = "O";
		}
		else if (contador == -cantidadCasillas) {
			victoria = "X";
		}
	}
	return maximaColumna;
}

function verificarDiagonales() {
	let contador = 0;
	let contador2 = 0;
	let contrajugada = 0;
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

	if (contador == cantidadCasillas - 1 || contador == -cantidadCasillas + 1) {
		contrajugada = 1;
		if (tablero[0][0] == "X" || tablero[cantidadCasillas - 1][cantidadCasillas - 1] == "X") {
			contrajugada = cantidadCasillas;
		}
	}
	else if (contador2 == cantidadCasillas - 1 || contador2 == -cantidadCasillas + 1) {
		contrajugada = - 1;
		if (tablero[0][cantidadCasillas - 1] == "X" || tablero[cantidadCasillas - 1][0] == "X") {
			contrajugada = -cantidadCasillas;
		}
	}

	if (contador == cantidadCasillas || contador2 == cantidadCasillas) {
		victoria = "O";
	}
	else if (contador == -cantidadCasillas || contador2 == -cantidadCasillas) {
		victoria = "X";
	}
	return contrajugada;
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
		toque(posY, posX);
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
var tablero = [];
var turno = "O";
var victoria = "N";
var cantidadCasillas = 3;

function crearTablero() {
	victoria = "N";
	turno = "O";
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
         document.getElementById("turno").innerHTML = "Turno de :" + turno;
         hayGanador();
      }
	}
}

function hayGanador() {
   verificarFilas();
   verificarColumnas();
   verificarDiagonales();
   if (victoria != "N")
   {
      document.getElementById("turno").innerHTML = "EL jugador " + victoria + " ha ganado la partida"
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

function verificarColumnas()
{
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

function verificarDiagonales()
{
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
      if (antiDiagonal == "O")
      {
         contador2++;
      }
      if (antiDiagonal == "X")
      {
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

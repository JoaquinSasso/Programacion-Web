let display = "";
let operacion = "";
const operadores = ["+", "*", "/", "-"];
function agregar(caracter)
{ 
   if ((!display.includes(caracter) && !operacion) || !operadores.includes(caracter))
   {
      if (operadores.includes(caracter))
      {
         operacion = caracter;
      }
      if (display.length < 18)
      {
         display = display + caracter;
         document.getElementById("display").innerHTML = display;
      }
   }
}

function borrar()
{
   display = "";
   operacion = "";
   document.getElementById("display").innerHTML = display;
}

function calcular()
{
   let miembros = display.split(operacion);
   if (operacion == "+")
   {
      display = Number(miembros[0]) + Number(miembros[1]);
   }
   else if (operacion == "-") {
			display = Number(miembros[0]) - Number(miembros[1]);
   }
   else if (operacion == "*") {
			display = Number(miembros[0]) * Number(miembros[1]);
   }
   else if (operacion == "/") {
			display = Number(miembros[0]) / Number(miembros[1]);
   }
   display = String(display)
   operacion = "";
   document.getElementById("display").innerHTML = display;
}
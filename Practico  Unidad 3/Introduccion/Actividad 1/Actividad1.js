var pais = "Argentina"; // Variable global
let continente = "America"; // Variable global
function Variables()
{     
      const pi = 3.1416; // Esta es una constante y no puede cambiar su valor
      var   nombre = "Juan"; 
      let apellido = "Perez";
      var nombre = "Pedro"; // Las variables var pueden ser redefinidas en el mismo bloque
      //let apellido = "Gomez"; // Las variables let no pueden ser redefinidas en el mismo bloque
      let i = 0; // Estas 3 variables son locales a la función Variables y pueden ser accedida dentro de la función
      if (i == 0) // Inicio del bloque if
      {
         let contador = 9 // Esta variable es local al bloque if
         let apellido = "Gomez"; // Las variables let pueden ser redefinidas en un bloque diferente
         var provincia = "San Juan"; // Esta variable podra ser accedidad desde toda la funcion
         console.log(nombre + " " + apellido); // Aqui se puede ver que nombre y apellido pueden ser accedidas desde el bloque if
         console.log(pais); // Se puede acceder a la variable pais ya que es global
         console.log(continente); // Se puede acceder a la variable continente ya que es global
         i++; // Incremento el valor de i dentro del bloque if
      } // Fin del bloque if
      console.log(provincia); // Esta variable puede ser accedida fuera del if ya que es del tipo var
      //pi = 2 Si esta linea se ejecuta generaria un error ya que pi es una constante
      //console.log(contador); // Error: contador no está definido
}

function OtraFuncion()
{
   console.log(pais); // Se puede acceder a la variable pais ya que es global
   console.log(continente); // Se puede acceder a la variable continente ya que es global
   console.log(nombre); // Error: nombre no está definido
}

Variables();
OtraFuncion();
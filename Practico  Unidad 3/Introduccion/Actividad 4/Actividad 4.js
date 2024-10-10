function menorElemento() {
   var arreglo = [1, 2, 3, 4, 5, 6, 11, 23, 1, 989, 0, 1, 111, 645, 50, 45];
   var menor = arreglo.reduce(function(minimo, actual) {
      return actual < minimo ? actual : minimo;
   }, arreglo[0]);
   document.getElementById("resultado").innerHTML = "El menor elemento del arreglo es: " + menor;
   return menor;
}

function sumador() {
   var arreglo = [1, 2, 3, 4, 5, 6, 11, 23, 1, 989, 0, 1, 111, 645, 50, 45];
   var suma = arreglo.reduce(function(acumulado, actual) {
      return acumulado + actual;
   }, 0);
   document.getElementById("resultado").innerHTML = "La suma de los elementos del arreglo es: " + suma;
   return suma;
}

function duplicar() {
   var arreglo = [1, 2, 3, 4, 5, 6, 11, 23, 1, 989, 0, 1, 111, 645, 50, 45];
   var duplicado = arreglo.map(function(elemento) {
      return elemento * 2;
   });
   document.getElementById("resultado").innerHTML = "El arreglo duplicado es: " + "[" + duplicado + "]";
   return duplicado;
}

function mayoresDiez()
{
   var arreglo = [1, 2, 3, 4, 5, 6, 11, 23, 1, 989, 0, 1, 111, 645, 50, 45];
   var mayores = arreglo.filter(function(elemento) {
      return elemento > 10;
   });
   document.getElementById("resultado").innerHTML = "Los elementos mayores a 10 son: " + "[" +  mayores + "]";
   return mayores;
}

function primerMayorDiez()
{
   var arreglo = [1, 2, 3, 4, 5, 6, 11, 23, 1, 989, 0, 1, 111, 645, 50, 45];
   var primerMayor = arreglo.findIndex(function(elemento) {
      return elemento > 10;
   });
   document.getElementById("resultado").innerHTML = "El indice del primer elemento mayor a 10 es: " + primerMayor;
   return primerMayor;
}
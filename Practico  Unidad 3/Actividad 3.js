//Funciones declarativas
function suma(a, b) {
   return a + b;
}


//Funciones anónimas
const suma = function(a, b) {
   return a + b;
};


//Funciones nombradas
const suma = function suma(a, b) {
   return a + b;
};


//Funciones Flecha
const suma = (a, b) => a + b;


//Funciones IIFE (Immediately Invoked Function Expressions)
(function(a, b) {
   console.log(a + b);
})(3, 5);


//Métodos de Objetos
const objeto = {
   nombre: 'Calculadora',
   suma: function(a, b) {
       return a + b;
   }
};
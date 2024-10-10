function saludar() {
  document.getElementById("saludo").innerHTML =
    "Hola, gente. Estoy aquí para hacer lo que mejor sé: nada";
}

function color() {
   var headers = document.querySelectorAll("header");
   var footers = document.querySelectorAll("footer");

   headers.forEach(function(header) {
      header.style.backgroundColor = "red";
   });

   footers.forEach(function(footer) {
      footer.style.backgroundColor = "red";
   });
}

setTimeout(color, 5000);

document.getElementById("getDataBtn").addEventListener("click", function() {
   fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
         var ul = document.getElementById("ListaDatos");
         if (!ul) {
            ul = document.createElement("ul");
            ul.id = "ListaDatos";
            document.body.appendChild(ul);
         }
         data.slice(0, 10).forEach(item => {
            var li = document.createElement("li");
            li.textContent = item.title;
            ul.appendChild(li);
         });
      });
});
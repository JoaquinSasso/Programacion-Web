function verificarNombre()
{
      advertencia = document.getElementById("advertenciaNombre");
      var nombre = document.getElementById("nombre").value;
      Array.from(nombre)
      nombre = nombre.toLowerCase();
      nombresPreexistentes = ["ana", "pedro", "pancho"];
      if (nombresPreexistentes.includes(nombre))
      {
            advertencia.innerHTML = "El nombre ya existe";
      }
      else if (nombre.length < 3)
      {
         advertencia.innerHTML = "El nombre debe tener al menos 3 caracteres";
      }
      else
      {
         advertencia.innerHTML = "";
      }
}


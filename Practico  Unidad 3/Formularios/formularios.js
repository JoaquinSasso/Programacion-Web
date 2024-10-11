function verificarNombre() {
	advertencia = document.getElementById("advertenciaNombre");
	var nombre = document.getElementById("nombre").value;
	Array.from(nombre);
	nombre = nombre.toLowerCase();
	nombresPreexistentes = ["ana", "pedro", "pancho"];
	if (nombresPreexistentes.includes(nombre)) {
		advertencia.innerHTML = "El nombre ya existe";
	} else if (nombre.length < 3) {
		advertencia.innerHTML = "El nombre debe tener al menos 3 caracteres";
	} else {
		advertencia.innerHTML = "";
	}
}

function verificarEmail() {
	advertencia = document.getElementById("advertenciaEmail");
	var email = document.getElementById("email").value;
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		advertencia.innerHTML = "El email no es válido";
	} else {
		advertencia.innerHTML = "";
	}
}

function verificarPassword() {
	advertencia = document.getElementById("advertenciaPassword");
	var password = document.getElementById("password").value;
	if (password.length < 8) {
		advertencia.innerHTML = "La contraseña debe tener al menos 8 caracteres";
	} else {
		advertencia.innerHTML = "";
	}
}

function verificarConfirmacion() {
	advertencia = document.getElementById("advertenciaConfirmar");
	var password = document.getElementById("password").value;
	var confirmacion = document.getElementById("confirmarPassword").value;
	if (password != confirmacion) {
		advertencia.innerHTML = "Las contraseñas no coinciden";
	} else {
		advertencia.innerHTML = "";
	}
}

function enviarDatos() {
	event.preventDefault();
	console.log("enviando datos");
	var nombre = document.getElementById("nombre").value;
	var email = document.getElementById("email").value;
	var password = document.getElementById("password").value;
      var advertenciaNombre = document.getElementById("advertenciaNombre").innerHTML;
      var advertenciaEmail = document.getElementById("advertenciaEmail").innerHTML;
      var advertenciaPassword = document.getElementById("advertenciaPassword").innerHTML;
      var advertenciaConfirmar = document.getElementById("advertenciaConfirmar").innerHTML;
      if(advertenciaNombre != "" || advertenciaEmail != "" || advertenciaPassword != "" || advertenciaConfirmar != ""){
            alert("Debe completar los campos correctamente");
            return;
      }
	var datos = {
		nombre: nombre,
		email: email,
		password: password,
	};

	fetch("https://jsonplaceholder.typicode.com/posts", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(datos),
	})
		.then((response) => response.json())
		.then((data) => {
			alert("El proceso fue exitoso");
			console.log("Success:", data);
		})
		.catch((error) => {
			alert("Ocurrió un error durante el envío de datos");
			console.error("Error:", error);
		});
}

let contador = 0;
let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
function agregar()
{
   let tarea = document.getElementById("tarea");
   let texto = tarea.value;
   tarea.value = "";
   agregarTarea(texto);
   // if (!(texto == ""))
   // {
   //    let lista = document.getElementById("lista");
   //    document.getElementById("emptyList").style.display = "none";
   //    let nuevoDiv = document.createElement("div");
   //    nuevoDiv.className = "todo";
   //    nuevoDiv.innerText = texto;
   //    nuevoDiv.id = "tarea" + contador;
   //    let radioInput = document.createElement("input");
   //    radioInput.type = "checkbox";
   //    radioInput.style.float = "left";
   //    radioInput.addEventListener("click", function () { cambiarEstado(nuevoDiv.id) });
   //    nuevoDiv.appendChild(radioInput)
   //    //contador++;
   //    let elemento = document.createElement("li");
   //    elemento.appendChild(nuevoDiv);
   //    lista.appendChild(nuevoDiv)
   // }
}
   
function cambiarEstado(id)
{
   let elemento = document.getElementById(id);
   let clase = elemento.className;
   toggleDone(id);
   if (clase == "todo")
   {
      elemento.className = "done";
   }
   else
   {
      elemento.className = "todo";   
   }
}

// Función para agregar una tarea
function agregarTarea(texto) {
   texto = String(texto )
   tareas.push({ id: contador++, text: texto, done: false });
   localStorage.setItem('tareas', JSON.stringify(tareas));
   mostrarTareas();
}

// Función para mostrar las tareas
function mostrarTareas() {
   const listaTareas = document.getElementById('lista');
   listaTareas.innerHTML = '';
   tareas.forEach(t => {
      const tareaElemento = document.createElement('div');
      tareaElemento.className = t.done ? 'done' : 'todo';
      tareaElemento.innerHTML = `
         <input type="checkbox" ${t.done ? 'checked' : ''} onclick="toggleDone(${t.id})">
         <span>${t.text}</span>
         <button onclick="eliminarTarea(${t.id})">Eliminar</button>
      `;
      let item = document.createElement("li");
      item.appendChild(tareaElemento);
      listaTareas.appendChild(item);
   });
}

// Función para marcar una tarea como hecha/no hecha
function toggleDone(id) {
   const tarea = tareas.find(t => t.id === id);
   tarea.done = !tarea.done;
   localStorage.setItem('tareas', JSON.stringify(tareas));
   mostrarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(id) {
   tareas = tareas.filter(t => t.id !== id);
   localStorage.setItem('tareas', JSON.stringify(tareas));
   mostrarTareas();
}

// Inicializar la lista de tareas al cargar la página
document.addEventListener('DOMContentLoaded', mostrarTareas);
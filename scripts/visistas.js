 // Obtener el contador desde el almacenamiento local
 let contador = localStorage.getItem('contador');

 // Si no existe, inicializarlo en 0
 if (contador === null) {
     contador = 0;
 }

 // Convertir a número y aumentar en 1
 contador = parseInt(contador) + 1;

 // Guardar el nuevo valor en el almacenamiento local
 localStorage.setItem('contador', contador);

 // Mostrar el número de visitas
 document.querySelector('#contador').textContent = `${contador}`;
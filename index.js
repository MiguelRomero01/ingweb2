 // Obtén el contador actual desde el localStorage
 let contador = localStorage.getItem('visitas');

 // Si no existe, inicialízalo en 0
 if (contador === null) {
     contador = 0;
 }

 // Incrementa el contador
 contador++;

 // Actualiza el localStorage con el nuevo valor
 localStorage.setItem('visitas', contador);

 // Muestra el valor del contador en la página
 document.getElementById('contador').innerText = contador;
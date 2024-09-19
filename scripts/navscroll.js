window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbarMenu');
    const scrollY = window.scrollY;
    
    console.log('scrollY:', scrollY); // Verifica si el scroll está siendo detectado.
    
    // Cambia el color del navbar si haces scroll más de 50px.
    if (scrollY > 900) {
      navbar.classList.add('scrolled');
      console.log('Clase "scrolled" añadida'); // Verifica si la clase se añade.
    } else {
      navbar.classList.remove('scrolled');
      console.log('Clase "scrolled" eliminada'); // Verifica si la clase se quita.
    }
  });
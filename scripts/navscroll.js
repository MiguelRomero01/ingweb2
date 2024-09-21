window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbarMenu');
    const scrollY = window.scrollY;
    
    // Cambia el color del navbar si haces scroll más de 50px.
    if (scrollY > 900) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
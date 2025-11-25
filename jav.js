// === 1. MENÚ HAMBURGUESA (Funcionalidad Móvil) ===
// Seleccionamos el botón de las tres rayitas y la lista de enlaces
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

// Añadimos un "escuchador de eventos" para cuando se haga click
mobileMenu.addEventListener('click', () => {
    // 'toggle' añade la clase si no está, y la quita si está
    navLinks.classList.toggle('active');
});


// === 2. ANIMACIÓN AL HACER SCROLL (Efecto Intermedio) ===
// Queremos que los elementos aparezcan suavemente cuando bajamos la pantalla

// Seleccionamos todos los elementos que tengan la clase 'section-fade'
const fadeElements = document.querySelectorAll('.section-fade');

// Creamos una función que comprueba la posición
const checkScroll = () => {
    // Obtenemos la altura de la ventana del navegador
    const triggerBottom = window.innerHeight / 5 * 4; // Se activa al 80% de la pantalla

    fadeElements.forEach(element => {
        // Obtenemos la distancia del elemento respecto al techo de la ventana
        const elementTop = element.getBoundingClientRect().top;

        // Si el elemento ya entró en la zona visible...
        if (elementTop < triggerBottom) {
            element.classList.add('visible'); // Añadimos la clase CSS que le da opacidad 1
        } else {
            // Opcional: Si quieres que desaparezcan al subir, deja esta línea. Si no, bórrala.
            // element.classList.remove('visible'); 
        }
    });
};

// Escuchamos el evento de scroll en la ventana
window.addEventListener('scroll', checkScroll);

// Ejecutamos una vez al inicio para mostrar lo que ya sea visible
checkScroll();
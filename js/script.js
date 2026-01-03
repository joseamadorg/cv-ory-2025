

const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
  const header = item.querySelector('.accordion-header');

  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');

    accordionItems.forEach(accItem => {
      if (accItem !== item && accItem.classList.contains('active')) {
        accItem.classList.remove('active');
      }
    });

    if (!isActive) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
});


const info = document.getElementById('info');

function toggleHeroDerTop() {
    const heroDer = document.querySelector('.hero__der');
    const isOpen = heroDer.classList.contains('hero__der--open');
    heroDer.classList.toggle('hero__der--open');
    heroDer.style.top = isOpen ? '100vh' : '0vh';
  }
  

  

  window.addEventListener('load', function() {
    var pantallaCarga = document.getElementById('pantalla-carga');
    pantallaCarga.style.display = 'none';
  });
  
  

  /* Archivo: js/script.js */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('matrix-bg');
    const container = document.querySelector('.hero__izq');
    
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');

    // --- CONFIGURACIÓN DE VELOCIDAD ---
    // 50ms es aprox 20 cuadros por segundo. 
    // MÁS LENTO, aumenta este número (ej. 80, 100).
    // MÁS RÁPIDO, disminúyelo (ej. 30).
    const velocidad = 70; 

    function resizeCanvas() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }
    resizeCanvas();

    // Bases del ADN (A, T, C, G) y binarios
    const characters = 'ATCGATCGATCGATCG01'; 
    
    const fontSize = 14; 
    let columns = Math.floor(canvas.width / fontSize);
    
    let drops = [];
    function initDrops() {
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100; 
        }
    }
    initDrops();

    function draw() {
        // Fondo semi-transparente.
        // 0.1 = estela larga. 0.2 = estela más corta (se borra más rápido).
        ctx.fillStyle = 'rgba(10, 0, 26, 0.1)'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#b026ff'; // Púrpura base
        ctx.font = 'bold ' + fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            const x = i * fontSize;
            const y = drops[i] * fontSize;

            // Brillo aleatorio para algunas letras
            if (Math.random() > 0.95) {
                ctx.fillStyle = '#e8abff'; // Blanco/Rosa
            } else {
                ctx.fillStyle = '#b026ff'; // Púrpura
            }

            ctx.fillText(text, x, y);

            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // --- CAMBIO CLAVE ---
    // Usamos setInterval en lugar de requestAnimationFrame
    // Esto fuerza a la animación a esperar 'velocidad' milisegundos entre cuadros.
    let interval = setInterval(draw, velocidad);

    window.addEventListener('resize', () => {
        clearInterval(interval); // Limpiamos el intervalo anterior
        resizeCanvas();
        initDrops();
        interval = setInterval(draw, velocidad); // Reiniciamos
    });
});
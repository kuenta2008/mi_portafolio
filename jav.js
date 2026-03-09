

const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');


if (mobileMenu && navLinks) {
    mobileMenu.addEventListener('click', () => {
        
        navLinks.classList.toggle('active');
    });

    
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    });
}






const fadeElements = document.querySelectorAll('.section-fade');


const checkScroll = () => {
    
    const triggerBottom = window.innerHeight / 5 * 4; 

    fadeElements.forEach(element => {
        
        const elementTop = element.getBoundingClientRect().top;

        
        if (elementTop < triggerBottom) {
            element.classList.add('visible'); 
        } else {
            
            element.classList.remove('visible');
        }
    });
};


window.addEventListener('scroll', checkScroll);


checkScroll();



document.body.classList.add('magictime', 'vanishIn');


const enlaces = document.querySelectorAll('a');

enlaces.forEach(enlace => {
    enlace.addEventListener('click', (e) => {
        const target = enlace.getAttribute('target');
        const href = enlace.getAttribute('href');

        
        if (href && !href.startsWith('#') && target !== '_blank' && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
            e.preventDefault();
            const destination = enlace.href;

            
            document.body.classList.remove('vanishIn');
            document.body.classList.add('magictime', 'puffOut');

            
            setTimeout(() => {
                window.location.href = destination;
            }, 600);
        }
    });
});

const rotatingTextElement = document.querySelector('.rotating-text');
if (rotatingTextElement) {
    const words = ["TÃ©cnico FP", "Estudiante", "Creador de CÃ³digo", "DiseÃ±ador"];
    let wordIndex = 0;

    setInterval(() => {
        
        rotatingTextElement.classList.add('out');

        setTimeout(() => {
            
            wordIndex = (wordIndex + 1) % words.length;
            rotatingTextElement.textContent = words[wordIndex];

            
            rotatingTextElement.classList.remove('out');
        }, 500); 
    }, 3000); 
}


let canvas = document.getElementById('bg-canvas');
if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-canvas';
    document.body.appendChild(canvas);
}

const ctx = canvas.getContext('2d');
let width, height;
let particles = [];
let mouse = { x: null, y: null };


window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});
window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});


function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();


class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1; 
        this.vy = (Math.random() - 0.5) * 1; 
        this.radius = Math.random() * 2 + 1; 
    }

    update() {
        
        this.x += this.vx;
        this.y += this.vy;

        
        if (mouse.x != null && mouse.y != null) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            
            if (distance < 150) {
                this.x -= dx * 0.02;
                this.y -= dy * 0.02;
            }
        }

        
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'; 
        ctx.fill();
    }
}


const numParticles = 120; 
for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle());
}


function animate() {
    ctx.clearRect(0, 0, width, height); 

    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            
            if (distance < 100) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                
                const opacity = 1 - (distance / 100);
                ctx.strokeStyle = `rgba(168, 85, 247, ${opacity * 0.3})`; 
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }

        
        if (mouse.x != null && mouse.y != null) {
            const dxMouse = particles[i].x - mouse.x;
            const dyMouse = particles[i].y - mouse.y;
            const distanceMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

            if (distanceMouse < 180) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                const opacityMouse = 1 - (distanceMouse / 180);
                ctx.strokeStyle = `rgba(56, 189, 248, ${opacityMouse * 0.4})`; 
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}
animate();

document.addEventListener('DOMContentLoaded', ()=>{
    fijarNavegacion();
    crearGaleria();
    restaltarNavegacion();
    scrollNav();
})
function fijarNavegacion(){
    const header = document.querySelector('.header');
    const festival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', ()=>{  
        if(festival.getBoundingClientRect().bottom < 1){
            header.classList.add('fixed');
            return;
        }
            header.classList.remove('fixed');
    })
}
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');
    let cantImg = 9
    for( let i = 1; i <= cantImg; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = 'Imagen Galeria';

        //Event Handler
        imagen.onclick = function(){
            mostrarModal(i)
        }

        galeria.appendChild(imagen);
    }
}
function mostrarModal(i){
    const modal = document.createElement('DIV');
    const x = document.createElement('P');
    const body = document.querySelector('body');
    const imagen = document.createElement('IMG');

    x.textContent = 'X';
    x.classList.add('cerrar');

    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = 'Imagen Galeria';

    imagen.classList.add('contenedor');

    modal.classList.add('modal');

    modal.appendChild(imagen)
    modal.appendChild(x)

    body.classList.add('overflow-hidden');
    body.appendChild(modal);
    

    modal.onclick = eliminarModal
}
function eliminarModal(){
    const modal = document.querySelector('.modal');
    const body = document.querySelector('body');

    modal?.remove();
    body.classList.remove('overflow-hidden');
}
function restaltarNavegacion(){
    document.addEventListener('scroll', ()=>{
        const sections = document.querySelectorAll('section');//Nos trae un arreglo de sections
        const navEnlace = document.querySelectorAll('.navegacion-principal a');
    
        let actual = '';
        sections.forEach(section =>{
            const sectionTop = section.offsetTop;//Distancia del section al body
            const sectionHeight = section.clientHeight;//tamaño de la altura del section

            if(window.scrollY >= (sectionTop - sectionHeight / 3)){
                actual = section.id;
            }//2177 >= 1419 - 1685 / 3 
        });
        navEnlace.forEach(enlace =>{
            enlace.classList.remove('active');
            if(enlace.getAttribute('href') === '#' + `${actual}`){
                enlace.classList.add('active');
            }
        });
    })

}
function scrollNav(){
    const navLinks = document.querySelectorAll('.navegacion-principal a');
    navLinks.forEach(link =>{
        link.addEventListener('click', e=>{
            e.preventDefault();
            const sectionScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionScroll);
            section.scrollIntoView({behavior: 'smooth'});
        })
    })
}


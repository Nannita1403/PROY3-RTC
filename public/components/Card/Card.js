import './Card.css';

// Func crear y exporto la seccion de la Galeria
export const section = document.querySelector('.gallery');

// Func = creo y exporto muestra img random 
export const showGallery = async () => {
    return new Promise(async (resolve) => {
        try {
            // Obtener imágenes desde API de Unsplash
            const response = await fetch("https://api.unsplash.com/photos/random?client_id=Apv4rswnoZ0Lp7xGFFJbnS520XpHA1J1dCSILs53y64&count=30");
            const res = await response.json();

            // Creación de img y contenedor
            const imgElements = [];
            for (const c of res) {
                const imageDiv = document.createElement('div')
                const img = document.createElement("img");
                // console.log(c);

                // Configurar la img y el contenedor
                img.classList.add('photo')
                img.src = c.urls.small;
                img.alt = c.alt_description;
                
                //Carga de todas las imágenes
                imageDiv.classList.add('imgContainer');
                imageDiv.appendChild(img);
                section.appendChild(imageDiv);
                imgElements.push(img);
            }
            
            // Func = Inicio de Masonry 
            function initializeMasonry() {
                const masonry = new Masonry('.gallery', {
                    itemSelector: '.imgContainer',
                    isFitWidth: true,
                    gutter: 0
                });
            }

            // Contar las imágenes que están cargadas
            let imgsLoaded = 0;
            imgElements.forEach(img => {
                img.addEventListener('load', () => {
                    imgsLoaded++;
                    if (imgsLoaded === imgElements.length) {
                        initializeMasonry(); // Inicializar Masonry
                        resolve();  // Resuelve la promesa después de cargar las imágenes
                    }
                });
            });
        } catch (error) {
            console.log(error);
            resolve();  
        }
    });
};

export default showGallery;

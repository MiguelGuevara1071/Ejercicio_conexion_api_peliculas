let pagina = 1;
const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');

btnSiguiente.addEventListener('click', () =>{
    if(pagina < 1000){
        pagina++;
        //console.log(pagina);
        cargarPeliculas(pagina);
    }
});

btnAnterior.addEventListener('click', () =>{
    if(pagina > 1){
        pagina--;
        //console.log(pagina);
        cargarPeliculas(pagina);
    }
});

const cargarPeliculas = async(pagina=1) => {

    try{
        const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=f599dd1b3527eaf1f238625ffa3e09ef&page=${pagina}`);
        const datos = await respuesta.json();

        if(respuesta.status === 200){
            let peliculas = '';
            datos.results.forEach(pelicula => {
                peliculas = peliculas + `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}">
                    <h2>${pelicula.title}</h2>
                </div>`
                // console.log(pelicula.title);
                
                document.getElementById('contenedor').innerHTML = peliculas;
            });
        } else if(respuesta.status === 401){
            console.log('La api key no es correcta');
        } else if(respuesta.status === 404){
            console.log('La pelicula no existe');
        } else {
            console.log('Error no identificado');
        }
    } catch (error) {
        console.log(error);
    }
}

cargarPeliculas();


const mainHTML = document.getElementById('main')
const conteinerPokemon = document.getElementById('container-pokemons');
const getPokemons = async function(){

    const url = `./js/data/pokemon.json`;
    // url del recurs (pot ser una petició http/https)
    
    try{
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        
        //Formulari para buscar un pokemon especifico
        const formulariBuscaPokemon = document.createElement('form');
        formulariBuscaPokemon.textContent='Buscador de Pokemons'
        formulariBuscaPokemon.id='formulari-pokemon'
        conteinerPokemon.appendChild(formulariBuscaPokemon);

        //Insert Before sive para cambiar el orden i hacer que en vez de unirse como el ultimo se una como el primero
        // conteinerPokemon.insertBefore(formulariBuscaPokemon, tarjetaPokemon)
        const buscarFormulariNom = document.createElement('input');
        formulariBuscaPokemon.appendChild(buscarFormulariNom);
        buscarFormulariNom.id='idBuscarPokemon'

        const buscarFormulariType = document.createElement('input');
        formulariBuscaPokemon.appendChild(buscarFormulariType);
        buscarFormulariNom.id='nameBuscarPokemon'

        const buscarFormulariNum = document.createElement('input');
        formulariBuscaPokemon.appendChild(buscarFormulariNum);
        buscarFormulariNom.id='numBuscarPokemon'

        //Boton para ordenar por nombre orden ascente i descendiente
        const buttonOrdreNombre = document.createElement('button');
        buttonOrdreNombre.textContent='Ordenar por nombre';
        formulariBuscaPokemon.appendChild(buttonOrdreNombre);
        
        if (data) {
            // Si entra a aqui vol dir que ha pogut carregar tota la informació,
            // verifiqueu que veieu les dades per consola abans de fer res 
            console.log(data);
            data.pokemon.forEach((p) =>{
                mostrarPokemons(p);
                buscarFormulariNom.addEventListener('input', function() { //Input mira el que esta escribent l'usuari constantment
                    buscarPokemonsFormulari
                (!p.name.toUpperCase().includes(buscarFormulariNom.value.toUpperCase()),p);      
                });

                buscarFormulariType.addEventListener('input', function() { //Input mira el que esta escribent l'usuari constantment
                    var teTipus = false
                    p.type.forEach((tipos) => {
                        if(tipos.toUpperCase().includes(buscarFormulariType.value.toUpperCase()) && !teTipus){
                            teTipus = true
                        } 
                        buscarPokemonsFormulari
                    (!teTipus,p);
                    });
                });

                buscarFormulariNum.addEventListener('input', function() { //Input mira el que esta escribent l'usuari constantment
                    buscarPokemonsFormulari
                (!p.num.includes(buscarFormulariNum.value),p);
                });
                
            });
        } else {
            console.log("No hi ha cap pokemon");
        }
    }
    catch(error) {
        console.error("Error en obtenir les dades dels pokemons:", error);
      } 
}
getPokemons();

function mostrarPokemons(numeroOrdre){ //Creem una funcio que mostrara per pantalla i fem el mateix cambiant una mica a la resta
    //Creem el article on anira cada pokeon individualment
    const tarjetaPokemon=document.createElement('article');
    tarjetaPokemon.className='pokemon-card';
    tarjetaPokemon.id = numeroOrdre.name
    
    const imgPokemon = document.createElement('img');
    imgPokemon.className='img-card';
    imgPokemon.src = numeroOrdre.img;

    const namePokedexPokemon = document.createElement('p');
    namePokedexPokemon.className='name-pokedex';
    namePokedexPokemon.textContent = numeroOrdre.name;

    const numPokedexPokemon = document.createElement('p');
    numPokedexPokemon.className='num-pokedex';
    numPokedexPokemon.textContent = numeroOrdre.num;

    const typePokemon = document.createElement('p');
    typePokemon.className='pokemon-type';
    typePokemon.textContent = numeroOrdre.type;

    tarjetaPokemon.appendChild(imgPokemon);
    tarjetaPokemon.appendChild(numPokedexPokemon);
    tarjetaPokemon.appendChild(namePokedexPokemon);
    tarjetaPokemon.appendChild(typePokemon);
    conteinerPokemon.appendChild(tarjetaPokemon);
}
function buscarPokemonsFormulari(condicio, numeroOrdre){
    const eliminarPokemons = document.getElementById(numeroOrdre.name);
    if (condicio) {
        eliminarPokemons.style.display = 'none';
    }else{
        eliminarPokemons.style.display = 'flex';
    }
}

    


const pokemonName =document.querySelector('.pokemon_name');
const pokemonNumber =document.querySelector('.pokemon_number');
const pokemonImage =document.querySelector('.pokemon_image');

const form =document.querySelector('.form');
const input =document.querySelector('.input_search');
const buttonPrev =document.querySelector('.btn-prev');
const buttonNext =document.querySelector('.btn-next');
/*Variable global */
let searchPokemon = 1;

const fetchPokemon = async (pokemon)=>{
    /*await en funcion asincrona */
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        /*console.log(data); En vez de console.log uso return*/
        return data;
    }
}

const renderPokemon = async (pokemon)=>{
    /*Cuando cambia de un pokemon a otro sale loadig antes de pasar a otro */
    pokemonName.innerHTML = 'Loading...';
    /*Lo mismo que de arriba pero con numeros */
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    /*Pregunta si se encuentra o no el pokemon ingesado */
    if(data){
        pokemonImage.style.display = 'block';
        /*console.log(data);*/
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        /*La direccion para llegar a la imagen animada en pokeapi */
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        input.value = '';

        /*Si no se encotro el pokemon va por el else */
    }else{
        /*Si no se encontro, borra el imagen anterior */
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'No found :c';
        /*Lo mismo que de arriba pero cuando ingresa un numero que no existe*/
        pokemonNumber.innerHTML = '';

    }
}
 
/*25 de pikachu */
/*fetchPokemon('25');*/
/*renderPokemon('130');*/

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    /*console.log(input.value); Va tomando los valores*/
    /*Toma el valor en numeros o nombres y convierte en imagenes */ 
    renderPokemon(input.value.toLowerCase());
    /*toLowerCase hace que pueda ingresar en minuscula o mayuscula,o todo mezclado */
});

buttonPrev.addEventListener('click', ()=>{
    /*Va decrementando en uno y pasa al anterior pokemon */
    if(searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    } 
});

buttonNext.addEventListener('click', ()=>{
    /*Va incrementando en uno y pasa al siguiente pokemon */
    
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

/*Para que aparezca el primer pokemon al inicio */
renderPokemon(searchPokemon);

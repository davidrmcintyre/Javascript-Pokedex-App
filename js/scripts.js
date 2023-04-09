//IIFE STARTS
let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  
  // Adds pokémon to the list if it's an object with specific keys
  function add(pokemon){ 
    if (typeof pokemon === 'object' &&
       'name' in pokemon &&
       'detailsUrl' in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log('Invalid Pokémon');
    }
  }
  
  //Retrieves list
  function getAll(){ 
    return pokemonList;
  }
  
  //Creates list items for each pokemon and turns them into buttons
  function addPokemonItem(pokemon){ 
    let pokemonListAdd = document.querySelector('.pokemon-list');
    let pokemonItem = document.createElement('li');
    pokemonItem.classList.add('list-group-item');

    let pokemonButton = document.createElement('button');
    pokemonButton.classList.add('pokemon-button');

    //add the bootstrap btn class and sets the data toggle and target attributes.

    pokemonButton.classList.add('btn');
    pokemonButton.setAttribute('data-toggle', 'modal');
    pokemonButton.setAttribute('data-target', '#bootstrapModal');

    //Assigns the pokemons name to the button

    pokemonButton.innerText = pokemon.name;

    //Appends the Item and the pokemon list to the button.

    pokemonItem.appendChild(pokemonButton);
    pokemonListAdd.appendChild(pokemonItem);

    //Logs pokémon details when their button is clicked
    pokemonButton.addEventListener('click', function() {
      showDetails(pokemon);
    });
};

  //Logs pokémon details in the modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function(){
      showModal(pokemon);
    });
  }

  // Loads the list of pokemon and enables the loading message
  function loadList() {
    let listLoader = document.getElementById("loading-message");
    listLoader.removeAttribute('hidden');

    return fetch(apiUrl)
    .then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };

        add(pokemon);

        listLoader.setAttribute('hidden', '');
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //uses fetch to provide the pokemon details

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
    .then(function(response){
      return response.json();
    }).then(function(details){
      // Adds pokémon details to item
      item.id = details.id;
      item.imageUrl = details.sprites.other.dream_world.front_default; //selected a better imageURL for improved look
      item.height = details.height;
      item.types = details.types;
      item.abilities = details.abilities;
    }).catch(function(e){
      console.error(e);
    });
  }

  //Displays modal
  function showModal(item) {
    pokemonRepository.loadDetails(item).then(function () {
  
      //Assigns pokemon details to their classes
      let pokemonImage = document.querySelector('.pokemon-image');
      pokemonImage.src = item.imageUrl;
      
      let pokemonId = document.querySelector('.pokemon-id');
      pokemonId.innerText = '#' + item.id;
  
      let pokemonName = document.querySelector('.pokemon-name');
      pokemonName.innerText = item.name;
  
      let pokemonHeight = document.querySelector('.pokemon-height');
      pokemonHeight.innerText = '> ' + (item.height/10) + ' m';
  
      let itemTypes = "";
      item.types.forEach(function(types) {
        itemTypes += ["<li>" + types.type.name + "</li>"];
      });
      let pokemonTypes = document.querySelector('.pokemon-types');
      pokemonTypes.innerHTML = itemTypes;

      //decided to add pokemon abilites to the pokedex, may remove later.

      let itemAbilities = "";
      item.abilities.forEach(function(abilities) {
        itemAbilities += ["<li>" + abilities.ability.name + "</li>"];
      });
      let pokemonAbilities = document.querySelector('.pokemon-abilities');
      pokemonAbilities.innerHTML = itemAbilities;
  
      // Add swipe functionality (primarily for mobile)
      let startX;
      let modalContainer = document.querySelector('.modal-content');
      modalContainer.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
      }, false);
  
      modalContainer.addEventListener('touchmove', function(e) {
        e.preventDefault();
      }, false);
  
      modalContainer.addEventListener('touchend', function(e) {
        let endX = e.changedTouches[0].clientX;
        let diffX = startX - endX;
        if (diffX > 40) { // adjust this value after testing if needed
          // swipe left
          showNextPokemon();
        } else if (diffX < -40) { // adjust this value as after testing if needed
          // swipe right
          showPreviousPokemon();
        }
      }, false);
  
      // function to show next pokemon
      function showNextPokemon() {
        let currentIndex = pokemonRepository.getAll().indexOf(item);
        if (currentIndex === pokemonRepository.getAll().length - 1) {
          currentIndex = 0;
        } else {
          currentIndex++;
        }
        item = pokemonRepository.getAll()[currentIndex];
        showModal(item);
      }
  
      // function to show previous pokemon
      function showPreviousPokemon() {
        let currentIndex = pokemonRepository.getAll().indexOf(item);
        if (currentIndex === 0) {
          currentIndex = pokemonRepository.getAll().length - 1;
        } else {
          currentIndex--;
        }
        item = pokemonRepository.getAll()[currentIndex];
        showModal(item);
      }
  
    });
  }
  //Modal ends

  //Matches search input to pokemon name and hides buttons not matching
  function searchPokemon() {
    let searchInput = document.getElementById('search-input');
    let searchText = searchInput.value.toLowerCase();
    let allPokemon = document.querySelectorAll('.list-group-item');

    allPokemon.forEach(function(pokemon) {
      let pokemonText = pokemon.querySelector('.pokemon-button').innerText.toLowerCase();
      let searchList = document.querySelector('.pokemon-list');

      if (pokemonText.includes(searchText)) {
        searchList.classList.add('search-list');
        pokemon.style.display = 'inline-block';
      } else {
        pokemon.style.display = 'none';
      }

      if (!searchInput.value) {
        searchList.classList.remove('search-list');
      }

    });
  }  

  //Triggers search function as input is typed
  let searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function () {
    searchPokemon();
  });
  
  //Makes functions accessible outside IIFE
  return {
    add,
    getAll,
    addPokemonItem,
    loadList,
    loadDetails, 
    showModal,
  };
})(); //IIFE ENDS

//Displays pokemon list by loading list, then calling getAll & forEach functions and returning created items
pokemonRepository.loadList().then(function(){
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addPokemonItem(pokemon)
  });
});
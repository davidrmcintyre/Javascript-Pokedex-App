//this is the first JS file I have made.

let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";
    let currentPokemonIndex;

    function add(pokemon) {
        if (
            typeof pokemon === "object" &&
            "name" in pokemon 
        ) {
            pokemonList.push(pokemon);
        } else {
            console.log("Invalid pokemon object");
        }
    }

    function getAll() {
        return pokemonList;
    }

    function findByName(name) {
        return pokemonList.filter(function(pokemon) {
            return pokemon.name === name;
        });
    }

    // add a findByType and a findByHeight function later.

    

    function addListItem(pokemon) {
        let ul = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('my-button');
        listItem.appendChild(button);
        ul.appendChild(listItem);
        button.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
      showLoadingMessage();
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          pokemonRepository.add(pokemon);
        });
        renderPokemonList(pokemonRepository.getAll());
      }).catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      })
    }
    

      function loadDetails(item) {
          showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            hideLoadingMessage();
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
            hideLoadingMessage();
          console.error(e);
        });
      }

    let modalContainer = document.querySelector("#modal-container");
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          let modalCloseButton = document.querySelector(".modal-close");
          let imageContainer = document.querySelector("#image-container");
          let pokemonImage = document.createElement("img");
          pokemonImage.classList.add('pokemon-image')
          let modalTitle = document.querySelector("#modal-title");
          let modalText = document.querySelector("#modal-text");
          modalContainer.classList.add("is-visible");
          modalCloseButton.addEventListener("click", closeModal);
          modalTitle.innerText = pokemon.name;
          let typeNames = pokemon.types.map(typeObj => typeObj.type.name);
          modalText.innerText = "Height: " + pokemon.height + " " + "Type: " + typeNames.join(", ");
          pokemonImage.src = pokemon.imageUrl;
          imageContainer.innerHTML= '';
          imageContainer.appendChild(pokemonImage);
    
          modalContainer.addEventListener("click", (e) => {
            let target = e.target;
            if (target === modalContainer) {
              closeModal();
            }
          });
    
          window.addEventListener("keydown", (e) => {
            if (
              e.key === "Escape" &&
              modalContainer.classList.contains("is-visible")
            ) {
              closeModal();
            }
          });
    
          // Add swipe functionality
          let startX;
          modalContainer.addEventListener('touchstart', function(e) {
              startX = e.touches[0].clientX;
          }, false);
    
          modalContainer.addEventListener('touchmove', function(e) {
              e.preventDefault();
          }, false);
    
          modalContainer.addEventListener('touchend', function(e) {
              let endX = e.changedTouches[0].clientX;
              let diffX = startX - endX;
              if (diffX > 40) { // adjust this value as needed
                  // swipe left
                  showNextPokemon();
              } else if (diffX < -40) { // adjust this value as needed
                  // swipe right
                  showPreviousPokemon();
              }
          }, false);
    
          currentPokemonIndex = pokemonList.findIndex(p => p.name === pokemon.name);
        });
      }

      function showNextPokemon() {
        if (currentPokemonIndex < pokemonList.length - 1) {
            let nextPokemon = pokemonList[currentPokemonIndex + 1];
            showDetails(nextPokemon);
        }
    }

    function showPreviousPokemon() {
        if (currentPokemonIndex > 0) {
            let previousPokemon = pokemonList[currentPokemonIndex - 1];
            showDetails(previousPokemon);
        }
    }

      function closeModal() {
        let modalContainer = document.querySelector("#modal-container");
        modalContainer.classList.remove("is-visible");
      }

      function showLoadingMessage() {
        let loadingElement = document.createElement('div');
        loadingElement.classList.add('loading-message');
        loadingElement.innerText = 'Loading...';
        document.body.appendChild(loadingElement);
      }
    
      function hideLoadingMessage() {
        let loadingElement = document.querySelector('.loading-message');
        if (loadingElement) {
          loadingElement.remove();
        }
      }

      let searchInput = document.querySelector('#search');
searchInput.addEventListener('input', function() {
  let searchTerm = searchInput.value.toLowerCase();
  let pokemonList = pokemonRepository.getAll();
  let filteredList = pokemonList.filter(function(pokemon) {
    return pokemon.name.toLowerCase().includes(searchTerm);
  });
  renderPokemonList(filteredList);
});

function renderPokemonList(pokemonList) {
  let ul = document.querySelector('.pokemon-list');
  ul.innerHTML = '';
  pokemonList.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
}


      return {
        add: add,
        getAll: getAll,
        findByName: findByName,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
      };
})();

console.log(pokemonRepository.getAll());

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });
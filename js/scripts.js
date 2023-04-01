//this is the first JS file I have made.

let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

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
            add(pokemon);
          });
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

      function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          console.log(pokemon);
        });
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



//when using .join I found that the types must be in an array in order to avoid a console error.

/* This is no longer needed as it is now in the IIFE as the addListItem

pokemonRepository.getAll().forEach(function(pokemon) {
    let ul = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('my-button');
    listItem.appendChild(button);
    ul.appendChild(listItem);
});

//This creates the for loop to display the pokemon in the pages DOM.

/* for (let i = 0; i < pokemonList.length; i++) {
document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>");
} */

// Commented out the original loop

/* Created a new variable for the text that will be displayed "let pokemonText" and 
used this to add a <p> element</p> to the display to help with styling
used and if loop without the else statement to only dispplay the height related 
text for a single pokemon. */

//for (let i = 0; i < pokemonList.length; i++) {
  //  let pokemonText = '<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')';
    //if (pokemonList[i].height > 1.8) {
      //  pokemonText += ' - wow that is big';
    //}
    //pokemonText += '</p>';
    //document.write(pokemonText);
//}

//pokemonList.forEach(function(pokemon){
    //document.write(pokemon.name + ' is a ' + pokemon.type + ' type pokemon ' + 'and is ' + pokemon.height + ' tall ' + '<br>')
  //})
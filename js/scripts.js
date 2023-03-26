//this is the first JS file I have made.

let pokemonRepository = (function() {
    let pokemonList = [
        {name:'Bulbasaur', height:'0.7', type:['Grass', 'Poison']},
        {name:'Ivysaur', height:'1', type: ['Grass', 'Poison']},
        {name:'Venusaur', height:'2', type: ['Grass', 'Poison']},
        {name:'Charmander', height:'0.6', type:'Fire'},
        {name:'Charmeleon', height:'1.1', type:'Fire'},
        {name:'Charizard', height:'1.7', type:['Fire', 'Flying']}
    ];

    function add(pokemon) {
        let expectedKeys = ['name', 'height', 'type'];
        let objectKeys = Object.keys(pokemon);
        if (typeof pokemon === 'object' &&
            objectKeys.length === expectedKeys.length &&
            objectKeys.every(function(key) {
                return expectedKeys.includes(key);
            })) {
            pokemonList.push(pokemon);
        } else {
            console.log('Invalid Pokémon object');
        }
    }

    function getAll() {
        return pokemonList;
    }

    return {
        add: add,
        getAll: getAll
    };
})();

let pokemonList1 = [
    {name:'Squirtle', height:'0.5', type:'Water'},
    {name:'Wartorle', height:'1.0', type:'Water'},
    {name:'Blastoise', height:'1.6', type:'Water'},
    {name:'Caterpie', height:'0.3', type:'Bug'},
    {name:'Metapod', height:'0.7', type:'Bug'},
    {name:'Butterfree', height:'1.1', type:['Bug', 'Flying']}
];

pokemonList1.forEach(function(pokemon) {
    pokemonRepository.add(pokemon);
});

pokemonRepository.getAll().forEach(function(pokemon) {
    document.write('<p>Name: ' + pokemon.name + '</p>');
    document.write('<p>Height: ' + pokemon.height + '</p>');
    document.write('<p>Type: ' + pokemon.type + '</p>');
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
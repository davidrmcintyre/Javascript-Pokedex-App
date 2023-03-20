//this is the first JS file I have made.

let pokemonList = [{name:'Bulbasaur', height:'0.7', type:['Grass, Poison'] },
                    {name:'Ivysaur', height:'1', type: ['Grass, Poison']},
                    {name:'Venusaur', height:'2', type: ['Grass, Poison']},
                    {name:'Charmander', height:'0.6', type:'Fire'},
                    {name:'Charmeleon', height:'1.1', type:'Fire'},
                    {name:'Charizard', height:'1.7', type:['Fire, Flying']}]

//This creates the for loop to display the pokemon in the pages DOM.

/* for (let i = 0; i < pokemonList.length; i++) {
document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>");
} */

// Commented out the original loop

/* Created a new variable for the text that will be displayed "let pokemonText" and 
used this to add a <p> element</p> to the display to help with styling
used and if loop without the else statement to only dispplay the height related 
text for a single pokemon. */

for (let i = 0; i < pokemonList.length; i++) {
    let pokemonText = '<p>' + pokemonList[i].name + ' (height: ' + pokemonList[i].height + ')';
    if (pokemonList[i].height > 1.8) {
        pokemonText += ' - wow that is big';
    }
    pokemonText += '</p>';
    document.write(pokemonText);
}
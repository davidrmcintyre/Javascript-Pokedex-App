//this is the first JS file I have made.

let pokemonList = [{name:'Bulbasaur', height:'0.7m', type:['Grass, Poison'] },
                    {name:'Ivysaur', height:'1m', type: ['Grass, Poison']},
                    {name:'Venusaur', height:'2m', type: ['Grass, Poison']},
                    {name:'Charmander', height:'0.6m', type:'Fire'},
                    {name:'Charmeleon', height:'1.1m', type:'Fire'},
                    {name:'Charizard', height:'1.7m', type:['Fire, Flying']}]

//This creates the for loop to display the pokemon in the pages DOM.

for (let i = 0; i < pokemonList.length; i++) {
document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ")<br>");
}
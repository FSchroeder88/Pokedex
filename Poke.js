let maxPokemon = 152;
let names = [];
let currentPokemon = [];

async function loadPokemon(i) {
    for (let i = 1; i < maxPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let pokemonAsJson = await response.json();

        currentPokemon.push(pokemonAsJson);
        console.log(pokemonAsJson);
        renderPokemonInfo(pokemonAsJson);
    }
}

async function renderPokemonInfo(pokemonAsJson) {
    let name = pokemonAsJson['name'];
    let pokeNumber = pokemonAsJson['id'];
    let type = pokemonAsJson['types'][0]['type']['name'];
    let pokemonPicture = pokemonAsJson['sprites']['other']['official-artwork']['front_default'];

    names.push(name);

    let content = document.getElementById('pokemonCard');

    content.innerHTML += `
    <div onclick="openStats(${pokemonAsJson.id})" class="pokeCard" id="pokeCard${pokemonAsJson.id}">
        <h2 id="pokemonName">${name}</h2>
        <span class="NrType"> # ${pokeNumber}</span> 
        <img class="pokemonpicture" id="pokemonPicture" src="${pokemonPicture}">
        <span class="NrType">${type}</span>
    </div>`;
    document.getElementById(`pokeCard${pokemonAsJson.id}`).style.backgroundColor = getColor(type);
}

function searchNames() {
    let searchInput = document.getElementById('searchInput').value;
    searchInput = searchInput.toLowerCase();
    console.log(searchInput);

    let filteredPokemons = currentPokemon.filter(pokemon => pokemon.name.startsWith(searchInput));
    let content = document.getElementById('pokemonCard');
    content.innerHTML = '';
    for (let i = 0; i < filteredPokemons.length; i++) {
        renderPokemonInfo(filteredPokemons[i]);
    }
}

function openStats(pokeId) {
    let pokemon = currentPokemon.find(p => p.id === pokeId);
    let statsType = pokemon['types'][0]['type']['name'];
    let content = document.getElementById('pokemonStats');
    let pokeDex = document.getElementById('pokemonCard');

    pokeDex.classList.add('d-none');
    content.classList.remove('d-none');
    content.innerHTML = '';

    content.innerHTML = `
    <div class="pokemonStats" id="pokemonStatsChild1">
        <div class="pokemonStatsChild" id="pokemonStatsChild">

            <div class="Back" onclick="Back()"> &#129044 </div>

            <h2 id="pokemonName" style="margin: 0;">${pokemon['name']}</h2>
            <span class="NrType"># ${pokemon['id']}</span>
            <span class="NrType">${pokemon['types'][0]['type']['name']}</span>
            <img class="pokemonpicture" id="pokemonPicture" src="${pokemon['sprites']['other']['official-artwork']['front_default']}">
        </div>

        <div class="stats">
            <div class="details abilityBorder">
                <span class="abilityTitle">abilities:</span>
                <span id="abilities${pokeId}"></span>
            </div>
                
            <div class="border">
            <div class="details">
                <span> ${pokemon['stats'][0]['stat']['name']}</span>
                <span>${pokemon['stats'][0]['base_stat']}</span>
            </div>

            <div class="details">
                <span>${pokemon['stats'][1]['stat']['name']}</span>
                <span>${pokemon['stats'][1]['base_stat']}</span>
            </div>

            <div class="details">
                <span>${pokemon['stats'][2]['stat']['name']}</span>
                <span>${pokemon['stats'][2]['base_stat']}</span>
            </div>

            <div class="details">
                <span>${pokemon['stats'][3]['stat']['name']}</span>
                <span>${pokemon['stats'][3]['base_stat']}</span>
            </div>

            <div class="details">
                <span>${pokemon['stats'][4]['stat']['name']}</span>
                <span>${pokemon['stats'][4]['base_stat']}</span>
            </div>

            <div class="details">
                <span>${pokemon['stats'][5]['stat']['name']}</span>
                <span>${pokemon['stats'][5]['base_stat']}</span>
            </div>
            </div>
        <div>
    </div>`;
    document.getElementById('pokemonStatsChild').style.backgroundColor = getColor(statsType);
    renderAbilities(pokemon);
}

function renderAbilities(pokemon) {
    for (let i = 0; i < pokemon['abilities'].length; i++) {
        let ability = pokemon['abilities'][i]['ability']['name'];
        document.getElementById('abilities' + pokemon.id).innerHTML += `<span class="abilityClass">${ability}</span>`;
    }
}

function Back() {
    if (document.getElementById('pokemonStatsChild1')) {
        
        var pokemonStatsChild1 = document.getElementById('pokemonStatsChild1');
        pokemonStatsChild1.parentNode.removeChild(pokemonStatsChild1); // Hier wird das Elternteil wieder zurück gegeben und das Kind gelöscht, in diesem Fall pokemonStatsChild1
    }    
    //document.getElementById('pokemonStats').classList.add('d-none');
    document.getElementById('pokemonCard').classList.remove('d-none');
    document.getElementById('pokemonStats').classList.add('d-none');
    
}

function getColor(type) {
    if (type == 'grass') {
        return '#94C9AD';
    } else if (type == 'fire') {
        return '#F7786B';
    } else if (type == 'water') {
        return '#58ABF6';
    } else if (type == 'normal') {
        return '#a8a878';
    } else if (type == 'fighting') {
        return '#c03028';
    } else if (type == 'flying') {
        return '#a890f0';
    } else if (type == 'poison') {
        return '#a040a0';
    } else if (type == 'ground') {
        return '#e0c068';
    } else if (type == 'rock') {
        return '#b8a038';
    } else if (type == 'bug') {
        return '#a8b820';
    } else if (type == 'ghost') {
        return '#705898';
    } else if (type == 'steel') {
        return '#b8b8d0';
    } else if (type == 'fire') {
        return '#f08030';
    } else if (type == 'electric') {
        return '#f8d030';
    } else if (type == 'psychic') {
        return '#f85888';
    } else if (type == 'ice') {
        return '#98d8d8';
    } else if (type == 'dragon') {
        return '#7038f8';
    } else if (type == 'dark') {
        return '#705848';
    } else if (type == 'fairy') {
        return '#ee99ac';
    }
}

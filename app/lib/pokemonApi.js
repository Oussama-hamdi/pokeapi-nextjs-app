const POKEMON_API = "https://pokeapi.co/api/v2/";

// Get a list of the first 100 pokemon
export async function getPokemonList() {
  const response = await fetch(POKEMON_API + "pokemon?limit=500&offset=0");
  const data = await response.json();
  return data.results;
}

// Get a list of all the pokemon types
export async function getPokemonTypesList() {
  const response = await fetch(POKEMON_API + "type");
  const data = await response.json();
  return data.results;
}

// Get a list of pokemon by type
export async function getPokemonByType(typeName) {
  const response = await fetch(`${POKEMON_API}type/${typeName}`);
  const data = await response.json();
  return data.results;
}

export async function getPokemon(name) {
  // pokemon/ditto
  const response = await fetch(POKEMON_API + "pokemon/" + name);
  const data = await response.json();
  return data;
}

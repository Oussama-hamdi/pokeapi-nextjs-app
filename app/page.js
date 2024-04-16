import PokemonContainer from "./components/PokemonContainer";
import { getPokemonList, getPokemonTypesList } from "./lib/pokemonApi";

export default async function Home() {
  const pokemonList = await getPokemonList();
  const types = await getPokemonTypesList();

  return (
    <PokemonContainer
      getPokemonList={pokemonList}
      getPokemonTypesList={types}
    />
  );
}

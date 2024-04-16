import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PokemonCard from "./PokemonCard";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
`;

const Container = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const TypeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const TypeItem = styled.li`
  display: inline-block;
  margin: 5px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ active }) => (active ? "#f44336" : "#607d8b")};
  color: white;
  text-transform: capitalize;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ active }) => (active ? "#d32f2f" : "#455a64")};
  }
`;

const Heading = styled.h3`
  margin-bottom: 10px;
`;

const PokemonGrid = ({ getPokemonList, getPokemonTypesList }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  useEffect(() => {
    const searchFilter = (pokemonList) => {
      return pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchText.toLowerCase())
      );
    };

    const filteredPokemon = searchFilter(getPokemonList);
    setFilteredPokemonList(filteredPokemon);
  }, [getPokemonList, searchText]);

  const handleTypeClick = (type) => {
    setSelectedType(type);
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => {
        const pokemonOfType = data.pokemon.map((poke) => ({
          name: poke.pokemon.name,
          url: poke.pokemon.url,
        }));
        setFilteredPokemonList(pokemonOfType);
      })
      .catch((error) => {
        console.error("Error fetching Pokémon by type:", error);
      });
  };

  return (
    <main>
      <Container>
        <SearchInput
          type="text"
          placeholder="Pikachu, Charmander"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <Heading>Search by Types:</Heading>
        <TypeList>
          {getPokemonTypesList.map((type) => (
            <TypeItem
              key={type.name}
              onClick={() => handleTypeClick(type.name)}
              active={selectedType === type.name}
            >
              {type.name}
            </TypeItem>
          ))}
        </TypeList>
      </Container>
      <GridContainer>
        {filteredPokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </GridContainer>
    </main>
  );
};

export default PokemonGrid;

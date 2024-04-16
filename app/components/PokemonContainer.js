"use client";

import React from "react";
import styled from "styled-components";
import PokemonGrid from "./PokemonGrid";

const Container = styled.div`
  padding: 20px;
`;

const PokemonContainer = ({ getPokemonList, getPokemonTypesList }) => {
  return (
    <Container>
      <PokemonGrid
        getPokemonList={getPokemonList}
        getPokemonTypesList={getPokemonTypesList}
      />
    </Container>
  );
};

export default PokemonContainer;

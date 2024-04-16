import React from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledLink = styled.h3`
  text-decoration: none;
  color: #333;
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.3s ease;
  background-color: #eee;
  text-transform: capitalize;

  &:hover {
    border-color: #ccc;
    background-color: #f0f0f0;
  }
`;

const PokemonCard = ({ pokemon }) => {
  return (
    <Link href={pokemon.name} key={pokemon.name + "card"}>
      <StyledLink>{pokemon.name}</StyledLink>
    </Link>
  );
};

export default PokemonCard;

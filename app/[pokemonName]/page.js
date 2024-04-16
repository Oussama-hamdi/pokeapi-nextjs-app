"use client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getPokemon } from "../lib/pokemonApi";
import ApexCharts from "react-apexcharts";

const StyledMain = styled.main`
  text-align: center;
`;

const StyledPokemonImage = styled.img`
  width: 300px;
  height: 300px;
`;

const StyledStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledStatItem = styled.div`
  display: flex;
  align-items: center;
`;

const StyledStatName = styled.h3`
  padding: 1rem;
  width: 50%;
`;

const StyledProgressBar = styled.div`
  width: 200px;
  height: 20px;
  background-color: #ccc;
  border-radius: 10px;
  margin-left: 10px;
`;

const StyledProgressFill = styled.div`
  height: 100%;
  background-color: #4caf50;
  border-radius: 10px;
  width: ${(props) => props.value}%;
`;

const PokemonPage = ({ params }) => {
  const { pokemonName } = params;
  const [pokemonObject, setPokemonObject] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      const data = await getPokemon(pokemonName);
      setPokemonObject(data);
    };
    fetchPokemon();
  }, [pokemonName]);

  if (!pokemonObject) return <div>Loading...</div>;

  // Extracting data for ApexCharts
  const statsData = pokemonObject.stats.map((statObject) => {
    const { stat, base_stat } = statObject;
    const { name } = stat;
    return { name, base_stat };
  });

  const chartOptions = {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: statsData.map((stat) => stat.name),
    },
  };

  const chartSeries = [
    {
      name: "Stats",
      data: statsData.map((stat) => stat.base_stat),
    },
  ];

  return (
    <StyledMain>
      <h1
        style={{ fontSize: "2.5rem", fontWeight: "bold", paddingTop: "1rem" }}
      >
        {pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)}
      </h1>
      <div style={{ margin: "1rem 0" }}>
        <StyledPokemonImage
          src={pokemonObject.sprites.front_default}
          alt={pokemonName}
        />
      </div>
      <h3 style={{ fontSize: "1.5rem", margin: "-20px 0 30px" }}>
        Weight: {pokemonObject.weight}
      </h3>
      <StyledStatsContainer>
        {pokemonObject.stats.map((statObject) => {
          const { stat, base_stat } = statObject;
          const { name } = stat;

          return (
            <StyledStatItem key={name}>
              <StyledStatName>
                {name}: {base_stat}
              </StyledStatName>
              <StyledProgressBar>
                <StyledProgressFill value={base_stat} />
              </StyledProgressBar>
            </StyledStatItem>
          );
        })}
      </StyledStatsContainer>
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </StyledMain>
  );
};

export default PokemonPage;

"use client";
import styled from "styled-components";

// Define styled button component
const StyledBtn = styled.button`
  background-color: ${(props) => (props.red ? "red" : "blue")};
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  font-weight: 600;
  margin-top: 20px;
  transition: 0.3s;
  &:hover {
    transform: scale(1.1);
  }
`;

const FancyBtn = styled(StyledBtn)`
  background-image: linear-gradient(to right, #f6d365 0%, #fda085 100%);
`;

// Define the Home component
export default function Home() {
  return (
    <main>
      <h1>Pokemon</h1>
      <StyledBtn red={false}>Click me</StyledBtn>
      <br />
      <FancyBtn>Click me</FancyBtn>
    </main>
  );
}

import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from 'styled-components';
import PokemonElement from "../PokemonElement"


export interface Pokemon {
  name: string,
  url: string
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  background: #ccc;
  `

const Grid = styled.div`
  display: inline-grid;
  justify-content: center;
  grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
  max-width: 1024px;
  width: 100%;
  position: relative;

  @media only screen and (min-width: 800px){
    grid-template-columns:repeat(5, 1fr)
  }
`

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  gap: 20px;
  right: 0;
  left: 0;
  top: calc(100% + 20px);
`

const NextButton = styled.span`
  box-sizing: border-box;
  cursor: pointer;
  position:relative;
  display:block;
  width:100px;
  height: 100px;
  border: solid 6px #999;
  border-radius: 100%;
  z-index: 1;
  transition: all .2s linear;
  &:before, &:after{
    content:"";
    position: absolute;
    width:35%;
    height: 10%;
    top:41%;
    left:55%;
    background: #999;
    z-index: 2;
    transform: translate(-50%, -50%) rotate(45deg);
    transition: all .2s linear;
  }
  &:after{
    z-index: 3;
    top:59%;
    left:55%;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &:hover{
    border: solid 8px #777;
    &:after, &:before{
      background: #777;
    }
  }
  &:active{
    border: solid 8px #111;
    &:after, &:before{
      background: #111;
    }
  }
`


const PreviousButton = styled(NextButton)`
  transform: scale(-1, 1);
`

function Pokemons() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [pokemonList, setPokemonList] = useState([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const url = process.env.REACT_APP_API_URL

  const requestPokemons = async (endpoint: string) => {
    const result = await axios(endpoint);
    setPokemonList(result.data.results);
    setNextPage(result.data.next);
    setPreviousPage(result.data.previous);
  }

  useEffect(() => {
    if (url){
      requestPokemons(url)
    }
  }, []);

  const nextPokemons = () => {
    if(nextPage){
      requestPokemons(nextPage)
    }
  }

  const previousPokemons = () => {
    if(previousPage){
      requestPokemons(previousPage)
    }
  }

  return (
    <Container>
      <Grid>
        {pokemonList.map((pokemon: Pokemon, key) => {
          return <PokemonElement pokemon={pokemon} key={key} />
          // return <li onClick={()=>openPokemon(pokemon?.url)} key={key}>{pokemon?.name}</li>;
        })}
        <Buttons>
          <PreviousButton onClick={previousPokemons}></PreviousButton>
          <NextButton onClick={nextPokemons}></NextButton>
        </Buttons>
      </Grid>
    </Container>
  );
}

export default Pokemons;
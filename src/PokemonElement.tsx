import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  `

const Name = styled.div`
  text-transform: capitalize;
  font-size: 1em;
`

function PokemonElement(pokemon: any) {
  let navigate = useNavigate();
  console.log(pokemon)

  const url = pokemon.pokemon.url
  const [pokemonImg, setPokemonImg] = useState("")

  const requestPokemon = async (endpoint: string) => {
    const result = await axios(endpoint);
    setPokemonImg(result.data.sprites.front_default)
  }

  useEffect(() => {
    if (url){
      requestPokemon(url)
    }
  }, [pokemon]);

  const openPokemon = (url: string, name: string) => {
    navigate(`/pokemon/${name}`)
  }


  return (
    <Card onClick={()=>{openPokemon(pokemon.pokemon.url, pokemon.pokemon.name)}}>
      <img src={pokemonImg} alt="" />
      <Name>{pokemon.pokemon.name}</Name>
    </Card>
  )
}

export default PokemonElement
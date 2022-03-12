import React, { useState, useEffect } from 'react'
import axios from "axios";
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useParams } from "react-router-dom";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ccc;
  `

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 28rem;
  padding: 2rem 1rem;
  background: white;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  border-radius: 0.5rem;
  margin: 0 5rem;
  width: 100%;
`

const Back = styled.div`
display: inline-block;
transition: transform 250ms;
`
const BackWrap = styled.div`
  position: absolute;
  top: 0;
  left: 5px;
  padding: .5rem .7rem;
  color: black;
  &:hover ${Back}{
    transform: translate(-5px);
  }
`


const ImgContainer = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: end;
    margin-top: -6rem;
  }
`

const Img = styled.img`
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: 9999px;
  border-width: 2px;
  border-color: rgb(99 102 241);
  border-style: solid;
  background: white;
  `
const Title = styled.h2`
  color: rgb(31 41 55);
`

function Pokemon() {
  const [pokemonImg, setPokemonImg] = useState("")

  let { pokemonName } = useParams();
  let url ="https://pokeapi.co/api/v2/pokemon/" + pokemonName
  const firstLetter = pokemonName?.slice(0,1).toUpperCase()
  const pokemonCapitalize = firstLetter + "" + pokemonName?.slice(1)

  const requestPokemon = async (endpoint: string) => {
    const result = await axios(endpoint);
    setPokemonImg(result.data.sprites.front_default)
  }
  useEffect(() => {
    if (url){
      requestPokemon(url)
    }
  }, []);

  return (
    <Container>
      <Card>
        <Link to="/"><BackWrap><Back>&lt;</Back></BackWrap></Link>
        <ImgContainer>
          <Img src={pokemonImg} alt="" ></Img>
        </ImgContainer>
        <div>
          <Title>{pokemonCapitalize}</Title>
        </div>
        <div></div>
      </Card>
    </Container>
  )
}

export default Pokemon
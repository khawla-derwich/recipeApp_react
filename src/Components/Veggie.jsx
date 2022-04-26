import React from 'react'
import { useEffect, useState } from "react";
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/splide.min.css";
function Veggie() {
    const [veggie, setVeggie] = useState([])
    // as soon as the component get mounted, run getVeggie function
    useEffect(() => {
        getVeggie();
    }, [])
    // usning async : to be sure that i get data before rendering anything else 
    const getVeggie = async () => {
        // check if the local storage has data then we needn't to fetch the api again 
        const check = localStorage.getItem('veggie');
        if (check) {
            setVeggie(JSON.parse(check))
        } else {
            // ! NB : after using process.env , should restart the server  
            const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12&tags=vegetarian`);

            // format to json 
            const data = await api.json();
            // in local storage we can only save strings, then use JSON.stringify
            localStorage.setItem('veggie', JSON.stringify(data.recipes))
            setVeggie(data.recipes)
            console.log(data.recipes)
        }

    }
    return (
        <Wrapper>
            <h3>Vegetarian picks</h3>
            <Splide options={{
                perPage: 4,
                arrows: false,
                pagination: false,
                gap: "5rem"
            }}>
                {veggie.map((recipe) => {
                    return (
                        <SplideSlide key={recipe.id}>
                            <Card>
                                <h4> {recipe.title}</h4>
                                <img src={recipe.image} alt={recipe.title} />
                                <Gradient />
                            </Card>
                        </SplideSlide>
                    );
                })}
            </Splide>
        </Wrapper>
    )
}
const Wrapper = styled.div`margin: 4rem 0rem;`
const Card = styled.div`
    min-height:25rem;
    border-radius:2rem;
    overflow:hidden;
    position : relative;
    img{
        border-radius:2rem;
        position: absolute;
        left: 0;
        width: 100%;
        height:100%;
        object-fit : cover;

    }
    h4{
        position absolute;
        z-index : 10;
        left: 50%;
        bottom: 0%;
        transform: translate(-50%, 0%);
        color: white;
        width: 100%;
        font-weight: 600;
        text-align : center;
        font-size: 1rem;
        height :40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }`
const Gradient = styled.div`
    z-index: 3;
    position: absolute;
    width: 100%;
    height: 100%,
    background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0, 0.5))`

export default Veggie
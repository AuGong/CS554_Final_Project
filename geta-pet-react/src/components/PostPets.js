import React, {useState, useEffect} from 'react';
import './App.css';
import PetCard from './PetCard';
import {useQuery} from '@apollo/client';
import queries from '../queries';
import axios from 'axios';

const PostPets = (prop) =>{
    const [petsData,setPetsData] = useState([]);



    return(
        <form action={} onSubmit={} method="POST">
            <div>
                <input type = "text" placeholder='Our pet type' name="type" required></input>
            </div>
            <div>
                <input type = "text" placeholder='Pet name' name="name" required></input>
            </div>
            <div>
                <input type = "text" placeholder='Input pet photo link here' name='image' required></input>
            </div>
            <div>
                <button type="submit">
                    Submit
                </button>
            </div>


        </form>




    )

}
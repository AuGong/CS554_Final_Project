import React, {useState, useEffect} from 'react';
import {NavLink,useParams,Link} from 'react-router-dom';
import './App.css';
import PetCard from './PetCard';
import {useQuery} from '@apollo/client';
import queries from '../queries';
import axios from 'axios'




const Likes = (props) =>{
    const [petsData,setPets] = useState([])
}
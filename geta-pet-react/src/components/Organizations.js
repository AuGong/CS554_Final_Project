import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
/*import { useAuthentication } from "../firebase/AuthContext";
import { useNavigate, useParams } from "react-router-dom"; */
import queries from "../queries";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
import { Container, Button, Card, Col, Row } from "react-bootstrap";

const Organizations = () =>{
    const {loading, error, data} = useQuery(queries.GET_ORGANIZATIONS);
    if (data){
        console.log(data.orgList);
            return(
            <div class="col-sm-12 col-md-6 col-lg-4">
            {data.orgList.map((orgs) => {
            return (
            <div class="card" id="ideal_mirror_card">
                <div class="card-body">
                    <h2 class="card-title">{orgs.name}</h2>
                    {orgs.mission_statement && <p class="card-text">{orgs.mission_statement}</p>}
                    <ul class="list-group list-group-flush">
                        {orgs.email && <li class="list-group-item">Email: {orgs.email}</li>}
                        {orgs.phone && <li class="list-group-item">Phone: {orgs.phone}</li>}
                        {orgs.website && <li class="list-group-name">Website: {orgs.website}</li>}
                    </ul>
                </div>
            </div>
            )
        })}
        </div>);
    }else if(loading){
        return<div> Loading...</div>;
    }
    else{
        console.log(JSON.stringify(error));
        return <div>{error.message}</div>;
    }
}

export default Organizations;
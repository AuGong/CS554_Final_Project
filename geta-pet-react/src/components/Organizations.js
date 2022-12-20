import React from "react";
import { useQuery } from "@apollo/client";
import queries from "../queries";

import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";

const Organizations = () =>{
    const {loading, error, data} = useQuery(queries.GET_ORGANIZATIONS);
    if (data){
        console.log(data.orgList);
            return(
            <div className="row">
            {data.orgList.map((orgs, i) => {
            return (
              <div className="col-sm-12 col-md-6 col-lg-4" key={i}>
                <div
                  className="card mb-1 mt-2 ml-1 mr-1"
                  style={{ width: "350px", height: "500px" }}
                >
                  <div className="card-body">
                    <h2 className="card-title">{orgs.name}</h2>
                    {orgs.mission_statement && (
                      <p className="card-text">{orgs.mission_statement}</p>
                    )}
                    <ul className="list-group list-group-flush">
                      {orgs.email && (
                        <li className="list-group-item">Email: {orgs.email}</li>
                      )}
                      {orgs.phone && (
                        <li className="list-group-item">Phone: {orgs.phone}</li>
                      )}
                      {orgs.website && (
                        <li className="list-group-name">
                          Website: {orgs.website}
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            );
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
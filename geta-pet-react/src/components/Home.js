import React from "react";
//import * as Magick from "https://knicknic.github.io/wasm-imagemagick/magickApi.js";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap/dist/css/bootstrap.css";
const Home = () => {
  return(
    <div class="home">
        <h1>Welcome to Get a Pet!</h1>
        <br />
        <h2>There are thousands of stray pets in the US, and millions of animals in shelters, only half of which will ever get adopted. Make a difference for our friends, and adopt a pet today!</h2>
        <br />
        <div class="row">
          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card-body">
              <img class="card-img-top" src="https://images.unsplash.com/photo-1602205413206-abfd9bfe77fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="A man hugs a dog"/>
                <h3 class="card-title">
                  Want to help out more?
                </h3>
                <p class="card-text">
                  Get more involved in helping rescues and strays!
                </p>
                <a href="https://www.aspca.org/get-involved" class="btn btn-primary">Learn More</a>
              </div>
              
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card-body">
                <img class="card-img-top" src="https://images.unsplash.com/photo-1527617348299-5bc69da6500c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="Cat lying down"/>
                <h3 class="card-title">
                  Why Adopt?
                </h3>
                <p class="card-text">
                  Adopting an animal helps all animals in need of adoption
                </p>
                <a href="https://www.hhhstopeka.org/adopt/top-10-reasons-to-adopt-from-an-animal-shelter/" class="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-md-6 col-lg-4">
            <div class="card">
              <div class="card-body">
                <img class="card-img-top" src="https://images.unsplash.com/photo-1550791970-613acd0edf84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=386&q=80" />
                <h3 class="card-title">
                  I Want to Donate
                </h3>
                <p class="card-text">
                  Looking to donate but don't know where?
                </p>
                <a href="https://www.thesprucepets.com/best-animal-charities-4169337" class="btn btn-primary">Learn More</a>
              </div>
            </div>
          </div>
        </div>
        

        
    </div> 

  );

}

export default Home;

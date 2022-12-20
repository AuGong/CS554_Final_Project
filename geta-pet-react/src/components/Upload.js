import React, {useState,useRef } from "react";
import { useMutation } from "@apollo/client";
import { useAuthentication } from "../firebase/AuthContext";
import queries from "../queries";

import { Form, Button} from 'react-bootstrap';


const UploadPost = (props) => {
    const [submitting, setSubmitting] = useState(false);
    const [postPet,{loading, error }] = useMutation(queries.POST_PET);
    const { currentUser } = useAuthentication();
    const imageRef = useRef();
    const nameRef = useRef();
    const breedRef = useRef();
    const descriptionRef = useRef();
    const ageRef = useRef();
    const sizeRef = useRef();
    const genderRef = useRef();
    const contactRef = useRef();

    const handleSubmit = (event) => {
      event.preventDefault();
      let petAge = Number(ageRef.current.value)
      if(imageRef.current.value.trim().length===0) return alert("Don't be empty!")
      postPet({
        variables: {
          "image": imageRef.current.value, 
          "name": nameRef.current.value, 
          "breed": breedRef.current.value, 
          "description": descriptionRef.current.value, 
          "age": petAge, 
          "size":sizeRef.current.value, 
          "gender":genderRef.current.value, 
          "contact": contactRef.current.value,
          "userId": currentUser ? currentUser.uid : null,
        },
      });
      
    //   window.location.reload();
      setSubmitting(true);
  
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);
    };
  
    if(currentUser){
        if (loading) {
            return <div>Loading</div>;
        } else if (error) {
            return (
            <div>
            <div>{error.message}</div>
            <div className="App-button">
                <Button variant="primary" href="/newpost/">
                    New Post
                </Button>
                </div>
                </div>);
        }else{
    return (
        <div>
          {submitting &&
            <div>Submtting Form...</div>
          }
          <form onSubmit={handleSubmit}>
            <div className="App-form">
            <Form.Label htmlFor="url">Image URL</Form.Label>
              <Form.Control type="text" ref={imageRef} required>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Breed</Form.Label>
              <Form.Control type="text" ref={breedRef} required>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Description</Form.Label>
              <Form.Control type="text" ref={descriptionRef} required>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Age</Form.Label>
              <Form.Control type="number" ref={ageRef} required>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Size</Form.Label>
              <Form.Control type="text" ref={sizeRef} required>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Gender</Form.Label>
              <Form.Control type="text" ref={genderRef} required>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Contact</Form.Label>
              <Form.Control type="text" ref={contactRef} required>
              </Form.Control>
            </div>
            <br/>
            <div className="App-form">
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </form>
        </div>
      );}
        }else{return(
            <div>
                Please log in first!
            </div>
        )}

}

export default UploadPost;
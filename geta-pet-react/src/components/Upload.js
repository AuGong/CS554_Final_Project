import React, { useReducer, useState } from "react";
import { useMutation } from "@apollo/client";
import { useAuthentication } from "../firebase/AuthContext";
import queries from "../queries";

import { Form, Button} from 'react-bootstrap';

const formReducer = (state, event) => {
    return {
      ...state,
      [event.name]: event.value
    }
}

const UploadPost = (props) => {
    const [formData, setFormData] = useReducer(formReducer, {});
    const [submitting, setSubmitting] = useState(false);
    const [postPet] = useMutation(queries.POST_PET);
    const { currentUser } = useAuthentication();
  
    const handleSubmit = (event) => {
      event.preventDefault();
      let petAge = Number(formData.age)
      postPet({
        variables: {
          "image": formData.image, 
          "name": formData.name, 
          "breed": formData.breed, 
          "description": formData.description, 
          "age": petAge, 
          "size":formData.size, 
          "gender":formData.gender, 
          "contact": formData.contact,
          "userId": currentUser ? currentUser.uid : null,
        },
      });
      window.location.reload();
      setSubmitting(true);
  
      setTimeout(() => {
        setSubmitting(false);
      }, 3000);
    };
  
    const handleChange = (event) => {
      setFormData({
        name: event.target.name,
        value: event.target.value,
      });
    };
    if(currentUser){
    return (
        <div>
          {submitting &&
            <div>Submtting Form...</div>
          }
          <form onSubmit={handleSubmit}>
            <div className="App-form">
            <Form.Label htmlFor="url">Image URL</Form.Label>
              <Form.Control type="text" name="image"  onChange={handleChange}>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Name</Form.Label>
              <Form.Control type="text" name="name"  onChange={handleChange}>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Breed</Form.Label>
              <Form.Control type="text" name="breed"  onChange={handleChange}>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Description</Form.Label>
              <Form.Control type="text" name="description"  onChange={handleChange}>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Age</Form.Label>
              <Form.Control type="number" name="age"  onChange={handleChange}>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Size</Form.Label>
              <Form.Control type="text" name="size"  onChange={handleChange}>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Gender</Form.Label>
              <Form.Control type="text" name="gender"  onChange={handleChange}>
              </Form.Control>
            </div>
            <div className="App-form">
            <Form.Label htmlFor="url">Contact</Form.Label>
              <Form.Control type="text" name="contact"  onChange={handleChange}>
              </Form.Control>
            </div>
            <br/>
            <div className="App-form">
              <Button variant="primary" type="submit">Submit</Button>
            </div>
          </form>
        </div>
      );
        }else{return(
            <div>
                Please log in first!
            </div>
        )}

}

export default UploadPost;
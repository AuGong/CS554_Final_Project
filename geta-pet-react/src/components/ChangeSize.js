import React, { useRef } from "react";
import * as Magick from 'https://knicknic.github.io/wasm-imagemagick/magickApi.js';

import { Form, Button } from "react-bootstrap";

function ChangeSize() {
  
  const imageRef = useRef();
  
  async function doMagick(imageUrl){
    let originalImage = document.getElementById("originalImage");
    let rotatedImage = document.getElementById("rotatedImage");
    let fetchedSourceImage = await fetch(imageUrl);
    let arrayBuffer = await fetchedSourceImage.arrayBuffer();
    let sourceBytes = new Uint8Array(arrayBuffer);

    // calling image magick with one source image, and command to rotate & resize image
    const files = [{ name: "srcFile.png", content: sourceBytes }];
    const command = [
      "convert",
      "srcFile.png",
      "-resize",
      "340x400!",
      "out.png",
    ];
    let processedFiles = await Magick.Call(files, command);

    // response can be multiple files (example split)
    // here we know we just have one
    let firstOutputImage = processedFiles[0];
    originalImage.src = imageUrl;
    rotatedImage.src = URL.createObjectURL(firstOutputImage["blob"]);
  };

  const handleDoMagick = () => {
    doMagick(imageRef.current.value);
  }

  return (
    <div>
      <h1>Change photo size</h1>
      <p>This page is used to change the image to a fixed size of 300*300.</p>
      <p>Then the resized image can be dragged to local.</p>
      
      <Form>
        <Form.Group id="imageUrl">
          <Form.Label>Image Url</Form.Label>
          <Form.Control type="text" ref={imageRef} required />
        </Form.Group>
        <Button className="w-100" type="button" onClick={handleDoMagick}>
          Do Magick
        </Button>
      </Form>

      <br />
      <p>Source image: </p>
      <img id="originalImage" alt="originalImage"></img>
      <br />
      <p>Resized image: </p>
      <img id="rotatedImage" alt="rotatedImage"></img>
    </div>
  );
}

export default ChangeSize;

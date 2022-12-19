import React from "react";
import * as Magick from "https://knicknic.github.io/wasm-imagemagick/magickApi.js";

function Home() {

  async function doMagick(url){
    let originalImage = document.getElementById("originalImage");
    let rotatedImage = document.getElementById("rotatedImage");
    let fetchedSourceImage = await fetch(originalImage.src);
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
    rotatedImage.src = URL.createObjectURL(firstOutputImage["blob"]);
  };

  doMagick();

  return (
    <div>
      <h1>This is the homepage!</h1>
      <p>Source image: </p>
      <img
        id="originalImage"
        src="https://raw.githubusercontent.com/mickylab/markdown-pic/main/no-image-available.png"
        alt="originalImage"
      />
      <br />
      <button onClick={doMagick}>Click to Do Magick</button>
      <p>Resized image: </p>
      <img id="rotatedImage" alt="rotatedImage"></img>
    </div>
  );
}

export default Home;

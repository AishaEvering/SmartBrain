import { useState } from "react";
import "./style/App.css";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank";
import FaceRecongnition from "./components/FaceRecongnition";
import Background from "./components/Background";
import findFaces from "./utils/utils.js";
import ImageNotFound from "./style/assets/ImageNotFound.png";

function App() {
  const [input, setInput] = useState("");
  const [boxRegions, setBoxRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const onInputChange = (event) => {
    setIsValid(true);
    setInput(event.target.value);
  };

  const onImageError = (e) => {
    e.target.src = ImageNotFound;
    setIsValid(false);
  };

  const onSubmit = () => {
    if (isValid && input) {
      setIsLoading(true);
      try {
        findFaces(input, "inputImage").then((res) => {
          setBoxRegions(res);
          setIsLoading(false);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Background />
      <Navigation />
      <div className="title neonText">
        <h1>Welcome to Face Block...</h1>
      </div>
      <ImageLinkForm onSubmit={onSubmit} onInputChange={onInputChange} />
      <FaceRecongnition
        imgUrl={input}
        regions={boxRegions}
        onImageError={onImageError}
      />
    </>
  );
}

export default App;

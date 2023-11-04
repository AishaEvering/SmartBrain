import { useState } from "react";
import "./style/App.css";
import Navigation from "./components/Navigation";
import ImageLinkForm from "./components/ImageLinkForm";
import Rank from "./components/Rank";
import FaceRecongnition from "./components/FaceRecongnition";
import Background from "./components/Background";
import findFaces from "./utils/utils.js";
import ImageNotFound from "./style/assets/ImageNotFound.png";
import SignIn from "./components/SignIn";
import { ColorRing } from "react-loader-spinner";
import Instructions from "./components/Instructions";
import Register from "./components/Register";

function App() {
  const [input, setInput] = useState("");
  const [boxRegions, setBoxRegions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [route, setRoute] = useState("signin");
  const [isSignedIn, setIsSignedIn] = useState(false);

  const onInputChange = (event) => {
    setIsValid(true);
    setBoxRegions([]);
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

  const onRouteChange = (route) => {
    if (route === "signout") {
      setIsSignedIn(false);
    } else if (route === "home") {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  return (
    <>
      <Background />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      <div className="title neonText">
        <h1>Welcome to Face Block...</h1>
      </div>
      {route === "home" ? (
        <>
          <ImageLinkForm onSubmit={onSubmit} onInputChange={onInputChange} />
          <Instructions isVisible={boxRegions?.length > 0} />
          <ColorRing
            visible={isLoading}
            height="200"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper center spinner"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
          <FaceRecongnition
            imgUrl={input}
            regions={boxRegions}
            isLoading={isLoading}
            onImageError={onImageError}
          />
        </>
      ) : route === "signin" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </>
  );
}

export default App;

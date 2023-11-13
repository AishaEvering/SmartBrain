import { React, useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/user.context.js";
import { baseUrl } from "../../services/smart-brain-api.js";
import "../../style/App.css";
import ImageLinkForm from "../../components/ImageLinkForm";
import Rank from "../../components/Rank";
import FaceRecongnition from "../../components/FaceRecongnition";
import { findFaces, findColors } from "../../apis/api_helper.js";
import ImageNotFound from "../../style/assets/ImageNotFound.png";
import { ColorRing } from "react-loader-spinner";
import Instructions from "../../components/Instructions";
import { put } from "../../apis/api_helper.js";

function Home() {
  const [input, setInput] = useState("");
  const [boxRegions, setBoxRegions] = useState([]);
  const [colors, setColors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [processImgFailedMsg, setProcessImgFailedMsg] = useState("");
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const onImageError = (e) => {
    e.target.src = ImageNotFound;
    setIsLoading(false);
    setIsValid(false);
  };

  const onSubmit = (data) => {
    const { imageUrl } = data;

    if (isValid && imageUrl) {
      setInput(imageUrl);
      setIsLoading(true);
      try {
        processFaces(imageUrl);
        updateEntries();
      } catch (error) {
        setIsLoading(false);
        setProcessImgFailedMsg("Image URL is invalid");
      }
    }
  };

  useEffect(() => {
    if (input.length > 0) return;
    try {
      setIsLoading(true);
      setInput(`${baseUrl}default`);
      processFaces();
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setProcessImgFailedMsg("Error loading default image");
    }
  }, []);

  const processFaces = (imageUrl) => {
    findFaces(imageUrl, "inputImage")
      .then((res) => {
        processColor(imageUrl);
        setBoxRegions(res);
        setIsLoading(false);
      })
      .catch((_) => console.log("Error processing image"));
  };

  const processColor = (imageUrl) => {
    findColors(imageUrl)
      .then((res) => {
        setColors(res);
      })
      .catch((_) => console.log("Error processing image color"));
  };

  const updateEntries = () => {
    put("entries", {
      id: currentUser.id?.toString(),
    })
      .then((count) => {
        setCurrentUser({ ...currentUser, entries: count });
      })
      .catch(console.log);
  };

  return (
    <>
      <Rank />
      <ImageLinkForm onSubmit={onSubmit} errMsg={processImgFailedMsg} />
      <Instructions isVisible={boxRegions?.length > 0} />
      <ColorRing
        visible={isLoading}
        height="200"
        width="200"
        ariaLabel="blocks-loading"
        wrapperClass="blocks-wrapper center spinner"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
      <FaceRecongnition
        imgUrl={input}
        regions={boxRegions}
        isLoading={isLoading}
        colors={colors}
        onImageError={onImageError}
      />
    </>
  );
}

export default Home;

import React from "react";
import "../style/FaceRecongnition.css";

const FaceRecongnition = ({ imgUrl, regions, onImageError }) => {
  const toggleDiv = (divId) => {
    const div = document.getElementById(divId);
    div.style.opacity = div.style.opacity === "1" ? "0" : "1";
  };

  const clearMasks = () => {
    try {
      let masks = document.querySelectorAll('[id^="mask_"]');
      if (masks?.length > 0) {
        masks.forEach((i) => (i.style.opacity = 0));
      }
    } catch (e) {}
  };

  clearMasks();

  if (imgUrl && regions) {
    return (
      <div className="center ma">
        <div className="absolute mt5">
          <img
            id="inputImage"
            src={imgUrl}
            alt="input"
            width="500px"
            height="auto"
            className="inputImg"
            onError={onImageError}
          />
          {regions.map((box) => {
            const id =
              "mask_" + box.topRow + box.rightCol + box.bottomRow + box.leftCol;
            return (
              <div
                className="bounding-box bounding-box.hide"
                id={id}
                key={id}
                onClick={() => {
                  toggleDiv(id);
                }}
                style={{
                  opacity: 1,
                  top: box.topRow,
                  right: box.rightCol,
                  bottom: box.bottomRow,
                  left: box.leftCol,
                }}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
  return <></>;
};

export default FaceRecongnition;

import React from "react";
import DropZone from "./DropZone";
import "../style/ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <div>
      <p className="neonText white f5">
        {"This Magic Brain will detect faces in your pictures.  Give it a try."}
      </p>
      <div className="center">
        <div className="form pa4 br3 shadow-5">
          {/* <input className="f4 pa2 w-70 center" type="text" /> */}
          <DropZone />
          <button className="button w-30 grow f4 link ph3 pv2 ma2 dib white">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;

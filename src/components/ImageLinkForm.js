import React from "react";
import "../style/ImageLinkForm.css";

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
  return (
    <div className="form">
      <p className="white f5 msg center">
        {
          "Block the faces you don't want shown in your pictures. No face no case!"
        }
      </p>
      <hr className="pretty" />
      <input
        className="f4 w-100"
        type="text"
        placeholder="Enter image URL"
        onChange={onInputChange}
        onPaste={onInputChange}
        required
      />
      <button
        id="btnFindFaces"
        onClick={onSubmit}
        className="button w-20 grow f5 link ph3 pv2 ma1 dib"
      >
        Cover Faces
      </button>
    </div>
  );
};

export default ImageLinkForm;

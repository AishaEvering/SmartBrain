import { React, useContext } from "react";
import { UserContext } from "../context/user.context";
import { useForm } from "react-hook-form";
import "../style/ImageLinkForm.css";

const ImageLinkForm = ({ onSubmit, errMsg }) => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { currentUser } = useContext(UserContext);

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <p className="white f5 msg">
        {
          "Block the faces you don't want shown in your pictures. No face no case!"
        }
      </p>
      <hr className="pretty" />
      <input
        className="f4 w-100"
        type="text"
        placeholder="Enter image URL"
        name="imageUrl"
        id="imageUrl"
        {...register("imageUrl", { required: "Image URL is required" })}
      />
      <div className="invalid-feedback">{errors.imageUrl?.message}</div>
      <div className="invalid-feedback">{errMsg}</div>
      {currentUser?.id ? (
        <button
          id="btnFindFaces"
          type="submit"
          value="submit"
          className="button grow f5 link ph3 pv2 ma1 dib"
        >
          Cover Faces
        </button>
      ) : (
        <p className="white">Sign In! To block the faces in your own image.</p>
      )}
    </form>
  );
};

export default ImageLinkForm;

import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context.js";
import { post } from "../apis/api_helper.js";

const Reset = () => {
  const { register, handleSubmit, formState, watch } = useForm();
  const { errors } = formState;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [updatedPasswordFailed, setUpdatePasswordFailed] = useState("");

  const navigate = useNavigate();

  const onSubmit = (data) => {
    post("updatepassword", {
      email: currentUser.email,
      password: data.password,
    })
      .then((response) => {
        if (response) {
          signInUser(response.email);
          navigate("/home");
        } else {
          setUpdatePasswordFailed("Unable to update user's password");
        }
      })
      .catch(function (_) {
        setUpdatePasswordFailed("Unable to update user's password");
      });
  };

  const signInUser = (email) => {
    post("checkemail", {
      email,
    })
      .then((response) => {
        if (response) {
          setCurrentUser({
            id: response.id,
            name: response.name,
            email: response.email,
            entries: response.entries,
            joined: response.joined,
          });
        } else {
          setUpdatePasswordFailed("Unable to sign in user");
        }
      })
      .catch(function (err) {
        console.log("err", err);
        setUpdatePasswordFailed("Unable to sign in user");
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure z_0" onSubmit={handleSubmit(onSubmit)}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Reset Password</legend>
            <div className="invalid-feedback">{updatedPasswordFailed}</div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Change Password
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: 3,
                })}
                name="password"
                id="password"
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="confirm_password">
                Repeat Password
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                type="password"
                placeholder="Confirm Password"
                {...register("confirm_password", {
                  required: "Password confirmation is required",
                  minLength: 3,
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Passwords do not match";
                    }
                  },
                })}
                name="confirm_password"
                id="confirm_password"
              />
              <div className="invalid-feedback">
                {errors.confirm_password?.message}
              </div>
            </div>
          </fieldset>
          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Update Password"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Reset;

import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { post } from "../apis/api_helper.js";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context.js";

const SignIn = () => {
  const [signInFailed, setSignInFailed] = useState("");
  const { register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    post("signin", {
      email: data.email,
      password: data.password,
    })
      .then((user) => {
        if (user.id) {
          setCurrentUser(user);
          navigate("/home");
        }
      })
      .catch(function (_) {
        setSignInFailed("Invalid Email/Password");
      });
  };

  const onForgotPassword = () => {
    post("checkemail", {
      email: getValues("email"),
    })
      .then((response) => {
        if (response) {
          const oneTimePassword = Math.floor(
            Math.random() * 9000 + 1000
          ).toString();

          const user = {
            email: response.email,
            OTP: oneTimePassword,
          };

          if (sendForgotPasswordEmail(response.email, oneTimePassword)) {
            setCurrentUser(user);
            navigate("/forgotpassword");
          }
        }
        setSignInFailed("Unable to send recovery email");
      })
      .catch(function (_) {
        setSignInFailed("Valid Email Required");
      });
  };

  const sendForgotPasswordEmail = async (email, otp) => {
    try {
      const sent = await post("sendemail", {
        email: email,
        OTP: otp,
      });

      if (sent) {
        return true;
      }
      setSignInFailed("Unable to send recovery email");
      return false;
    } catch (_) {
      setSignInFailed("Unable to send recovery email");
      return false;
    }
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure z_0" onSubmit={handleSubmit(onSubmit)}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
            <div className="invalid-feedback">{signInFailed}</div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                type="email"
                placeholder="email"
                {...register("email", { required: "Email is required" })}
                name="email"
                id="email"
              />
              <div className="invalid-feedback">{errors.email?.message}</div>
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                type="password"
                placeholder="password"
                {...register("password", { required: "Password is required" })}
                name="password"
                id="password"
              />
              <div className="invalid-feedback">{errors.password?.message}</div>
            </div>
          </fieldset>
          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="submit"
            />
          </div>
          <div className="parent">
            <div className="lh-copy mt3 child">
              <Link className="f6 link dim black db pointer" to="/register">
                Register
              </Link>
            </div>
            <div className="lh-copy mt3 child">
              <Link
                className="f6 link dim black db pointer"
                onClick={() => onForgotPassword()}
              >
                Forgot UserName/Password
              </Link>
            </div>
          </div>
        </form>
      </main>
    </article>
  );
};

export default SignIn;

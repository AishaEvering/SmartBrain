import { React, useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context.js";
import { post } from "../apis/api_helper.js";

const ForgotPassword = () => {
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const [timerCount, setTimer] = useState(60);
  const [sentRecoveryFailed, setSentRecoveryFailed] = useState("");

  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (data.OTP === currentUser.OTP && !isTimedOut) {
      navigate("/reset");
    } else {
      setSentRecoveryFailed(
        "The code you have entered is not correct, try again or re-send the temporary password."
      );
    }
  };

  const resendOTP = async () => {
    if (!isTimedOut) return;

    try {
      const oneTimePassword = Math.floor(
        Math.random() * 9000 + 1000
      ).toString();

      setCurrentUser({
        email: currentUser.email,
        OTP: oneTimePassword,
      });

      const sent = await post("sendemail", {
        email: currentUser.email,
        OTP: oneTimePassword,
      });

      if (sent) {
        setIsTimedOut(false);
        alert("A new temporary password has been sent to your email.");
        setTimer(60);
      }
    } catch (_) {
      setSentRecoveryFailed("Unable to send recovery email");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        if (lastTimerCount <= 1) {
          clearInterval(interval);
          setIsTimedOut(true);
        }
        return lastTimerCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimedOut]);

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure z_0" onSubmit={handleSubmit(onSubmit)}>
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Forgot Password</legend>
            <div className="invalid-feedback">{sentRecoveryFailed}</div>
            <div className="mt3">
              <p>
                Log in with the temporary email that has been sent to your
                email.
              </p>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="OTP">
                Temporary Password
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                type="text"
                {...register("OTP", {
                  required: "Temporary password is required",
                })}
                placeholder="Temporary Password"
                name="OTP"
                id="OTP"
              />
              <div className="invalid-feedback">{errors.OTP?.message}</div>
            </div>
          </fieldset>
          <div>
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Sign In"
            />
          </div>
          <div className="lh-copy mt3 child">
            <Link
              className="f6 link dim black db pointer"
              onClick={() => resendOTP()}
            >
              Didn't receive the temporary password?{" "}
              {isTimedOut
                ? " Resend Temporary Password"
                : `Resend temporary password in ${timerCount}s`}
            </Link>
          </div>
        </form>
      </main>
    </article>
  );
};

export default ForgotPassword;

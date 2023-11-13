import { React, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { post } from "../apis/api_helper.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/user.context.js";

const Register = () => {
  const [registerFailed, setRegisterFailed] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const { setCurrentUser } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    post("register", {
      name: data.name,
      email: data.email,
      password: data.password,
    })
      .then((user) => {
        if (user.id) {
          setCurrentUser(user);
          navigate("/home");
        }
      })
      .catch(function (err) {
        setRegisterFailed("Unable to register, try a different email address.");
      });
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <form className="measure" onSubmit={handleSubmit(onSubmit)}>
          <fieldset id="register" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0">Register</legend>
            <div className="invalid-feedback">{registerFailed}</div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: 3,
                })}
                placeholder="Name"
                name="name"
                id="name"
              />
              <div className="invalid-feedback">{errors.name?.message}</div>
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100"
                type="email"
                {...register("email", { required: "Email is required" })}
                name="email"
                placeholder="Email"
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
                {...register("password", {
                  required: "Password is required",
                  minLength: 3,
                })}
                name="password"
                placeholder="password"
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
        </form>
      </main>
    </article>
  );
};

export default Register;

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import signUp from "../firebase/auth/signup";
import { FirebaseError } from "firebase/app";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmpassword, setConfirmPassword] = React.useState("");
  const [firebaseErrorMessage, setFirebaseErrorMessage] = React.useState("");

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) &&
      password.match(
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
      ) &&
      password === confirmpassword
    ) {
      const { result, error } = await signUp(email, password);
      if (result) {
        router.push("/signin");
        setFirebaseErrorMessage("");
      }
      if (error instanceof FirebaseError) {
        setFirebaseErrorMessage(error.message);
      }
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        className="z-10 w-full max-w-5xl flex items-center  justify-center font-mono text-sm "
        style={{ minHeight: "70vh" }}
      >
        <form
          onSubmit={handleForm}
          style={{ width: "50%" }}
          className="form flex flex-col p-10"
        >
          <label className="labelName" htmlFor="email">
            Enter your email
          </label>
          <input
            style={{
              border: "1px solid black",
              borderRadius: 5,
              padding: 10,
            }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            type="email"
            name="email"
            id="email"
            placeholder="example@mail.com"
          />
          {email.length > 0 &&
            (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ? (
              ""
            ) : (
              <p className="text-rose-600">Please enter a valid email</p>
            ))}
          <label className="labelName" htmlFor="password">
            Enter the Password
          </label>
          <input
            style={{
              border: "1px solid black",
              borderRadius: 5,
              padding: 10,
            }}
            onChange={(e) => setPassword(e.target.value)}
            required
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />

          {password.length ? (
            password.match(
              /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/
            ) ? (
              ""
            ) : (
              <p className="text-rose-600">
                Please enter a password with more or equal to 8 characters and 1
                alpha 1 numeric and 1 special charcter and must not exceed 16
                chars
              </p>
            )
          ) : (
            ""
          )}
          <label className="labelName" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            style={{
              border: "1px solid black",
              borderRadius: 5,
              padding: 10,
            }}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            required
            type="password"
            name="password"
            id="confirmPassword"
            placeholder="confirm password"
          />
          {confirmpassword ? (
            confirmpassword != password ? (
              <p className="text-rose-600">
                Passwords and confirm password&apos;s match
              </p>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <p className="text-rose-600 p-2">{firebaseErrorMessage}</p>
          <br></br>
          <button
            type="submit"
            style={{ width: 100, alignSelf: "center" }}
            className="border-black border-solid text-white bg-black p-2 rounded flex justify-center"
          >
            Sign up
          </button>
          <div className="flex m-4 items-center">
            Already have an account
            <button
              className="text-blue-600 m-1"
              onClick={() => router.push("/signin")}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

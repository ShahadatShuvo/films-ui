import React from "react";
import Register from "../components/Register";

function RegisterPage() {
  return (
    <div className="border rounded-lg py-5">
      <h1 className="text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400b font-semibold">
        Register
      </h1>
      <Register />
    </div>
  );
}

export default RegisterPage;

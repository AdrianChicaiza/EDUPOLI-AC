import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputCyan from "../../components/variants/InputCyan";
import { BACKEND } from "../VariableBck";

export const ConfirmarCorreo = () => {
  const [email, setEmail] = useState("");
  const [consultando, setConsultando] = useState(false);
  const navigate = useNavigate();
  const Swal = require("sweetalert2");
  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal",
    });
  };
  const bienAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Correcto!!",
      text: "Se envio un mensaje a tu correo",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const ressetP = async (e) => {
    e.preventDefault();
    setConsultando(true);
    try {
      await axios.post(
        BACKEND+"/api/v1/forgot-password",
        { email },
        { headers: { accept: "application/json" } }
      );
      bienAlert();
    } catch (error) {
      errorAlert();
      console.log(error.response.data.errors, "error");
      setEmail("");
    }
    setConsultando(false);
  };

  return (
    <>
      <div className="flex justify-center  ">
        <div className="block p-3 rounded-[5px] shadow-xl shadow-cyan-500/80 max-w-sm bg-white py-13 ">
          <div className="flex min-h-full items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-40 w-min"
                  src="https://cdn-icons-png.flaticon.com/512/6807/6807018.png"
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Ingresa tu correo de confirmación
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={ressetP}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Correo
                    </label>
                    <InputCyan
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      setvalue={setEmail}
                      placeholder="Correo"
                      minLength={5}
                    />
                  </div>
                </div>

                <div className="flex flex-row justify-center space-x-4">
                  <div>
                    <button
                      type="submit"
                      disabled={consultando}
                      className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px] mr-1"
                    >
                      {consultando ? "Enviando..." : "Enviar"}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    disabled={consultando}
                    className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

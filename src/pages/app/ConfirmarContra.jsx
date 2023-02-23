import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BACKEND } from "../VariableBck";

export const ConfirmarContra = () => {
  const navigate = useNavigate();
  const [token, settoken] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");
  const [errorContrasenaConfirm, setErrorContrasenaConfirm] = useState("");
  let haserrorsPassword = false;
  const Swal = require("sweetalert2");

  const bienAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Se cambio tu cotraseña",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const errorAlert = (mensaje) => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: mensaje,
      timer: 2500,
    });
  };

  useEffect(() => {
    let cadenatoken1 = window.location.href.split("token=")[1];
    cadenatoken1.split("&");
    settoken(cadenatoken1.split("&")[0]);
    setEmail(window.location.href.split("email=")[1]);
  }, []);

  const confirmPassword = async () => {
    try {
      await axios.post(
        BACKEND + "/api/v1/reset-password",
        { token, email, password, password_confirmation },
        { headers: { accept: "application/json" } }
      );
      navigate("login");
      bienAlert();
    } catch (error) {
      errorAlert(error.response.data.errors.password[0]);
    }
  };

  const validatePassword = () => {
    if (password === null || password === "") {
      setErrorContrasena("Este campo contraseña es obligatorio");
      haserrorsPassword = true;
    } else if (password.length < 8) {
      setErrorContrasena("La contraseña debe tener mas de 8 caracteres");
      haserrorsPassword = true;
    } else if (password.search(/[0-9]/) < 0) {
      setErrorContrasena("La contraseña debe contener al menos un digito");
      haserrorsPassword = true;
    } else if (password.search(/[a-z]/i) < 0) {
      setErrorContrasena("La contraseña debe contener al menos una letra");
      haserrorsPassword = true;
    } else if (password.search(/[A-Z]/g) < 0) {
      setErrorContrasena(
        "La contraseña debe contener al menos una letra mayuscula"
      );
      haserrorsPassword = true;
    } else if (password.search(/[^a-zA-Z\d]/g) < 0) {
      setErrorContrasena(
        "La contraseña debe contener al menos un caracter especial"
      );
      haserrorsPassword = true;
    }

    if (password_confirmation === null || password_confirmation === "") {
      setErrorContrasenaConfirm(
        "Este campo confirmar contraseña es obligatorio"
      );
      haserrorsPassword = true;
    } else if (password_confirmation.length < 8) {
      setErrorContrasenaConfirm("La contraseña debe tener mas de 8 caracteres");
      haserrorsPassword = true;
    } else if (password_confirmation.search(/[0-9]/) < 0) {
      setErrorContrasenaConfirm(
        "La contraseña debe contener al menos un digito"
      );
      haserrorsPassword = true;
    } else if (password_confirmation.search(/[a-z]/i) < 0) {
      setErrorContrasenaConfirm(
        "La contraseña debe contener al menos una letra"
      );
      haserrorsPassword = true;
    } else if (password_confirmation.search(/[A-Z]/g) < 0) {
      setErrorContrasenaConfirm(
        "La contraseña debe contener al menos una letra mayuscula"
      );
      haserrorsPassword = true;
    } else if (password_confirmation.search(/[^a-zA-Z\d]/g) < 0) {
      setErrorContrasenaConfirm(
        "La contraseña debe contener al menos un caracter especial"
      );
      haserrorsPassword = true;
    }
  };

  return (
    <>
      <div className="flex justify-center py-12  ">
        <div className="block p-3 rounded-lg shadow-xl shadow-cyan-500/50 max-w-sm bg-white py-11 ">
          <div className="flex min-h-full items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <img
                  className="mx-auto h-20 w-min"
                  src="https://cdn-icons-png.flaticon.com/512/5868/5868371.png"
                  alt="Imagen Confirmar Contraseña"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Ingresa tu nueva contraseña
                </h2>
              </div>
              <form className="mt-8 space-y-6" onSubmit={confirmPassword}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="-space-y-px rounded-md shadow-sm">
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      className="relative block w-full appearance-none rounded-none rounded-t-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Nueva Contraseña"
                      maxLength={30}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrorContrasena("");
                      }}
                    />
                    <p className="text-red-500 text-xs italic">
                      {errorContrasena}
                    </p>
                  </div>
                  <div>
                    <input
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      value={password_confirmation}
                      maxLength={30}
                      className="relative block w-full appearance-none rounded-none rounded-b-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
                      placeholder="Confirma tu nueva Contraseña"
                      onChange={(e) => {
                        setpassword_confirmation(e.target.value);
                        setErrorContrasenaConfirm("");
                      }}
                    />
                    <p className="text-red-500 text-xs italic">
                      {errorContrasenaConfirm}
                    </p>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={() => {
                      validatePassword(true);
                      if (haserrorsPassword) {
                        return;
                      } else {
                        confirmPassword();
                      }
                    }}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-cyan-700 py-2 px-4 text-sm font-medium text-white hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center  pl-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </span>
                    Enviar
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

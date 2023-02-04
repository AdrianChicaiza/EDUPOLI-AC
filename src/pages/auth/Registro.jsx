import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputCyan from "../../components/variants/InputCyan";
import { BACKEND } from "../VariableBck";

export const Registro = () => {
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [password_confirmation, setpassword_confirmation] = useState("");
  const [email, setemail] = useState("");
  const [first_name, setfirst_name] = useState("");
  const [errorNombre, setErrorNombre] = useState("");
  const [errorApellido, setErrorApellido] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");
  const [errorContrasenaConfirm, setErrorContrasenaConfirm] = useState("");
  const [last_name, setlast_name] = useState("");
  const [consultando, setConsultando] = useState(false);
  const role_id = 2;
  let hasErrorsRegistro = false;
  const Swal = require("sweetalert2");
  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal",
    });
  };
  const errorPasswordAlert = () => {
    Swal.fire({
      icon: "warning",
      title: "Atencion",
      text: "Las contraseñas no coinciden",
      
    });
  };
  const bienAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Bien!!",
      text: "Todo salio bien",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const registroF = async () => {
    setConsultando(true);
    try {
      await axios.post(
        BACKEND + "/api/v1/register",
        {
          role_id,
          first_name,
          last_name,
          password,
          password_confirmation,
          email,
        },
      );
      if (password === password_confirmation) {
        bienAlert();
        navigate("/");
      } else {
        errorPasswordAlert();
      }
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const validacionRegistro = () => {
    if (first_name === null || first_name === "") {
      setErrorNombre("Este campo nombre es obligatorio");
      hasErrorsRegistro = true;
    } else if (first_name.length < 3) {
      setErrorNombre("El nombre debe tener mas de 4 caracteres");
      hasErrorsRegistro = true;
    }
    if (last_name === null || last_name === "") {
      setErrorApellido("Este campo apellido es obligatorio");
      hasErrorsRegistro = true;
    } else if (last_name.length < 3) {
      setErrorApellido("El apellido debe tener mas de 4 caracteres");
      hasErrorsRegistro = true;
    }
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email === null || email === "") {
      setErrorEmail("Este campo correo es obligatorio");
      hasErrorsRegistro = true;
    } else if (email.length < 3) {
      setErrorEmail("El correo debe tener mas de 4 caracteres");
      hasErrorsRegistro = true;
    } else if (!email.match(validRegex)) {
      setErrorEmail("Ingrese un correo válido");
      hasErrorsRegistro = true;
    }
    if (password === null || password === "") {
      setErrorContrasena("Este campo contraseña es obligatorio");
      hasErrorsRegistro = true;
    } else if (password.length < 6) {
      setErrorContrasena("La contraseña debe tener mas de 6 caracteres");
      hasErrorsRegistro = true;
    }
    if (password_confirmation === null || password_confirmation === "") {
      setErrorContrasenaConfirm(
        "Este campo confirmar contraseña es obligatorio"
      );
      hasErrorsRegistro = true;
    } else if (password_confirmation.length < 6) {
      setErrorContrasenaConfirm("La contraseña debe tener mas de 6 caracteres");
      hasErrorsRegistro = true;
    }
  };

  return (
    <>
      <div className="flex justify-center py-1 bg-white ">
        <div className="rounded-[5px] shadow-xl shadow-cyan-500/80 w-full bg-white py-2 ">
          <div className="flex items-center justify-center py-3 px-4">
            <div className="w-full ">
              <div>
                <h2 className="text-center text-3xl font-bold text-gray-900">
                  Registrate
                </h2>
                <p className="mt-2 text-center font-medium text-sm text-gray-600 ">
                  Crea tu cuenta gratis solo tomara unos minutos
                </p>
              </div>
              <form className="space-y-4" onSubmit={registroF}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="space-y-2">
                  <div>
                    <label htmlFor="first_name" className="font-medium  ">
                      Nombre
                    </label>
                    <InputCyan
                      id="first_name"
                      name="first_name"
                      type="text"
                      value={first_name}
                      setvalue={(e) => {
                        const newText = e.replace(/[^a-zA-Z ]/g, "");
                        setfirst_name(newText);
                        setErrorNombre("");
                      }}
                      placeholder="Nombre"
                      tamaño={10}
                    />
                    <p className="text-red-500 text-xs italic">{errorNombre}</p>
                  </div>
                  <div>
                    <label htmlFor="last_name" className="font-medium">
                      Apellido
                    </label>
                    <InputCyan
                      id="last_name"
                      name="last_name"
                      type="text"
                      value={last_name}
                      setvalue={(e) => {
                        const newText = e.replace(/[^a-zA-Z ]/g, "");
                        setlast_name(newText);
                        setErrorApellido("");
                      }}
                      placeholder="Apellido"
                      tamaño={10}
                    />
                    <p className="text-red-500 text-xs italic">
                      {errorApellido}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="email" className="font-medium">
                      Correo
                    </label>
                    <InputCyan
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      setvalue={(e) => {
                        setemail(e);
                        setErrorEmail("");
                      }}
                      placeholder="Correo"
                      tamaño={60}
                    />
                    <p className="text-red-500 text-xs italic">{errorEmail}</p>
                  </div>
                  <div>
                    <label htmlFor="password" className="font-medium">
                      Contraseña
                    </label>
                    <InputCyan
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      setvalue={(e) => {
                        setpassword(e);
                        setErrorContrasena("");
                      }}
                      placeholder="Contraseña"
                    />
                    <p className="text-red-500 text-xs italic">
                      {errorContrasena}
                    </p>
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Confirmar Contraseña
                    </label>
                    <InputCyan
                      id="password_confirmation"
                      name="password_confirmation"
                      type="password"
                      value={password_confirmation}
                      setvalue={(e) => {
                        setpassword_confirmation(e);
                        setErrorContrasenaConfirm("");
                      }}
                      placeholder="Confirmar Contraseña"
                    />
                    <p className="text-red-500 text-xs italic">
                      {errorContrasenaConfirm}
                    </p>
                  </div>
                </div>
                <div className="flex flex-row justify-center space-x-4">
                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        validacionRegistro(true);
                        if (hasErrorsRegistro) {
                          return;
                        } else {
                          registroF();
                        }
                      }}
                      disabled={consultando}
                      className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px] mr-1"
                    >
                      {consultando ? "Registrando..." : "Registrarse"}
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    disabled={consultando}
                    className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px]"
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

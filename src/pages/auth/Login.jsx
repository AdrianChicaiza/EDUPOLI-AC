import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../contexts";
import { Link } from "react-router-dom";
import InputCyan from "../../components/variants/InputCyan";
import { BACKEND } from "../VariableBck";
export const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [consultando, setConsultando] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");
  const Swal = require("sweetalert2");

  const errorAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Algo salio mal",
    });
  };

  const onLogin = async () => {
    setConsultando(true);
    try {
      const response = await axios.post(
        BACKEND + "/api/v1/login",
        { email, password },
        { headers: { accept: "application/json" } }
      );
      const { access_token, token_type, user } = response.data.data;
      login(user, `${token_type} ${access_token}`);
      // console.log("Datos usuario logeado: ", response.data.data);
      navigate("/");
    } catch (error) {
      errorAlert();
      setEmail("");
      setPassword("");
    }
    setConsultando(false);
  };

  let haserrorsLogin = false;

  const validarLogin = () => {
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email === null || email === "") {
      setErrorEmail("Este campo correo es obligatorio");
      haserrorsLogin = true;
    } else if (email.length < 3) {
      setErrorEmail("El correo debe tener mas de 4 caracteres");
      haserrorsLogin = true;
    } else if (!email.match(validRegex)) {
      setErrorEmail("Ingrese un correo válido");
      haserrorsLogin = true;
    }
    if (password === null || password === "") {
      setErrorContrasena("Este campo contraseña es obligatorio");
      haserrorsLogin = true;
    } else if (password.length < 6) {
      setErrorContrasena("La contraseña debe tener las de 6 caracteres");
      haserrorsLogin = true;
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center ">
        <div className="flex justify-center items-center bg-white">
          <div className="block p-2 rounded-[5px] shadow-xl shadow-cyan-500/80 border-2 max-w-sm bg-white ">
            <div className="flex min-h-full items-center justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-md space-y-8">
                <div>
                  <img
                    className="mx-auto h-40 w-min"
                    src="https://cdn-icons-png.flaticon.com/512/6543/6543058.png"
                    alt="Your Company"
                  />
                  <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Ingresa en tu cuenta
                  </h2>
                  <p className="mt-2 text-center text-sm text-gray-600 ">
                    O puedes{" "}
                    <a
                      href="/registro"
                      className="font-medium text-cyan-700 hover:text-cyan-500 no-underline "
                    >
                      Registrarte
                    </a>
                  </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onLogin}>
                  <input type="hidden" name="remember" defaultValue="true" />
                  <div className="-space-y-px rounded-md shadow-sm">
                    <div>
                      <label htmlFor="email" className="sr-only">
                        Correo
                      </label>
                      <InputCyan
                        id="email"
                        name="email"
                        type="text"
                        required
                        value={email}
                        setvalue={(e) => {
                          setEmail(e);
                          setErrorEmail("");
                        }}
                        placeholder="Ingrese su correo"
                        tamaño={30}
                      />
                      <p className="text-red-500 text-xs italic">
                        {errorEmail}
                      </p>
                    </div>
                    <div>
                      <label htmlFor="password" className="sr-only">
                        Contraseña
                      </label>
                      <InputCyan
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        setvalue={(e) => {
                          setPassword(e);
                          setErrorContrasena("");
                        }}
                        placeholder="Ingrese su contraseña"
                        tamaño={20}
                      />
                      <p className="text-red-500 text-xs italic">
                        {errorContrasena}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="text-sm  ">
                      <Link
                        to="/confirmarCorreo"
                        className="font-medium text-cyan-700 hover:text-cyan-500 no-underline"
                      >
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => {
                        validarLogin(true);
                        if (haserrorsLogin) {
                          console.log("Hubo errores no se puede actualizar");
                          return;
                        } else {
                          onLogin();
                        }
                      }}
                      className="flex w-full 
                      justify-center rounded-[4px] bg-cyan-700 
                      py-2 px-4 text-sm font-medium 
                      text-white hover:bg-cyan-600"
                      disabled={consultando}
                    >
                      {consultando ? "Cargando..." : "Ingresar"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

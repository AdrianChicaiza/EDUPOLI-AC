import axios from "axios";
import React, { useEffect, useState } from "react";
import InputCyan from "../../components/variants/InputCyan";
import { useNavigate } from "react-router-dom";
import Loading from "../app/loading";
import { BACKEND } from "../VariableBck";

export const PerfilUsuario = () => {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [email, setEmail] = useState("");
  const [errorFirstName, setErrorFirstName] = useState("");
  const [errorLastName, setErrorLastName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const tokenUser = localStorage.getItem("token");
  const [image, setImage] = useState("");
  const [editar, setEditar] = useState(false);
  const [recargar, setRecargar] = useState(true);
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
      title: "Bien!!",
      text: "Todo salio bien",
      showConfirmButton: false,
      timer: 2000,
    });
  };

  const option = () => {
    Swal.fire({
      title: "Estas seguro de hacer los cambios?",
      showDenyButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarUsusario();
      } else if (result.isDenied) {
        Swal.fire("Los cambios no se guardaron", "", "info");
        setEditar(false);
        window.location = window.location.href;
      }
    });
  };
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const vistaPreliminarFoto = (e) => {
    const leer_img = new FileReader();
    const id_img = document.getElementById("imgFoto");
    leer_img.onload = () => {
      if (leer_img.readyState === 2) {
        id_img.src = leer_img.result;
      }
    };
    leer_img.readAsDataURL(e.target.files[0]);
  };

  const subirFoto = async () => {
    const f = new FormData();
    f.append("image", image);
    try {
      await axios.post(BACKEND + "/api/v1/profile/avatar", f, {
        headers: { Authorization: `Bearer: ${tokenUser}` },
      });
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const traerDatos = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(BACKEND + "/api/v1/profile", config);
      setImage(response.data.data.avatar);
      setEmail(response.data.data.user.email);
      setFirst_name(response.data.data.user.first_name);
      setLast_name(response.data.data.user.last_name);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };
  const actualizarUsusario = async () => {
    setConsultando(true);
    try {
      await axios.post(
        BACKEND + "/api/v1/profile",
        { first_name, last_name, email },
        { headers: { Authorization: `Bearer: ${tokenUser}` } },
        { headers: { accept: "application/json" } }
      );
      subirFoto();
      setEditar(false);
      bienAlert();
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };

  let hasErrorsUsuario = false;
  const validacionUsuario = () => {
    if (first_name === null || first_name === "") {
      setErrorFirstName("Este campo nombre es obligatorio");
      hasErrorsUsuario = true;
    } else if (first_name.length < 3) {
      setErrorFirstName("El nombre debe tener mas de 4 caracteres");
      hasErrorsUsuario = true;
    }
    var validRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (email === null || email === "") {
      setErrorEmail("Este campo correo es obligatorio");
      hasErrorsUsuario = true;
    } else if (email.length < 3) {
      setErrorEmail("El correo debe tener mas de 4 caracteres");
      hasErrorsUsuario = true;
    } else if (!email.match(validRegex)) {
      setErrorEmail("Ingrese un correo válido");
      hasErrorsUsuario = true;
    }
    if (last_name === null || last_name === "") {
      setErrorLastName("Este campo apellido es obligatorio");
      hasErrorsUsuario = true;
    } else if (last_name.length < 3) {
      setErrorLastName("El apellido debe tener mas de 4 caracteres");
      hasErrorsUsuario = true;
    }
  };

  useEffect(() => {
    traerDatos();
  }, []);

  if (recargar) {
    return <Loading />;
  }
  return (
    <>
      <div className="flex flex-col justify-center ">
        <div className="flex justify-center bg-white rounded-[2px]  shadow-xl shadow-cyan-500/80">
          <div className="flex items-center rounded-[2px] w-full justify-center pt-5 pb-5 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-3">
              <div className="text-center text-3xl font-bold tracking-tight text-gray-900">
                PerfilUsuario
              </div>
              <div className="flex flex-col items-center justify-center bg-white">
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={image}
                    id="imgFoto"
                    alt="Imagen Usuario"
                    className="flex items-center justify-center rounded-full w-[150px] h-[150px] object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center items-center mt-1">
                  {editar ? (
                    <input
                      className="text-sm text-grey-500
                      bg-[#1F618D] rounded-[5px] 
                      file:mr-1 file:py-2 file:px-2
                      file:rounded-[5px] file:border-0
                      file:text-md file:font-semibold  file:text-white
                      file:bg-sky-500  
                      hover:file:cursor-pointer hover:file:opacity-80"
                      id="image"
                      accept=".jpg"
                      type="file"
                      onChange={(e) => {
                        vistaPreliminarFoto(e);
                        setImage(e.target.files[0]);
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <form className="mt-0 space-y-1" onSubmit={actualizarUsusario}>
                <label className="font-medium">Correo</label>
                <InputCyan
                  id="email"
                  value={email}
                  setvalue={(e) => {
                    setEmail(e);
                    setErrorEmail("");
                  }}
                  className={
                    editar
                      ? "w-full rounded-[2px] border-1 border-sky-300 px-3 py-2 focus:border-sky-300 focus:ring-sky-300 sm:text-sm"
                      : "w-full rounded-[2px] border border-gray-300 px-3 py-2 sm:text-sm"
                  }
                  type="email"
                  name="email"
                  lectura={editar ? false : true}
                />
                <p className="text-red-500 text-xs italic">{errorEmail}</p>
                <label className="font-medium">Nombre</label>
                <InputCyan
                  id="first_name"
                  value={first_name}
                  setvalue={(e) => {
                    setFirst_name(e);
                    setErrorFirstName("");
                  }}
                  className={
                    editar
                      ? "w-full rounded-[2px] border-1 border-sky-300 px-3 py-2 focus:border-sky-300 focus:ring-sky-300 sm:text-sm"
                      : "w-full rounded-[2px] border border-gray-300 px-3 py-2 sm:text-sm"
                  }
                  type="text"
                  name="first_name"
                  lectura={editar ? false : true}
                />
                <p className="text-red-500 text-xs italic">{errorFirstName}</p>
                <label className="font-medium">Apellido</label>
                <InputCyan
                  id="last_name"
                  value={last_name}
                  setvalue={(e) => {
                    setLast_name(e);
                    setErrorLastName("");
                  }}
                  className={
                    editar
                      ? "w-full rounded-[2px] border-1 border-sky-300 px-3 py-2 focus:border-sky-300 focus:ring-sky-300 sm:text-sm"
                      : "w-full rounded-[2px] border border-gray-300 px-3 py-2 sm:text-sm"
                  }
                  type="text"
                  lectura={editar ? false : true}
                />
                <p className="text-red-500 text-xs italic">{errorLastName}</p>
              </form>

              <div className="flex flex-row">
                {editar ? (
                  <button
                    onClick={() => {
                      validacionUsuario(true);
                      if (hasErrorsUsuario) {
                        return;
                      } else {
                        option();
                      }
                    }}
                    className="bg-sky-500 hover:bg-sky-900 text-white w-full font-medium py-1 px-3 rounded-[3px] mr-1 h-[35px]"
                    disabled={consultando}
                  >
                    {consultando ? "Cargando..." : "Actualizar"}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditar(true);
                    }}
                    className="bg-sky-700 hover:bg-sky-900 w-full text-white font-medium py-1 px-3 rounded-[3px] mr-1 h-[35px]"
                  >
                    Editar
                  </button>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={() => {
                      navigate("/");
                    }}
                    disabled={consultando}
                    className="flex items-center bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px] h-[35px]"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Carrusel2 } from "../../components/variants/Carrusel2";
import Loading from "./loading";
import { AuthContext } from "../../contexts";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useRef } from "react";
import InputCyan from "../../components/variants/InputCyan";
import { Contenido } from "./ChatBot";
import { BACKEND } from "../VariableBck";
import { IconBuscar } from "../../components/variants/IconBuscar";
import { IconReset } from "../../components/variants/IconReset";
import { IconEdit } from "../../components/variants/IconEdit";
import { IconDesactivar } from "../../components/variants/IconDesactivar";
import { IconCrear } from "../../components/variants/IconCrear";

export const Dashboard = () => {
  const tokenUser = localStorage.getItem("token");
  const [active, setActive] = useState(true);
  const [sem, setSem] = useState(null);
  const [recargar, setRecargar] = useState(true);
  const [carrerasA, setCarrerasA] = useState(null);
  const { user } = useContext(AuthContext);
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoModal2, setEstadoModal2] = useState(false);
  const [estadoModal3, setEstadoModal3] = useState(false);
  const [encargado, setEncargado] = useState("");
  const [buscador, setBuscador] = useState("");
  const [nombre, setNombre] = useState("");
  const [path, setPath] = useState(
    "https://w7.pngwing.com/pngs/370/8/png-transparent-file-transfer-protocol-computer-icons-upload-personal-use-angle-rectangle-triangle.png"
  );
  const [descripcion, setDescripcion] = useState("");
  const carreraSelect = useRef(-1);
  const [consultando, setConsultando] = useState(false);
  const [errorNombre, setErrorNombre] = useState("");
  const [errorDescripcion, setErrorDescripcion] = useState("");
  const [errorEncargado, setErrorEncargado] = useState("");
  const [errorDocumento, setErrorDocumento] = useState("");
  const [carrerasFiltradas, setCarrerasFiltradas] = useState([]);
  let hasErrorsCarrera = false;
  let hasErrorsSemestre = false;
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

  const estadoCarreraAlert = () => {
    Swal.fire({
      title: "Estas seguro de cambiar el estado de la carrera?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        desactivarCarrera();
      }
    });
  };

  const actualizarCarreraAlert = () => {
    Swal.fire({
      title: "Estas seguro de actualizar esta carrera?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        editarCarrera();
      }
    });
  };
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };

  const traerSemestreRol = async () => {
    if (user.role_id === 1) {
      setActive(true);
      traerCarrerasAdmin();
      traerSemestresAdmin();
    } else {
      setActive(false);
      traerSemestres();
      traerCarrerasEstudiante();
    }
  };

  const traerCarrerasAdmin = async () => {
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/carreras/admin",
        config
      );
      const carrerasfiltradasconts = [];
      setCarrerasA(response.data.data);
      setCarrerasFiltradas(response.data.data);
      carrerasfiltradasconts.push(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const traerCarrerasEstudiante = async () => {
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/carreras/estudianteE",
        config
      );
      const carrerasfiltradasconts = [];
      setCarrerasA(response.data.data);
      setCarrerasFiltradas(response.data.data);
      carrerasfiltradasconts.push(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const traerSemestresAdmin = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/semestres/adminE",
        config
      );
      setSem(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };
  const traerSemestres = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/semestres/estudiante",
        config
      );
      setSem(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };
  const crearSemestre = async () => {
    setConsultando(true);
    console.log(path);
    try {
      await axios.post(
        BACKEND + "/api/v1/semestres/admin/" + carreraSelect.current,
        { nombre, descripcion, path },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `${tokenUser}`,
          },
        }
      );

      setEstadoModal(false);
      setNombre("");
      setDescripcion("");
      setErrorNombre("");
      setErrorDescripcion("");
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
      console.log(error.response.data.errors, "error");
    }
    setConsultando(false);
  };
  const crearCarrera = async () => {
    setConsultando(true);
    try {
      await axios.post(
        BACKEND + "/api/v1/carreras/admin",
        { nombre, descripcion, encargado },
        config
      );
      setNombre("");
      setDescripcion("");
      setEncargado("");
      setErrorNombre("");
      setErrorEncargado("");
      setErrorDescripcion("");
      setEstadoModal(false);
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const editarCarrera = async () => {
    setConsultando(true);
    try {
      await axios.put(
        BACKEND + "/api/v1/carreras/admin/" + carreraSelect.current,
        { nombre, descripcion, encargado },
        config
      );
      setEstadoModal3(false);
      setErrorNombre("");
      setErrorEncargado("");
      setErrorDescripcion("");
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const desactivarCarrera = async () => {
    setConsultando(true);
    try {
      await axios.get(
        BACKEND + "/api/v1/carreras/desactiva/admin/" + carreraSelect.current,
        config
      );
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: 1000,
  };
  const buscarCarrera = () => {
    if (carrerasA) {
      if (buscador === "") {
        setCarrerasFiltradas(carrerasA);
        return;
      }
      const filtrado = [];
      carrerasA?.map((carreraFil) => {
        if (carreraFil.nombre.includes(buscador)) {
          filtrado.push(carreraFil);
        }
      });
      setCarrerasFiltradas(filtrado);
    }
  };
  const validacionCarrera = () => {
    if (nombre === null || nombre === "") {
      setErrorNombre("Este campo nombre es obligatorio");
      hasErrorsCarrera = true;
    } else if (nombre.length < 3) {
      setErrorNombre("El nombre debe tener mas de 4 caracteres");
      hasErrorsCarrera = true;
    }
    if (descripcion === null || descripcion === "") {
      setErrorDescripcion("Este campo descripción es obligatorio");
      hasErrorsCarrera = true;
    } else if (descripcion.length < 3) {
      setErrorDescripcion("La descripcion debe tener mas de 4 caracteres");
      hasErrorsCarrera = true;
    }
    if (encargado === null || encargado === "") {
      setErrorEncargado("Este campo encargado es obligatorio");
      hasErrorsCarrera = true;
    } else if (encargado.length < 3) {
      setErrorEncargado("El encargado debe tener mas de 4 caracteres");
      hasErrorsCarrera = true;
    }
  };
  const validacionSemestre = () => {
    if (nombre === null || nombre === "") {
      setErrorNombre("Este campo nombre es obligatorio");
      hasErrorsSemestre = true;
    } else if (nombre.length < 3) {
      setErrorNombre("El nombre debe tener mas de 4 caracteres");
      hasErrorsSemestre = true;
    }
    if (descripcion === null || descripcion === "") {
      setErrorDescripcion("Este campo descripción es obligatorio");
      hasErrorsSemestre = true;
    } else if (descripcion.length < 3) {
      setErrorDescripcion("La descripcion debe tener mas de 4 caracteres");
      hasErrorsSemestre = true;
    }
    if (document.formularioDoc.imagenSem.value === "") {
      console.log("No esta lleno el input file");
      setErrorDocumento("Debes escojer una imagen .jpg");
      hasErrorsSemestre = true;
    }
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

  useEffect(() => {
    traerSemestreRol();
  }, []);

  if (recargar || !carrerasA || !sem) {
    return <Loading />;
  }
  return (
    <>
      <Modal isOpen={estadoModal} style={modalStyle}>
        <ModalHeader>Crear Semestre</ModalHeader>
        <ModalBody>
          <form
            name="formularioDoc"
            className="space-y-6"
            onSubmit={crearSemestre}
          >
            <div className="form-group">
              <div className="flex justify-center">
                <img
                  src={path}
                  id="imgFoto"
                  alt="Imagen Usuario"
                  className="flex items-center justify-center w-[200px] h-[200px] object-cover bg-gray-500"
                />
              </div>
              <div className="flex justify-center">
                <input
                  className="text-sm text-grey-500
                bg-[#1F618D] rounded-[2px] 
                file:mr-1 file:py-1 file:px-2
                file:rounded-[2px] file:border-0
                file:text-md file:font-semibold  file:text-white
                file:bg-sky-500  
                hover:file:cursor-pointer hover:file:opacity-80"
                  id="image"
                  name="imagenSem"
                  accept=".jpg"
                  type="file"
                  onChange={(e) => {
                    vistaPreliminarFoto(e);
                    setErrorDocumento("");
                    setPath(e.target.files[0]);
                  }}
                />
              </div>
              <p className="flex justify-center text-red-500 text-xs italic">{errorDocumento}</p>
              <label htmlFor="nombre" className="font-medium">
                Nombre
              </label>
              <InputCyan
                id="nombre"
                name="nombre"
                type="text"
                required
                value={nombre}
                setvalue={(e) => {
                  setNombre(e);
                  setErrorNombre("");
                }}
                placeholder="Nombre del Semestre"
                minLength={3}
                tamaño={50}
              />
              <p className="text-red-500 text-xs italic">{errorNombre}</p>
              <label htmlFor="descripcion" className="font-medium mt-2">
                Descripcion
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                type="text"
                className="w-full 
              rounded-[2px] border
              border-gray-300 px-3 py-2 
              placeholder-gray-500 focus:z-10 focus:border-cyan-700 
              focus:outline-none focus:ring-cyan-700 sm:text-sm"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                  setErrorDescripcion("");
                }}
                maxLength={249}
                placeholder="Descripcion del Semestre"
              />
              <p className="text-red-500 text-xs italic">{errorDescripcion}</p>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              validacionSemestre(true);
              if (hasErrorsSemestre) {
                return;
              } else {
                crearSemestre();
              }
            }}
            disabled={consultando}
            className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "Cargando..." : "Crear"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEstadoModal(false);
              setErrorDescripcion("");
              setErrorNombre("");
              setErrorDocumento("");
            }}
            disabled={consultando}
            className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal2} style={modalStyle}>
        <ModalHeader>Crear Carrera</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">
              Nombre
            </label>
            <InputCyan
              id="nombre"
              name="nombre"
              type="text"
              required
              value={nombre}
              setvalue={(e) => {
                setNombre(e);
                setErrorNombre("");
              }}
              placeholder="Nombre de la Carrera"
              minLength={3}
              tamaño={50}
            />
            <p className="text-red-500 text-xs italic">{errorNombre}</p>
            <label htmlFor="encargado" className="font-medium">
              Encargado
            </label>
            <InputCyan
              id="encargado"
              name="encargado"
              type="text"
              required
              value={encargado}
              setvalue={(e) => {
                const newText = e.replace(/[^a-zA-Z ]/g, "");
                setEncargado(newText);
                setErrorEncargado("");
              }}
              placeholder="Encargado de la Carrera"
              minLength={3}
              tamaño={10}
            />
            <p className="text-red-500 text-xs italic">{errorEncargado}</p>
            <label htmlFor="descripcion" className="font-medium mt-2">
              Descripcion
            </label>
            <br />
            <textarea
              id="descripcion"
              name="descripcion"
              type="text"
              className="w-full 
              rounded-[2px] border
              border-gray-300 px-3 py-2 
              placeholder-gray-500 focus:z-10 focus:border-cyan-700 
              focus:outline-none focus:ring-cyan-700 sm:text-sm"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                setErrorDescripcion("");
              }}
              maxLength={249}
              placeholder="Descripcion de la Carrera"
            />
            <p className="text-red-500 text-xs italic">{errorDescripcion}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              validacionCarrera(true);
              if (hasErrorsCarrera) {
                return;
              } else {
                crearCarrera();
              }
            }}
            disabled={consultando}
            className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "Cargando..." : "Crear"}
          </button>
          <button
            type="button"
            onClick={() => {
              setErrorNombre("");
              setErrorDescripcion("");
              setErrorEncargado("");
              setEstadoModal2(false);
            }}
            disabled={consultando}
            className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal3} style={modalStyle}>
        <ModalHeader>Editar Carrera</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="nombre" className="font-medium">
              Nombre
            </label>
            <InputCyan
              id="nombre"
              name="nombre"
              type="text"
              value={nombre}
              setvalue={(e) => {
                setNombre(e);
                setErrorNombre("");
              }}
              minLength={5}
              tamaño={50}
            />
            <p className="text-red-500 text-xs italic">{errorNombre}</p>
            <label htmlFor="encargado" className="font-medium">
              Encargado
            </label>
            <InputCyan
              id="encargado"
              name="encargado"
              type="text"
              required
              value={encargado}
              setvalue={(e) => {
                const newText = e.replace(/[^a-zA-Z ]/g, "");
                setEncargado(newText);
                setErrorEncargado("");
              }}
              minLength={5}
              tamaño={10}
            />
            <p className="text-red-500 text-xs italic">{errorEncargado}</p>
            <label htmlFor="descripcion" className="font-medium mt-2">
              Descripcion
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              type="text"
              className="w-full 
              rounded-[2px] border
              border-gray-300 px-3 py-2 
              placeholder-gray-500 focus:z-10 focus:border-cyan-700 
              focus:outline-none focus:ring-cyan-700 sm:text-sm"
              value={descripcion}
              onChange={(e) => {
                setDescripcion(e.target.value);
                setErrorDescripcion("");
              }}
              maxLength={249}
              placeholder="Descripcion de la Carrera"
            />
            <p className="text-red-500 text-xs italic">{errorDescripcion}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              validacionCarrera(true);
              if (hasErrorsCarrera) {
                return;
              } else {
                actualizarCarreraAlert();
              }
            }}
            className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px]"
            disabled={consultando}
          >
            {consultando ? "Cargando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEstadoModal3(false);
            }}
            disabled={consultando}
            className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          buscarCarrera();
        }}
        className="flex flex-row justify-start mb-1"
      >
        <input
          id="buscador"
          name="buscador"
          type="text"
          value={buscador}
          onChange={(e) => {
            setBuscador(e.target.value);
          }}
          placeholder="Buscar Materia "
          className="rounded-l-lg h-[35px] 
                    border-gray-300 
                    focus:outline-none focus:ring-cyan-700 border"
        />
        <button
          type="submit"
          className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 "
        >
          <IconBuscar />
        </button>
        <button
          type="button"
          onClick={() => {
            setCarrerasFiltradas(carrerasA);
            setBuscador("");
          }}
          className="bg-red-800 hover:bg-red-900 text-white font-medium py-1 px-3 rounded-r-lg"
        >
          <IconReset />
        </button>
      </form>
      <div className="flex flex-row justify-between items-center rounded-[2px] bg-[#2874A6] mb-2">
        <div className="pl-2 text-lg font-bold text-white text-2xl">ESFOT</div>
        {active ? (
          <button
            onClick={() => {
              setNombre("");
              setDescripcion("");
              setEncargado("");
              setEstadoModal2(true);
            }}
            className="flex justify-center rounded-[2px] bg-[#3498DB]
                      py-2 px-4 text-sm font-medium 
                      text-white hover:bg-[#2874A6]"
          >
            Crear Carrera
          </button>
        ) : (
          <></>
        )}
      </div>
      {carrerasFiltradas?.length > 0 ? (
        <div>
          {carrerasFiltradas?.map((carrera) => {
            const semestress = [];
            sem?.map((semestrefilter) => {
              if (semestrefilter?.carreras_id === carrera.id) {
                semestress.push(semestrefilter);
              }
            });

            return (
              <div key={carrera.id} className="rounded-[2px] bg-[#B1E0FF] ">
                <div className="flex flex-row w-full justify-between items-center px-2 pt-1">
                  <div className="text-lg font-bold">{carrera?.nombre}</div>
                  <div className="text-gray-700 text-xs font-medium italic">
                    {active ? (
                      carrera?.estado ? (
                        "Carrera activa"
                      ) : (
                        "Carrera desactivada"
                      )
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                <div className="text-gray-700 text-sm line-clamp-2 text-justify font-medium h-[40px] px-2">
                  {carrera?.descripcion}
                </div>
                <div className="flex items-center w-full ">
                  <div className=" px-2 text-gray-700 w-full text-sm font-medium italic">
                    #{carrera?.encargado}
                  </div>
                  {active ? (
                    <div className=" flex w-full justify-end">
                      <button
                        onClick={() => {
                          carreraSelect.current = carrera.id;
                          setNombre(carrera.nombre);
                          setDescripcion(carrera.descripcion);
                          setEncargado(carrera.encargado);
                          setEstadoModal3(true);
                        }}
                        disabled={consultando}
                        className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px] mr-1"
                      >
                        {consultando ? "..." : <IconEdit />}
                      </button>
                      <button
                        onClick={() => {
                          carreraSelect.current = carrera.id;
                          estadoCarreraAlert();
                        }}
                        disabled={consultando}
                        className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px] mr-1"
                      >
                        {consultando ? "..." : <IconDesactivar />}
                      </button>
                      <button
                        onClick={() => {
                          carreraSelect.current = carrera.id;
                          setNombre("");
                          setDescripcion("");
                          setEstadoModal(true);
                        }}
                        disabled={consultando}
                        className="bg-green-700 hover:bg-green-900 text-white font-medium py-1 px-3 rounded-[3px] mr-2"
                      >
                        {consultando ? "..." : <IconCrear />}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <Carrusel2 semestre={semestress} />
                <hr />
                <Contenido />
              </div>
            );
          })}
        </div>
      ) : carrerasA?.length === 0 ? (
        <div className="italic ml-2">No hay carreras de momento </div>
      ) : (
        <div className="italic ml-2">No se encontro la carrera </div>
      )}
    </>
  );
};

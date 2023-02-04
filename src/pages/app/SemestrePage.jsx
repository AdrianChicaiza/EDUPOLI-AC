import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../contexts";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Loading from "./loading";
import InputCyan from "../../components/variants/InputCyan";
import { ComentarioCard } from "../../components/variants/ComentarioCard";
import { BACKEND } from "../VariableBck";
import { IconEdit } from "../../components/variants/IconEdit";
import { IconBuscar } from "../../components/variants/IconBuscar";
import { IconReset } from "../../components/variants/IconReset";
import { IconCrear } from "../../components/variants/IconCrear";
import { IconDisable } from "../../components/variants/IconDisable";
import { IconDelete } from "../../components/variants/IconDelete";
import { IconSendDocument } from "../../components/variants/IconSendDocument";
import { IconSendComent } from "../../components/variants/IconSendComent";

export const SemestrePage = () => {
  const { semestreid } = useParams();
  const tokenUser = localStorage.getItem("token");
  const [estadoModal, setEstadoModal] = useState(false);
  const [estadoModal2, setEstadoModal2] = useState(false);
  const [estadoModal3, setEstadoModal3] = useState(false);
  const [estadoModal4, setEstadoModal4] = useState(false);
  const [estadoModal5, setEstadoModal5] = useState(false);
  const [active, setActive] = useState(false);
  const comentariosSemestre = [];
  const { user } = useContext(AuthContext);
  const [materias, setMaterias] = useState(null);
  const materiaSelect = useRef(-1);
  const archivoSelect = useRef(-1);
  const comentSelect = useRef(-1);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("descripcion");
  const [encargado, setEncargado] = useState("encargado");
  const [recargar, setRecargar] = useState(true);
  let hasErrorsMateria = false;
  let hasErrorsDocumento = false;
  const [errorNombreDoc, setErrorNombreDoc] = useState("");
  const [errorDocumento, setErrorDocumento] = useState("");
  const [documentos, setdocumentos] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [comentario, setComentario] = useState("");
  const [documentosBD, setDocumentosBD] = useState([]);
  const documentosMateria = [];
  const [consultando, setConsultando] = useState(false);
  const [nombre_doc, setNombre_doc] = useState("");
  const [buscador, setBuscador] = useState("");
  const [materiasFiltradas, setMateriasFiltradas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [errorNombreMateria, seterrorNombreMateria] = useState("");
  const [path, setPath] = useState("");
  const [loadingboton, setLoadingboton] = useState(true);
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
      text: "Todo salio bien",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const estadoMateriaAlert = () => {
    Swal.fire({
      title: "Estas seguro de cambiar el estado de la materia?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        desactivarMateria();
      }
    });
  };
  const eliminarComentarioAlert = () => {
    Swal.fire({
      title: "Estas seguro de eliminar el comentario?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarComentarios();
      }
    });
  };
  const editarComentarioAlert = () => {
    Swal.fire({
      title: "Estas seguro de editar el comentario?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        editarComentario();
      }
    });
  };
  const actualizarMateriaAlert = () => {
    Swal.fire({
      title: "Estas seguro de actualizar la materia?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        actualizarMateria();
      }
    });
  };
  const eliminarDocumentoAlert = () => {
    Swal.fire({
      title: "Estas seguro de eliminar el documento?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarDocumento();
      }
    });
  };
  const editarDocumentoAlert = () => {
    Swal.fire({
      title: "Estas seguro de cambiar el Documento?",
      showDenyButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#1080C9",
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        editarDocumento();
      }
    });
  };
  const config = {
    headers: { Authorization: `${tokenUser}` },
  };
  const traerMateriasRol = async () => {
    if (user.role_id === 1) {
      setActive(true);
      traerMateriasAdmin();
      verDocumentos();
      verComentarios();
    } else {
      setActive(false);
      traerMaterias();
      verDocumentos();
      verComentarios();
    }
  };
  const traerMateriasAdmin = async () => {
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/materias/admin",
        config
      );
      const materias2 = [];
      response.data.data?.map((elemento) => {
        if (elemento.semestres_id == semestreid) {
          materias2.push(elemento);
        }
      });
      setMaterias(materias2);
      setMateriasFiltradas(materias2);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const traerMaterias = async () => {
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/materias/adminE",
        config
      );
      const materias2 = [];
      response.data.data?.map((elemento) => {
        if (elemento.semestres_id == semestreid) {
          materias2.push(elemento);
        }
      });
      setMaterias(materias2);
      setMateriasFiltradas(materias2);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const crearMateria = async () => {
    setConsultando(true);
    try {
      await axios.post(
        BACKEND + "/api/v1/materias/admin/" + materiaSelect.current,
        { nombre, descripcion, encargado },
        config
      );
      seterrorNombreMateria("");
      setEstadoModal(false);
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const actualizarMateria = async () => {
    setConsultando(true);
    try {
      await axios.put(
        BACKEND + "/api/v1/materias/admin/" + materiaSelect.current,
        { nombre, descripcion, encargado },
        config
      );
      setEstadoModal2(false);
      window.location = window.location.href;
      bienAlert();
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const desactivarMateria = async () => {
    setConsultando(true);
    try {
      await axios.get(
        BACKEND + "/api/v1/materias/desactiva/admin/" + materiaSelect.current,
        config
      );
      window.location = window.location.href;
      bienAlert();
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const subirDocumento = async () => {
    setConsultando(true);
    try {
      await axios.post(
        BACKEND + "/api/v1/documentos/admin/" + materiaSelect.current,
        { nombre_doc, documentos },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `${tokenUser}`,
          },
        }
      );
      window.location = window.location.href;
      bienAlert();
    } catch (error) {
      errorAlert();
      console.log(error.response.data.errors, "error");
    }
    setConsultando(false);
  };
  const verDocumentos = async () => {
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/documentos/admin",
        config
      );
      setDocumentosBD(response.data.data);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const eliminarDocumento = async () => {
    setConsultando(true);
    try {
      await axios.delete(
        BACKEND + "/api/v1/documentos/admin/" + archivoSelect.current,
        config
      );
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const editarDocumento = async () => {
    setConsultando(true);
    try {
      await axios.post(
        BACKEND +
          "/api/v1/documentos/admin/actualizar/" +
          archivoSelect.current,
        { nombre_doc, documentos },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `${tokenUser}`,
          },
        }
      );
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const comentar = async (e) => {
    setConsultando(true);
    e.preventDefault();
    try {
      await axios.post(
        BACKEND + "/api/v1/comentarios/admin/cambio/" + semestreid,
        { comentario },
        config
      );
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const verComentarios = async () => {
    setRecargar(true);
    try {
      const response = await axios.get(
        BACKEND + "/api/v1/comentarios/admin",
        config
      );
      const nuevoarreglo = [];
      response?.data?.data?.map((elemento) => {
        if (elemento?.semestres_id == semestreid) {
          nuevoarreglo.push(elemento);
        }
      });
      setComentarios(nuevoarreglo);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
    setRecargar(false);
  };

  const traerUsuarios = async () => {
    try {
      const response = await axios.get(BACKEND + "/api/v1/usuarios", config);
      setUsuarios(response.data.data.users);
    } catch (error) {
      console.log(error.response.data.message, "error");
    }
  };
  const editarComentario = async () => {
    setConsultando(true);
    try {
      await axios.put(
        BACKEND + "/api/v1/comentarios/admin/" + comentSelect.current,
        { comentario },
        config
      );
      bienAlert();
      window.location = window.location.href;
    } catch (error) {
      errorAlert();
    }
    setConsultando(false);
  };
  const eliminarComentarios = async () => {
    setConsultando(true);
    try {
      await axios.delete(
        BACKEND + "/api/v1/comentarios/admin/" + comentSelect.current,
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
    //background:"black",
    //padding:10
  };
  const buscarMateria = () => {
    if (materias) {
      if (buscador === "") {
        setMateriasFiltradas(materias);
        return;
      }
      const filtrado = [];
      materias?.map((materiaFil) => {
        if (materiaFil.nombre.includes(buscador)) {
          filtrado.push(materiaFil);
        }
      });
      setMateriasFiltradas(filtrado);
    }
  };
  const validacionMateria = () => {
    if (nombre === null || nombre === "") {
      seterrorNombreMateria("Este campo nombre es obligatorio");
      hasErrorsMateria = true;
    } else if (nombre.length < 3) {
      seterrorNombreMateria("El nombre debe tener mas de 4 caracteres");
      hasErrorsMateria = true;
    }
  };

  const validarDocumento = () => {
    if (nombre_doc === null || nombre_doc === "") {
      setErrorNombreDoc("Ingresa un nombre al documento");
      hasErrorsDocumento = true;
    } else if (nombre_doc < 3) {
      setErrorNombreDoc("El nombre no puede tener menos de 3 caracteres");
      hasErrorsDocumento = true;
    }
    if (document.formularioDoc.inputDoc.value === "") {
      console.log("No esta lleno el input file");
      setErrorDocumento("Debes escojer documento .pdf");
      hasErrorsDocumento = true;
    }
  };

  useEffect(() => {
    traerMateriasRol();
    traerUsuarios();
  }, []);
  // if (recargar || !comentarios) {
  //   return <Loading />;
  // }
  return (
    <>
      <Modal isOpen={estadoModal} style={modalStyle}>
        <ModalHeader>Crear Materia</ModalHeader>
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
                seterrorNombreMateria("");
              }}
              placeholder="Nombre de la materia"
              tamaño={50}
            />
            <p className="text-red-500 text-xs italic">{errorNombreMateria}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              validacionMateria(true);
              if (hasErrorsMateria) {
                return;
              } else {
                crearMateria();
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
              seterrorNombreMateria("");
              setEstadoModal(false);
            }}
            disabled={consultando}
            className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal2} style={modalStyle}>
        <ModalHeader>Editar Materia</ModalHeader>
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
                seterrorNombreMateria("");
              }}
              placeholder="Nombre de la Materia"
              tamaño={50}
            />
            <p className="text-red-500 text-xs italic">{errorNombreMateria}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              validacionMateria(true);
              if (hasErrorsMateria) {
                return;
              } else {
                actualizarMateriaAlert();
              }
            }}
            disabled={consultando}
            className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "Cargando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setEstadoModal2(false);
              setNombre("");
            }}
            disabled={consultando}
            className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px]"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal3} style={modalStyle}>
        <ModalHeader>Editar Documento</ModalHeader>
        <ModalBody>
          <div className="flex flex-col">
            <form name="formularioDoc" onSubmit={editarDocumento}>
              <label>Nombre</label>
              <InputCyan
                id="nombre_doc"
                name="nombre_doc"
                type="text"
                required
                value={nombre_doc}
                setvalue={(e) => {
                  setErrorNombreDoc("");
                  setNombre_doc(e);
                }}
                minLength={5}
              />
              <p className="flex justify-center text-red-500 text-xs italic">
                {errorNombreDoc}
              </p>
              <input
                className="text-sm text-grey-500
                 bg-sky-800 p-1 rounded-[2px] 
                 file:mr-1 file:py-1 file:px-2
                 file:rounded-lg file:border-0
                 file:text-md file:font-semibold  file:text-white
                 file:bg-sky-500  
                 hover:file:cursor-pointer hover:file:opacity-80
               "
                name="inputDoc"
                id="documentos"
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  setErrorDocumento("");
                  setdocumentos(e.target.files[0]);
                }}
              />
              <p className="flex justify-center text-red-500 text-xs italic">
                {errorDocumento}
              </p>
            </form>
            <div className="flex flex-row items-end w-full justify-start mt-2">
              <button
                onClick={() => {
                  // validarDocumento(true);
                  // if (hasErrorsDocumento) {
                  //   return;
                  // } else {
                  editarDocumentoAlert();
                  // }
                }}
                disabled={consultando}
                className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px] mr-1"
              >
                {consultando ? "Cargando..." : "Editar"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEstadoModal3(false);
                  setErrorNombreDoc("");
                  setErrorDocumento("");
                }}
                disabled={consultando}
                className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px]"
              >
                {consultando ? "..." : "Cerrar"}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      {/* //EDITAR ESTA PARTE DE EDITAR COMENTARIO ----------------------------------------------- */}
      <Modal isOpen={estadoModal4} style={modalStyle}>
        <ModalHeader>Editar Comentario</ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="comentario" className="font-medium">
              Comentario nuevo
            </label>
            <input
              className="w-full rounded-[2px] border border-gray-300 
              px-3 py-2 placeholder-gray-500 focus:z-10 focus:border-cyan-700 
              focus:outline-none focus:ring-cyan-700 sm:text-sm"
              type="text"
              name="comentario"
              id="comentario"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <button
            onClick={() => {
              editarComentarioAlert();
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "Cargando..." : "Editar"}
          </button>
          <button
            type="button"
            onClick={() => {
              setComentario("");
              setEstadoModal4(false);
            }}
            disabled={consultando}
            className=" inline-block px-3 py-1 h-9 bg-sky-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-sky-700 hover:shadow-lg focus:bg-sky-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-sky-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            {consultando ? "..." : "Cerrar"}
          </button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={estadoModal5} style={modalStyle}>
        <ModalHeader>Subir Documento</ModalHeader>
        <ModalBody>
          <div>
            <form name="formularioDoc" onSubmit={subirDocumento}>
              <label>Nombre</label>
              <InputCyan
                id="nombre_doc"
                name="nombre_doc"
                type="text"
                required
                value={nombre_doc}
                setvalue={(e) => {
                  setNombre_doc(e);
                  setErrorNombreDoc("");
                }}
                minLength={5}
              />
              <p className="flex justify-center text-red-500 text-xs italic">
                {errorNombreDoc}
              </p>

              <input
                className="text-sm text-grey-500
                 bg-sky-800 p-1 rounded-[2px]
                 file:mr-1 file:py-1 file:px-2
                 file:rounded-lg file:border-0
                 file:text-md file:font-semibold  file:text-white
                 file:bg-sky-500  
                 hover:file:cursor-pointer hover:file:opacity-80
               "
                name="inputDoc"
                id="documentos"
                type="file"
                accept=".pdf"
                onChange={(e) => {
                  setErrorDocumento("");
                  setdocumentos(e.target.files[0]);
                }}
              />
              <p className="flex justify-center text-red-500 text-xs italic">
                {errorDocumento}
              </p>
            </form>
            <div className="flex flex-row items-end w-full justify-start mt-2">
              <button
                onClick={() => {
                  validarDocumento(true);
                  if (hasErrorsDocumento) {
                    return;
                  } else {
                    subirDocumento();
                  }
                }}
                disabled={consultando}
                className="bg-sky-600 hover:bg-sky-900 text-white font-bold py-1 px-3 rounded-[3px] mr-1"
              >
                {consultando ? "Cargando..." : "Subir"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setEstadoModal5(false);
                  setErrorNombreDoc("");
                  setErrorDocumento("");
                }}
                disabled={consultando}
                className="bg-sky-900 hover:bg-sky-600 text-white font-bold py-1 px-3 rounded-[3px]"
              >
                {consultando ? "..." : "Cerrar"}
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          buscarMateria();
        }}
        className="flex flex-row justify-start"
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
            setMateriasFiltradas(materias);
            setBuscador("");
          }}
          className="bg-red-800 hover:bg-red-900 text-white font-medium py-1 px-3 rounded-r-lg"
        >
          <IconReset />
        </button>
      </form>
      <div className="flex flex-row bg-[#B1E0FF] rounded-[2px]  items-center justify-between mt-1">
        <div className="font-semibold text-3xl ml-2">Materias</div>
        {active ? (
          <div className="flex flex-row items-center">
            <button
              type="button"
              onClick={() => {
                setEstadoModal(true);
                materiaSelect.current = semestreid;
              }}
              className="bg-green-700 hover:bg-green-900 text-white font-medium py-1 px-3 rounded-[3px]"
            >
              <IconCrear />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      {materiasFiltradas?.length > 0 ? (
        <div>
          {materiasFiltradas?.map((materiasSemestre) => {
            {
              documentosBD?.map((docs) => {
                if (docs.materias_id === materiasSemestre.id) {
                  documentosMateria.push(docs);
                }
              });
            }
            let counter = 0;
            return (
              <div key={materiasSemestre.id}>
                <div className="flex flex-row justify-between items-center rounded-[2px] bg-[#1F618D] mt-1">
                  <div className="flex flex-row justify-between items-center p-1 w-full">
                    <div className=" text-stone-50 pl-3 mr-3 ">
                      {materiasSemestre.nombre}
                    </div>
                    {active ? (
                      <div className="text-gray-300 text-xs font-medium italic">
                        {materiasSemestre.estado ? "Activo" : "Inactivo"}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  {active ? (
                    <div className="flex flex-row">
                      <button
                        type="button"
                        onClick={() => {
                          setEstadoModal2(true);
                          setNombre(materiasSemestre.nombre);
                          materiaSelect.current = materiasSemestre.id;
                        }}
                        className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px]"
                      >
                        {consultando ? "..." : <IconEdit />}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          materiaSelect.current = materiasSemestre.id;
                          estadoMateriaAlert();
                        }}
                        disabled={consultando}
                        className="bg-sky-900 hover:bg-sky-700 text-white font-medium py-1 px-3 rounded-[3px]"
                      >
                        {consultando ? "..." : <IconDisable />}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex flex-col h-auto justify-between items-start rounded-[2px] bg-[#B1E0FF] h-10 px-2 py-1">
                  <div className="flex flex-col w-full rounded-[2px]">
                    <div>
                      {documentosMateria?.map((docs) => {
                        if (docs.materias_id === materiasSemestre.id) {
                          {
                            counter += 1;
                          }
                          return (
                            <div
                              key={docs.id}
                              className="flex flex-row justify-between items-center rounded-[2px] bg-[#2874A6] mb-1 ml-2"
                            >
                              <div className="line-clamp-1">
                                <a
                                  href={docs.path}
                                  className="flex justify-start  h-7 w-full items-center px-1 no-underline text-white"
                                >
                                  {docs.nombre_doc}.pdf
                                </a>
                              </div>

                              {active ? (
                                <div className="flex flex-row">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      archivoSelect.current = docs.id;
                                      setEstadoModal3(true);
                                      setNombre_doc(docs.nombre_doc);

                                      // setdocumentos(docs.path);

                                      // console.log("documeto", docs.path);
                                    }}
                                    className="bg-sky-600 hover:bg-sky-900 text-white font-medium py-1 px-3 rounded-[3px]"
                                  >
                                    {consultando ? "..." : <IconEdit />}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      archivoSelect.current = docs.id;
                                      eliminarDocumentoAlert();
                                    }}
                                    disabled={consultando}
                                    className="bg-sky-900 hover:bg-sky-600 text-white font-medium py-1 px-3 rounded-[3px]"
                                  >
                                    {consultando ? "..." : <IconDelete />}
                                  </button>
                                </div>
                              ) : (
                                <></>
                              )}
                            </div>
                          );
                        }
                      })}
                      {counter === 0 && (
                        <div className="italic ml-2">
                          No se encontro documentos en esta materia
                        </div>
                      )}
                    </div>
                  </div>
                  {active ? (
                    <div className="flex flex-row w-full justify-between items-center mt-2">
                      <button
                        onClick={() => {
                          setNombre_doc("");
                          materiaSelect.current = materiasSemestre.id;
                          setEstadoModal5(true);
                        }}
                        disabled={consultando}
                        className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-2 px-3 rounded-[3px]"
                      >
                        {consultando ? "..." : <IconSendDocument />}
                      </button>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : materias?.length === 0 ? (
        "No hay materias de momento"
      ) : (
        "No se encontro la materia"
      )}
      <div className="font-semibold text-base mt-2">Comentarios </div>
      <div className="flex flex-col justify-center items-start rounded-[2px] bg-[#1F618D] mt-1 p-2">
        <form
          onSubmit={comentar}
          className="flex justify-between items-center w-full"
        >
          <div className="flex flex-row justify-between items-center mb-1 w-full">
            <input
              id="comentario"
              name="comentario"
              type="text"
              value={comentario}
              required
              className="w-full rounded-[1px] border
              border-gray-300 px-3 py-1 placeholder-gray-500 
              focus:z-10 focus:border-cyan-700 focus:outline-none focus:ring-cyan-700 sm:text-sm"
              placeholder="Comentario"
              onChange={(e) => setComentario(e.target.value)}
            />

            <button
              type="submit"
              disabled={consultando}
              className="bg-sky-600 hover:bg-sky-900 text-white font-medium py-1 px-3 h-9 rounded-[3px] h-[32px]"
            >
              {consultando ? "..." : <IconSendComent />}
            </button>
          </div>
        </form>
        {comentarios?.map((comentariosFil) => (
          <div
            className="flex flex-col w-full mb-1 pl-1 rounded-[5px] bg-[#B1E0FF] justify-start "
            key={comentariosFil.id}
          >
            <ComentarioCard
              usuarios={usuarios}
              permiso={user.id === comentariosFil.user_id || user.role_id === 1}
              consultando={consultando}
              comentario={comentariosFil}
              estadoboton={setLoadingboton}
              onClickDelete={() => {
                comentSelect.current = comentariosFil.id;
                eliminarComentarioAlert();
              }}
              onClickEdit={() => {
                comentSelect.current = comentariosFil.id;
                setComentario(comentariosFil.comentario);
                setEstadoModal4(true);
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

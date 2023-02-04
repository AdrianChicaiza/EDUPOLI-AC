import React, { useContext } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import { AuthContext } from "../../contexts";
const theme = {
  background: "#f5f8fb",
  headerBgColor: "#1F618D",
  headerFontColor: "#fff",
  headerFontSize: "20px",
  botBubbleColor: "#3498DB",
  botFontColor: "#fff",
  userBubbleColor: "#2874A6",
  userFontColor: "#fff",
};

const conff = {
  zIndex: 1000,
};

const burbuja = {
  borderRadius: "10px",
  marginLeft: "1px",
};

const CardESFOT = () => {
  return (
    <div
      className="bg-[#71B3DF] h-[50px] w-[200px] 
      flex flex-row justify-center items-center
      rounded-[5px]  border-2 border-black"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 color-white"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
        />
      </svg>

      <a
        className="ml-1 no-underline text-white italic"
        href="https://esfot.epn.edu.ec"
      >
        Página de la ESFOT
      </a>
    </div>
  );
};
const CardCorreo = () => {
  return (
    <div
      className="bg-[#71B3DF] h-[50px] w-full 
      flex flex-row justify-center items-center
      rounded-[5px]  border-2 border-black"
    >
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
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>

      <div
        className="ml-1 no-underline text-white italic"
      >
        steven.chicaiza@epn.edu.ec
      </div>
    </div>
  );
};

export const Contenido = () => {
  const { user } = useContext(AuthContext);
  const steps = [
    {
      id: "Name",
      message: "Hola " + user.full_name + ", ¿Dime en que puedo ayudarte? 🧐",
      trigger: "issues",
    },

    {
      id: "issues",
      options: [
        {
          value: "Peticion",
          label: "Quiero hacer una peticion",
          trigger: "Peticion",
        },
        { value: "EduPoli", label: "¿Que es EduPoli?", trigger: "EduPoli" },
        { value: "ESFOT", label: "¿Que es ESFOT?", trigger: "ESFOT" },
      ],
    },

    {
      id: "Peticion",
      message:
        "Claro, Si tienes dudas, sugerencias o quieres hacer una petición puedes contactarte y te ayudaremos los mas pronto posible 😉",
      trigger: "contacto",
    },
    // {
    //   id: "contacto",
    //   component: <CardWhatsaap />,
    //   trigger: "correo",
    // },
    {
      id: "contacto",
      component: <CardCorreo />,
      trigger: "edu2",
    },
    {
      id: "EduPoli",
      message:
        "EduPoli es una plataforma en donde puedes encontrar material de estudio de las diferentes carreras de la ESFOT",
      trigger: "edu2",
    },
    {
      id: "edu2",
      message: "¿Necesitas algo mas? 🧐",
      trigger: "opciones",
    },
    {
      id: "opciones",
      options: [
        { value: "Si", label: "Si", trigger: "Si" },
        { value: "No", label: "No", trigger: "No" },
      ],
    },
    {
      id: "Si",
      message: "Dime en que puedo ayudarte? 🧐",
      trigger: "issues",
    },
    {
      id: "No",
      message: "Que tengas un lindo dia 😁",
      end: true,
    },
    {
      id: "ESFOT",
      message:
        "La ESFOT o Escuela de Formación de Tecnologos, es una de las muchas facultades de la Escuela Politecnica Nacional",
      trigger: "es2",
    },
    {
      id: "es2",
      message:
        "En esta Facultad encontramos distintas carreras que pueden llamar tu atención",
      trigger: "es3",
    },
    {
      id: "es3",
      message:
        "Si quieres saber mas informacion de la ESFOT, puedes visitar su pagina web 😎",
      trigger: "es4",
    },
    {
      id: "es4",
      component: <CardESFOT />,
      trigger: "edu2",
    },
  ];
  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        bubbleOptionStyle={burbuja}
        style={conff}
        placeholder="..."
        floating={true}
        steps={steps}
      />
    </ThemeProvider>
  );
};

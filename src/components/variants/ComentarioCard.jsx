import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../pages/app/loading";
import { IconDelete } from "./IconDelete";
import { IconEdit } from "./IconEdit";

export const ComentarioCard = ({
  usuarios,
  permiso,
  comentario,
  consultando,
  estadoboton,
  onClickDelete,
  onClickEdit,
}) => {
  const [usuarioComentario, setUsuarioComentario] = useState(null);
  const [cargandoComents, setCargandoComents] = useState(false);

  const usuarioWhoCommented = () => {
    usuarios?.map((usuarioComent) => {
      if (usuarioComent.id === comentario.user_id) {
        setUsuarioComentario(usuarioComent);
        return;
      }
    });
  };

  useEffect(() => {
    usuarioWhoCommented();
  }, [usuarios]);

  if (cargandoComents) {
    return <Loading small />;
  }
  return (
    <div>
      <div className="flex flex-row items-center p-1  mb-1	w-full">
        <img
          src={
            usuarioComentario?.avatar
              ? usuarioComentario?.avatar
              : "https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png"
          }
          alt=""
          className="mr-2 w-10 h-10 rounded-full object-cover"
        />
        <div className="items-center text-base ">
          <div className="flex items-center text-base ">
            {usuarioComentario?.first_name?usuarioComentario?.first_name:"Comentario..."} {usuarioComentario?.last_name?usuarioComentario?.last_name:""}
          </div>
          <div className="flex text-sm items-center text-base line-clamp-2">
            {comentario?.comentario}
          </div>
        </div>
      </div>
      {permiso === true && (
        <div className="flex flex-row justify-start w-full h-[30px] mb-1">
          <button
            type="button"
            onClick={onClickEdit}
            className="bg-sky-700 hover:bg-sky-900 text-white font-medium py-1 px-3 "
            id="EditComentarioSelect"
          >
            {consultando ? "..." : <IconEdit />}
          </button>
          <button
            type="button"
            onClick={onClickDelete}
            disabled={consultando}
            className="bg-red-800 hover:bg-red-900 text-white font-medium py-1 px-3 "
            id="EliminarDocSelec"
          >
            {consultando ? "..." : <IconDelete />}
          </button>
        </div>
      )}
    </div>
  );
};

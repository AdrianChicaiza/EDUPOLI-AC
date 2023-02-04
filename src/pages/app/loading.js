import { VscLoading as Spinner } from "react-icons/vsc";
import style from "./css/Loading.module.css";

export default function Loading({ small }) {
  return (
    <div className={`${style.spinner}`}>
      <Spinner className={style.spinning} size={small ? 20 : 50} />
      {small ? <></> : <div className={style.text}>Cargando...</div>}
    </div>
  );
}

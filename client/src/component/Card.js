import CardCss from "./Card.module.css";
import deleteIcon from "../assets/icons/delete.png";
import { useState } from "react";
import URL from "../enum/enum";
export default function Card({ note, callBack }) {
  const [show, setShow] = useState(false);
  let { title, content, creationDate } = note;
  creationDate = creationDate.split("T")[0];
  async function deleteNote() {
    const reponse = await fetch(`${URL.BASE_URL}/notes/${note._id}`, {
      method: "DELETE",
    });
    const data = await reponse.json();
    console.log(data);
    setShow(false);
    callBack();
  }
  return (
    <div className={CardCss.card}>
      <p className={CardCss.title}>{title}</p>
      <p className={CardCss.content}>{content}</p>
      <p className={CardCss.creationDate}>{creationDate}</p>
      <button className={CardCss.delete} onClick={(() => setShow)(true)}>
        <img src={deleteIcon} alt="delete" />
      </button>
      <div className={show ? CardCss.dialogContainer : CardCss.hideDialog}>
        <div className={CardCss.dialog}>
          <p className={CardCss.dialogTitle}>Delete Note</p>
          <p className={CardCss.dialogContent}>
            Are you sure you want to delete this note?
          </p>
          <div className={CardCss.dialogButtons}>
            <button className={CardCss.dialogYes} onClick={() => deleteNote()}>
              Yes
            </button>
            <button className={CardCss.dialogNo} onClick={() => setShow(false)}>
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

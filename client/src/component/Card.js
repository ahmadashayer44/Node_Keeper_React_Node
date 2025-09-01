import CardCss from "./Card.module.css";
import deleteIcon from "../assets/icons/delete.png";
import { useState } from "react";
import URL from "../enum/enum";
export default function Card({ note, callBack }) {
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  let { title, content, creationDate } = note;
  const [updatedTitle, setUpdatedTitle] = useState(title);
  const [updatedContent, setUpdatedContent] = useState(content);
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
  async function updateNote() {
    const reponse = await fetch(`${URL.BASE_URL}/notes/${note._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: updatedTitle, content: updatedContent }),
    });
    const data = await reponse.json();
    console.log(data);
    setShowDialog(false);
    callBack();
  }

  return (
    <div
      className={CardCss.card}
      key={note._id}
      onClick={() => setShowDialog(true)}
    >
      <p className={CardCss.title}>{title}</p>
      <p className={CardCss.content}>{content}</p>
      <p className={CardCss.creationDate}>{creationDate}</p>
      <button
        className={CardCss.delete}
        onClick={(e) => {
          e.stopPropagation();
          setShow(true);
        }}
      >
        <img src={deleteIcon} alt="delete" />
      </button>
      <div className={show ? CardCss.dialogContainer : CardCss.hideDialog}>
        <div className={CardCss.dialog} onClick={(e) => e.stopPropagation()}>
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

      <div
        className={showDialog ? CardCss.dialogContainer : CardCss.hideDialog}
      >
        <div className={CardCss.dialog} onClick={(e) => e.stopPropagation()}>
          <input
            className={CardCss.input}
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          <input
            className={CardCss.input}
            type="text"
            value={updatedContent}
            onChange={(e) => setUpdatedContent(e.target.value)}
          />
          <p className={CardCss.creationDateDialog}>{creationDate}</p>
          <div className={CardCss.dialogButtons}>
            <button
              className={CardCss.dialogNo}
              onClick={() => {
                setUpdatedTitle(title);
                setUpdatedContent(content);
                setShowDialog(false);
              }}
            >
              Close
            </button>
            <button className={CardCss.dialogYes} onClick={updateNote}>
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

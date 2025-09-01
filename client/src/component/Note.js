import NoteCss from "./Note.module.css";
import { useState } from "react";
import URL from "../enum/enum.js";
export default function Note({ callBack }) {
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function addNote() {
    const response = await fetch(`${URL.BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content }),
    });
    const data = await response.json();
    console.log(data);
    setShow(false);
    setShowDialog(false);
    callBack();
  }
  return (
    <>
      {!show && (
        <div className={NoteCss.noteBox}>
          <div className={NoteCss.note}>
            <input
              className={NoteCss.input}
              type="text"
              placeholder="Type a Note..."
              onClick={() => setShow(true)}
            />
          </div>
        </div>
      )}
      {show && (
        <div className={NoteCss.noteBox}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setShowDialog(true);
            }}
            className={NoteCss.noteBoxContainer}
          >
            <input
              className={NoteCss.inputTitle}
              type="text"
              placeholder="Title"
              required
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className={NoteCss.inputContent}
              type="text"
              placeholder="Type a Note..."
              required
              onChange={(e) => setContent(e.target.value)}
            />
            <button className={NoteCss.cancel} onClick={() => setShow(false)}>
              Cancel
            </button>
            <button type="submit" className={NoteCss.save}>
              Add
            </button>
          </form>
        </div>
      )}
      <div
        className={showDialog ? NoteCss.dialogContainer : NoteCss.hideDialog}
      >
        <div className={NoteCss.dialog}>
          <p className={NoteCss.dialogTitle}>Add Note</p>
          <p className={NoteCss.dialogContent}>
            Are you sure you want to add this note?
          </p>
          <div className={NoteCss.dialogButtons}>
            <button className={NoteCss.dialogYes} onClick={() => addNote()}>
              Yes
            </button>
            <button
              className={NoteCss.dialogNo}
              onClick={() => setShowDialog(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

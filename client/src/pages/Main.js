import MainCss from "./Main.module.css";
import Header from "../component/Header";
import Note from "../component/Note";
import { useEffect, useState } from "react";
import URL from "../enum/enum.js";
import Card from "../component/Card.js";
export default function Main() {
  const [notes, setNotes] = useState([]);
  async function fetchNotes() {
    const respose = await fetch(`${URL.BASE_URL}/notes`);
    const data = await respose.json();
    setNotes(data);
  }
  useEffect(() => {
    fetchNotes();
  }, []);
  return (
    <div className={MainCss.main}>
      <Header />
      <Note />
      <div className={MainCss.card}>
        {notes.map((note) => {
          return <Card key={note._id} note={note} callBack={fetchNotes} />;
        })}
      </div>
    </div>
  );
}

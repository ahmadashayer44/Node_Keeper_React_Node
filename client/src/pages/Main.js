import MainCss from "./Main.module.css";
import Header from "../component/Header";
import Note from "../component/Note";
import { useEffect, useState } from "react";
import URL from "../enum/enum.js";
import Card from "../component/Card.js";
export default function Main() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");
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
      <Header search={search} setSearch={setSearch} />
      <Note callBack={fetchNotes} />
      <div className={MainCss.card}>
        {notes.map((note) => {
          if (search) {
            if (note.title.toLowerCase().includes(search.toLowerCase())) {
              return <Card key={note._id} note={note} callBack={fetchNotes} />;
            }
          } else {
            return <Card key={note._id} note={note} callBack={fetchNotes} />;
          }
        })}
      </div>
    </div>
  );
}

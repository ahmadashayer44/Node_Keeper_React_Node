import MainCss from "./Main.module.css";
import Header from "../component/Header";
import Note from "../component/Note";
export default function Main() {
  return (
    <div className={MainCss.main}>
      <Header />
      <Note />
    </div>
  );
}

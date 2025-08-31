import CardCss from "./Card.module.css";

export default function Card({ note }) {
  let { title, content, creationDate } = note;
  creationDate = creationDate.split("T")[0];
  return (
    <div className={CardCss.card}>
      <p className={CardCss.title}>{title}</p>
      <p className={CardCss.content}>{content}</p>
      <p className={CardCss.creationDate}>{creationDate}</p>
    </div>
  );
}

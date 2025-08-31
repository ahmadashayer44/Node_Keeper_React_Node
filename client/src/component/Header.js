import search from "../assets/icons/loupe.png";
import headerCss from "./Header.module.css";
export default function Header() {
  return (
    <div className={headerCss.header}>
      <h1 className={headerCss.title}>My Note Keeper</h1>
      <label className={headerCss.searchContainer} htmlFor="search">
        <img className={headerCss.icon} src={search} alt="search" />
        <input
          className={headerCss.search}
          id="search"
          type="text"
          placeholder="Search"
        />
      </label>
    </div>
  );
}

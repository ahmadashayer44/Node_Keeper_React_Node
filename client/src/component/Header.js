import searchIcon from "../assets/icons/loupe.png";
import headerCss from "./Header.module.css";
export default function Header({ search, setSearch }) {
  return (
    <div className={headerCss.header}>
      <h1 className={headerCss.title}>My Note Keeper</h1>
      <label className={headerCss.searchContainer} htmlFor="search">
        <img className={headerCss.icon} src={searchIcon} alt="search" />
        <input
          className={headerCss.search}
          id="search"
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>
    </div>
  );
}

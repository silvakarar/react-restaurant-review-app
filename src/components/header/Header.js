import { Icon } from "@iconify/react";
import locationIcon from "@iconify/icons-mdi/food";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1>
        <Icon icon={locationIcon} className="icon" /> Restaurant Review Map
      </h1>
    </header>
  );
};

export default Header;

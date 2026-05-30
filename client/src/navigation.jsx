import { useNavigate } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiAlbum } from "@mdi/js";

function Navigation() {
  const navigate = useNavigate();

  return (
    <div className="navbar-wrapper">
      <div className="navbar-inner">
        <div className="navbar-left" onClick={() => navigate("")} style={{ cursor: "pointer" }}>
          <Icon path={mdiAlbum} size={1.1} color="#6db89a" />
          <div>
            <span className="navbar-title">Hudební deník</span>
            <span className="navbar-subtitle">Evidence alb a dojmů</span>
          </div>
        </div>
        <div>
          <button className="navbar-link" onClick={() => navigate("")}>
            Alba
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
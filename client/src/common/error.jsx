import Icon from "@mdi/react";
import { mdiAlertCircle } from "@mdi/js";

const Error = ({ message }) => {
  return (
    <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
      <Icon path={mdiAlertCircle} size={3} color={"red"} />
      <p>{message}</p>
    </div>
  );
};

export default Error;
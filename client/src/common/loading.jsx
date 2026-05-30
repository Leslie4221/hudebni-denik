import Icon from "@mdi/react";
import { mdiLoading } from "@mdi/js";

const Loading = () => {
  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <Icon path={mdiLoading} size={3} spin={true} color={"grey"} />
    </div>
  );
};

export default Loading;
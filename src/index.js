const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

const albumRoutes = require("./routes/album");
app.use("/album", albumRoutes);

const zaznamPoslechuRoutes = require("./routes/zaznam-poslechu");
app.use("/zaznam-poslechu", zaznamPoslechuRoutes);

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
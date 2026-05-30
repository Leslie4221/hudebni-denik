const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const albumRoutes = require("./routes/album");
app.use("/album", albumRoutes);

const zaznamPoslechuRoutes = require("./routes/zaznam-poslechu");
app.use("/zaznam-poslechu", zaznamPoslechuRoutes);

app.get("/", (req, res) => {
  res.send("Hudební deník API");
});

app.listen(PORT, () => {
  console.log(`Server běží na portu ${PORT}`);
});
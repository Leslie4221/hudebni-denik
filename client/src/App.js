import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout";
import Albums from "./album/albums";
import AlbumDetail from "./zaznam-poslechu/album-detail";
import "./App.css";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Albums />} />
            <Route path="/albumDetail/:id" element={<AlbumDetail />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
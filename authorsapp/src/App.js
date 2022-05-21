import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Public from "./pages/Public";
import Designed from "./pages/Designed";
import InfoPage from "./pages/InfoPage";
import InfoPage2 from "./pages/InfoPage2";
import './App.css';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="public" element={<Public />} />
                  <Route path="designed" element={<Designed />} />
                  <Route path="info" element={<InfoPage />} />
                  <Route path="info-custom" element={<InfoPage2 />} />
              </Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;

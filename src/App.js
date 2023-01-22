import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditEntry from "./components/EditEntry";
import EditExit from "./components/EditExit";
import Home from "./components/Home";
import Login from "./components/Login";
import NewEntry from "./components/NewEntry";
import NewExit from "./components/NewExit";
import SignUp from "./components/SignUp";
import AuthProvider from "./contexts/Context";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/nova-entrada" element={<NewEntry />} />
          <Route path="/nova-saida" element={<NewExit />} />
          <Route path="/editar-entrada/:id" element={<EditEntry />} />
          <Route path="/editar-saida/:id" element={<EditExit />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

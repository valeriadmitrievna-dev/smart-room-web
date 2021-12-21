import { Routes, Route, Navigate } from "react-router-dom";
import Menu from "@/components/Menu";

function App() {
  return (
    <>
      <Menu />
      <Routes>
        <Route exact path="/dashboard" element={<div>dashboard</div>} />
        <Route exact path="/members" element={<div>members</div>} />
        <Route exact path="/chat" element={<div>chat</div>} />
        <Route exact path="/devices" element={<div>devices</div>} />
        <Route exact path="/settings" element={<div>settings</div>} />
        <Route exact path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <div>side</div>
    </>
  );
}

export default App;

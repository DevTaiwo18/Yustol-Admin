import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AddPackage from './pages/AddPackage';
import Packages from './pages/Packages';
import SignIn from './pages/SignIn';

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="/home" element={<Home />}>
        <Route index element={<Navigate to="add-package" />} /> {/* Default to AddPackage */}
        <Route path="add-package" element={<AddPackage />} />
        <Route path="packages" element={<Packages />} />
      </Route>
    </Routes>
  );
}

export default App;

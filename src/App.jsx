import { Suspense, useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";

function App() {
  return (
    //<Routes>
    //    <Route path="/" element={<HomePage />} />
    //    <Route path="/login" element={<Login />} />
    //    <Route path="/register" element={<Register />} />
    //</Routes>
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </div>
  );
}

export default App;

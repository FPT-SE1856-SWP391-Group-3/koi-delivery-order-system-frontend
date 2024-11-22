import { Suspense } from "react"
import "./App.css"
import { RouterProvider } from "react-router-dom"
import router from "./routes/Router"

function App() {
    return (
        //<Routes>
        //    <Route path="/" element={<HomePage />} />
        //    <Route path="/login" element={<Login />} />
        //    <Route path="/register" element={<Register />} />
        //</Routes>
        <div className="app">
            <Suspense>
                <RouterProvider router={router} />
            </Suspense>
        </div>
    )
}

export default App

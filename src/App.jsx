import { useState } from 'react'
import './App.css'
import "./index.css";
import Datatables from "./components/datatables.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <Datatables></Datatables>
        </div>
      </div>
    </>
  )
}

export default App

import AppLayout from './shared/Components/Layouts/AppLayout';
import { Routes, Route, Navigate, data } from "react-router-dom";
import List from './pages/List';
import Home from './pages/Home';
import Timer from './pages/Nav';
import TableData from "./pages/table-data";
import Nav from './pages/Nav'

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/table-data" element={<TableData/>}/>
          <Route path="/timer" element={<Timer/>}/>
          <Route path="/nav" element={<Nav/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
  )
}

export default App

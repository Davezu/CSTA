import AppLayout from './shared/Components/Layouts/AppLayout';
import { Routes, Route, Navigate, data } from "react-router-dom";
import List from './pages/list';
import Home from './pages/home';
import Timer from './pages/nav';
import TableData from "./pages/table-data";
import Nav from './pages/nav'

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

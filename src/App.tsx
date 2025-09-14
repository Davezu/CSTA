import AppLayout from './shared/Components/Layouts/AppLayout';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/home';
import TableData from "./pages/table-data";
import Nav from './pages/nav'
import Subject from './pages/subject-course';
import Settings from './pages/settings';
import List from './pages/list';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
          <Route index element={<Home/>}/>
          <Route path="/table-data" element={<TableData/>}/>
          <Route path="/subject-course" element={<Subject/>}/>
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/list" element={<List/>}/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
  )
}

export default App

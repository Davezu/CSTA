import AppLayout from './shared/Components/Layouts/AppLayout';
import { Routes, Route, Navigate } from "react-router-dom";
import List from './pages/List';
import Home from './pages/Home';
import Timer from './pages/Timer';
import Homepage from './pages/Homepage';

const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
          <Route index element={<Homepage/>}/>
          <Route path="Home" element={<Home/>}/>
          <Route path="List" element={<List />} />
          <Route path="Timer" element={<Timer />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
  )
}

export default App

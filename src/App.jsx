import RootLayout from './shared/Components/Layouts/RootLayouts';
import { Routes, Route } from "react-router-dom";
import List from './pages/List';
import Home from './pages/Home';
import Timer from './pages/Timer';

const App = () => {

  return (
    <Routes>
      <Route element={<RootLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/List" element={<List />} />
          <Route path="/Timer" element={<Timer />} />
        </Route>
    </Routes>
  )
}

export default App

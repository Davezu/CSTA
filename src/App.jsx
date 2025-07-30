import RootLayout from './shared/Components/Layouts/RootLayouts';
import { Routes, Route } from "react-router-dom";
import List from './pages/List';
import Home from './pages/Home';

const App = () => {

  return (
    <Routes>
      <Route element={<RootLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/List" element={<List />} />
        </Route>
    </Routes>
  )
}

export default App

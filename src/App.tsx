import AppLayout from './shared/Components/Layouts/AppLayout';
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Home from './pages/home';
import TableData from "./pages/table-data";
import Subject from './pages/subject-course';
import Settings from './pages/settings';
import List from './pages/list';
import Inbox from './pages/inbox'
import Grades from './pages/grades';
import Modules from './pages/modules';
import Login from './pages/login';

function ProtectedRoutes() {
  const { isAuthenticated, isLoading } = useAuth()
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }
  
  if (!isAuthenticated) {
    return <Login />
  }
  
  return (
    <Routes>
      <Route path="/" element={<AppLayout/>}>
        <Route index element={<Home/>}/>
        <Route path="/inbox" element={<Inbox/>}/>
        <Route path="/grades" element={<Grades/>}/>
        <Route path="/modules" element={<Modules/>}/>
        <Route path="/table-data" element={<TableData/>}/>
        <Route path="/subject-course" element={<Subject/>}/>
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

const App = () => {
  return (
    <AuthProvider>
      <ProtectedRoutes />
    </AuthProvider>
  )
}

export default App

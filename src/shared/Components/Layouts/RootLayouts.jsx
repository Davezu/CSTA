import { Link, Outlet } from "react-router-dom"; 
const RootLayout = () => {
  return (
    <div className="root-main">
      <Link to="/List">List</Link>
      <Outlet />
    </div>
  )
}

export default RootLayout

import { Link, Outlet } from "react-router-dom"; 

const RootLayout = () => {

  return (
    <div className="root-main">
          <Link to="/">Home</Link>
          <Link to="/List">List</Link>
          <Link to="/Timer">Timer</Link>
          <Link to="/Homepage">Homepage</Link>
      <Outlet />
    </div>
  )
}

export default RootLayout

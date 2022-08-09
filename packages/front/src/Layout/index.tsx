import { Outlet, Link } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <h1>Front</h1>
      <nav>
        <Link to="/">home</Link>
        <Link to="login">Login</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout

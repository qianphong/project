import { Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import Home from './views/Home'
import Login from './views/Login'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>
    </Routes>
  )
}

export default App

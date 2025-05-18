import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import '../style/app.scss'
import { Balance, Woter } from '../../pages'

function App() {
  return (
    <BrowserRouter>
      <nav>
      <NavLink to="/woter" className={({ isActive }) => (isActive ? 'active' : '')}>
  Woter
</NavLink>

<NavLink to="/" className={({ isActive }) => (isActive ? 'active' : '')}>
  Balance
</NavLink>

      </nav>

      <Routes>
        <Route path="/" element={<Balance />} />
        <Route path="/woter" element={<Woter />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

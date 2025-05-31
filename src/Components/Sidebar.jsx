import React, { useState } from 'react'
import '../Styles/sidebar.css'
import { NavLink } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      {/* Faqat menyu icon */}
      <div className="menu-button">
        <FiMenu onClick={toggleSidebar} className="menu-icon" />
      </div>

      {/* Modal tarzidagi sidebar */}
      <aside className={`sidebar-modal ${isOpen ? 'show' : ''}`}>
        <div className="sidebar-header">
          <h2>Kutubxona</h2>
          <FiX onClick={toggleSidebar} className="close-icon" />
        </div>

        <ul className="nav-list">
          <NavLink to='/home'>
            {({ isActive }) => (
              <li className={isActive ? 'nav-item active' : 'nav-item'} onClick={toggleSidebar}>
                🏠 Bosh sahifa
              </li>
            )}
          </NavLink>

          <NavLink to='/products'>
            {({ isActive }) => (
              <li className={isActive ? 'nav-item active' : 'nav-item'} onClick={toggleSidebar}>
                📦 Kitoblar
              </li>
            )}
          </NavLink>

          <NavLink to='/orders'>
            {({ isActive }) => (
              <li className={isActive ? 'nav-item active' : 'nav-item'} onClick={toggleSidebar}>
                🧾 Buyurtmalar
              </li>
            )}
          </NavLink>

          <NavLink to='/'>
            {({ isActive }) => (
              <li className={isActive ? 'nav-item active' : 'nav-item'} onClick={toggleSidebar}>
                🚪 Chiqish
              </li>
            )}
          </NavLink>
        </ul>
      </aside>

      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  )
}

export default Sidebar

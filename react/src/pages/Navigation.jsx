import React from 'react'
import { Link } from 'react-router-dom'
import './Navigation.css'

const Navigation = () => {
  return (
    <nav className="neon-nav">
        <Link to="/" className="neon-link">Home</Link>
        <Link to="/apitable" className="neon-link">ApiTable</Link>
        <Link to="/counter" className="neon-link">Counter</Link>
        <Link to="/form" className="neon-link">Form</Link>
        <Link to="/card" className="neon-link">Card</Link>
        <Link to="/table" className="neon-link">Table</Link>
    </nav>
  )
}

export default Navigation
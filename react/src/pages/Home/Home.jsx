import React, { useEffect, useState } from 'react'
import './Home.css'

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="home-container">
      {/* Animated Background Grid */}
      <div className="grid-background"></div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <span key={i} className="particle"></span>
        ))}
      </div>

      {/* Glowing Orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      {/* Interactive Gradient */}
      <div 
        className="gradient-overlay"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 245, 255, 0.15), transparent 50%)`
        }}
      ></div>

      {/* Main Content */}
      <div className="home-wrapper">
        <div className="home-card">
          <div className="card-glow"></div>
          <h1 className="welcome-text">
            <span className="text-line">Welcome to</span>
            <span className="text-line highlight">Home Screen</span>
          </h1>
          <p className="subtitle">Explore Pages through Navigation Bar</p>
          
          {/* Animated Line */}
          <div className="decorative-line">
            <span className="line-dot"></span>
            <span className="line-dot"></span>
            <span className="line-dot"></span>
          </div>

          
        </div>
      </div>

      {/* Floating Bubbles */}
      {[...Array(8)].map((_, i) => (
        <span key={i} className="bubble"></span>
      ))}

      {/* Shooting Stars */}
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
      <div className="shooting-star"></div>
    </div>
  )
}

export default Home
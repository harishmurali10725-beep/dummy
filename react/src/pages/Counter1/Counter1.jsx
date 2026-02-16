import React, { useState, useEffect } from 'react'
import './Counter1.css'

const Counter1 = () => {
  const [count, setCount] = useState(0)
  const [isLimitReached, setIsLimitReached] = useState(false)
  
  useEffect(() => {
    if (isLimitReached) {
      const timer = setTimeout(() => setIsLimitReached(false), 500)
      return () => clearTimeout(timer)
    }
  }, [isLimitReached])

  const Incrementor = () => {
    if (count >= 5) {
      alert("Number is already 5, it won't go beyond that")
      setIsLimitReached(true)
      return
    }
    setCount((prev) => prev + 1)
  }

  const Decrementor = () => {
    if (count > 0) {
      setCount(count - 1)
    } else {
      setIsLimitReached(true)
    }
  }
  
  const Resetter = () => {
    setCount(0)
  }
  
  return (
    <div className={`counter-container ${isLimitReached ? 'limit-reached' : ''}`}>
      <div className="button-row">
        <button onClick={Incrementor}>+</button>
        <button onClick={Decrementor}>-</button>
      </div>
      <label>{count}</label>
      <div className="reset-button-container">
        <button onClick={Resetter}>Reset</button>
      </div>
    </div>
  )
}

export default Counter1
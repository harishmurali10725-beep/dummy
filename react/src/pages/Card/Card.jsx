import React, { useState, useEffect } from 'react'
import Modal from "./Modal"
import './Card.css'
const CardMember = ({ name, email, phone }) => {
  return (
    <div className="card">
      <h2 className="card-title">{name}</h2>
      <p className="card-text">{email}</p>
      <p className="card-text">{phone}</p>
    </div>
  );
};
 
const Card = () => {
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const handleClose = () => {
    setOpen(false)
    setSelectedUser(null)
  }
  const handleOpen = (user) => {
    setSelectedUser(user)
    setOpen(true)
  }

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Unknown error');
          }    }
    fetchUsers()
  }, [])
 
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>
  if (!users.length) return <div>No users found.</div>
  const formatAddress = (addr) => {
    if (!addr) return 'N/A'
    const parts = [addr?.suite,addr?.street,addr?.city,addr?.zipcode].filter(Boolean)
    return parts.join(', ')
  }

  return (
    <>
      <div className="card-container">
        {users.map((u) => (
          <button key={u.id} onClick={()=>handleOpen(u)}>
          <CardMember name={u.name} email={u.email} phone={u.phone}/>
            </button>
          
        ))}
      </div>
      <Modal isOpen={open} onClose={handleClose}>
                {selectedUser && (
                  <div className="card1">
                    <h2 className="card-title">{selectedUser?.name}</h2>
                    <p className="card-text">{selectedUser?.email}</p>
                    <p className="card-text">{selectedUser?.phone}</p>
                    <p className="card-text">{formatAddress(selectedUser?.address)}</p>
            
                  </div>
                )}
        </Modal>
    </>
    
  )
}
export default Card
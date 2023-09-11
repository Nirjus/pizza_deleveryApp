import React, { useState } from 'react'

const Registration = () => {
     const [name, setName] = useState("");      
     const [password, setPassword] = useState("");      
     const [email, setEmail] = useState("");      
     const [number, setNumber] = useState("");      
     const [address, setAddress] = useState("");      
     

   const submitHandler = (e) => {
     e.preventDefault();
   }

  return (
    <div className='registration'>
        <form action="" onSubmit={submitHandler}>
            <input type="text" 
            placeholder='Name..'
            required
               value={name}
               onChange={(e) => setName(e.target.value)}
               className='inputfild'
            />
            <input type="email" 
            placeholder='Email..'
            required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className='inputfild'
            />
             <input type="password" 
            placeholder='Password..'
            required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               className='inputfild'
            />
            <input type="text" 
            placeholder='Phone Number..'
            required
               value={number}
               onChange={(e) => setNumber(e.target.value)}
               className='inputfild'
            />
             <input type="text" 
            placeholder='Address..'
            required
               value={address}
               onChange={(e) => setAddress(e.target.value)}
               className='inputfild'
            />
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default Registration
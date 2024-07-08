// import React, { useState } from 'react';
// import axios from 'axios';

// const UserForm = () => {
//   const [name, setName] = useState('');
//   const [relationship, setRelationship] = useState('');
//   const [wish, setWish] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const response = await axios.post('http://localhost:5000/users', { name, relationship });
//     setWish(response.data.wish);
//     setName('');
//     setRelationship('');
//   };

//   return (
//     <div className="birthday-form-container">
//       <form className="birthday-form" onSubmit={handleSubmit}>
//        <div class="form-group">
//         <label htmlFor="name"> Name:</label>
//         <input
//           type="text"
//           id="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         </div>
//         <div className="form-group">
//         <label htmlFor='relationship'> Relationship:</label>
//         <select
//           value={relationship}
//           onChange={(e) => setRelationship(e.target.value)}
//           required
//         >
//           <option value="" disabled>Select Relationship</option>
//           <option value="brother">Brother</option>
//           <option value="sister">Sister</option>
//           <option value="mother">Mother</option>
//           <option value="father">Father</option>
//           <option value="friend">Friend</option>
//         </select>
//         </div>
//         <button type="submit">Get Birthday Wish</button>
//       </form>
//       {wish && <div className="birthday-wish">{wish}</div>}
//     </div>
//   );
// };

// export default UserForm;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [users, setUsers] = useState([]);
  const [wish, setWish] = useState('');

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(`${apiUrl}/users`);
      setUsers(response.data);
    };
    fetchUsers();
  }, [apiUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await axios.post(`${apiUrl}/users`, { name, relationship });
    setWish(response.data.wish);
    setUsers([...users, response.data.user]);
    setName('');
    setRelationship('');
  };

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="relationship">Relationship:</label>
          <select
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            required
          >
            <option value="" disabled>Select Relationship</option>
            <option value="brother">Brother</option>
            <option value="sister">Sister</option>
            <option value="mother">Mother</option>
            <option value="father">Father</option>
            <option value="friend">Friend</option>
          </select>
        </div>
        <button type="submit">Get Birthday Wish</button>
      </form>
      {wish && <div className="birthday-wish">{wish}</div>}
      <div className="user-list">
        {users.map(user => (
          <div key={user._id} className="user-item">
            <p>{user.name} ({user.relationship})</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserForm;

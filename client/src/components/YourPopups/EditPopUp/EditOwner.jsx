import React, {useState, useEffect} from "react";
import axios from 'axios';
const EditOwner = ({ merchant, selectMerchant, user, setUser }) => {
  const [owners, setOwners] = useState([]);
  const [text, setText] = useState('');
  const [users, setUsers] = useState([]);
  const getAdmins = () => {
    axios.get(`/api/merchants/admins/${merchant.id}`)
      .then(res => {
        const { data } =res;
        console.log(data);
        setOwners(data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => getAdmins(), []);

  const getUsers = () => {
    axios.get('/api/users')
      .then(result => {
        console.log('hello from getUsers');
        console.log(result.data);
        setUsers(result.data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => getUsers(), []);

  const addOwner = () => {
    console.log(text);
    let isValidEmail = false;
    users.forEach(user => {
      if (user.email === text.toLowerCase()) {
        isValidEmail = true;
      }
    });
    if (!isValidEmail) {
      alert('please enter a valid email');
      setText('');
      return;
    }
    owners.forEach(owner => {
      if (text.toLowerCase() === owner.email) {
        alert(`${owner.name} is already an admin`);
        isValidEmail = false;
        //setText('');
        return;
      }
    });
    if (isValidEmail) {
      axios.post('/api/admins/addbyemail', {
        email: text,
        merchant: merchant.id
      })
      .then(result => {
        console.log(result);
        setOwners([...owners, result.data]);
      })
      .catch(err => console.log(err));
    }
    setText('');
  };

  const removeOwner = (email) => {
    console.log('hello from remove owner');
    console.log(email);
    console.log(merchant.id);
    axios.delete(`/api/admins/deletebyemail/${email}/${merchant.id}`)
      .then(result => {
        console.log(result.data);
        const updatedOwners = owners.slice();
        setOwners(updatedOwners.filter(owner => owner.email !== email));
      })
      .catch(err => console.log(err));
  };

  return (
  <div>
    <h4>Add Owner:</h4>
    <label>Enter email: </label>
    <input id="email" type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
    <button onClick={() => addOwner()}>Add</button>
    <h4>Current Owners: </h4>
    {owners.map(owner =>
      <div key={owner.id}>
        <h6>{owner.name}</h6>
        {owners.length > 1
          ? (<button onClick={()=> {removeOwner(owner.email)}}><small>x</small></button>)
          : null
        }
      </div>
    )}
  </div>)

}

export default EditOwner;

// {a == true
//   ? (<Button/>)
//   : null
//  }

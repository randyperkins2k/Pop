import React, {useState, useEffect} from "react";
import axios from 'axios';
const EditOwner = ({ merchant, selectMerchant }) => {
  const [owners, setOwners] = useState([]);
  const [text, setText] = useState('');
  const getAdmins = () => {
    axios.get(`/merchant/admins/${merchant.id}`)
      .then(res => {
        const { data } =res;
        console.log(data);
        setOwners(data);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => getAdmins(), []);
  const addOwner = () => {
    console.log(text);
    axios.post('/admin/addbyemail', {
      email: text,
      merchant: merchant.id
    })
    .then(result => {
      console.log(result);
      setOwners([...owners, result.data]);
    })
    .catch(err => console.log(err));
  };

  return (
  <div>
    <h4>Add Owner:</h4>
    <label for="email">Enter email: </label>
    <input id="email" type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
    <button onClick={() => addOwner()}>Add</button>
    <h4>Current Owners: </h4>
    {owners.map(owner => <h6 key={owner.id}>{owner.name}</h6>)}
  </div>)

}

export default EditOwner;

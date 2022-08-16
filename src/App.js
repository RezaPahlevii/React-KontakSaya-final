// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import List from './List';
import React, {Component} from 'react';
import { uid } from 'uid';
function App() {
  const [contacts, setContacts]= useState([
    {
      id: 1,
      name: "Reza",
      telp: "085278685008",
    },
    {
      id: 2,
      name: "Pahlevi",
      telp: "082378685008",
    },
    
  ]);

const [isUpdate, setIsUpdate] = useState({ id: null, status:false});
const [formData, setFormData] = useState({  
  name: "",
  telp: "",
});
function handleChange(e) {
  let data = { ...formData };
  data[e.target.name] = e.target.value;
  setFormData(data);
}
function handleSubmit(e) {
  e.preventDefault();
  alert("Simpan data kontak?");
  let data = [...contacts];

  if (formData.name === ""){
    return false;
  }
  if (formData.telp === ""){
    return false;
  }
  if (isUpdate.status){
    data.forEach((contact) => {
      if (contact.id === isUpdate.id){
        contact.name = formData.name;
        contact.telp = formData.telp;
      }
    });
  } else {
    data.push({ id: uid(), name: formData.name, telp : formData.telp});
  }
  //Tambah Data contact
  setContacts(data);
  setFormData({ name: "", telp: ""});
}
  function handleEdit(id) {
    let data = [...contacts];
    let foundData = data.find((contact) => contact.id === id);
    setFormData({name: foundData.name, telp: foundData.telp});
    setIsUpdate({ id: id, status: true});
  }

  return (
    <div className="App">
      <h1 className="px-3 py -3"> Daftar Kontak Saya</h1>
      <form onSubmit={handleSubmit} className="px-3 py-4">
        <div className="form-group">
          <label htmlFor="">Nama</label>
          <input 
          type="text" 
          className="form-control" 
          onChange={handleChange}
          value={formData.name}
          name="name" />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="">No. Telp</label>
          <input
          type="text" 
          className="form-control" 
          onChange={handleChange}
          value={formData.telp}
          name="telp"/>
        </div>
        <div>
          <button type="submit" clasName="btn btn-primary w-100 mt-3">Save</button>
        </div>
      </form>
      <List handleEdit={handleEdit} data={contacts} />
    </div>
  ); 
}

export default App;

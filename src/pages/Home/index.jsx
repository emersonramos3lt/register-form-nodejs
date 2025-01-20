import { useEffect, useState, useRef } from 'react';
import './style.css';
import Bin from '../../assets/bin.svg';
import api from '../../services/api';

// React Hooks: useEffect, useState e useRef

const Home = () => {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromAPi = await api.get('/usuarios');

    setUsers(usersFromAPi.data);
  }

  async function createUsers() {

    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    }); // Não pode email repetido. Definimos no database.

    getUsers(); // Atualiza em tempo real.
  }

  useEffect(() => {
    getUsers()
  }, []) // Toda vez que a página abrir ele chama a função.
  
  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);

    getUsers();
  }

  return (
    <div className='container'>
      <form action="">
        <h1>User Registration</h1>
        <input placeholder='Name' type="text" name='name' ref={inputName}/>
        <input placeholder='Age' type="number" name='age' ref={inputAge}/>
        <input placeholder='Email' type="email" name='email' ref={inputEmail}/>
        <button type='button' onClick={createUsers}>Register</button>
      </form>

    { users.map( user =>  (
      <div key={user.id} className='card'>
        <div>
          <p>Name: <span>{user.name}</span></p>
          <p>Age: <span>{user.age}</span></p>
          <p>Email: <span>{user.email}</span></p>
        </div>
        <button onClick={() => deleteUsers(user.id)}>
          <img src={Bin} alt="Bin" />
        </button>
      </div>
    ))}
    </div>
  )
} // Sempre que uma função atualizar um valor/remover use: () => 

export default Home

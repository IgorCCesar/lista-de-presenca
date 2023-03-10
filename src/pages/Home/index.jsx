import './styles.css'
import { useState, useEffect } from 'react';

import {Card} from '../../components/Card';

export function Home() {
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  // Criando Estado para ser consumido pela API do GitHub através do useEffect
  const [use, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent])
  }

  // Como usar o useEffect para consumir a IPA do GitHub
  // Tornando a foto de perfil e nome dinâmica
  useEffect(() => {
   async function fetchData() {
    const response = await fetch('https://api.github.com/users/IgorCCesar')
    const data = await response.json();

    setUser({
      name: data.name,
      avatar: data.avatar_url,
    });
   }

   fetchData()

  }, []);

  return (
    <div className="container">
      <header>
      <h1>Lista de Presença</h1>
      <div>
        <strong>{use.name}</strong>
        <img src={use.avatar} alt="Foto de Perfil" />
      </div>
      </header>


      <input 
      type="text"
      placeholder="Digite o nome..." 
      onChange={e => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      {
        students.map(student => (
          <Card 
          key={student.time}
          name={student.name} 
          time={student.time}
          />
        ))
      }
      
    </div>
  )
}
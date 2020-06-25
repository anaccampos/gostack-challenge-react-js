import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const payload = {
      title: `Novo projeto ${Date.now()}`,
      url: 'github/anaccampos',
      techs: ['JavaScript', 'Python']
    }

    api.post('/repositories', payload)
      .then(response => {
        setRepositories([...repositories, response.data])
      }).catch(err => {
        console.log(err);
      })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`)
      .then(response => {
        const repoIndex = repositories.findIndex(repo => (repo.id === id ));

        if(repoIndex > -1){
          const array = [...repositories];
          array.splice(repoIndex, 1);
          setRepositories(array);
        }

      })
      .catch(err => {
        console.log(err);
      })
  }

  useEffect(() => {
    api.get('/repositories')
      .then(response => {
        setRepositories(response.data);
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

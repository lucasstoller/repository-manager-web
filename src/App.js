import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [ repos, setRepos ] = useState([])

  async function fetchData() {
    const { data } = await api.get('/repositories')
    setRepos(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  async function handleAddRepository() {
    const repo = {
      url: 'blablabla.com.br',
      title: 'blafoobar',
      techs: ['React', 'React Native', 'NodeJs']
    }
    const { data: newRepo } = await api.post('repositories', repo)
    setRepos([...repos, newRepo])
  }

  function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(()=> {
      const newRepoList = repos.filter(repo => repo.id !== id)

      setRepos(newRepoList)
    })
  }

  const repoList = repos.map(repo => {
    return (
      <li key={repo.id}>
        {repo.title}

        <button onClick={() => handleRemoveRepository(repo.id)}>
          Remover
        </button>
      </li>
    )
  })

  return (
    <div>
      <ul data-testid="repository-list">
        {repoList}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
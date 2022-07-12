import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RepoItem from '../RepoItem/RepoItem';

export default function RepoList() {
  const [repos, setRepos] = useState({ loading: true });

  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return !repos.loading ? (
    <main>
      {repos.map((repo) => {
        return (
          <RepoItem
            key={repo.id}
            repoId={repo.id}
            name={repo.name}
            description={repo.description}
            language={repo.language}
            forksCount={repo.forks_count}
          />
        );
      })}
    </main>
  ) : (
    <h1>If the page hasn't loaded shortly, try refreshing it.</h1>
  );
}

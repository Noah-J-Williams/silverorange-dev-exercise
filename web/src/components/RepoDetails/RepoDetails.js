import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default function RepoDetails() {
  const [oneRepo, setOneRepo] = useState();
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState({ error: '' });
  const [readme, setReadme] = useState(false);
  const navigate = useNavigate();
  const { repoId } = useParams();

  useEffect(() => {
    console.log(repoId);
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        console.log('running');
        setOneRepo(
          res.data.filter((repo) => repo.id === parseInt(repoId, 10))[0]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [repoId]);

  useEffect(() => {
    if (oneRepo) {
      axios
        .get(oneRepo.commits_url.slice(0, -6))
        .then((res) => {
          console.log('getting commits');
          setCommits(res.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setCommits({ error: 'No data was found for this repo' });
          setLoading(true);
        });
      axios
        .get(
          `https://raw.githubusercontent.com/${oneRepo.full_name}/master/README.md`
        )
        .then((res) => {
          console.log('getting readme');
          setReadme(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [oneRepo]);

  const handleBack = (e) => {
    navigate('/');
  };

  return !loading ? (
    <main>
      <button onClick={handleBack}>Back</button>
      <p>Commit date: {commits.commit.author.date}</p>
      <p>Author: {commits.commit.author.name}</p>
      <p>Message: {commits.commit.message}</p>
      {readme ? <ReactMarkdown>{readme}</ReactMarkdown> : <></>}
    </main>
  ) : (
    <div>
      <button onClick={handleBack}>Back</button>
      <p>{commits.error}</p>
    </div>
  );
}

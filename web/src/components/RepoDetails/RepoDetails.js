import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './RepoDetails.scss';

export default function RepoDetails() {
  const [oneRepo, setOneRepo] = useState();
  const [loading, setLoading] = useState(true);
  const [commits, setCommits] = useState({ error: '' });
  const [readme, setReadme] = useState(false);
  const navigate = useNavigate();
  const { repoId } = useParams();

  //this loads all the repos from the api and finds the correct repo (change to Array.find)
  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setOneRepo(
          res.data.filter((repo) => repo.id === parseInt(repoId, 10))[0]
        );
      })
      .catch((err) => {
        return err;
      });
  }, [repoId]);

  //Once the repo is loaded, find the commits
  useEffect(() => {
    if (oneRepo) {
      axios
        .get(oneRepo.commits_url.slice(0, -6))
        .then((res) => {
          setCommits(res.data[0]);
          setLoading(false);
        })
        .catch((err) => {
          setCommits({ error: 'No data was found for this repo' });
          setLoading(true);
        });
      axios
        .get(
          `https://raw.githubusercontent.com/${oneRepo.full_name}/master/README.md`
        )
        .then((res) => {
          setReadme(res.data);
        })
        .catch((err) => {
          return err;
        });
    }
  }, [oneRepo]);

  //event listener for navigating back to the main list
  const handleBack = (e) => {
    navigate('/');
  };

  //if the data isn't loading, display the page, otherwise we show our messaging to refresh or show an error
  return !loading ? (
    <main className="details">
      <div className="details__holder">
        <button className="details__button" onClick={handleBack}>
          Back
        </button>
        <p className="details__text">
          Commit date: {commits.commit.author.date}
        </p>
        <p className="details__text">Author: {commits.commit.author.name}</p>
        <p className="details__text">Message: {commits.commit.message}</p>
      </div>
      <div className="details__readme">
        {readme ? <ReactMarkdown>{readme}</ReactMarkdown> : <></>}
      </div>
    </main>
  ) : (
    <div>
      <button className="details__button" onClick={handleBack}>
        Back
      </button>
      <p>{commits.error}</p>
      <p>
        {oneRepo === undefined
          ? "If the page doesn't load shortly, try refreshing it."
          : ''}
      </p>
    </div>
  );
}

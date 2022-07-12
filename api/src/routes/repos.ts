import { Router, Request, Response } from 'express';
const fs = require('fs');
const axios = require('axios');
//requiring the repos.json would not allow us to get new data if the file changes

export const repos = Router();
// removed DEBUG=api
repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  
  //using fs to read the file
  let result = JSON.parse(fs.readFileSync('./data/repos.json', 'utf8', function(err: any, data: any) {
    if(err){
      res.status(400).send("Error reading JSON file");
      return;
    }}));
  
  //Using the axios package to make the call to the github api
  let resultAPI = await axios.get('https://api.github.com/users/silverorange/repos')
  .then((res: any) => {
    return(res.data);
  })
  .catch((err: any) => {
    res.status(400).send("Error getting data from github api");
  });

  
  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  res.json([...result, ...resultAPI].filter(repo => repo.fork === false));
});

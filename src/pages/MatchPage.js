import React from 'react';
import MatchListBox from '../components/MatchListBox';
import { Grid } from '@material-ui/core';

const MatchPage = () => {
  const matches = {
    match1: {
      name: "gury",
      firstname: "sandra",
      mail: "sandra.gury@gmail.com",
      passwd: "xxx",
      dateBirth: "May 14 1993",
      age: "26",
      gender: "woman",
      description: "Hi! I'm new on Matcha but already love it!",
      pictures: {
          profilePicture: "sandrapp.jpeg",
          others: ["sandrap1.jpeg", "sandrap2.jpeg", "sandrap3.jpeg", "sandrap4.jpeg"]
      },
      researchParameters: {
        hastags: ["geek", "norminet", "love", "42", "student", "matchacouple", "react", "node", "norminet", "love", "matchacouple", "geek", "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node",  "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node"]
      }
    },
    match2: {
      name: "gury",
      firstname: "sandra",
      mail: "sandra.gury@gmail.com",
      passwd: "xxx",
      dateBirth: "May 14 1993",
      age: "26",
      gender: "woman",
      description: "Hi! I'm new on Matcha but already love it!",
      pictures: {
          profilePicture: "sandrapp.jpeg",
          others: ["sandrap1.jpeg", "sandrap2.jpeg", "sandrap3.jpeg", "sandrap4.jpeg"]
      },
      researchParameters: {
        hastags: ["geek", "norminet", "love", "42", "student", "matchacouple", "react", "node", "norminet", "love", "matchacouple", "geek", "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node",  "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node"]
        }
    },
    match3: {
      name: "gury",
      firstname: "sandra",
      mail: "sandra.gury@gmail.com",
      passwd: "xxx",
      dateBirth: "May 14 1993",
      age: "26",
      gender: "woman",
      description: "Hi! I'm new on Matcha but already love it!",
      pictures: {
          profilePicture: "sandrapp.jpeg",
          others: ["sandrap1.jpeg", "sandrap2.jpeg", "sandrap3.jpeg", "sandrap4.jpeg"]
      },
      researchParameters: {
        hastags: ["geek", "norminet", "love", "42", "student", "matchacouple", "react", "node", "norminet", "love", "matchacouple", "geek", "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node",  "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node"]
        }
    },
    match4: {
      name: "gury",
      firstname: "sandra",
      mail: "sandra.gury@gmail.com",
      passwd: "xxx",
      dateBirth: "May 14 1993",
      age: "26",
      gender: "woman",
      description: "Hi! I'm new on Matcha but already love it!",
      pictures: {
          profilePicture: "sandrapp.jpeg",
          others: ["sandrap1.jpeg", "sandrap2.jpeg", "sandrap3.jpeg", "sandrap4.jpeg"]
      },
      researchParameters: {
        hastags: ["geek", "norminet", "love", "42", "student", "matchacouple", "react", "node", "norminet", "love", "matchacouple", "geek", "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node",  "42", "student", "geek", "42", "student", "react", "node", "norminet", "love", "matchacouple", "react", "node"]
        }
    }
  }

  return (
    <Grid container spacing={1}>
    {Object.entries(matches).map(([key, match]) => 
      <Grid item lg={3} md={4} xs={6} key={key}>
      <MatchListBox match={match} />
      </Grid>)}
    </Grid>
  );
}

export default MatchPage;
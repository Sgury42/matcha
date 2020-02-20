import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDatas } from '../redux/requests';
import MatchListBox from '../components/MatchListBox';
import { Grid } from '@material-ui/core';

const MatchPage = () => {
  const matches = {
    match1: {
      id: "100",
      login: "sgury",
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
      },
      popularite: "67",
      connected: true
    },
    match2: {
      id: "101",
      login: "sgury",
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
        },
      popularite: "89",
      connected: true
    },
    match3: {
      id: "102",
      login: "sgury",
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
        },
      popularite: "67",
      connected: true
    },
    match4: {
      id: "103",
      login: "sgury",
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
        },
      popularite: "34",
      connected: false
    },
    match5: {
      id: "104",
      login: "sgury",
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
        },
      popularite: "34",
      connected: false
    },
    match6: {
      id: "200",
      login: "sgury",
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
        },
      popularite: "34",
      connected: false
    }
  }

  const dispatch = useDispatch();
  const history = useHistory();
  // const matches = useSelector(state => state.objects.matches);
  const currentUser = useSelector(state => state.objects.currentUser);
  const isLogged = useSelector(state => state.objects.auth);

  useEffect(() => {
    if (isLogged) {
      history.push('/');
    }
  }, [isLogged]);

  useEffect(() => {
    dispatch(fetchDatas('/matchs'));
  }, []);

  return (
    <Grid container spacing={1} justify='space-evenly'>
    {Object.entries(matches).map(([key, match]) => 
      <Grid item lg={2} md={4} sm={5} xs={11} key={key}>
      <MatchListBox match={match} currentUserId={currentUser.id} />
      </Grid>)}
    </Grid>
  );
}

export default MatchPage;
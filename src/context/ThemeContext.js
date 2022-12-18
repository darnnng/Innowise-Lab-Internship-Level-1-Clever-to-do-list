import React from 'react';

export const themes = {
  light: {
    fontcolor: 'black',
    backgroundleft: 'linear-gradient(to right, #9fdeaf, #96dbe2)',
    textsign: '#96dbe2',
    signbtn: '#96dbe2',
    background: 'linear-gradient(to right, #9fdeaf, #96dbe2)',
    addbtn: '#27ae60',
    container: '#e2fae8',
    maintextcolor: '#27ae60',
    logout: '#9fdeaf',
  },
  dark: {
    fontcolor: 'white',
    backgroundleft: 'linear-gradient(to right, #2A5470, #4C4177)',
    textsign: '#4C4177',
    signbtn: '#4C4177',
    background: 'linear-gradient(to right, #2A5470, #4C4177)',
    addbtn: '#4C4177',
    container: '#B0A9C6',
    maintextcolor: '#4C4177',
    logout: '#B0A9C6',
  },
};

export const ThemeContext = React.createContext(themes.light);

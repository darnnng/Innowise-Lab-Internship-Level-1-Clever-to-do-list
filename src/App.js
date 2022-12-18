import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { SignUp } from './components/SignUp/SignUp.jsx';
import { SignIn } from './components/SignIn/SignIn.jsx';
import { Account } from './components/Main/Account.jsx';
import { AuthContextProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { CreateToDo } from './components/Main/CreateUpdate/Createpage.jsx';
import { UpdateToDo } from './components/Main/CreateUpdate/Updatingtodo.jsx';
import './components/Main/Account.scss';
import { useContext } from 'react';
import { ThemeContext } from './context/ThemeContext.js';

function App() {
  const theme = useContext(ThemeContext);

  return (
    <div>
      <AuthContextProvider>
        <ThemeContext.Provider value={theme}>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route
              path="/account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateToDo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/update"
              element={
                <ProtectedRoute>
                  <UpdateToDo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </ThemeContext.Provider>
      </AuthContextProvider>
    </div>
  );
}

export default App;

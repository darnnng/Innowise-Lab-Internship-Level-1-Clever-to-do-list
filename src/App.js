import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp/SignUp.jsx'
import SignIn from './components/SignIn/SignIn.jsx'
import Account from './components/Main/Account.jsx'
import { AuthContextProvider } from './context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import CreateToDo from './components/Main/Creatingpage/Createpage.jsx';

function App() {
  return (
    <div>
      <AuthContextProvider>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>} />
        <Route path="/create" element={<CreateToDo/>} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

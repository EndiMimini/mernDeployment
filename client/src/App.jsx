
import './App.css'
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreatePost from './components/CreatePost';
import Dashboard from './components/Dashboard';
import EditPost from './components/EditPost';
import SinglePost from './components/SinglePost';
import { AuthProvider, useAuth } from './AuthContext';
import LoginPage from './views/LoginPage';
import WelcomePage from './components/WelcomePage';
function App() {
  const { user } = useAuth();
  const token = localStorage.getItem('token');
  return (
   <BrowserRouter>
    <Routes>
    {token ? (
          <>
            <Route path='/dashboard' element={<Dashboard user={user} />} />
            <Route path='/polls' element={<Dashboard user={user} />} />
            <Route path='/polls/:id' element={<SinglePost user={user} />} />
            <Route path='/polls/new' element={<CreatePost user={user} />} />
            <Route path='/polls/edit/:id' element={<EditPost user={user} />} />

           
          </>
        ) : (
          <>         
          <Route path='*' element={<WelcomePage />} />
          <Route path='/loginPage' element={<LoginPage />} />
          </>

        )}
    </Routes>
   
   
   </BrowserRouter>
  )
}

export default App

import React, { useEffect } from 'react';
import './App.css';
import Player from './Components/Player/Player';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ClientID, ClientSecret, token, topMixesPlaylists } from './app/data';
// import PlaylistTrack from './Components/PlaylistTracks/PlaylistTrack';
import store from './app/like/store';
import PlaylistTrack from './Components/PlaylistTracks/PlaylistTrack';
import LikedSongs from './Components/LikedSongs/LikedSongs';
import Footer from './Components/Footer/Footer';

const App = () => {
  const getToken = async () => {
    try {
      const response = await fetch(token, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(ClientID + ':' + ClientSecret)}`,
        },
        body: 'grant_type=client_credentials',
      });
      const data = await response.json();
      console.log(data.access_token)
      localStorage.setItem('access_token', JSON.stringify(`${data.token_type} ${data.access_token}`));
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      await getToken();
    };
    fetchData();
  }, []);



  return (
  
        <BrowserRouter>
        <Provider store={store}>

        
    <div className='flex flex-col '>
      <div className='flex'>

      <Sidebar />
      <div className='flex-1'>
        {/* <Header /> */}
       
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/tracks/:id' element={<PlaylistTrack/>}/>
            <Route path='/likedSongs' element={<LikedSongs/>}/>
            
          </Routes>
    <Player/>
    <Footer/>
      </div>
      </div>

    </div>

    </Provider>
        </BrowserRouter>
  );
};

export default App;
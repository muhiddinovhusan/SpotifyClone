import React, { useEffect } from 'react';
import './App.css';
import Player from './Components/Player/Player';
import Main from './Components/Main/Main';
import Header from './Components/Header/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { ClientID, ClientSecret, token, topMixesPlaylists } from './app/data';
// import PlaylistTrack from './Components/PlaylistTracks/PlaylistTrack';
import store from './app/like/store';
import PlaylistTrack from './Components/PlaylistTracks/PlaylistTrack';
import LikedSongs from './Components/LikedSongs/LikedSongs';
import Footer from './Components/Footer/Footer';
import SidebarLeft from './Components/Sidebar/SidebarLeft';
import SidebarRight from './Components/Sidebar/SidebarRight';
import { AudioProvider } from './context/AudioProvider';
import PlayerImage, { PlayerContent } from './Components/PlayerImage/PlayerImage';
import PlaylistsCategory from './Components/PlaylistCategory/PlaylistsCategory';

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

        <AudioProvider>
          <div className=' '>
            <div className='flex justify-between'>

              <SidebarLeft />
              <div className='flex-1 '>
                {/* <Header /> */}

                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/tracks/:id' element={<PlaylistTrack />} />
                  <Route path='/likedSongs' element={<LikedSongs />} />
                  <Route path='/category/:category' element={<PlaylistsCategory />} />
                </Routes>
                <Player />
                <PlayerContent />
                <PlayerImage />
                <Footer />

              </div>
              <SidebarRight />
            </div>

          </div>

        </AudioProvider>


      </Provider>
    </BrowserRouter>
  );
};

export default App;
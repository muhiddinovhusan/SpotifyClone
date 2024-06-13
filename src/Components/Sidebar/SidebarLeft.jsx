import { Link } from 'react-router-dom';
import spotify from '../../assets/images/Spotify_Logo_RGB_White.png';
import './Sidebar.scss';
import { useState } from 'react';
import HomeIc, { CreateIC, LibraryIC, LikeIC, SearchIC } from '../../assets/images/Image';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebarLeftClose, toggleSidebarLeftOpen } from '../../app/like/LikeSlice';
import { PanelLeftClose, PanelLeftOpen, PanelRightOpenIcon } from 'lucide-react';

const SidebarLeft = () => {
  const [active, setActive] = useState("Home");
const dispatch = useDispatch();
  const handleClick = (clickedItem) => {
    setActive(clickedItem);
  };
  const SidebarLeft = useSelector(state => state.like.SidebarLeft);


  const openCloseSidebar = () => {
    if(SidebarLeft){
dispatch(toggleSidebarLeftClose())
    }else{
dispatch(toggleSidebarLeftOpen())

    }
  }



  return (
    <aside className={`sidebar  bg-black   h-screen   text-[#b2b2b2] max-md:hidden    sticky top-0 ${SidebarLeft? 'w-[256px]': 'w-20'}`}>
      <div className={`text-white  my-6  flex w-full ${SidebarLeft ?'px-6' :'px-3'}`}>
        <img src={spotify} alt="Spotify Logo" className='w-[130px]' />
        <button onClick={openCloseSidebar} className={`${SidebarLeft?" ml-10":"hidden"}`}>  <PanelLeftClose/>
</button>

      </div>

      <nav>
        <Link
          to="/"
          className={`flex items-center img mx-2 px-4 py-2 rounded transition duration-300 ${active === "Home" ? "active" : ""}`}
          onClick={() => handleClick("Home")}
        >
          <HomeIc />
          <span className={` ${SidebarLeft? 'ml-4 text-sm font-semibold' : 'hidden'}`}>Home</span>
        </Link>
        <Link
          to="/"
          className={`flex items-center img mx-2 px-4 py-2 rounded transition duration-300 ${active === "Search" ? "active" : ""}`}
          onClick={() => handleClick("Search")}
        >
          <SearchIC />
          <span className={` ${SidebarLeft? 'ml-4 text-sm font-semibold' : 'hidden'}`}>Search</span>
          
       
        
        </Link>
        <Link
          to="/"
          className={`flex items-center img mx-2 px-4 py-2 rounded transition duration-300 mb-6 ${active === "Library" ? "active" : ""}`}
          onClick={() => handleClick("Library")}
        >
          <LibraryIC />
          <span className={` ${SidebarLeft? 'ml-4 text-sm font-semibold' : 'hidden'}`}>Your Library</span>
        </Link>
        <div
          className={`flex items-center img mx-2 px-4 py-2 rounded transition duration-300 ${active === "Create" ? "active" : ""}`}
          onClick={() => handleClick("Create")}
        >
          <CreateIC />
          <span className={` ${SidebarLeft? 'ml-4 text-sm font-semibold' : 'hidden'}`}>Create Playlist</span>
        </div>
        <Link
          to="/likedSongs"
          className={`flex items-center img mx-2 px-4 py-2 rounded transition duration-300 ${active === "LikedSongs" ? "active" : ""}`}
          onClick={() => handleClick("LikedSongs")}
        >
          <LikeIC />
          <span className={` ${SidebarLeft? 'ml-4 text-sm font-semibold' : 'hidden'}`}>Liked Songs</span>
        </Link>
        <button onClick={openCloseSidebar} className={`${SidebarLeft?"hidden":"ml-7 mt-2"}`}> 
        <PanelLeftOpen/>
        </button>

      </nav>

      <div className={`${SidebarLeft?'hr':'hidden'}`}></div>

      <footer className={`mt-14 ml-6  ${SidebarLeft?'':'hidden'}`}>
        <ul className={`${SidebarLeft?"h-60 overflow-y-scroll":"hidden"}`}>
          <li >
            <h3 className='hover:underline py-2 '>Chill Mix</h3>
          </li>
          <li><h3 className='hover:underline py-2'>Insta Hits</h3></li>
          <li><h3 className='hover:underline py-2'>Your Top Songs 2021</h3></li>
          <li><h3 className='hover:underline py-2'>Mellow Songs</h3></li>
        </ul>
      </footer>
    </aside>
  );
};

export default SidebarLeft;

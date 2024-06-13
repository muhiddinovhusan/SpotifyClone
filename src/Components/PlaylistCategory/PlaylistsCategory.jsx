import React, { useEffect, useRef, useState } from 'react'
import useMadeForYou from '../../hooks/useMadeForYou copy';
import useJumpIn from '../../hooks/useJumpIn';
import useRecentPlayed from '../../hooks/useRecentPlayed';
import usePlaylist from '../../hooks/usePlaylist';
import { Link, useNavigate, useParams } from 'react-router-dom';
import MainCards from '../Main/MainCards';
import play from '../../assets/images/Play_Greem Hover.png'
import { useSelector } from 'react-redux';
import { loadFromLocalStorage, saveToLocalStorage } from '../../app/like/LikeSlice';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import likedSongsIcon from '../../assets/images/Frame 42.png'
import './PlaylistCategory.scss'
const PlaylistsCategory = () => {
    const { category } = useParams();
    const mainPlaylist = usePlaylist();
    const recentPlay = useRecentPlayed();
    const jumpBackIn = useJumpIn();
    const madeForYou = useMadeForYou();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    let playlists = [];


    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const isSmallScreen = screenWidth > 640 && screenWidth <= 768;
    const isVerySmallScreen = screenWidth <= 640;
    const isMediumScreen = screenWidth > 768 && screenWidth <= 1024;
    const isLargeScreen = screenWidth > 1024 && screenWidth <= 1280;
    const SidebarLeft = useSelector(state => state.like.SidebarLeft);


    switch (category) {
        case 'top-mixes':
            playlists = mainPlaylist;
            break;
        case 'recent-played':
            playlists = recentPlay;
            break;
        case 'jump-back-in':
            playlists = jumpBackIn;
            break;
        case 'made-for-you':
            playlists = madeForYou;
            break;
        default:
            break;
    }

    const navigate = useNavigate();

    const handleClick = (item, id) => {
        saveToLocalStorage('selectedPlaylist', item);
        navigate(`/tracks/${id}`);
    };


    const goBack = () => {
        window.history.back()
    }
    const goForward = () => {
        window.history.forward()
    }

    const navRef = useRef();

    useEffect(() => {
        const handleScroll = () => {
          if (navRef.current) {
            if (window.scrollY >= 30) {
              navRef.current.classList.add('nav-dark');
            } else {
              navRef.current.classList.remove('nav-dark');
            }
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    return (
        <div className='pb-[200px]'>
            <div ref={navRef} className="top flex  justify-between sticky  top-0 z-20 max-md:hidden bg-[#3730a3]    w-full ">
        <div className="left flex items-center gap-3  ">
          <button className="bg-zinc-800 p-1 flex justify-center items-center transition-all rounded-full hover:scale-110">
            <ChevronLeft onClick={goBack} color="white" className="mx-auto" size={26} />
          </button>
          <button className="bg-zinc-800 p-1 flex justify-center items-center transition-all rounded-full hover:scale-110">
            <ChevronRight onClick={goForward} color="white" className="mx-auto" size={26} />
          </button>
        </div>
        <div className="right flex items-center gap-4">
          <button className="bg-white text-black px-3 py-1 rounded-2xl font-semibold transition-all hover:scale-105">Explore Premium</button>
          <button className="bg-black text-white px-3 py-1 rounded-2xl font-semibold transition-all hover:scale-105 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" /></svg>
            Install App
          </button>
          <Link to={"/"} className="bg-zinc-800 p-1.5 flex justify-center items-center transition-all rounded-full hover:scale-110 hover:text-white">
            <Bell size={24} />
          </Link>
        </div>
      </div>
            <header className='text-black py-3 bg-gradient-to-b from-indigo-800  pt-3 px-5 pb-20  '>


                <button onClick={goBack} className=' xl:hidden lg:hidden md:hidden' > back</button>
                <div className="bottom mt-20 flex items-end gap-6">
                    <div className="image">
                        <img src={likedSongsIcon} alt="" className="rounded-xl" />
                    </div>
                    <div className="content flex flex-col">
                        <span className="uppercase font-semibold">All Playlists </span>
                        <h1 className="capitalize font-bold text-7xl max-md:text-5xl mt-7 mb-10">{category.replace('-', ' ')}</h1>
                        <div className="flex flex-col gap-3">
                            <p className="font-semibold text-xl text-zinc-500"><span className="text-white text-xl font-semibold">For You</span> | <span className="text-zinc-500 text-xl font-semibold">{playlists.length} Playlists</span></p>
                        </div>
                    </div>
                </div>


            </header>
            <div className="Main pt-[24px]  px-[32px] space-y-9 -z-10">
                
                <div className={`grid  max-sm:gap-4 gap-8 ${isVerySmallScreen ? 'overflow-x-scroll' : isSmallScreen ? 'grid-cols-3' : SidebarLeft ? 'grid-cols-4' : 'max-lg:grid-cols-4 max-md:grid-cols-2 grid-cols-5'} max-sm:grid-cols-2 max-md:grid-cols-3 `}>

                    {
                        playlists.map((item, index) => (
                            <MainCards key={index} item={item} index={index} play={play} />
                        ))
                    }


                </div>
            </div>
        </div>)
}

export default PlaylistsCategory
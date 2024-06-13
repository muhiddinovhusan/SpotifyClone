import './Main.scss'
import usePlaylist from '../../hooks/usePlaylist'
import useRecentPlayed from '../../hooks/useRecentPlayed';
import { Link, useNavigate } from 'react-router-dom';
import Header from './../Header/Header';
import { saveToLocalStorage } from '../../app/like/LikeSlice';
import useJumpIn from '../../hooks/useJumpIn';
import useMadeForYou from './../../hooks/useMadeForYou copy';
import play from '../../assets/images/Play_Greem Hover.png'
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MainCards from './MainCards';
import { useSelector } from 'react-redux';
import { jumpBackIn } from '../../app/data';
const Main = () => {

  const mainPlaylist = usePlaylist();

  const MadeForYou = useMadeForYou();
  const recentPlay = useRecentPlayed();
  const jumpBackIn = useJumpIn();


  const SidebarLeft = useSelector(state => state.like.SidebarLeft);

  const navigate = useNavigate();
  const handleClick = (item, id) => {
    saveToLocalStorage('selectedPlaylist', item);
    navigate(`/tracks/${id}`);
  };

  const navRef = useRef();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
  const PlayerContent = useSelector(state => state.like.PlayerContent)


  const getMappedPlaylist = (playlist) => {
    if (isVerySmallScreen) {
      return playlist.slice(0, 2);
    } else if (isSmallScreen) {
      return playlist.slice(0, 3);
    } else if (isMediumScreen) {
      return playlist.slice(0, 4);
    } else if (isLargeScreen) {
      return SidebarLeft ? playlist.slice(0, 4) : playlist.slice(0, 5);
    } else {
      return SidebarLeft ? playlist.slice(0, 4) : playlist.slice(0, 5);
    }
  };

  const goForward = () => {
    window.history.forward()
  }

const goBack = () => {
    window.history.back()
  }


  return (
    <div className={`${PlayerContent ? 'hidden' : "Main"}`}>
      <div ref={navRef} className="top bg-[#3730a3] flex justify-between sticky top-0 z-20 max-md:hidden ">
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
          <Link to={"/news"} className="bg-zinc-800 p-1.5 flex justify-center items-center transition-all rounded-full hover:scale-110 hover:text-white">
            <Bell size={24} />
          </Link>
        </div>
      </div>
      <Header />




      <div className='  '>

        <div className=' pt-[24px] pb-[48px] px-[32px] space-y-9 -z-10 '>
          <div>
            <div className='flex justify-between items-end mb-[18px]'>
              <div>
                <h2 className='text-2xl font-semibold hover:underline capitalize text-white '>Top Mixes</h2>
              </div>
              <Link to='/category/top-mixes' className='uppercase text-[16px] tracking-widest font-semibold hover:underline text-[#b3b3b3] leading-6 cursor-pointer' >See All</Link>
            </div>



            <div className={`grid  max-sm:gap-4 gap-8 ${isVerySmallScreen ? 'overflow-x-scroll' : isSmallScreen ? 'grid-cols-3' : SidebarLeft ? 'grid-cols-4' : 'max-lg:grid-cols-4 max-md:grid-cols-2 grid-cols-5'} max-sm:grid-cols-2 max-md:grid-cols-3 `}>

              {
                getMappedPlaylist(mainPlaylist).map((item, index) => (
                  <MainCards key={index} item={item} index={index} play={play} />
                ))
              }


            </div>
          </div>
          <div>
            <div className='flex justify-between items-end mb-[18px]'>
              <div>
                <h2 className='text-2xl font-semibold hover:underline capitalize text-white'>Recent Played</h2>
              </div>
              <Link  to='/category/recent-played' className='uppercase text-[16px] tracking-widest font-semibold hover:underline text-[#b3b3b3] leading-6'>See All</Link>
            </div>

            <div className={`grid gap-8 ${isVerySmallScreen ? 'grid-cols-2' : isSmallScreen ? 'grid-cols-3' : SidebarLeft ? 'grid-cols-4' : 'max-lg:grid-cols-4 max-md:grid-cols-2 grid-cols-5'} max-sm:grid-cols-2 max-md:grid-cols-3 `}>
              {
                getMappedPlaylist(recentPlay).map((item, index) => (
                  <MainCards key={index} item={item} index={index} play={play} />
                ))
              }
            </div>
            {/* <MainCards category={recentPlay} play={play}/> */}


          </div>
          <div>
            <div className='flex justify-between items-end mb-[18px]'>
              <div>
                <h2 className='text-2xl font-semibold hover:underline capitalize text-white'> Jump Back In</h2>
              </div>
              <Link to='/category/jump-back-in' className='uppercase text-[16px] tracking-widest font-semibold hover:underline text-[#b3b3b3] leading-6'>See All</Link>
            </div>
            <div className={`grid gap-8 ${isVerySmallScreen ? 'grid-cols-2' : isSmallScreen ? 'grid-cols-3' : SidebarLeft ? 'grid-cols-4' : 'max-lg:grid-cols-4 max-md:grid-cols-2 grid-cols-5'} max-sm:grid-cols-2 max-md:grid-cols-3 `}>
              {
                getMappedPlaylist(jumpBackIn).map((item, index) => (
                  <MainCards key={index} item={item} index={index} play={play} />
                ))
              }
            </div>
            {/* <MainCards category={JumpBackIn} play={play}/> */}
          </div>
          <div className=''>
            <div className='flex justify-between items-end mb-[18px]'>
              <div>
                <Link to='/category/made-for-you' className='text-2xl font-semibold hover:underline capitalize text-white'>Made For You</Link>
              </div>
              <h2 className='uppercase text-[16px] tracking-widest font-semibold hover:underline text-[#b3b3b3] leading-6'>See All</h2>
            </div>
            <div className={`grid gap-8 mb-40 ${isVerySmallScreen ? 'grid-cols-2' : isSmallScreen ? 'grid-cols-3' : SidebarLeft ? 'grid-cols-4' : 'max-lg:grid-cols-4 max-md:grid-cols-2 grid-cols-5'} max-sm:grid-cols-2 max-md:grid-cols-3 `}>
              {
                getMappedPlaylist(MadeForYou).map((item, index) => (
                  <MainCards key={index} item={item} index={index} play={play} />
                ))
              }
            </div>
          </div>
        </div>
      </div>



    </div>
  );
}

export default Main;

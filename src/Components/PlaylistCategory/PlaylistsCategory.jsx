import React, { useEffect, useState } from 'react'
import useMadeForYou from '../../hooks/useMadeForYou copy';
import useJumpIn from '../../hooks/useJumpIn';
import useRecentPlayed from '../../hooks/useRecentPlayed';
import usePlaylist from '../../hooks/usePlaylist';
import { useNavigate, useParams } from 'react-router-dom';
import MainCards from '../Main/MainCards';
import play from '../../assets/images/Play_Greem Hover.png'
import { useSelector } from 'react-redux';
import { saveToLocalStorage } from '../../app/like/LikeSlice';
import '../Main/Main.scss'
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
  return (
    <div className="Main pt-[24px] pb-[128px] px-[32px] space-y-9 -z-10">
        <div>
        <h2 className="text-3xl font-bold mb-8 capitalize text-white">{category.replace('-', ' ')}</h2>

        </div>
      <div className={`grid  max-sm:gap-4 gap-8 ${isVerySmallScreen ? 'overflow-x-scroll' : isSmallScreen ? 'grid-cols-3' : SidebarLeft ? 'grid-cols-4' : 'max-lg:grid-cols-4 max-md:grid-cols-2 grid-cols-5'} max-sm:grid-cols-2 max-md:grid-cols-3 `}>

{
  playlists.map((item, index) => (
    <div className=' overflow-hidden '>
     
    <div onClick={() => handleClick(item, item.id)} key={index} className='card  group duration-200 px-4 w-full  max-sm:px-4  max-md:px-0 hover:bg-[#272727]  cursor-pointer max-md:w-48 max-xl:px-2   max-md:h-full max-sm:w-44 max-xl:w-full   max-xl:h-full max-lg:h-full shadow-white'>
      <div className={`relative mt-4   ${SidebarLeft?'':'w-full h-full max-md:w-48 max-md:h-48  max-sm:h-36 max-sm:w-36 max-lg:h-40 max-lg:w-40 max-xl:w-32 max-xl:h-36'}`}>
        <img className='h-full  max-md:rounded-md w-full object-cover  card-img max-sm:p-2 max-sm:mt-0.5 max-md:p-6 max-md:-mt-3    ' src={item.images[0].url} alt="" />
       <button className=' h-20 w-20  absolute max-md:right-2 -right-2 max-sm:-right-1 bottom-2 flex justify-center items-center cursor-auto duration-200 opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0  '>
         
       <img className='h-16 w-16' src={play} alt="" />
       </button >
     </div>
     <div className=''>
     <h2 className='text-white  w-40 font-semibold p-2 max-md:pb-2 max-md:p-0   tracking-wide capitalize max-xl:p-3 max-md:pl-8'>{item.name}</h2>
      <p className='text-white pb-1 pl-2 line-clamp-1 text-sm  max-md:hidden max-xl:hidden'>{item.description}</p>
     </div>

    </div>
 
</div>  ))
}


</div>
    </div>  )
}

export default PlaylistsCategory
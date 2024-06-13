import React from 'react'
import './Main.scss'
import { saveToLocalStorage } from '../../app/like/LikeSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const MainCards = ({key, item , play}) => {
    const navigate = useNavigate();
    const SidebarLeft = useSelector(state => state.like.SidebarLeft);

    const handleClick = (item, id) => {
        saveToLocalStorage('selectedPlaylist', item);
        navigate(`/tracks/${id}`);
      };
  return (
  <div className='  '>
     
                 <div onClick={() => handleClick(item, item.id)} key={key} className='card  group duration-200 px-4 w-full  max-sm:px-4  max-md:px-0 hover:bg-[#272727]  cursor-pointer max-md:w-48 max-xl:px-2   max-md:h-full max-sm:w-44 max-xl:w-full   max-xl:h-full max-lg:h-full shadow-white'>
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
              
  </div>
  )
}

export default MainCards
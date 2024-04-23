import './Main.scss'
import usePlaylist from '../../hooks/usePlaylist'
import useRecentPlayed from '../../hooks/useRecentPlayed';
import { useNavigate } from 'react-router-dom';
import Header from './../Header/Header';
import useMadeForYou from '../../hooks/useMadeForYou';
import { saveToLocalStorage } from '../../app/like/LikeSlice';

const Main = () => {

  const playlist = usePlaylist();
  
  const MadeForYou = useMadeForYou();

  const recentPlay = useRecentPlayed();
// console.log(recentPlay)


const navigate = useNavigate();
  const handleClick = (item,id) => {
    saveToLocalStorage('selectedPlaylist', item);
    navigate(`/tracks/${id}`);
  };
  


  
  return (
    <div className='Main '>
      <Header />
      {/* <div className='bg-gray-800  w-full '>
        <div>
          <h1 className='text-white font-semibold text-4xl'>Good Afternoon</h1>

        </div>
        <div className='grid grid-cols-3 mt-8 gap-4 '>
          {
            playlist.slice(0, 6).map((item, i) => (
              <div key={i} onClick={() =>handleClick(item, item.id)} className='flex items-center cursor-pointer bg-slate-600 rounded-md gap-5 relative w-full '>
                <img src={item.images[0].url} className='w-16 h-16 rounded-s-md' alt="" />
                <span className='capitalize font-semibold line-clamp-1'>{item.name}</span>
              </div>
            ))
          }
        </div>
      </div> */}

      <div className='  '>
        <div className=' pt-[24px] pb-[48px] px-[32px] space-y-9 -z-10 '>
          <div>
            <div className='flex justify-between items-end mb-[18px]'>
              <div>
                <h2 className='text-2xl font-semibold hover:underline capitalize text-white '>Top Mixes</h2>
              </div>
              <h2 className='uppercase text-[16px] tracking-widest font-semibold hover:underline text-[#b3b3b3] leading-6 ' >See All</h2>
            </div>
            <div className='grid grid-cols-4  gap-5   max-md:grid-cols-2 max-lg:grid-cols-3 '>
              {playlist.slice(0,4).map((item,index) => (
                <div  onClick={() =>handleClick(item, item.id)} key={index} className='card border hover:bg-[#272727]  w-full cursor-pointer max-md:w-full max-lg:w-full max-md:h-48 max-xl:w-full  max-xl:h-full max-lg:h-full shadow-white'>
                  <div>
                    <img className='p-3 card-img' src={item.images[0].url} alt="" />
                  </div>
                  <h2 className='text-white  font-semibold p-2  tracking-wide capitalize max-xl:p-3 max-md:p-3'>{item.name}</h2>
                  <p className='text-white p-2 line-clamp-3 text-sm  max-md:hidden max-xl:hidden'>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='flex justify-between items-end mb-[18px]'>
              <div>
                <h2 className='text-2xl font-semibold hover:underline capitalize text-white'>Made for You</h2>
              </div>
              <h2 className='uppercase text-[16px] tracking-widest font-semibold hover:underline text-[#b3b3b3] leading-6'>See All</h2>
            </div>
            <div className='grid grid-cols-4  gap-5   max-md:grid-cols-2 max-lg:grid-cols-3  '>
              {recentPlay.slice(0,4).map((item,index) => (
                <div  onClick={() =>handleClick(item, item.id)} key={index} className='card border  w-full hover:bg-[#272727] cursor-pointer max-md:w-full max-lg:w-full  max-md:h-48 max-xl:w-full  max-xl:h-full max-lg:h-full shadow-white'>
                  <div className='  '>
                    <img className='p-3 card-img      ' src={item.images[0].url} alt="" />
                  </div>
                  <h2 className='text-white  font-semibold p-2  tracking-wide capitalize max-xl:p-3 max-md:p-3'>{item.name}</h2>
                  <p className='text-white p-2 line-clamp-3 text-sm  max-md:hidden max-xl:hidden'>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className='flex justify-between items-end mb-[18px]'>
              <div>
                <h2 className='text-2xl font-semibold hover:underline capitalize text-white'>Recent Played</h2>
              </div>
              <h2 className='uppercase text-[16px] tracking-widest font-semibold hover:underline text-[#b3b3b3] leading-6'>See All</h2>
            </div>
            <div className='grid grid-cols-4  gap-5   max-md:grid-cols-2 max-lg:grid-cols-3 '>
              {MadeForYou.slice(0,4).map((item,index) => (
                <div  onClick={() =>handleClick(item, item.id)} key={index} className='card border  w-full cursor-pointer max-md:w-full max-lg:w-full max-md:h-48 max-xl:w-full  max-xl:h-full max-lg:h-full shadow-white'>
                  <div>
                    <img className='p-3 card-img' src={item.images[0].url} alt="" />
                  </div>
                  <h2 className='text-white  font-semibold p-2  tracking-wide capitalize max-xl:p-3 max-md:p-3'>{item.name}</h2>
                  <p className='text-white p-2 line-clamp-3 text-sm  max-md:hidden max-xl:hidden'>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;

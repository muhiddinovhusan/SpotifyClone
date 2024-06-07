import { Link } from 'react-router-dom';
import spotify from '../../assets/images/Spotify_Logo_RGB_White.png';
import './Sidebar.scss';
import { useState } from 'react';
import Union from '../../assets/icons/Union.svg';
import friend from '../../assets/icons/Union (1).svg';
import User from '../../assets/icons/User Blue.svg';
import x from '../../assets/icons/x.svg'
import HomeIc, { CreateIC, LibraryIC, LikeIC, SearchIC } from '../../assets/images/Image';
import { useSelector } from 'react-redux';

const SidebarRight = () => {
  const [active, setActive] = useState("Home");

  const handleClick = (clickedItem) => {
    setActive(clickedItem);
  };
  const SidebarLeft = useSelector(state => state.like.SidebarLeft);
  const SidebarRight = useSelector(state => state.like.SidebarRight);
  console.log(SidebarLeft);


  console.log(active)

  return (
    <div className={`  bg-black p-3 font h-screen    max-lg:hidden max-sm:hidden   sticky top-0 ${SidebarRight? 'w-[266px]': 'w-20'}`}>
{/* <img src={friend} alt="" /> */}
<div className='flex text-[#b2b2b2]'>
<h1>Friend Activity</h1>
<div className='flex ml-16 gap-5 items-center'>
  <img src={friend} alt="" />
  <img src={x} alt="" />
</div>
</div>
<div className='flex flex-col gap-4 mt-7 text-[#b2b2b2]'>
  <h2 className='text-sm'>Let friends and followers on Spotify see what you’re listening to.</h2>
  <div className='flex gap-3'>
    <img className='' src={User} alt="" />
    <img className='w-24' src={Union} alt="" />
  </div>
  <div className='flex gap-3'>
    <img className='' src={User} alt="" />
    <img className='w-24' src={Union} alt="" />
  </div>
  <div className='flex gap-3'>
    <img className='' src={User} alt="" />
    <img className='w-24' src={Union} alt="" />
  </div>
  <h1 className='text-base'>Go to Settings  Social and enable “Share my listening activity on Spotify.’ You can turn this off at any time.</h1>
  <button className='h-12 w-48 border text-black ml-5 max-xl:ml-4 border-white bg-white rounded-3xl'>Settings</button>
</div>
    </div>
  );
};

export default SidebarRight;

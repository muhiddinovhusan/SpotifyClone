import React from 'react'
import homeicon from '../../assets/images/Home_S.png'
import searchicon from '../../assets/images/Search_S.png'
import LikeIcon from '../../assets/images/Liked Songs_S.png'
import libraryicon from '../../assets/images/Library_S.png'
import spotify from '../../assets/images/Spotify logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { LikeIC } from '../../assets/images/Image'
import './Footer.scss'
import { useDispatch, useSelector } from 'react-redux'
import { togglePlayerContentClose } from '../../app/like/LikeSlice'
const Footer = () => {
  const dispatch = useDispatch()
  const closePlayerContent = () => {
    dispatch(togglePlayerContentClose())
  }
  const PlayerContent = useSelector(state => state.like.PlayerContent)

const navigate = useNavigate()
  const handleLinkClick = (event) => {
    event.preventDefault(); 
    closePlayerContent(); 
    navigate('/')
  }

  return (
    <div className='fixed md:hidden h-16 bg-[#000]  w-full pt-1 -bottom-1 grid grid-cols-5 z-50  '>
      <div  onClick={PlayerContent? handleLinkClick :''}   className=' pl-1  text-[11px]'>

        <img className='pl-2 p-1 ' src={homeicon} alt="" />

        <p className='pl-1  font-semibold text-[#b3b3ad]'>Главная</p>
      </div>
      <Link onClick={PlayerContent? handleLinkClick :''}  to='' className='w-20 text-[12px]'>
        <img className='pl-2 p-1' src={searchicon} alt="" />
        <p className='ml-1  font-semibold  text-[#b3b3ad]'>Поиск</p>
      </Link>
      <Link className='w-[100px] text-[11px]'>
        <img className='pl-6 p-0.5' src={libraryicon} alt="" />

        <p className='pt-1   font-semibold text-[#b3b3ad]'>Моя медиатека</p>
      </Link>
      <Link onClick={PlayerContent? handleLinkClick :''}  to='https://open.spotify.com/' className='w-full  pl-6 text-[11px] '>
        <div className='flex  items-center'>

          <img className='w-10 ' src={spotify} alt="" />
        </div>
        <p className=' font-semibold text-[#b3b3ad]'>Spotify</p>
      </Link>
      <Link onClick={PlayerContent? handleLinkClick :''}  to='/likedSongs' className='p-2'>
        <img src={LikeIcon} alt="" className='ml-4' />
        <h2 className='text-[#b3b3ad] text-xs'>Liked Songs</h2>
      </Link>
    </div>

  )
}

export default Footer
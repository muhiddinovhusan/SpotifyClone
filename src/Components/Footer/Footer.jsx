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

  const handleLinkClick1 = (event) => {
    event.preventDefault();
    if (PlayerContent) {
      closePlayerContent();
      navigate('/')
    }
    else {
      navigate('/')
    }

  }
  const handleLinkClick = (event) => {
    event.preventDefault();
    if (PlayerContent) {
      closePlayerContent();
      navigate('/likedSongs')
    }
    else {
      navigate('/likedSongs')
    }

  }
  const handleLinkClick2 = (event) => {
    event.preventDefault();
    if (PlayerContent) {
      closePlayerContent();
      navigate('https://open.spotify.com/')
    }
    else {
      navigate('https://open.spotify.com/')
    }

  }

  return (
    <div className='fixed md:hidden h-16 bg-[#000]  w-full pt-1 -bottom-1 grid grid-cols-5 z-50  '>
      <div onClick={handleLinkClick1} className=' pl-1  text-[11px] cursor-pointer'>

        <img className='pl-2 p-1 ' src={homeicon} alt="" />

        <p className='pl-1  font-semibold text-[#b3b3ad]'>Главная</p>
      </div>
      <div onClick={handleLinkClick1} to='' className='w-20 text-[12px] cursor-pointer'>
        <img className='pl-2 p-1' src={searchicon} alt="" />
        <p className='ml-1  font-semibold  text-[#b3b3ad]'>Поиск</p>
      </div>
      <div className='w-[100px] cursor-pointer text-[11px]'>
        <img className='pl-6 p-0.5' src={libraryicon} alt="" />

        <p className='pt-1   font-semibold text-[#b3b3ad]'>Моя медиатека</p>
      </div>
      <Link to='https://open.spotify.com'  className='w-full  pl-6 text-[11px] '>
        <div className='flex  items-center'>

          <img className='w-10 ' src={spotify} alt="" />
        </div>
        <p className=' font-semibold text-[#b3b3ad]'>Spotify</p>
      </Link>
      <div onClick={ handleLinkClick } className='p-2 cursor-pointer'>
        <img src={LikeIcon} alt="" className='ml-2' />
        <h2 className='text-[#b3b3ad] text-xs'>Liked Songs</h2>
      </div>
    </div>

  )
}

export default Footer
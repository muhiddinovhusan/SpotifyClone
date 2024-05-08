import React from 'react'
import homeicon from '../../assets/images/Home_S.png'
import searchicon from '../../assets/images/Search_S.png'
import libraryicon from '../../assets/images/Library_S.png'
import spotify from '../../assets/images/Spotify logo.png'
const Footer = () => {
  return (
    <div className='fixed h-16 bg-[#000] gap-6 w-full pt-1 -bottom-1  z-50 flex '>
<div  className='w-20 pl-2  text-[11px]'>
      
        <img  className='pl-3 p-1 ' src={homeicon} alt="" />

 <p className='pl-1  font-semibold text-[#b3b3ad]'>Главная</p>
</div>
<div className='w-20 text-[12px]'>
<img  className='pl-2 p-1' src={searchicon} alt="" />
<p className='ml-1  font-semibold text-[#b3b3ad]'>Поиск</p>
</div>
<div className='w-[100px] text-[11px]'>
<img  className='pl-6 p-0.5' src={libraryicon} alt="" />

<p className='pt-1   font-semibold text-[#b3b3ad]'>Моя медиатека</p>
</div>
<div className='w-24  pl-3 text-[11px] '>
  <div className='flex  items-center'>

<img className='w-10 ' src={spotify} alt="" />
  </div>
<p className=' font-semibold text-[#b3b3ad]'>Spotify</p>
</div>
    </div>

  )
}

export default Footer
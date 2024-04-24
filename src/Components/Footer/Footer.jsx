import React from 'react'
import homeicon from '../../assets/images/Home_S.png'
import searchicon from '../../assets/images/Search_S.png'

const Footer = () => {
  return (
    <div className='fixed h-16 bg-green-700 gap-5 w-full bottom-0 l-0 z-50 flex '>
<div  className='w-1/4  text-[13px]'>
        <img  className='pl-3 p-1 ' src={homeicon} alt="" />

 <p className='pl-1 p-1 '>Главная</p>
</div>
<div className='w-1/4 text-[13px]'>
<img  className='pl-2 p-1' src={searchicon} alt="" />
<p className='ml-1'>Search</p>
</div>
<div className='w-1/4 bg-black'></div>
<div className='w-1/4 bg-black'></div>
    </div>

  )
}

export default Footer
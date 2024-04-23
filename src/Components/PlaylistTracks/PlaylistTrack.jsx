import useTracks from './../../hooks/useTracks';
import { Bell, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import unlike from '../../assets/images/Heart_Fill_XSS.svg'
import like from '../../assets/images/Heart_Fill_XS.svg'

import { addToLikeCart, loadFromLocalStorage, removeFromLikedSongs } from '../../app/like/LikeSlice';
import './PlaylistTracks.scss'
import { useRef, useState } from 'react';
 const PlaylistTrack = () => {
  const selectedPlaylist = JSON.parse(localStorage.getItem('selectedPlaylist'));
  const playlistTracks = useTracks(selectedPlaylist ? selectedPlaylist.id : null);
  const dispatch = useDispatch();

  const likeCart = loadFromLocalStorage("likeCart");
// console.log(selectedPlaylist);
  
  function formatDuration(duration_ms) {
    const duration_s = duration_ms / 1000;

    const minutes = Math.floor(duration_s / 60);
    const seconds = Math.floor(duration_s % 60);

    const formatted_seconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formatted_seconds}`;

  }

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = (item) => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    localStorage.setItem('selectedTrack', JSON.stringify(item))
  };



  const addToLikeCartt = (track) => {
    dispatch(addToLikeCart(track));
  };
  const removeFromLike = (trackId) => {
    dispatch(removeFromLikedSongs(trackId));
  }

  return (
    <div >
      <header style={{ backgroundColor: selectedPlaylist.primary_color || "green" }} className='text-black py-3  pt-3 px-5 pb-20  '>
        <div className="top flex justify-between sticky top-0 z-20 max-md:hidden bg-inherit w-full ">
          <div className="left flex items-center gap-3  ">
            <button className="bg-zinc-800 p-1 flex justify-center items-center transition-all rounded-full hover:scale-110">
              <ChevronLeft color="white" className="mx-auto" size={26} />
            </button>
            <button className="bg-zinc-800 p-1 flex justify-center items-center transition-all rounded-full hover:scale-110">
              <ChevronRight color="white" className="mx-auto" size={26} />
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
        <button className=' xl:hidden lg:hidden md:hidden' > <i class="fa-solid fa-arrow-left fa-xl"></i></button>
        <div className='mt-6 flex gap-4'>
          <div>

            <img className='max-md:p-2 max-md:w-1/2' src={selectedPlaylist.images[0].url} alt="" />
          </div>
          <div className='p-4 '>
            <h3>Public playlist</h3>
            <h1 className='name'>{selectedPlaylist.name}</h1>
          </div>
        </div>
      </header>

      <div>
          {playlistTracks.map((track, index) => {
              const isTrackLiked= likeCart.some(song => song.id === track.track.id);
            return(
            <div className='flex w-full items-center gap-4 p-3' key={index}>
              <img className='cursor-pointer' onClick={()=>togglePlay(track)} src={track.track.album.images[2].url} alt="" />
              <div className='text-white '>
                <h3>
                {track.track.name} - {track.track.artists.map(artist => artist.name).join(', ')}

                </h3>
                <audio  ref={audioRef}>
                  <source src={track.track.preview_url} type="audio/mpeg" />
                </audio>
              </div>

              {isTrackLiked ? (
             <div className=''>

               <img className='cursor-pointer ' onClick={() => removeFromLike(track.track.id)} src={like} alt="" />
               
             </div>
              ) : (
                <img className='cursor-pointer' onClick={() => addToLikeCartt(track.track)} src={unlike} alt="" />
                
              )} 
                          <span>{formatDuration(track.track.duration_ms)}</span>

                    </div>
            )
 })}
      </div>
    </div>
  );

}

export default PlaylistTrack;

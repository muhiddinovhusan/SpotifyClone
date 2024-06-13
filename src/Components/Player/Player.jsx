import { useEffect, useState } from 'react';
import './Player.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addToselectedTrack, loadFromLocalStorage, pauseTrackFalse, togglePlayTrue } from '../../app/like/LikeSlice';
import { useAudio } from '../../context/AudioProvider';
import Prev from '../../assets/player/Property 1=Prev_S_Hover.svg'
import Next from '../../assets/player/Property 1=Next_S_Hover.svg'
import Play from '../../assets/player/Property 1=Play_L_Hover.svg'
import Pause from '../../assets/player/Subtract.svg'
import Repeat from '../../assets/player/Repeat_S.svg'
import Random from '../../assets/player/Shuffle_S.svg'
import Volume from '../../assets/player/Volume_XS.svg'
import Devices from '../../assets/player/Devices_XS.svg'
import FullScreen from '../../assets/player/FullScreen_S.svg'
import Queue from '../../assets/player/Queue_XS.svg'
import useTracks from '../../hooks/useTracks';

const Player = () => {
  const { audioRef, isPlaying, selectedTrack, duration, setDuration, currentTime, togglePlayPause, setCurrentTime, volume, handleVolumeChange, reloadBtn } = useAudio();
  const dispatch = useDispatch()
  const handleSeek = (e) => {
    if (audioRef.current) {
      const seekTime = e.target.value;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      return () => {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }
  }, []);


  function formatDuration(duration) {
    if (isNaN(duration)) return "0:00";
    if (duration > 1000) return "0:00"
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    const formatted_seconds = seconds.toString().padStart(2, "0");
    return `${minutes}:${formatted_seconds}`;
  }

  const selectedPlaylist = loadFromLocalStorage('selectedPlaylist');
  const playlistTracks = useTracks(selectedPlaylist ? selectedPlaylist.id : null);

  const getRandomTrack = () => {
    if (playlistTracks.length > 60) {
      const randomIndex = Math.floor(Math.random() * playlistTracks.length);
      dispatch(addToselectedTrack(playlistTracks[randomIndex].track))
      dispatch(togglePlayTrue())
      console.log(randomIndex)
    }
  };



  const PlayerContent = useSelector(state => state.like.PlayerContent)

  return (
    <div className={`${selectedTrack ? "" : 'hidden'} ${PlayerContent ? 'hidden' : 'Player flex max-sm:h-[74px]  font max-md:bottom-14'}`}>

      <div className='w-1/4 max-sm:hidden  gap-3 flex items-center pl-4'>

        {selectedTrack && selectedTrack.album && selectedTrack.album.images &&
          (
            <img
              className='w-[80px] h-[80px] rounded-md '
              src={selectedTrack?.album?.images[0]?.url}
              alt=""
            />
          )}

        <div className='w-40  '>
          <h2 className='text-white line-clamp-1'>{selectedTrack?.name}</h2>
          <h2 className=' text-[#B3B3B3]'>{selectedTrack?.album?.artists[0]?.name}</h2>
        </div>






      </div>
      <div className='w-2/4 max-sm:w-full flex flex-col'>
        <div className='flex justify-center items-center gap-5 h-3/5'>
          <img onClick={getRandomTrack} className='cursor-pointer' src={Random} alt="" />
          <img src={Prev} className='' alt="" />
          <button className='' onClick={togglePlayPause}>
            {isPlaying ? <img className='' src={Pause} alt="" /> : <img className='' src={Play} alt="" />}
          </button>
          <img src={Next} className='' alt="" />
          <img src={Repeat} className='cursor-pointer' onClick={reloadBtn} alt="" />

        </div>
        <div className='flex items-center justify-center gap-2'>
          <span className='text-[#A6A6A6] text-sm'>{formatDuration(currentTime)}</span>
          {selectedTrack ? (
            <audio ref={audioRef} id="audioElement" className='w-full '
              onTimeUpdate={handleTimeUpdate}>
              <source src={selectedTrack.preview_url} type='audio/mpeg' />
            </audio>
          ) : (
            ''
          )}
          <input
            className='range'
            type="range"
            min="0"
            step='1'
            max={duration}
            value={currentTime}
            onChange={handleSeek}

          />
          <span className='text-[#A6A6A6] text-sm'>{formatDuration(duration)}</span>
        </div>

      </div>
      <div className='w-1/4 max-sm:hidden flex max-md:justify-center justify-end pr-5 items-center '>
        <img className='max-md:hidden' src={Queue} alt="" />
        <img className='max-md:hidden' src={Devices} alt="" />
        <img src={Volume} alt="" />
        <input
          className='w-2/5 h-1'
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => handleVolumeChange(e.target.value)}
        />
        <img src={FullScreen} alt="" />
      </div>
    </div>
  );
};

export default Player;

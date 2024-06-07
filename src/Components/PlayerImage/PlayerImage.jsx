import React, { useEffect } from 'react'
import { useAudio } from '../../context/AudioProvider'
import { useDispatch, useSelector } from 'react-redux'
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
import './PlayerContent.scss'
import { togglePlayerContentClose, togglePlayerContentOpen } from '../../app/like/LikeSlice'
const PlayerImage = () => {
    const { selectedTrack } = useAudio()
    const PlayerContent = useSelector(state => state.like.PlayerContent)
    const dispatch = useDispatch()
    const openPlayerContent = () => {
        dispatch(togglePlayerContentOpen())
    }
    return (
        <div onClick={openPlayerContent} className={`${PlayerContent ? 'hidden' : 'bottom-[130px] fixed h-24 z-50 w-24  cursor-pointer    sm:hidden  text-white'}`}>
            <div className='relative'>
                <img className=' ' src={selectedTrack?.album?.images[1]?.url} alt="" />

            </div>

        </div>
    )
}


export const PlayerContent = () => {
    const PlayerContent = useSelector(state => state.like.PlayerContent)
    const { audioRef, isPlaying, selectedTrack, duration, setDuration, currentTime, togglePlayPause, setCurrentTime, volume, handleVolumeChange, reloadBtn } = useAudio();

    const dispatch = useDispatch()
    const closePlayerContent = () => {
        dispatch(togglePlayerContentClose())
    }
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 640) {
                dispatch(togglePlayerContentClose());
            }
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);


    function formatDuration(duration) {
        if (isNaN(duration)) return "0:00";
        if (duration > 1000) return "0:00"
        const minutes = Math.floor(duration / 60);
        const seconds = Math.floor(duration % 60);

        const formatted_seconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formatted_seconds}`;
    }


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

    return (
        <div className={`sm:hidden ${PlayerContent ? 'w-full  z-[10]  font   top-0 left-0 h-full fixed  player-content  ' : ' hidden'}`}>

            <div className='  max-sm:p-20   flex justify-center items-center'>

                <img className='w-full  ' src={selectedTrack?.album?.images[0]?.url} alt="" />
            </div>
           <div className=''>

           <div className='flex flex-col justify-center  items-center -mt-4  mb-4'>
                <h2 className='text-[#B3B3B3]'>
                    {selectedTrack?.name}
                </h2>
                <h2 className='text-xl text-white'>
                    {selectedTrack?.album?.artists[0]?.name}
                </h2>

            </div>
            <div className='flex justify-between'>
                <div className='flex pl-5'>
                <img className='' src={Queue} alt="" />
                <img className='' src={Devices} alt="" />
                </div>
            <div className='flex items-center justify-end pr-5 mt-3'>
                  
                    <img src={Volume} alt="" />
                    <input
                        className='w-2/4 h-1'
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => handleVolumeChange(e.target.value)}
                    />
                </div>
            </div>
          
            <div className='flex items-center justify-center gap-2 mt-8'>
                <span className='text-[#A6A6A6] text-sm'>{formatDuration(currentTime)}</span>
                {selectedTrack ? (
                    <audio ref={audioRef} id="audioElement" className='w-full '
                        onTimeUpdate={handleTimeUpdate}>
                        <source src={selectedTrack.preview_url} type='audio/mpeg' />
                    </audio>
                ) : (
                    <p>No track selected</p>
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

            <div className='flex justify-center items-center  gap-5 '>
                <img src={Random} alt="" />
                <img src={Prev} className='' alt="" />
                <button className='' onClick={togglePlayPause}>
                    {isPlaying ? <img className='' src={Pause} alt="" /> : <img className='' src={Play} alt="" />}
                </button>
                <img src={Next} className='' alt="" />
                <img src={Repeat} className='cursor-pointer' onClick={reloadBtn} alt="" />

            </div>
            
                
            </div> 
         
            
        </div>
    )
}
export default PlayerImage
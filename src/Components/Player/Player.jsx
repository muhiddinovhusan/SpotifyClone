import { loadFromLocalStorage } from '../../app/like/LikeSlice';
import './Player.scss'
const Player = () => {
  const Track = loadFromLocalStorage("selectedTrack");
  console.log(Track)

  return (
    
    <div className='Player  flex justify-center items-center'>
      <audio  className='w-full' controls src={Track.track.preview_url}></audio>
       </div>
  )
}

export default Player
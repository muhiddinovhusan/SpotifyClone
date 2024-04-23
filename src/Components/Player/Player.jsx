import { loadFromLocalStorage } from '../../app/like/LikeSlice';
import './Player.scss';

const Player = () => {
  const Track = loadFromLocalStorage("selectedTrack");
  console.log(Track);

  return (
    <div className='Player flex justify-center items-center'>
      {Track ? (
        <audio className='w-full' controls src={Track.track.preview_url}></audio>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default Player;

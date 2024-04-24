import { useEffect, useState } from 'react';
import { loadFromLocalStorage } from '../../app/like/LikeSlice';
import './Player.scss';
import { useSelector } from 'react-redux';

const Player = ({ isPlaying }) => {
  const [audioElement, setAudioElement] = useState(null);

  const selectedTrack = useSelector(state => state.like.selectedTrack);

  useEffect(() => {
    const newAudioElement = document.createElement("audio");
    setAudioElement(newAudioElement);
    return () => {
      newAudioElement.pause();
      newAudioElement.src = "";
    };
  }, []);

  useEffect(() => {
    if (selectedTrack && audioElement) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying, selectedTrack, audioElement]);

  return (
    <div className='Player flex justify-center items-center max-lg:bottom-16'>
      {selectedTrack ? (
        <audio id="audioElement" className='w-full' controls >
          <source src={selectedTrack.preview_url || selectedTrack.track.preview_url} type='audio/mpeg'/>
        </audio>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default Player;

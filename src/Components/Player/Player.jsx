import { useEffect, useState } from 'react';
import { loadFromLocalStorage } from '../../app/like/LikeSlice';
import './Player.scss';

const Player = ({ isPlaying }) => {
  const [track, setTrack] = useState(null);
  const [audioElement, setAudioElement] = useState(null);

  useEffect(() => {
    const storedTrack = loadFromLocalStorage("selectedTrack");
    setTrack(storedTrack);
  }, []); 

  useEffect(() => {
    if (track && audioElement) {
      if (isPlaying) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  }, [isPlaying, track, audioElement]);

  useEffect(() => {
    const newAudioElement = document.createElement("audio");
    setAudioElement(newAudioElement);
    return () => {
      newAudioElement.pause();
      newAudioElement.src = "";
    };
  }, []);

  return (
    <div className='Player flex justify-center items-center'>
      {track ? (
        <audio id="audioElement" className='w-full' controls >
          <source src={track.track.preview_url} type='audio/mpeg'/>
        </audio>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default Player;

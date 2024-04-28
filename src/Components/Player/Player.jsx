import { useEffect, useState } from 'react';
import './Player.scss';
import { useSelector } from 'react-redux';

const Player = ({ isPlaying }) => {
  const [audioElement, setAudioElement] = useState(null);

  const selectedTrack = useSelector(state => state.like.selectedTrack);
  console.log(selectedTrack);

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
      {selectedTrack && selectedTrack.album && selectedTrack.album.images || selectedTrack && selectedTrack.track && selectedTrack.track.album && selectedTrack.track.album.images &&
  (
        <img
          className='w-20 h-full'
          src={selectedTrack.track.album.images[0]?.url || selectedTrack.album.images[0]?.url}
          alt=""
        />
      )}

      {selectedTrack ? (
        <audio  id="audioElement" className='w-full' controls >
          <source src={selectedTrack.preview_url || selectedTrack.track.preview_url} type='audio/mpeg'/>
        </audio>
      ) : (
        <p>No track selected</p>
      )}
    </div>
  );
};

export default Player;

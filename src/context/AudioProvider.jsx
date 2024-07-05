import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToselectedTrack, togglePlayTrue, pauseTrackFalse } from "../app/like/LikeSlice";
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
    const dispatch = useDispatch();
    const audioRef = useRef(new Audio());
    const selectedTrack = useSelector(state => state.like.selectedTrack);
    const isPlaying = useSelector(state => state.like.isPlaying);
    const [currentTime, setCurrentTime] = useState(0);
    const audioDuration = selectedTrack?.duration_ms
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1);


    const handleVolumeChange = (newVolume) => {
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };
    const playTrack = (track) => {
        dispatch(addToselectedTrack(track));
        audioRef.current.src = track.preview_url;
        audioRef.current.play();
        dispatch(togglePlayTrue());
    };

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            dispatch(pauseTrackFalse());

        } else {
            audioRef.current.play();
            dispatch(togglePlayTrue());
        }

    };
    useEffect(() => {
        if (selectedTrack) {
            setDuration(audioDuration);
        }
    }, [selectedTrack]);

    useEffect(() => {
        if (selectedTrack) {
            audioRef.current.src = selectedTrack.preview_url;
            setDuration(selectedTrack.duration_ms);
            if (!isPlaying) {
                audioRef.current.pause();
            }
        }
    }, [selectedTrack, dispatch]);
    useEffect(() => {
        const handleEnded = () => {
            dispatch(pauseTrackFalse());
        };

        const audioElement = audioRef.current;
        audioElement.addEventListener("ended", handleEnded);

        return () => {
            audioElement.removeEventListener("ended", handleEnded);
        };
    }, [dispatch]);


    const reloadBtn = () => {
        const currentlyPlaying = !audioRef.current.paused && isPlaying;
        if (currentlyPlaying) {
            audioRef.current.pause();
            dispatch(pauseTrackFalse());
        }
        audioRef.current.load();
        if (currentlyPlaying) {
            audioRef.current.play();
            dispatch(togglePlayTrue());
        }
    };

    const playNewTrack = (track) => {
        if (audioRef.current.src !== track.preview_url) {
            audioRef.current.load();
        }
        if (isPlaying) {
            audioRef.current.play();
        }
    };

    useEffect(() => {
        if (selectedTrack) {
            playNewTrack(selectedTrack);
        }
    }, [selectedTrack, isPlaying]);




    return (
        <AudioContext.Provider value={{ audioRef, volume, isPlaying, selectedTrack, currentTime, duration, setDuration, setCurrentTime, playTrack, togglePlayPause, handleVolumeChange, reloadBtn }}>
            {children}
        </AudioContext.Provider>
    );
};

export const useAudio = () => useContext(AudioContext);

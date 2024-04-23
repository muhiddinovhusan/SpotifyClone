import { useEffect, useState } from "react";
import {  jumpBackIn } from "../app/data";

const useJumpIn = () => {
    const [jumpIn, setJumpIn] = useState([]);
    useEffect(() => {
      const getPlaylists = async () => {
        await fetch(jumpBackIn, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        })
          .then((res) => res.json())
          .then((data) => {
            setJumpIn(data.playlists.items);
          })
          .catch((err) => console.log(err))
      }
      getPlaylists();
  
    }, [])
  
    return jumpIn;
  }
  
  export default useJumpIn
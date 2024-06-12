import { ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import playIcon from "../../assets/images/Play_Greem Hover.png";
import { useNavigate } from "react-router-dom";
import "./Header.scss"
import usePlaylist from "../../hooks/usePlaylist";
import { useEffect, useState } from "react";

const Header = () => {

    const navigate = useNavigate()
    const goPlaylist = (playlist, id) => {
        localStorage.setItem("selectedPlaylist", JSON.stringify(playlist))
        navigate(`/tracks/${id}`);
    }
    const featuredPlaylist = usePlaylist();

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const isSmallScreen = screenWidth <= 768;


 

    return (
        <div className="">

            <header className="text-white py-3 bg-gradient-to-b from-indigo-800 pt-3 px-5 pb-20   ">

                <div className="bottom mt-20 max-md:mt-4 " >
                    <div className="flex justify-between">

                        <h1 className="text-5xl font-semibold max-md:text-3xl">Good Afternoon</h1>
                        <h2></h2>
                    </div>
                    <div className="cards grid grid-cols-2 mt-8 gap-4  max-md:grid-cols-1 ">
                        {(isSmallScreen ? featuredPlaylist.slice(0, 4) : featuredPlaylist.slice(0, 6)).map((item) => (
                            <div onClick={() => goPlaylist(item, item.id)} key={item.id} className="flex items-center cursor-pointer hover:bg-[#272727] bg-slate-600 rounded-md gap-5 relative w-full  transition-all">
                                <img src={item.images[0].url} alt="" className="w-16 h-16 rounded-s-md" />
                                <span className="capitalize font-semibold line-clamp-1">{item.name}</span>
                                <button className="header-playlist-play-btn absolute right-0 hidden transition-none hover:scale-110">
                                    <img width="50px" height="50px" src={playIcon} alt="" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Header
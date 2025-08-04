import React from "react";

export const AudioPlayer = ({currentSong, isPlaying, togglePlayPause, nextSong, previousSong}) => {

    // helps with playing and pausing the songs
    const handlePlayPause = () => {
        togglePlayPause()
    }

    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <span onClick={previousSong} >
                        <i className="fa-solid fa-backward-step"></i>
                    </span>
                </div>
                <div className="col">
                    <span onClick={handlePlayPause}>
                        <i className={`${isPlaying? "fa-solid fa-pause" : "fa-solid fa-play"}`}></i>
                    </span>
                </div>
                <div className="col">
                    <span onClick={nextSong}>
                        <i className="fa-solid fa-forward-step"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default AudioPlayer;

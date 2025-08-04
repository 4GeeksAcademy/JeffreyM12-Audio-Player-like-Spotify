import React, { useEffect, useRef, useState } from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

import AudioPlayer from "./AudioPlayer";


//create your first component
const Home = () => {
	const [ songs, setSongs ] = useState([]);
	const [ currentSong, setCurrentSong ] = useState()
	const [currentIndex, setCurrentIndex] = useState();
	const [ isPlaying, setIsPlaying ] = useState(false)
	const audioRef = useRef();
	
	const url = 'https://playground.4geeks.com/sound/songs'
	
	// fetching songs from API
	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await fetch(url);
				const data = await response.json();
				console.log(data.songs)
				setSongs(data.songs);
			} catch (error) {
				console.error("Error fetching songs:", error);
			}
		};
		fetchSongs();
	}, []);
	
	// helps the current song playing
	const handleSelectedSong = (index) => {
		setCurrentIndex(index);
		setCurrentSong(songs[index]);
		setIsPlaying(true);
		playSong(songs[index]);
	}

	const playSong = (song) => {
		if (!audioRef.current || !song) return;
		audioRef.current.play();
	};

	const pauseSong = () => {
		if (audioRef.current) {
			audioRef.current.pause();
		}
	};

	// this helps toggle play and pause buttons
	const togglePlayPause = () => {
		console.log("Toggle play/pause ran")
		if (!audioRef.current) 
			return;
		if (isPlaying) {
			pauseSong();
		} else {
			playSong(currentSong);
		}
		setIsPlaying(!isPlaying);
	};

	const nextSong = () => {
		if (!songs.length) return;

		if (currentIndex === songs.length - 1){
			handleSelectedSong(0)
			return;
		}
		handleSelectedSong(currentIndex + 1)
	}

	const previousSong = () => {
		if (!songs.length) return;

		if (currentIndex === 0){
			handleSelectedSong(songs.length - 1)
			return;
		}
		handleSelectedSong(currentIndex - 1)
	}

	return (
		<>
		<section className="text-center container bg-dark text-white">
			<section>
				<div className="text-white d-flex justify-content-center my-5">
					<ol className="w-25 bg-dark">
						{songs.map((song, index) => (
							<li key={song.id} className="border border-secondary" >
								<button onClick={() => handleSelectedSong(index)}>
									{song.name}
								</button>
							</li>
						))}
					</ol>
				</div>
			</section>
			<section>
				<audio 
					hidden
					src={currentSong && 'https://playground.4geeks.com' + currentSong.url}
					ref={audioRef}
					autoPlay
					>
				</audio>
				<AudioPlayer 
				currentSong = {currentSong}
				isPlaying = {isPlaying}
				togglePlayPause={togglePlayPause}
				nextSong={nextSong}
				previousSong={previousSong}
				/>
			</section>
		</section>
		</>
	);
};

export default Home;
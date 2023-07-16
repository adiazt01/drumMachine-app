/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import "./App.css";

const drumPadsData = [
  {
    key: "Q",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    label: "Heater 1",
  },
  {
    key: "W",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    label: "Heater 2",
  },
  {
    key: "E",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    label: "Heater 3",
  },
  {
    key: "A",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    label: "Heater 4",
  },
  {
    key: "S",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    label: "Clap",
  },
  {
    key: "D",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    label: "Open HH",
  },
  {
    key: "Z",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    label: "Kick n' Hat",
  },
  {
    key: "X",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    label: "Kick",
  },
  {
    key: "C",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    label: "Closed HH",
  },
];

const DrumPad = ({ padData, onClick, volume, off }) => {
  const handlePadClick = () => {
    if (!off) {
      onClick(padData.label);
      const audio = new Audio(padData.audioSrc);
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
    }
  };

  return (
    <button
      className={`drum-pad ${off ? "power-off" : ""}`}
      id={`drum-pad-${padData.key}`}
      onClick={handlePadClick}
      disabled={off}
    >
      {padData.key}
    </button>
  );
};

const App = () => {
  const [displayText, setDisplayText] = useState("");
  const [volume, setVolume] = useState(0.5);
  const [off, setOff] = useState(false);

  useEffect(() => {
    // Precargar los clips de audio
    drumPadsData.forEach((pad) => {
      const audio = new Audio(pad.audioSrc);
      pad.audio = audio;
    });
  }, []);

  const handlePadClick = (label) => {
    if (!off) {
      setDisplayText(label);
      const pad = drumPadsData.find((pad) => pad.label === label);
      const audio = pad.audio;
      audio.volume = volume;
      audio.currentTime = 0;
      audio.play();
    }
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  const handlePowerClick = () => {
    setOff(!off);
  };

  return (
    <div id="drum-machine" className={`container ${off ? "power-off" : ""}`}>
      <div id="display">{displayText}</div>
      <div id="drum-pads">
        {drumPadsData.map((pad) => (
          <DrumPad
            key={pad.key}
            padData={pad}
            onClick={handlePadClick}
            volume={volume}
            off={off}
          />
        ))}
      </div>
      <div className="controls">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <button onClick={handlePowerClick}>
          {off ? "Power Off" : "Power On"}
        </button>
      </div>
    </div>
  );
};

export default App;

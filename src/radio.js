import React, { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { RadioBrowserApi } from "radio-browser-api";
import defaultImage from "./station.png";

export default function Radio() {
  const [stations, setStations] = useState([]);
  const [stationFilter, setStationFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [activeStation, setActiveStation] = useState(null);

  useEffect(() => {
    setupApi(stationFilter, searchText).then((data) => {
      setStations(data);
    });
  }, [stationFilter, searchText]);

  const setupApi = async (stationFilter, searchText) => {
    const api = new RadioBrowserApi(fetch.bind(window), "online_radio");

    const stations = await api
      .searchStations({
        language: "romanian",
        countryCode: "Ro",
        tag: stationFilter,
        limit: 500,
        name: searchText,
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  const filters = [
    "",
    "classical",
    "dance",
    "house",
    "jazz",
    "pop",
    "hip-hop",
    "oldies",
    "rock",
    "news",
    "manele",
  ];

  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  const handleStationClick = (station) => {
    setActiveStation(station);
  };

  const handleAudioEnded = () => {
    setActiveStation(null);
  };

  return (
    <div className="radio">
      <div className="filters">
        {filters.map((filter, index) => (
          <span
            key={index}
            className={stationFilter === filter ? "selected" : ""}
            onClick={() => setStationFilter(filter)}
          >
            {filter}
          </span>
        ))}
      </div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Cauta post de radio"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="stations">
        {stations.map((station, index) => {
          return (
            <div className="station" key={index}>
              <div
                className="stationName"
                onClick={() => handleStationClick(station)}
              >
                <img
                  className="logo"
                  src={station.favicon}
                  alt="station logo"
                  onError={setDefaultSrc}
                />
                <div className="name">{station.name}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="audio-player-container">
        <AudioPlayer
          className="player"
          src={activeStation?.urlResolved}
          showJumpControls={false}
          layout="stacked"
          customProgressBarSection={[]}
          customControlsSection={["MAIN_CONTROLS", "VOLUME_CONTROLS"]}
          autoPlayAfterSrcChange={false}
          onEnded={handleAudioEnded}
        />
        {activeStation && (
          <div className="station-name">Now playing: {activeStation.name}</div>
        )}
      </div>
    </div>
  );
}

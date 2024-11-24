/* eslint-disable @next/next/no-img-element */
import useDebounce from "@/utils/useDebounce";
import { getWeatherByGeoLocation, getWeatherData } from "@/utils/weather-api";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import Weather3 from "/public/assets/weather-3-min.jpg";
import { getSysTime } from "@/utils/timeUtils";
import { RiWindyLine } from "react-icons/ri";
import { WiHumidity, WiWindDeg } from "react-icons/wi";
import Toast from "@/utils/Toast";
const Home = () => {
  const [citySearchText, setCitySearchText] = useState("");
  const [weather, setWeather] = useState({});
  const [userLocationWeather, setUserLocationWeather] = useState({});
  const debouncedValue = useDebounce(citySearchText, 1000);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const Card = ({ item }) => {
    if (!item) return <></>;
    const {
      name,
      main: { humidity, temp },
      wind: { deg, speed },
      weather: [{ icon, main }],
    } = item;
    return (
      <div className="card-container">
        <div className="card">
          <div className="card-header">
            <p>{name}</p>
            <p>Time: {getSysTime()}</p>
          </div>
          <div className="card-body">
            <p className="temp">{temp.toFixed(0)}&#176;</p>
            <p className="weatherStatus">{main}</p>
          </div>
          <div className="card-footer">
            <div className="details">
              <div className="info">
                <RiWindyLine size={20} />
                <span>{speed} km/h</span>
              </div>
              <div className="info">
                <WiWindDeg size={20} />
                <span>{humidity}%</span>
              </div>
              <div className="info">
                <WiHumidity size={20} />
                <span>{deg} deg</span>
              </div>
            </div>
            <div className="card-icon">
              <img
                src={`https://openweathermap.org/img/wn/01d@2x.png`}
                alt="icon"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };
  useEffect(() => {
    getWeatherByGeoLocation().then((res) => setUserLocationWeather(res));
  }, []);
  useEffect(() => {
    if (debouncedValue) {
      setLoading(true);
      getWeatherData({ city: debouncedValue }).then((res) => {
        setWeather(res);
        setLoading(false);
        res.error ? setErrorMsg(res.error) : setErrorMsg("");
      });
    }
  }, [debouncedValue]);
  return (
    <div>
      <Head>
        <title>Cloudy Area</title>
        <meta name="description" content="Weather app api by nextjs" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <main>
        {errorMsg ? <Toast msg={errorMsg} /> : <></>}
        <div className="mainPage">
          <div className="overlay"></div>
          <Image
            src={Weather3?.src}
            width={Weather3?.width}
            height={Weather3?.height}
            alt="Background image"
            className="backgroundImage"
          />
          <div className="container">
            <div className="searchContainer">
              {loading ? (
                <FaSpinner className="spinner icon" color="#FFF" />
              ) : (
                <BsSearch className="icon" color="#FFF" />
              )}
              <input
                type="text"
                value={citySearchText}
                placeholder="Search by city name ..."
                onChange={(e) => setCitySearchText(e.target.value)}
                className="searchInput"
              />
            </div>
            <div className="cards-row">
              <Card item={userLocationWeather?.data} />
              {weather ? <Card item={weather?.data} /> : <></>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home;

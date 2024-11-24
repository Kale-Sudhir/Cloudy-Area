import axios from "axios";

const Axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_WEATHER_URL,
});

export const getWeatherData = async ({ city = "Mumbai" }) => {
  let error = undefined;
  const res = await Axios.get("/weather", {
    params: {
      q: city,
      appid: process.env.NEXT_PUBLIC_WEATHER_KEY,
      units: "metric",
    },
  }).catch((err) => (error = err));
  return {
    data: res?.data,
    error: error?.response?.data?.message,
  };
};
export const getWeatherByGeoLocation = async () => {
  let result = {};
  await axios
    .get("https://ipinfo.io?token=2555f44fc54af9")
    .then((res) => getWeatherData(res.data.city).then((res) => (result = res)))
    .catch((err) => console.log(err));
  return result;
};

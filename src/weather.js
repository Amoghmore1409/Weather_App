import axios from "axios";
const API="2528dfcb91663ae323b8976a552f9b7f";
const BASE_URL='https://api.openweathermap.org/data/2.5';




export const fetchWeather = async(city)=>{
  try{
    const response =await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API}&units=metric`,{
    params:{
      q:city,
      appid:API,
      units:'metric',
     }
    }
    );
  return response.data;
  }catch(error){
    console.error('Error fetchimg weather data:',error.response ? error.response.data : error.message);
    throw error;
  }
  };


export const fetchForecast = async(city)=>{
  try{
    const response = axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API}&units=metric`,{
      params: {
        q:city,
        appid:API,
        units:'metric',
      
      }
    });
    return response.data;
  }catch(error) {
    console.error('Error fetching forecast data:', error.response ? error.response.data : error.message);
    throw error;
  }
};
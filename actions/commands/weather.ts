import { ReplyAction } from './commandList';
import axios from 'axios';

export const weather: ReplyAction = async (e, city) => {
  if (!city) {
    return;
  }

  let res = await axios(
    `http://api.openweathermap.org/data/2.5/find?q=${city}&units=metric&appid=7959704cf8fb4f17f6d594ca3e433ab1`
  );
  if (res && res.data && res.data.list && res.data.list.length) {
    let weatherInfo = res.data.list[0];
    let weatherDescription = res.data.list[0].weather[0];
    let reply = `Weather in ${city}: ${weatherDescription.description}, Temperature: ${
      weatherInfo.main.temp
    }℃ , wind: ${weatherInfo.wind.speed} m/s.`;
    e.reply(reply);
  }
};

import { ChangeEvent, useEffect, useState } from "react";
import { foreCastProps, optionType } from "../types";

const useForecast = () => {
  const [input, setInput] = useState<string>("");
  const [city, setCity] = useState<optionType | null>(null);
  const [options, setOptions] = useState<[]>([]);
  const [forecast, setForecast] = useState<foreCastProps | null>(null);

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&lang=en&appid=6e350a23bfb9c1c35cf6005ee0ee03b6`
    )
      .then((res) => res.json())
      .then((data) => setOptions(data));
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInput(value);

    if (value === "") {
      return;
    }

    getSearchOptions(value);
  };

  const getForecast = (option: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${option.lat}&lon=${option.lon}&units=metric&appid=6e350a23bfb9c1c35cf6005ee0ee03b6`
    )
      .then((res) => res.json())
      .then((data) => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        };
        setForecast(forecastData);
      });
  };

  const onSubmit = () => {
    if (!city) return;

    getForecast(city);
    setInput("");
  };

  const onOptionSelect = (option: optionType) => {
    setCity(option);
  };

  useEffect(() => {
    if (city) {
      setInput(city.name);
      setOptions([]);
    }
  }, [city]);
  return {
    input,
    options,
    forecast,
    onSubmit,
    onInputChange,
    onOptionSelect,
    setForecast,
  };
};

export default useForecast;

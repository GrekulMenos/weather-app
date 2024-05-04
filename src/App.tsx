import { ChangeEvent, useState } from "react";

const App = (): JSX.Element => {
  const [input, setInput] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);

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
    console.log(options);
  };

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section className="  drop-shadow-lg rounded w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center  md:px-10 lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg   text-zinc-700">
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Forecast</span>
        </h1>
        <p className="text-sm mt-2">
          Enter below a place you want to know the weather of and select an
          option from the dropdown
        </p>
        <div className="relative flex items-center mt-10 md:mt-4">
          <input
            onChange={onInputChange}
            className="px-2 py-1 rounded-l-md border-2 border-white"
            value={input}
            type="text"
          />

          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: { name: string }, index: number) => (
              <li key={option.name + "-" + index}>
                <button className="cursor-pointer text-left text-sm w-full hover:bg-zinc-700 hover:text-white px-2 py-1">
                  {option.name}
                </button>
              </li>
            ))}
          </ul>

          <button className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500 hover:text-zinc-500 text-zinc-100 px-2 py-1 cursor-pointer">
            search
          </button>
        </div>
      </section>
    </main>
  );
};

export default App;

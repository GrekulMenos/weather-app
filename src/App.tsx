import Forecast from "./components/Forecast";
import Search from "./components/Search";
import useForecast from "./hooks/useForecast";

const App = (): JSX.Element => {
  const {
    input,
    options,
    forecast,
    onSubmit,
    onInputChange,
    onOptionSelect,
    setForecast,
  } = useForecast();

  console.log(forecast);

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      {forecast ? (
        <Forecast setForecast={setForecast} data={forecast} />
      ) : (
        <Search
          input={input}
          options={options}
          onSubmit={onSubmit}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
        />
      )}
    </main>
  );
};

export default App;

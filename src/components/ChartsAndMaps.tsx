import LineChart from "./Chart";
import Map from "./Map";

const ChartsAndMaps = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center pt-10 overflow-auto">
      <h1 className="text-3xl font-bold text-blue-600">Charts and Maps</h1>
      <div className="flex flex-col items-start justify-start w-max">
        <LineChart />
        <Map />
      </div>
    </div>
  );
};

export default ChartsAndMaps;

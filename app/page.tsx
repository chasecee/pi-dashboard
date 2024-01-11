import Clock from "./components/Clock";
import Date from "./components/Date";
import Logbook from "./components/Logbook";
export default function Home() {
  return (
    <main className="flex flex-nowrap gap-10 min-h-screen flex-col items-stretch justify-center px-5 py-20 mx-auto main ">
      <div className="rounded-xl ring-[6px] text-red-700 ring-current ring-opacity-50 px-10  flex justify-center items-center flex-col">
        <Clock />
      </div>
      <div className="rounded-xl ring-[6px] text-yellow-700 ring-current ring-opacity-50 px-5 py-2 text-[7vw] text-center uppercase font-normal tracking-[1rem]">
        <Date />
      </div>
      <div className="grid grid-cols-2 gap-10 w-full">
        <div className=" rounded-xl ring-[6px] text-blue-700 ring-current ring-opacity-50 p-5 overflow-hidden aspect-square ">
          <h2>Information:</h2>
          <div className="">
            <Logbook />
          </div>
        </div>
        <div className=" rounded-xl ring-[6px] text-green-700 ring-current ring-opacity-50 px-10 overflow-hidden aspect-square  ">
          <h2>Data:</h2>
        </div>
        <div className=" rounded-xl ring-[6px] text-purple-800 ring-current ring-opacity-50 px-10 overflow-hidden aspect-square  ">
          <h2>Backups:</h2>
        </div>
        <div className=" rounded-xl ring-[6px] text-green-700 ring-current ring-opacity-50 px-10 overflow-hidden aspect-square  ">
          <h2>Data:</h2>
        </div>
        <div className=" rounded-xl ring-[6px] text-purple-800 ring-current ring-opacity-50 px-10 overflow-hidden aspect-square  ">
          <h2>Backups:</h2>
        </div>
      </div>
    </main>
  );
}

import Clock from "./components/Clock";
import Date from "./components/Date";
import Logbook from "./components/Logbook";
export default function Home() {
  return (
    <main className="flex flex-nowrap gap-10 min-h-screen max-h-screen overflow-hidden flex-col items-stretch justify-center px-5 py-20 mx-auto main ">
      <div className="rounded-xl ring-[6px] text-red-700 ring-current ring-opacity-50 px-5 py-5  flex justify-center items-center flex-col">
        <Clock />
      </div>
      <div className="rounded-xl ring-[6px] text-orange-700 ring-current ring-opacity-50 px-5 py-8 text-[7vw] text-center uppercase font-normal tracking-[1rem]">
        <Date />
      </div>
      <div className="grid grid-cols-2 gap-10 w-full">
        <div className=" rounded-xl ring-[6px] text-yellow-800 ring-current ring-opacity-50 p-5 overflow-hidden aspect-square ">
          <div className="flex items-center flex-row gap-2">
            <h2 className="tracking-widest">LOG</h2>
          </div>
          <div className="my-3 border-t-[2px] border-dashed border-current w-full"></div>
          <Logbook />
        </div>
        <div className=" rounded-xl ring-[6px] text-lime-700 ring-current ring-opacity-50 p-5 overflow-hidden aspect-square">
          <h2>Data:</h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10 w-full">
        <div className=" rounded-xl ring-[6px] text-teal-800 ring-current ring-opacity-50 p-5 overflow-hidden aspect-[1/2] ">
          <h2>Text:</h2>
        </div>
        <div className=" rounded-xl ring-[6px] text-indigo-900 ring-current ring-opacity-50 p-5 overflow-hidden aspect-[1/2]  ">
          <h2>Finance:</h2>
        </div>
        <div className=" rounded-xl ring-[6px] text-violet-900 ring-current ring-opacity-50 p-5 overflow-hidden aspect-[1/2]  ">
          <h2>History:</h2>
        </div>
      </div>
    </main>
  );
}

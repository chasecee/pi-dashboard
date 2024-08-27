import Clock from "./components/Clock";
import Date from "./components/Date";
import ConnectionStatus from "./components/ConnectionStatus";
import Weather from "./components/Weather";
import FactComponent from "./components/FactComponent";
import Quotable from "./components/Quotable";
export default function Home() {
  return (
    <main className="flex flex-nowrap gap-[18px] min-h-screen max-h-screen overflow-hidden flex-col items-stretch justify-center p-[6px] main text-center ">
      {/* <div className="rounded-xl ring-[6px] text-orange-700 ring-current ring-opacity-50 px-5 py-0 text-[7vw] uppercase font-normal tracking-[1rem] flex-grow-[1] items-center justify-center flex">
        <Date />
      </div> */}
      <div className="rounded-xl relative ring-[6px] text-red-700 ring-current ring-opacity-50 px-5 py-0  flex justify-center items-center flex-col flex-grow-[2] ">
        <div className="text-[7vw]">
          <Date />
        </div>
        <Clock />
      </div>
      {/* <div className="rounded-xl ring-[6px] text-amber-600 ring-current ring-opacity-50 text-[7vw] uppercase font-normal tracking-[1rem] flex-shrink-0">
        <Weather />
      </div> */}
      <div className="flex flex-row gap-[18px]">
        <div className="rounded-xl px-4 py-16  relative ring-[6px] text-purple-500 ring-current ring-opacity-50 text-[4vw]  font-normal flex-grow flex leading-[100%] justify-center">
          {/* <FactComponent /> */}
          <Quotable />
          <div className="absolute bottom-0 left-2">
            <ConnectionStatus />
          </div>
        </div>
      </div>
      {/* <div className="rounded-xl ring-[6px] text-violet-500 ring-current ring-opacity-50 px-5 py-0 uppercase text-[2vw] font-bold  flex-grow-[1] items-center justify-center flex">
        
      </div> */}
    </main>
  );
}

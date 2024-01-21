import Clock from "./components/Clock";
import Date from "./components/Date";
import ConnectionStatus from "./components/ConnectionStatus";
import Weather from "./components/Weather";
export default function Home() {
  return (
    <main className="flex flex-nowrap gap-[18px] min-h-screen max-h-screen overflow-hidden flex-col items-stretch justify-center p-[6px] main text-center ">
      <div className="rounded-xl ring-[6px] text-red-700 ring-current ring-opacity-50 px-5 py-0  flex justify-center items-center flex-col flex-grow-[2] ">
        <Clock />
      </div>
      <div className="rounded-xl ring-[6px] text-orange-700 ring-current ring-opacity-50 px-5 py-0 text-[7vw] uppercase font-normal tracking-[1rem] flex-grow-[1] items-center justify-center flex">
        <Date />
      </div>
      <div className="rounded-xl ring-[6px] text-blue-900 ring-current ring-opacity-50 text-[7vw] uppercase font-normal tracking-[1rem] flex-shrink-0">
        <Weather />
      </div>
      <div className="flex flex-row gap-[18px]">
        <ConnectionStatus />
        <div className="rounded-r-xl px-4 py-2  ring-[6px] text-purple-700 ring-current ring-opacity-50 text-[2vw] uppercase font-normal flex-grow">
          Have A Good Day!
        </div>
      </div>
    </main>
  );
}

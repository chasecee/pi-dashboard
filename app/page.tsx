import Clock from "./components/Clock";
import Date from "./components/Date";
import Logbook from "./components/Logbook";
import Weather from "./components/Weather";
export default function Home() {
  return (
    <main className="flex flex-nowrap gap-10 min-h-screen max-h-screen overflow-hidden flex-col items-stretch justify-center p-[6px] main text-center ">
      <div className="rounded-xl ring-[6px] text-red-700 ring-current ring-opacity-50 px-5 py-0  flex justify-center items-center flex-col flex-grow">
        <Clock />
      </div>
      <div className="rounded-xl ring-[6px] text-orange-700 ring-current ring-opacity-50 px-5 py-4 text-[7vw] uppercase font-normal tracking-[1rem]">
        <Date />
      </div>
      <div className="rounded-xl ring-[6px] text-green-700 ring-current ring-opacity-50 text-[7vw] uppercase font-normal tracking-[1rem]">
        <Weather />
      </div>
    </main>
  );
}

import Clock from "./components/Clock";
import Date from "./components/Date";
import ConnectionStatus from "./components/ConnectionStatus";
import Quotable from "./components/Quotable";
export default function Home() {
  return (
    <main className="flex flex-nowrap gap-[3vw] h-svh overflow-hidden flex-col items-stretch justify-center p-[2vw] main text-center ">
      <div className="rounded-xl relative ring-[1vw] text-red-700 ring-current ring-opacity-50 px-5 py-0  flex justify-center items-center flex-col flex-grow-[2] ">
        <div className="text-[clamp(30px,7vw,120px)]">
          <Date />
        </div>
        <Clock />
      </div>

      <div className="flex flex-row gap-[18px]">
        <div className="rounded-xl px-4 py-16  relative ring-[1vw] text-purple-500 ring-current ring-opacity-50 text-[4vw]  font-normal flex-grow flex leading-[100%] justify-center">
          <Quotable />
          <div className="absolute bottom-0 left-2">
            <ConnectionStatus />
          </div>
        </div>
      </div>
    </main>
  );
}

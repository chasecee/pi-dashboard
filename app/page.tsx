import Clock from "./components/Clock";
import Date from "./components/Date";
export default function Home() {
  return (
    <main className="flex flex-nowrap gap-10 min-h-screen flex-col items-stretch justify-center p-5 mx-auto ">
      <div className="rounded-xl ring-[2px] text-red-700 ring-current ring-opacity-50 px-10  ">
        <Clock />
      </div>
      <div className="rounded-xl ring-[2px] text-yellow-700 ring-current ring-opacity-50 px-5 py-2 text-[4vw] uppercase  ">
        <Date />
      </div>
      <div className="grid grid-cols-3 gap-10 w-full">
        <div className=" rounded-xl ring-[2px] text-blue-700 ring-current ring-opacity-50 px-10  overflow-hidden aspect-square ">
          <h2>Information:</h2>
        </div>
        <div className=" rounded-xl ring-[2px] text-green-700 ring-current ring-opacity-50 px-10 overflow-hidden aspect-square  ">
          <h2>Data:</h2>
        </div>
        <div className=" rounded-xl ring-[2px] text-green-700 ring-current ring-opacity-50 px-10 overflow-hidden aspect-square  ">
          <h2>Backups:</h2>
        </div>
      </div>
    </main>
  );
}

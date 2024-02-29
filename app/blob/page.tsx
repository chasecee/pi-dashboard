import BlobList from "../components/BlobList"; // Adjust the import path based on your project structure
import Clock from "../components/Clock";
import Date from "../components/Date";
import WeatherTemp from "../components/WeatherTemp";
export default function HomePage() {
  return (
    <div className="flex flex-col">
      <BlobList />
      <div className="fixed top-1/2 transform-gpu -translate-y-1/2">
        <div className="color-LightVibrant  relative z-[1] mx-20">
          <div className="h-0 relative z-[2]">
            <Clock />
          </div>
          <div
            className="color-DarkMuted font-light transform-cpu translate-y-3 translate-x-3 "
            style={{ textShadow: "-1rem -1rem 2rem rgba(0,0,0,.5)" }}
          >
            <Clock />
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-0 fixed w-full bottom-0 left-0">
        <div className=" relative text-[3vw] uppercase px-5 py-3  text-center flex-grow leading-[100%] rounded-xl">
          <div className="bg-Vibrant absolute inset-0"></div>
          <div className="relative text-white  w-auto ">
            <Date />
          </div>
        </div>
        <div className=" relative text-[3vw] uppercase px-10 py-3  text-center  leading-[100%] rounded-xl">
          <div className="bg-DarkVibrant absolute inset-0"></div>
          <div className="relative text-white  ">
            <WeatherTemp />
          </div>
        </div>
        <div className=" relative text-[3vw] uppercase px-10 py-3  text-center  leading-[100%] rounded-xl">
          <div className="bg-LightVibrant absolute inset-0"></div>
          <div className="relative text-white  w-auto ">
            <Date />
          </div>
        </div>
      </div>
    </div>
  );
}

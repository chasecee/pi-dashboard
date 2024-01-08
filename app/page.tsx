import Clock from "./components/Clock";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="rounded-xl ring-[8px] ring-white/50 px-10 transform-gpu rotate-90">
        <Clock />
      </div>
    </main>
  );
}

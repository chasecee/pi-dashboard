import { useState, useEffect } from "react";

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    setIsOnline(navigator.onLine);

    const updateStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div
      className={`flex rounded-[0.4cqw] ring-[0px] flex-row items-center text-[clamp(12px,2.5cqw,18px)] gap-[2cqw] px-[2cqw] pr-[2.5cqw] py-[1cqh] ring-current/50 font-normal shrink-0 ${
        isOnline ? "text-green-700" : "text-red-700"
      }`}
    >
      <div className="size-[clamp(10px,1.8cqw,14px)] rounded-full bg-current"></div>
      <span className="opacity-70 leading-[1] relative top-[0.1cqh]">
        {isOnline ? "Online" : "Offline"}
      </span>
    </div>
  );
}

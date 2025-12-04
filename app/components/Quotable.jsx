async function getQuote() {
  try {
    const response = await fetch("https://zenquotes.io/api/random", {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch quote");
    }

    const [quote] = await response.json();
    return quote;
  } catch (error) {
    console.error(error);
    return { q: "Oops... Something went wrong" };
  }
}

export default async function Quotable() {
  const data = await getQuote();

  return (
    <div>
      <p className="text-balance mx-[5vw]">
        {data.q}
        {data.a && (
          <span>
            <span
              className="opacity-70 ml-5 mt-5 tracking-[.2vw] font-normal uppercase text-[.5em] block whitespace-nowrap"
              title="Source Title"
            >
              {data.a}
            </span>
          </span>
        )}
      </p>
    </div>
  );
}

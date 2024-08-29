# Pi Dashboard

A Next.js-based dashboard application that provides various features for the Raspberry Pi platform.

## Project Overview

The Pi Dashboard is a web-based application built with Next.js, a popular React framework. It serves as a centralized hub for managing and interacting with your Raspberry Pi device, offering features such as weather data, quote generation, and image processing capabilities.

## Features

- Fetch and display weather data for a specific location
- Generate and display random quotes
- Perform image processing tasks, including DALL-E image generation and image storage/retrieval
- Chat with an AI-powered chatbot
- List and manage files stored in the application's blob storage
- Provide a logbook for recording and tracking events

## File Structure

```
tsconfig.json
next.config.js
public/
package-lock.json
vercel.json-off
README.md
package.json
postcss.config.js
app/
    page.tsx
    layout.tsx
    api/
        quotes/
            route.js
        randomFact/
            route.js
        chat/
            route.js
        weather/
            route.js
        list-blobs/
            route.js
        get-colors/
            route.js
        image/
            route.js
        store-and-display-image/
            route.js
    chat/
        page.tsx
    utils/
        generateAndSave.js
        fetchWeatherData.js
        openai.ts
        fetchWeatherSummary.js
    components/
        HaNode.jsx
        FactComponent.tsx
        DalleImage.jsx
        WeatherTemp.jsx
        ConnectionStatus.tsx
        LatestImage.jsx
        Quotable.jsx
        Logbook.jsx
        BlobList.jsx
        Clock.jsx
        Date.jsx
        Weather.jsx
    blob/
        page.tsx
public/
    next.svg
    vercel.svg
    img/
        da.jpg
generate_readme.py
tailwind.config.ts
```

## Installation

To run the Pi Dashboard project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/chasecee/pi-dashboard.git`
2. Navigate to the project directory: `cd pi-dashboard`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit `http://localhost:3000` to access the application.

## Usage

The Pi Dashboard is hosted on Vercel and can be accessed at [https://pi-dashboard-one.vercel.app/](https://pi-dashboard-one.vercel.app/).

## Contributing

If you would like to contribute to the Pi Dashboard project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Implement your changes and ensure they are working correctly.
4. Submit a pull request, detailing the changes you have made.

## License

The Pi Dashboard project is currently unlicensed. Please check the repository for any updates regarding the licensing information.
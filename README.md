# ┌───────────────────────────┐
# │      Pi Dashboard       │
# └───────────────────────────┘

## Project Overview
The Pi Dashboard is a web application built using Next.js, a popular React framework. It serves as a comprehensive dashboard for various functionalities, including weather information, AI-generated quotes, and a logbook feature. The project is hosted on Vercel at [https://pi-dashboard-one.vercel.app/](https://pi-dashboard-one.vercel.app/).

## Features
- Displays current weather information
- Generates and displays random quotes
- Provides a logbook feature for recording events
- Integrates with OpenAI's API for quote generation
- Supports listing and managing cloud storage blobs
- Includes a chat interface powered by OpenAI's language model
- Allows uploading and displaying images

## File Structure
```
tsconfig.json
next.config.js
public
package-lock.json
vercel.json-off
README.md
package.json
postcss.config.js
app
generate_readme.py
tailwind.config.ts
public/next.svg
public/vercel.svg
public/img
public/img/da.jpg
app/page.tsx
app/layout.tsx
app/api
app/chat
app/utils
app/components
app/globals.css
app/favicon.ico
app/blob
app/api/quotes
app/api/randomFact
app/api/chat
app/api/weather
app/api/list-blobs
app/api/get-colors
app/api/image
app/api/store-and-display-image
app/api/quotes/route.js
app/api/randomFact/route.js
app/api/chat/route.js
app/api/weather/route.js
app/api/list-blobs/route.js
app/api/get-colors/route.js
app/api/image/route.js
app/api/store-and-display-image/route.js
app/chat/page.tsx
app/utils/generateAndSave.js
app/utils/fetchWeatherData.js
app/utils/openai.ts
app/utils/fetchWeatherSummary.js
app/components/HaNode.jsx
app/components/FactComponent.tsx
app/components/DalleImage.jsx
app/components/WeatherTemp.jsx
app/components/ConnectionStatus.tsx
app/components/LatestImage.jsx
app/components/Quotable.jsx
app/components/Logbook.jsx
app/components/BlobList.jsx
app/components/Clock.jsx
app/components/Date.jsx
app/components/Weather.jsx
app/blob/page.tsx
```

## Installation
To run the Next.js development server, follow these steps:

1. Clone the repository: `git clone https://github.com/chasecee/pi-dashboard.git`
2. Navigate to the project directory: `cd pi-dashboard`
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`

The application will be available at `http://localhost:3000`.

## Usage
The Pi Dashboard provides a web-based interface for accessing various features, including weather information, AI-generated quotes, and a logbook. Users can interact with the dashboard by navigating to the hosted URL: [https://pi-dashboard-one.vercel.app/](https://pi-dashboard-one.vercel.app/).

## Contributing
If you would like to contribute to the Pi Dashboard project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## License
The Pi Dashboard project is currently unlicensed. If you intend to use or distribute this project, please consider adding an appropriate license.
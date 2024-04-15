## Project Overview

# WeaterCast

## Live Demo
https://weather-cast-sooty.vercel.app/
## Project Implementation

The web page has been developed using NextJS and TailwindCSS.

The following technologies and best practices have been employed:

- **Javascript, NextJS and TailwindCSS:** The project utilizes a combination of these technologies to create a responsive and visually appealing web page.

- **Responsive Design:** The webpage is designed to be fully responsive and should adapt seamlessly to various device widths without any breakage.

- **Components and Containers:** Proper use of components and containers has been maintained to ensure code modularity, scalability and reusability.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/thagoo/weather-cast.git
```

2. Navigate to the project directory:

```
cd weather-cast
```

3. Install dependencies:

```
npm install
```

4. Setup ENV vars

```
# API to fetch cities list
OPENDATASOFT_API="opendatasoft api URL"

# Openweather
OPENWEATHER_API="openweather api id"

# Openweather map
NEXT_PUBLIC_OPENWEATHER_MAP_TOKEN="openweather map api id"


#Rapid API
RAPID_API_HOST="rapid api host"
RAPID_API_KEY="key"

# MapBox
NEXT_PUBLIC_MAPBOX_API_ID="mapbox secret"
```

5. Build the project

```
npm run build
```

6. Run the production server locally

```
npm start
```

or

5. Run the development server:

```
npm start
```

This will start the respective server, and you can view the webpage by accessing http://localhost:3000 in your browser.

Thank you for checking out my project!

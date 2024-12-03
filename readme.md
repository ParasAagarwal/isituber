# Isituber 🫣🤩

### ACCESS THE PROJECT IN RESPONSIVE MOBILE VIEW FOR BEST EXPERIENCE

## Description

Isituber is a comprehensive ride-sharing application designed to connect users with captains (drivers) for seamless and efficient transportation. The project leverages modern web technologies and integrates with Google APIs to provide features such as real-time ride tracking, fare estimation, and location suggestions. The application is built with a robust backend and a dynamic frontend, ensuring a smooth user experience.

## Demo Video

![Recording 2024-12-03 175615](https://github.com/user-attachments/assets/15b066a6-29de-4ec7-87d0-3c015fa8a96c)
https://github.com/user-attachments/assets/ec7e8c44-650e-4bbb-8837-df920b4e878a

## Thought Process

The primary goal of Isituber is to create a user-friendly platform that simplifies the process of booking rides. The application is designed to handle user authentication, ride creation, fare calculation, and real-time updates using sockets. The integration with Google APIs enhances the application's functionality by providing accurate location data and distance calculations.

## Main Components

### Backend

- **Controllers**: Handle the business logic for users, captains, rides, and maps.
- **Models**: Define the data structure for users, captains, rides, and blacklisted tokens.
- **Routes**: Define the API endpoints for user, captain, ride, and map-related operations.
- **Middlewares**: Handle authentication and authorization.
- **Services**: Provide utility functions for maps, rides, and captains.
- **Socket**: Manages real-time communication between users and captains.

### Frontend

- **Pages**: Define the main views for user and captain interactions.
- **Components**: Reusable UI elements such as forms, buttons, and popups.
- **Contexts**: Manage global state for user, captain, and socket data.
- **APIs**: Handle data fetching and posting to the backend.

## Tech Stack

### Backend

- **Node.js**: JavaScript runtime environment for building server-side applications.
- **Express.js**: Web framework for Node.js, used to build the API endpoints.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB, used to define schemas and interact with the database.
- **JWT (jsonwebtoken)**: Library for generating and verifying JSON Web Tokens, used for authentication.
- **bcrypt**: Library for hashing passwords, used for secure password storage.
- **Socket.io**: Library for real-time communication, used to connect users and captains.
- **dotenv**: Module to load environment variables from a `.env` file.
- **Google Maps APIs**: Used for geocoding, distance calculation, and location suggestions.

### Backend Packages

- **express-validator**: Middleware for validating and sanitizing request data.
- **cookie-parser**: Middleware for parsing cookies.
- **cors**: Middleware for enabling Cross-Origin Resource Sharing.
- **morgan**: HTTP request logger middleware for Node.js.
- **nodemon**: Utility that monitors for changes in the source code and automatically restarts the server.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Next-generation frontend tooling for faster development.
- **React Router**: Library for routing in React applications.
- **Axios**: Promise-based HTTP client for making API requests.
- **Socket.io-client**: Client library for connecting to Socket.io server.
- **Tailwind CSS**: Utility-first CSS framework for styling the application.

### Frontend Packages

- **react-context**: Used for managing global state in the application.
- **react-icons**: Library for including icons in React applications.
- **react-toastify**: Library for displaying toast notifications.
- **react-loader-spinner**: Library for displaying loading spinners.
- **react-google-maps/api**: Library for integrating Google Maps with React.

## Google APIs Integration

Isituber integrates with Google Maps APIs to provide the following features:

- **Auto Location Suggestions**: Uses the Places API to suggest addresses based on user input.
- **Fare Calculations**: Uses the Distance Matrix API to calculate the distance and estimated time between two locations, which is then used to compute the fare.
- **Geocoding**: Converts addresses into geographic coordinates for accurate location tracking.

## Features

### Auto Location Suggestions

When users enter a pickup or destination address, the application provides real-time suggestions using the Google Places API. This feature enhances the user experience by making it easier to select accurate locations.

### Fare Calculations

The fare for a ride is calculated based on the distance and estimated time between the pickup and destination addresses. The application uses predefined base fares and rates per kilometer and per minute for different vehicle types (car, moto, and auto). The Google Distance Matrix API provides the necessary data for these calculations.

### Connecting Captains and Users

Isituber connects users and captains through real-time communication using sockets. When a user requests a ride, captains within a 2km radius receive an instant popup notification. The first captain to accept the ride is assigned to the user, and both parties receive each other's information.

## User and Captain Flow

### User Flow

1. **Start Page**: Users begin at the start page, where they can choose to log in or sign up.
2. **Login/Signup**: Users authenticate themselves by logging in or signing up.
3. **Home Page**: After logging in, users are directed to the home page.
4. **Search for Rides**: Users enter their pickup and destination addresses. The application provides location suggestions and calculates the fare.
5. **Looking for Ride**: Once the user confirms the ride details, the application searches for available captains within a 2km radius.
6. **Ride Confirmation**: When a captain accepts the ride, the user receives a popup with the captain's details and ride information.
7. **Ride Tracking**: Users can track the ride in real-time until it is completed.
8. **Finish Ride**: After the ride is completed, users can make a payment and rate the ride.

### Captain Flow

1. **Login/Signup**: Captains authenticate themselves by logging in or signing up.
2. **Home Page**: After logging in, captains are directed to the home page.
3. **Receive Ride Requests**: Captains within a 2km radius of the user's pickup location receive ride requests.
4. **Accept Ride**: Captains can accept a ride request, which notifies the user and provides the ride details.
5. **Start Ride**: Captains start the ride by verifying the OTP provided by the user.
6. **Ride Tracking**: Captains can track the ride in real-time until it is completed.
7. **Finish Ride**: After completing the ride, captains can mark the ride as finished and receive payment.

## Complete Workflow

1. **Start Page**: Users and captains begin at the start page.
2. **User Login/Signup**: Users log in or sign up and are directed to the home page.
3. **Search for Rides**: Users enter their pickup and destination addresses, receive location suggestions, and see the calculated fare.
4. **Looking for Ride**: The application searches for available captains within a 2km radius.
5. **Captain Notification**: Captains receive a popup notification for the ride request.
6. **Ride Confirmation**: The first captain to accept the ride is assigned to the user. Both parties receive each other's information.
7. **Ride Tracking**: Users and captains track the ride in real-time.
8. **Finish Ride**: After the ride is completed, users make a payment, and captains mark the ride as finished.

## Additional Features

- **Vehicle Selection**: Users can choose between different vehicle types (car, moto, and auto) with automatic fare calculations.
- **Real-Time Updates**: The application uses sockets to provide real-time updates for ride requests, confirmations, and ride tracking.
- **Authentication**: Secure user and captain authentication using JWT tokens.
- **Error Handling**: Comprehensive error handling for API requests and real-time communication.

## Frontend Documentation

### Routes

#### `/`

- **Description**: The starting page of the application.
- **Component**: `Start`

#### `/login`

- **Description**: User login page.
- **Component**: `UserLogin`

#### `/signup`

- **Description**: User signup page.
- **Component**: `UserSignup`

#### `/home`

- **Description**: User home page after login.
- **Component**: `Home`
- **Protected**: Yes

#### `/captain-login`

- **Description**: Captain login page.
- **Component**: `CaptainLogin`

#### `/captain-signup`

- **Description**: Captain signup page.
- **Component**: `CaptainSignup`

#### `/captain-home`

- **Description**: Captain home page after login.
- **Component**: `CaptainHome`
- **Protected**: Yes

#### `/riding`

- **Description**: User ride tracking page.
- **Component**: `Riding`
- **Protected**: Yes

#### `/captain-riding`

- **Description**: Captain ride tracking page.
- **Component**: `CaptainRiding`
- **Protected**: Yes

#### `/user/logout`

- **Description**: User logout page.
- **Component**: `UserLogout`
- **Protected**: Yes

#### `/captain/logout`

- **Description**: Captain logout page.
- **Component**: `CaptainLogout`
- **Protected**: Yes

### Contexts

#### `UserDataContext`

- **Description**: Provides user data and authentication state.
- **File**: `src/context/userContext.jsx`

#### `CaptainDataContext`

- **Description**: Provides captain data and authentication state.
- **File**: `src/context/CaptainContext.jsx`

#### `SocketContext`

- **Description**: Provides socket connection for real-time updates.
- **File**: `src/context/SocketContext.jsx`

### Pages

#### `Start`

- **File**: `src/pages/Start.jsx`
- **Description**: The starting page of the application.

#### `UserLogin`

- **File**: `src/pages/UserLogin.jsx`
- **Description**: User login page.

#### `UserSignup`

- **File**: `src/pages/UserSignup.jsx`
- **Description**: User signup page.

#### `Home`

- **File**: `src/pages/Home.jsx`
- **Description**: User home page after login.

#### `CaptainLogin`

- **File**: `src/pages/CaptainLogin.jsx`
- **Description**: Captain login page.

#### `CaptainSignup`

- **File**: `src/pages/CaptainSignup.jsx`
- **Description**: Captain signup page.

#### `CaptainHome`

- **File**: `src/pages/CaptainHome.jsx`
- **Description**: Captain home page after login.

#### `Riding`

- **File**: `src/pages/Riding.jsx`
- **Description**: User ride tracking page.

#### `CaptainRiding`

- **File**: `src/pages/CaptainRiding.jsx`
- **Description**: Captain ride tracking page.

#### `UserLogout`

- **File**: `src/pages/UserLogout.jsx`
- **Description**: User logout page.

#### `CaptainLogout`

- **File**: `src/pages/CaptainLogout.jsx`
- **Description**: Captain logout page.

### APIs

#### User APIs

##### `POST /users/login`

- **Description**: Authenticates a user and returns a token and user details.
- **Request Body**: `{ email: string, password: string }`
- **Response**: `{ token: string, user: object }`

##### `POST /users/register`

- **Description**: Registers a new user.
- **Request Body**: `{ fullname: { firstname: string, lastname: string }, email: string, password: string }`
- **Response**: `{ token: string, user: object }`

##### `GET /users/profile`

- **Description**: Retrieves the profile information of the authenticated user.
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ user: object }`

##### `GET /users/logout`

- **Description**: Logs out the authenticated user by invalidating their session token.
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ message: string }`

#### Captain APIs

##### `POST /captains/login`

- **Description**: Authenticates a captain and returns a token and captain details.
- **Request Body**: `{ email: string, password: string }`
- **Response**: `{ token: string, captain: object }`

##### `POST /captains/register`

- **Description**: Registers a new captain.
- **Request Body**: `{ fullname: { firstname: string, lastname: string }, email: string, password: string, vehicle: { color: string, plate: string, capacity: number, vehicleType: string } }`
- **Response**: `{ token: string, captain: object }`

##### `GET /captains/profile`

- **Description**: Retrieves the profile information of the authenticated captain.
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ captain: object }`

##### `GET /captains/logout`

- **Description**: Logs out the authenticated captain by invalidating their session token.
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ message: string }`

#### Ride APIs

##### `POST /rides/create`

- **Description**: Creates a new ride request for the authenticated user.
- **Request Body**: `{ pickup: string, destination: string, vehicleType: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ ride: object }`

##### `GET /rides/get-fare`

- **Description**: Retrieves the estimated fare for a ride based on the pickup and destination addresses.
- **Query Parameters**: `{ pickup: string, destination: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ fare: object }`

##### `POST /rides/confirm`

- **Description**: Allows a captain to confirm a ride request.
- **Request Body**: `{ rideId: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ ride: object }`

##### `GET /rides/start-ride`

- **Description**: Allows a captain to start a ride that has been accepted by verifying the ride OTP.
- **Query Parameters**: `{ rideId: string, otp: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ ride: object }`

##### `POST /rides/end-ride`

- **Description**: Allows a captain to complete a ride that is currently ongoing.
- **Request Body**: `{ rideId: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ ride: object }`

#### Map APIs

##### `GET /maps/get-coordinates`

- **Description**: Retrieves the latitude and longitude for a given address.
- **Query Parameters**: `{ address: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ coordinates: object }`

##### `GET /maps/get-distance-time`

- **Description**: Retrieves the distance and estimated time between two addresses.
- **Query Parameters**: `{ origin: string, destination: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ distance: number, time: number }`

##### `GET /maps/get-suggestions`

- **Description**: Retrieves address suggestions based on a partial input.
- **Query Parameters**: `{ input: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ suggestions: array }`

### Sockets

#### Events

##### `join`

- **Description**: Joins a user or captain to the socket connection.
- **Payload**: `{ userType: string, userId: string }`

##### `update-location-captain`

- **Description**: Updates the location of the captain.
- **Payload**: `{ userId: string, location: { ltd: number, lng: number } }`

##### `new-ride`

- **Description**: Notifies the captain of a new ride request.
- **Payload**: `{ event: string, data: object }`

##### `ride-confirmed`

- **Description**: Notifies the user that their ride has been confirmed.
- **Payload**: `{ event: string, data: object }`

##### `ride-started`

- **Description**: Notifies the user that their ride has started.
- **Payload**: `{ event: string, data: object }`

##### `ride-ended`

- **Description**: Notifies the user that their ride has ended.
- **Payload**: `{ event: string, data: object }`

### Components

#### `LocationSearchPanel`

- **File**: `src/components/LocationSearchPanel.jsx`
- **Description**: Displays address suggestions for pickup and destination fields.

#### `VehiclePanel`

- **File**: `src/components/VechiclePanel.jsx`
- **Description**: Allows the user to select a vehicle type for the ride.

#### `ConfirmRide`

- **File**: `src/components/ConfirmRide.jsx`
- **Description**: Confirms the ride details before creating the ride.

#### `LookingForDriver`

- **File**: `src/components/LookingForDriver.jsx`
- **Description**: Displays a loading screen while searching for a driver.

#### `WaitingForDriver`

- **File**: `src/components/WaitingForDriver.jsx`
- **Description**: Displays the details of the assigned driver while waiting for the ride to start.

#### `RidePopUp`

- **File**: `src/components/RidePopUp.jsx`
- **Description**: Displays a popup with ride details for the captain to accept or ignore.

#### `ConfirmRidePopUp`

- **File**: `src/components/ConfirmRidePopUp.jsx`
- **Description**: Displays a popup for the captain to confirm the ride by entering the OTP.

#### `FinishRide`

- **File**: `src/components/FinishRide.jsx`
- **Description**: Allows the captain to finish the ride and complete the trip.

#### `CaptainDetails`

- **File**: `src/components/CaptainDetails.jsx`
- **Description**: Displays the captain's details and statistics.

#### `LiveTracking`

- **File**: `src/components/LiveTracking.jsx`
- **Description**: Displays the live tracking map for the ride.

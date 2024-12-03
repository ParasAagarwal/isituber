# Frontend Documentation

### ACCESS THE PROJECT IN RESPONSIVE MOBILE VIEW FOR BEST EXPERIENCE

## Description

The frontend of this project is built using React and Vite. It provides a user interface for both users and captains to interact with the ride-sharing application. The application includes features such as user and captain authentication, ride creation, fare estimation, and real-time ride tracking using sockets.

## Routes

### `/`

- **Description**: The starting page of the application.
- **Component**: `Start`

### `/login`

- **Description**: User login page.
- **Component**: `UserLogin`

### `/signup`

- **Description**: User signup page.
- **Component**: `UserSignup`

### `/home`

- **Description**: User home page after login.
- **Component**: `Home`
- **Protected**: Yes

### `/captain-login`

- **Description**: Captain login page.
- **Component**: `CaptainLogin`

### `/captain-signup`

- **Description**: Captain signup page.
- **Component**: `CaptainSignup`

### `/captain-home`

- **Description**: Captain home page after login.
- **Component**: `CaptainHome`
- **Protected**: Yes

### `/riding`

- **Description**: User ride tracking page.
- **Component**: `Riding`
- **Protected**: Yes

### `/captain-riding`

- **Description**: Captain ride tracking page.
- **Component**: `CaptainRiding`
- **Protected**: Yes

### `/user/logout`

- **Description**: User logout page.
- **Component**: `UserLogout`
- **Protected**: Yes

### `/captain/logout`

- **Description**: Captain logout page.
- **Component**: `CaptainLogout`
- **Protected**: Yes

## Contexts

### `UserDataContext`

- **Description**: Provides user data and authentication state.
- **File**: `src/context/userContext.jsx`

### `CaptainDataContext`

- **Description**: Provides captain data and authentication state.
- **File**: `src/context/CaptainContext.jsx`

### `SocketContext`

- **Description**: Provides socket connection for real-time updates.
- **File**: `src/context/SocketContext.jsx`

## Pages

### `Start`

- **File**: `src/pages/Start.jsx`
- **Description**: The starting page of the application.

### `UserLogin`

- **File**: `src/pages/UserLogin.jsx`
- **Description**: User login page.

### `UserSignup`

- **File**: `src/pages/UserSignup.jsx`
- **Description**: User signup page.

### `Home`

- **File**: `src/pages/Home.jsx`
- **Description**: User home page after login.

### `CaptainLogin`

- **File**: `src/pages/CaptainLogin.jsx`
- **Description**: Captain login page.

### `CaptainSignup`

- **File**: `src/pages/CaptainSignup.jsx`
- **Description**: Captain signup page.

### `CaptainHome`

- **File**: `src/pages/CaptainHome.jsx`
- **Description**: Captain home page after login.

### `Riding`

- **File**: `src/pages/Riding.jsx`
- **Description**: User ride tracking page.

### `CaptainRiding`

- **File**: `src/pages/CaptainRiding.jsx`
- **Description**: Captain ride tracking page.

### `UserLogout`

- **File**: `src/pages/UserLogout.jsx`
- **Description**: User logout page.

### `CaptainLogout`

- **File**: `src/pages/CaptainLogout.jsx`
- **Description**: Captain logout page.

## APIs

### User APIs

#### `POST /users/login`

- **Description**: Authenticates a user and returns a token and user details.
- **Request Body**: `{ email: string, password: string }`
- **Response**: `{ token: string, user: object }`

#### `POST /users/register`

- **Description**: Registers a new user.
- **Request Body**: `{ fullname: { firstname: string, lastname: string }, email: string, password: string }`
- **Response**: `{ token: string, user: object }`

#### `GET /users/profile`

- **Description**: Retrieves the profile information of the authenticated user.
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ user: object }`

#### `GET /users/logout`

- **Description**: Logs out the authenticated user by invalidating their session token.
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ message: string }`

### Captain APIs

#### `POST /captains/login`

- **Description**: Authenticates a captain and returns a token and captain details.
- **Request Body**: `{ email: string, password: string }`
- **Response**: `{ token: string, captain: object }`

#### `POST /captains/register`

- **Description**: Registers a new captain.
- **Request Body**: `{ fullname: { firstname: string, lastname: string }, email: string, password: string, vehicle: { color: string, plate: string, capacity: number, vehicleType: string } }`
- **Response**: `{ token: string, captain: object }`

#### `GET /captains/profile`

- **Description**: Retrieves the profile information of the authenticated captain.
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ captain: object }`

#### `GET /captains/logout`

- **Description**: Logs out the authenticated captain by invalidating their session token.
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ message: string }`

### Ride APIs

#### `POST /rides/create`

- **Description**: Creates a new ride request for the authenticated user.
- **Request Body**: `{ pickup: string, destination: string, vehicleType: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ ride: object }`

#### `GET /rides/get-fare`

- **Description**: Retrieves the estimated fare for a ride based on the pickup and destination addresses.
- **Query Parameters**: `{ pickup: string, destination: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ fare: object }`

#### `POST /rides/confirm`

- **Description**: Allows a captain to confirm a ride request.
- **Request Body**: `{ rideId: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ ride: object }`

#### `GET /rides/start-ride`

- **Description**: Allows a captain to start a ride that has been accepted by verifying the ride OTP.
- **Query Parameters**: `{ rideId: string, otp: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ ride: object }`

#### `POST /rides/end-ride`

- **Description**: Allows a captain to complete a ride that is currently ongoing.
- **Request Body**: `{ rideId: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ ride: object }`

### Map APIs

#### `GET /maps/get-coordinates`

- **Description**: Retrieves the latitude and longitude for a given address.
- **Query Parameters**: `{ address: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ coordinates: object }`

#### `GET /maps/get-distance-time`

- **Description**: Retrieves the distance and estimated time between two addresses.
- **Query Parameters**: `{ origin: string, destination: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ distance: number, time: number }`

#### `GET /maps/get-suggestions`

- **Description**: Retrieves address suggestions based on a partial input.
- **Query Parameters**: `{ input: string }`
- **Headers**: `Authorization: Bearer token`
- **Response**: `{ suggestions: array }`

## Sockets

### Events

#### `join`

- **Description**: Joins a user or captain to the socket connection.
- **Payload**: `{ userType: string, userId: string }`

#### `update-location-captain`

- **Description**: Updates the location of the captain.
- **Payload**: `{ userId: string, location: { ltd: number, lng: number } }`

#### `new-ride`

- **Description**: Notifies the captain of a new ride request.
- **Payload**: `{ event: string, data: object }`

#### `ride-confirmed`

- **Description**: Notifies the user that their ride has been confirmed.
- **Payload**: `{ event: string, data: object }`

#### `ride-started`

- **Description**: Notifies the user that their ride has started.
- **Payload**: `{ event: string, data: object }`

#### `ride-ended`

- **Description**: Notifies the user that their ride has ended.
- **Payload**: `{ event: string, data: object }`

## Components

### `LocationSearchPanel`

- **File**: `src/components/LocationSearchPanel.jsx`
- **Description**: Displays address suggestions for pickup and destination fields.

### `VehiclePanel`

- **File**: `src/components/VechiclePanel.jsx`
- **Description**: Allows the user to select a vehicle type for the ride.

### `ConfirmRide`

- **File**: `src/components/ConfirmRide.jsx`
- **Description**: Confirms the ride details before creating the ride.

### `LookingForDriver`

- **File**: `src/components/LookingForDriver.jsx`
- **Description**: Displays a loading screen while searching for a driver.

### `WaitingForDriver`

- **File**: `src/components/WaitingForDriver.jsx`
- **Description**: Displays the details of the assigned driver while waiting for the ride to start.

### `RidePopUp`

- **File**: `src/components/RidePopUp.jsx`
- **Description**: Displays a popup with ride details for the captain to accept or ignore.

### `ConfirmRidePopUp`

- **File**: `src/components/ConfirmRidePopUp.jsx`
- **Description**: Displays a popup for the captain to confirm the ride by entering the OTP.

### `FinishRide`

- **File**: `src/components/FinishRide.jsx`
- **Description**: Allows the captain to finish the ride and complete the trip.

### `CaptainDetails`

- **File**: `src/components/CaptainDetails.jsx`
- **Description**: Displays the captain's details and statistics.

### `LiveTracking`

- **File**: `src/components/LiveTracking.jsx`
- **Description**: Displays the live tracking map for the ride.

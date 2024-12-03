# Backend API Documentation

## Models

### User Model

Represents a user in the application.

**Fields:**

- **fullname**: *Object*
  - **firstname**: *String*
    - Required: `true`
    - Trimmed
    - Minimum length: 3 characters
    - Populated during user registration.
  - **lastname**: *String*
    - Required: `false`
    - Trimmed
    - Minimum length: 3 characters
    - Populated during user registration if provided.

- **email**: *String*
  - Required: `true`
  - Unique: `true`
  - Trimmed
  - Minimum length: 5 characters
  - Valid email format is enforced.
  - Populated during user registration.

- **password**: *String*
  - Required: `true`
  - Select: `false` (excluded from query results by default)
  - Minimum length: 6 characters
  - Stored as a hashed password.
  - Populated during user registration.

- **socketId**: *String*
  - Populated when the user connects via WebSocket.

**Methods:**

- **Instance Methods:**

  - `generateAuthToken()`: Generates a JWT token for authentication.
    - Used when the user logs in or registers.

  - `comparePassword(password)`: Compares a provided password with the stored hashed password.
    - Used during login to validate credentials.

- **Static Methods:**

  - `hashPassword(password)`: Hashes a password using bcrypt.
    - Used before saving a new user's password.

---

### Captain Model

Represents a captain (driver) in the application.

**Fields:**

- **fullname**: *Object*
  - **firstname**: *String*
    - Required: `true`
    - Minimum length: 3 characters
    - Populated during captain registration.
  - **lastname**: *String*
    - Required: `false`
    - Minimum length: 3 characters
    - Populated during captain registration if provided.

- **email**: *String*
  - Required: `true`
  - Unique: `true`
  - Valid email format is enforced.
  - Populated during captain registration.

- **password**: *String*
  - Required: `true`
  - Select: `false`
  - Minimum length: 6 characters
  - Stored as a hashed password.
  - Populated during captain registration.

- **socketId**: *String*
  - Populated when the captain connects via WebSocket.

- **status**: *String*
  - Enum: `['active', 'inactive']`
  - Default: `'inactive'`
  - Indicates the captain's availability.
  - Updated when the captain logs in or changes status.

- **vehicle**: *Object*
  - **color**: *String*
    - Required: `true`
    - Minimum length: 3 characters
    - Populated during captain registration.
  - **plate**: *String*
    - Required: `true`
    - Unique: `true`
    - Minimum length: 3 characters
    - Populated during captain registration.
  - **capacity**: *Number*
    - Required: `true`
    - Minimum: 1
    - Populated during captain registration.
  - **vehicleType**: *String*
    - Required: `true`
    - Enum: `['car', 'motorcycle', 'auto']`
    - Populated during captain registration.

- **location**: *Object*
  - **ltd**: *Number* (Latitude)
    - Updated when the captain's location changes.
  - **lng**: *Number* (Longitude)
    - Updated when the captain's location changes.

**Methods:**

- **Instance Methods:**

  - `generateAuthToken()`: Generates a JWT token for authentication.
    - Used during captain login and registration.

  - `comparePassword(password)`: Compares a provided password with the stored hashed password.
    - Used during login to validate credentials.

- **Static Methods:**

  - `hashPassword(password)`: Hashes a password using bcrypt.
    - Used before saving a new captain's password.

---

### Ride Model

Represents a ride request and its lifecycle in the application.

**Fields:**

- **user**: *ObjectId* (Reference to User)
  - Required: `true`
  - Populated when a user creates a ride.

- **captain**: *ObjectId* (Reference to Captain)
  - Populated when a captain accepts the ride.

- **pickup**: *String*
  - Required: `true`
  - The pickup address.
  - Populated when the ride is created.

- **destination**: *String*
  - Required: `true`
  - The destination address.
  - Populated when the ride is created.

- **fare**: *Number*
  - Required: `true`
  - Calculated based on distance and vehicle type.
  - Populated when the ride is created.

- **status**: *String*
  - Enum: `['pending', 'accepted', 'ongoing', 'completed', 'cancelled']`
  - Default: `'pending'`
  - Represents the current state of the ride.
  - Updated throughout the ride lifecycle:
    - `'pending'`: Ride is created and awaiting acceptance.
    - `'accepted'`: Captain has accepted the ride.
    - `'ongoing'`: Ride has started.
    - `'completed'`: Ride has ended.
    - `'cancelled'`: Ride has been cancelled.

- **duration**: *Number*
  - Estimated duration in seconds.
  - Populated when the ride is created.

- **distance**: *Number*
  - Distance in meters.
  - Populated when the ride is created.

- **otp**: *String*
  - Required: `true`
  - Select: `false` (excluded from query results by default)
  - One-time password used to verify ride start.
  - Populated when the ride is accepted by a captain.

- **paymentID**, **orderId**, **signature**: *String*
  - Populated if the ride involves a payment transaction.

**Notes:**

- The **otp** must be verified by the captain before starting the ride.
- The **status** field is critical for tracking ride progress and must be updated accordingly.

---

### BlacklistToken Model

Represents JWT tokens that have been invalidated (e.g., upon logout).

**Fields:**

- **token**: *String*
  - Required: `true`
  - Unique: `true`
  - The JWT token to blacklist.
  - Populated when a user or captain logs out.

- **createdAt**: *Date*
  - Default: `Date.now`
  - The timestamp when the token was blacklisted.
  - Includes an expiration (`expires: '24h'`) to automatically remove the token after its validity period.

**Notes:**

- Used to prevent reuse of tokens after logout.
- Tokens are automatically removed from the collection after 24 hours.

## APIS

## User Registration

### Endpoint

`POST /users/register`

### Description

Registers a new user.

### Request Body

- `fullname` (object):
  - `firstname`: string, **required**, minimum 3 characters
  - `lastname`: string, optional, minimum 3 characters
- `email`: string, **required**, valid email format
- `password`: string, **required**, minimum 6 characters

### Example Response

- `user` (object): -`fullname` (object).
  - `firstname`: (string): User's first name (minimum 3 characters)
  - `lastname`: (string): User's last name (minimum 3 characters)
  - `email`: (string): User's email address
  - `password`: (string): User' hashed password
- `token` (String): JWT Token

#### Success

- **Status Code**: 201 Created

## User Login

### Endpoint

`POST /users/login`

### Description

Authenticates a user and returns a token and user details.

### Request Body

- `email`: string, **required**, valid email format
- `password`: string, **required**, minimum 6 characters

### Example Response

- `user` (object):
  - `fullname` (object):
    - `firstname`: string, user's first name
    - `lastname`: string, user's last name
  - `email`: string, user's email address
    // ...other user fields...
- `token`: string, JWT token

#### Success

- **Status Code**: 200 OK

## User Profile

### Endpoint

`GET /users/profile`

### Description

Retrieves the profile information of the authenticated user.

### Headers

- `Authorization`: Bearer token obtained from login

### Example Response

- `user` (object):
  - `fullname` (object):
    - `firstname`: string, user's first name
    - `lastname`: string, user's last name
  - `email`: string, user's email address
    // ...other user fields...

#### Success

- **Status Code**: 200 OK

## User Logout

### Endpoint

`GET /users/logout`

### Description

Logs out the authenticated user by invalidating their session token by blacklisting the token provided in cookie or headers.

### Headers

- `Authorization`: Bearer token obtained from login or cookie

### Example Response

- `message`: string, confirmation of successful logout

#### Success

- **Status Code**: 200 OK

## Captain Registration

### Endpoint

`POST /captains/register`

### Description

Registers a new captain.

### Request Body

- `fullname` (object):
  - `firstname`: string, **required**, minimum 3 characters
  - `lastname`: string, optional, minimum 3 characters
- `email`: string, **required**, valid email format
- `password`: string, **required**, minimum 6 characters
- `vehicle` (object):
  - `color`: string, **required**, minimum 3 characters
  - `plate`: string, **required**, minimum 3 characters
  - `capacity`: integer, **required**, at least 1
  - `vehicleType`: string, **required**, one of 'car', 'motorcycle', 'auto'

### Example Response

- `captain` (object):
  - `fullname` (object):
    - `firstname`: string, captain's first name
    - `lastname`: string, captain's last name
  - `email`: string, captain's email address
  - `password`: string, captain's hashed password
  - `vehicle` (object):
    - `color`: string, vehicle color
    - `plate`: string, vehicle plate number
    - `capacity`: integer, vehicle capacity
    - `vehicleType`: string, type of vehicle
      // ...other captain fields...
- `token`: string, JWT token

#### Success

- **Status Code**: 201 Created

## Captain Login

### Endpoint

`POST /captains/login`

### Description

Authenticates a captain and returns a token and captain details.

### Request Body

- `email`: string, **required**, valid email format
- `password`: string, **required**, minimum 6 characters

### Example Response

- `captain` (object):
  - `fullname` (object):
    - `firstname`: string, captain's first name
    - `lastname`: string, captain's last name
  - `email`: string, captain's email address
  - `password`: string, captain's hashed password
  - `_id`: captain's id
  - `_status`: captain's status
  - `vehicle` (object):
    - `color`: string, vehicle color
    - `plate`: string, vehicle plate number
    - `capacity`: integer, vehicle capacity
    - `vehicleType`: string, type of vehicle
      // ...other captain fields...
- `token`: string, JWT token

#### Success

- **Status Code**: 200 OK

## Captain Profile

### Endpoint

`POST /captains/profile`

### Description

Retrieves the profile information of the authenticated captain.

### Request Body

- `email`: string, **required**, valid email format
- `password`: string, **required**, minimum 6 characters

### Example Response

- `captain` (object):
  - `fullname` (object):
    - `firstname`: string, captain's first name
    - `lastname`: string, captain's last name
  - `email`: string, captain's email address
  - `_id`: captain's id
  - `_status`: captain's status
  - `vehicle` (object):
    - `color`: string, vehicle color
    - `plate`: string, vehicle plate number
    - `capacity`: integer, vehicle capacity
    - `vehicleType`: string, type of vehicle

#### Success

- **Status Code**: 200 OK

## Captain Logout

### Endpoint

`GET /captains/logout`

### Description

Logs out the authenticated captain by invalidating their session token by blacklisting the token provided in cookie or headers.

### Headers

- `Authorization`: Bearer token obtained from login or cookie

### Example Response

- `message`: string, confirmation of successful logout

#### Success

- **Status Code**: 200 OK

## Get Coordinates

### Endpoint

`GET /maps/get-coordinates`

### Description

Retrieves the latitude and longitude for a given address.

### Query Parameters

- `address`: string, **required**, the address to geocode (minimum 3 characters)

### Headers

- `Authorization`: Bearer token obtained from login

### Example Response

- `coordinates` (object):
  - `ltd`: number, latitude of the address
  - `lng`: number, longitude of the address

#### Success

- **Status Code**: 200 OK

## Get Distance and Time

### Endpoint

`GET /maps/get-distance-time`

### Description

Retrieves the distance and estimated travel time between an origin and a destination.

### Query Parameters

- `origin`: string, **required**, the starting address (minimum 3 characters)
- `destination`: string, **required**, the destination address (minimum 3 characters)

### Headers

- `Authorization`: Bearer token obtained from login

### Example Response

- `distance` (object):
  - `text`: string, distance in human-readable format (e.g., "5.3 km")
  - `value`: number, distance in meters
- `duration` (object):
  - `text`: string, duration in human-readable format (e.g., "12 mins")
  - `value`: number, duration in seconds
- `status`: string, status of the request

#### Success

- **Status Code**: 200 OK

## Get AutoComplete Suggestions

### Endpoint

`GET /maps/get-suggestions`

### Description

Retrieves address suggestions based on a partial input.

### Query Parameters

- `input`: string, **required**, the partial address input (minimum 3 characters)

### Headers

- `Authorization`: Bearer token obtained from login

### Example Response

An array of address suggestions.

- `suggestions`: array of strings, possible address completions

#### Success

- **Status Code**: 200 OK

## Create Ride

### Endpoint

`POST /rides/create`

### Description

Creates a new ride request for the authenticated user.

### Request Body

- `pickup`: string, **required**, pickup address (minimum 3 characters)
- `destination`: string, **required**, destination address (minimum 3 characters)
- `vehicleType`: string, **required**, one of 'auto', 'car', 'moto'

### Headers

- `Authorization`: Bearer token obtained from user login

### Example Response

- `ride` (object):
  - `_id`: string, unique identifier of the ride
  - `user`: string, user ID
  - `pickup`: string, pickup address
  - `destination`: string, destination address
  - `fare`: number, calculated fare for the ride
  - `status`: string, current status of the ride (e.g., 'pending', 'accepted', 'ongoing', 'completed')
  // ...other ride fields...

#### Success

- **Status Code**: 201 Created

## Get Fare

### Endpoint

`GET /rides/get-fare`

### Description

Retrieves the estimated fare for a ride based on the pickup and destination addresses.

### Query Parameters

- `pickup`: string, **required**, the pickup address (minimum 3 characters)
- `destination`: string, **required**, the destination address (minimum 3 characters)

### Headers

- `Authorization`: Bearer token obtained from login

### Example Response

- `fare` (object):
  - `auto`: number, estimated fare for an auto
  - `car`: number, estimated fare for a car
  - `moto`: number, estimated fare for a motorcycle

#### Success

- **Status Code**: 200 OK

## Confirm Ride

### Endpoint

`POST /rides/confirm`

### Description

Allows a captain to confirm a ride request.

### Request Body

- `rideId`: string, **required**, the unique identifier of the ride to confirm

### Headers

- `Authorization`: Bearer token obtained from captain login

### Example Response

- `ride` (object):
  - `_id`: string, unique identifier of the ride
  - `user`: object, user details
  - `captain`: object, captain details
  - `pickup`: string, pickup address
  - `destination`: string, destination address
  - `fare`: number, fare for the ride
  - `status`: string, status of the ride (e.g., 'accepted')
  // ...other ride fields...

#### Success

- **Status Code**: 200 OK

## Start Ride

### Endpoint

`GET /rides/start-ride`

### Description

Allows a captain to start a ride that has been accepted by verifying the ride OTP.

### Query Parameters

- `rideId`: string, **required**, the unique identifier of the ride (must be a valid MongoDB ObjectId)
- `otp`: string, **required**, 6-digit OTP provided to the captain

### Headers

- `Authorization`: Bearer token obtained from captain login

### Example Response

- `ride` (object):
  - `_id`: string, unique identifier of the ride
  - `user`: object, user details
  - `captain`: object, captain details
  - `pickup`: string, pickup address
  - `destination`: string, destination address
  - `fare`: number, fare for the ride
  - `status`: string, updated status of the ride (e.g., 'ongoing')
  // ...other ride fields...

#### Success

- **Status Code**: 200 OK

## End Ride

### Endpoint

`POST /rides/end-ride`

### Description

Allows a captain to complete a ride that is currently ongoing.

### Request Body

- `rideId`: string, **required**, the unique identifier of the ride (must be a valid MongoDB ObjectId)

### Headers

- `Authorization`: Bearer token obtained from captain login

### Example Response

- `ride` (object):
  - `_id`: string, unique identifier of the ride
  - `user`: object, user details
  - `captain`: object, captain details
  - `pickup`: string, pickup address
  - `destination`: string, destination address
  - `fare`: number, fare for the ride
  - `status`: string, updated status of the ride (e.g., 'completed')
  // ...other ride fields...

#### Success

- **Status Code**: 200 OK
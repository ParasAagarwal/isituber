# Backend API Documentation

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

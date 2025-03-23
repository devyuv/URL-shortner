# URL Shortener

This project is a simple URL shortener service built with Node.js, Express, and MongoDB.

## Approach

The URL shortener uses the following approach:

- MVC architecture with separate models, routes, and controllers
- Express.js for handling HTTP requests
- MongoDB for storing URL data
- Crypto module for generating unique short codes
- RESTful API design for creating short URLs and retrieving analytics

## Steps to Run Locally

1. Clone the repository
2. Install dependencies:
   ```
   npm install express mongoose crypto
   ```
3. Ensure MongoDB is running locally on the default port (27017)
4. Start the server:
   ```
   npm start
   ```
5. The server will run on http://localhost:8002

## API Endpoints

### 1. Create a Short URL

- **POST** `http://localhost:8002/url`
- **Body**: 
  ```json
  {
    "url": "https://example.com"
  }
  ```
- **Response**:
  ```json
  {
    "id": "Abcd1234"
  }
  ```

### 2. Redirect to Original URL

- **GET** `http://localhost:8002/url/:shortId`
- Redirects to the original URL

### 3. Get Analytics

- **GET** `http://localhost:8002/url/analytics/:shortId`
- **Response**:
  ```json
  {
    "totalClicks": k,  (k >= 0)
  }
  ```

## Example Usage

1. Create a short URL:
   ```
   POST http://localhost:8002/url
   {"url": "https://google.com"}
   ```
   or
   ```
   POST http://localhost:8002/url
   {"url": "https://myprotein.co.in"}
   ```
   
   Response: `{"id": "d75277cd"}`
   Or
   Response: `{"id": "990e3fe4"}`

2. Use the short URL:
   ```
   GET http://localhost:8002/url/d75277cd
   ```
   This will redirect to https://google.com

   or
   ```
   GET http://localhost:8002/url/990e3fe4
   ```
   This will redirect to https://myprotein.co.in

3. Get analytics:
   ```
   GET http://localhost:8002/url/analytics/d75277cd
   ```
   Response: `{"totalClicks: 2"}`

   or
   ```
   GET http://localhost:8002/url/analytics/990e3fe4
   ```
   Response: `{"totalClicks: 1"}`

   ## End

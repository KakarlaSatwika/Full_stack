
# BookMyBus - Angular Frontend (NgModule style)

This is a ready-to-run Angular 15 frontend for the BookMyBus project.

## Setup steps

1. Unzip this folder into a location, for example `D:\MCA\sathu\bookmybus-frontend`.
2. In that folder run:
   ```bash
   npm install
   ```
3. Start your backend (Spring Boot) on http://localhost:8080
4. Run the frontend:
   ```bash
   npm start
   ```
   This will run `ng serve` and open the app at http://localhost:4200
5. Proxy is configured so `/api` calls are forwarded to `http://localhost:8080/api`.

## Backend endpoints expected
- POST /api/users/register
- POST /api/users/login
- GET /api/buses
- GET /api/buses/{id}
- GET /api/buses/search?origin=...&destination=...&date=YYYY-MM-DD
- POST /api/buses (admin)
- PUT /api/buses/{id} (admin)
- DELETE /api/buses/{id} (admin)
- POST /api/bookings
- GET /api/bookings

If your backend paths differ, open `src/app/services/*.ts` and adjust `environment.apiUrl` or endpoints.

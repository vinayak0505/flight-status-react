## Flight Status App
**A real-time flight status application with user authentication, admin management, flight booking, and live updates.**
Access the app in your web browser at https://vinayak0505.github.io/flight-status-react

## Features
**User Authentication:** Users can sign up, log in, and manage their account details.<br />
**Admin Management:** Admin users can be created during signup and have the ability to modify flight status.<br />
**Flight Booking:** Authenticated users can book flights if the onboarding time is less than 2 hours. Otherwise, a progress bar is displayed.<br />
**Progress Tracking:** A progress bar indicates the flight's progress based on elapsed time compared to total flight duration.<br />
**Flight Status:** Real-time display of flight status information for all users.<br />
<img width="1280" alt="Screenshot 2024-07-30 at 5 27 20 PM" src="https://github.com/user-attachments/assets/79bd3f23-7237-4bd7-9535-c2e324112f32">
**Flight Booking:** Authenticated users can book flights.<br />
<img width="1280" alt="Screenshot 2024-07-30 at 5 28 04 PM" src="https://github.com/user-attachments/assets/19bded42-d92c-477f-9448-4da46ee979cf">
**Ticket Management:** Users can view their booked tickets.<br /><img width="1280" alt="Screenshot 2024-07-30 at 5 14 52 PM" src="https://github.com/user-attachments/assets/0d65c726-4887-4092-a954-bb06e29394d0">
**Notifications:** Users receive notifications for flight status changes and booking confirmations via Firebase Cloud Messaging and email.<br />
**Live Updates:** The flight status screen refreshes automatically to display the latest information.<br />
**Browser Notifications:** Users receive browser notifications for flight status changes even when the tab is inactive.<br />
**Navigation:** A left navigation menu provides easy access to app features.<br />
**Advertising:** Display advertisements on the right side of the screen.<br />

## Technology Stack
**Frontend:** React<br />
**Backend:** Java<br />
**Database:** postgresql<br />
**Authentication:** spring sequrity and jwt token<br />
**Notifications:** Firebase Cloud Messaging and smtp for mail<br />
<img width="731" alt="Screenshot 2024-07-30 at 11 07 09 AM" src="https://github.com/user-attachments/assets/e49dceea-7364-4d01-bee2-a1ec0165c2ac">
<img width="1280" alt="Screenshot 2024-07-30 at 11 06 49 AM" src="https://github.com/user-attachments/assets/2236cc88-012d-4798-8a88-7df28a02575c">

## Installation
Clone the repository:
```Bash
git clone https://github.com/vinayak0505/flight-status-react.git
```

Install dependencies:
```Bash
cd flight-status-app
npm install
```

## Set up environment variables:
Create a .env file in the project root.<br />
REACT_APP_API_BASE_URL=<br />
REACT_APP_BOOKING_HOURS=<br />

Running the App
Start the development server:
```Bash
npm start
```

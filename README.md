# CampusRooms 🎓

CampusRooms is a web-based campus room booking application that allows students to explore available rooms, check available time slots, and make reservations easily.

The platform provides a simple and user-friendly way to manage campus room bookings.

## ✨ Features

- **Browse Rooms:** Explore different campus rooms and their details.
- **Room Information:** View room names, buildings, capacities, and available amenities.
- **Availability Checking:** Check available time slots before making a reservation.
- **Room Booking:** Select a preferred date and time slot to proceed with a booking.
- **Booking Management:** View and cancel existing bookings.
- **Booking Limits:** A maximum of four students can book the same room and time slot.
- **Local Storage:** Booking information is saved in the browser using localStorage.
- **Responsive Design:** Access the application on different screen sizes.

## 🛠️ Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- JavaScript
- Browser Local Storage

## 📂 Project Structure

```text
CampusRooms/
├── app/
│   ├── booking/
│   ├── rooms/
│   │   └── [id]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── BookingContext.tsx
│   └── RoomCard.tsx
├── data/
│   └── data.js
├── public/
├── package.json
└── README.md
```

## 🚀 Getting Started

Follow these steps to run the project on your computer.

### 1. Clone the repository

```bash
git clone https://github.com/sulaymanshukurah1004-beep/campus-room.git
```

### 2. Navigate into the project folder

```bash
cd CampusRooms
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Open the application

Visit:

```text
http://localhost:3000
```

## 📖 How to Use

1. Open the CampusRooms application.
2. Browse the available campus rooms.
3. Select a room to view its details.
4. Choose your preferred booking date.
5. Select an available time slot.
6. Proceed to the booking page to complete your reservation.
7. Manage or cancel your bookings when necessary.

## 💾 Data Storage

This project uses browser localStorage to store booking information.

This means booking records are saved in the browser on the device being used. The current version does not use a central database.

## 🔮 Future Improvements

- User authentication and student accounts.
- Database integration.
- Email booking confirmations.
- Administrator dashboard.
- Improved booking management and notifications.

## 👩‍💻 Author

Developed as a student project to make campus room reservations easier and more organized.

## 📄 License

This project is created for educational purposes.
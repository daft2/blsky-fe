# Blsky Chat Challenge

## Overview

This project is a **real-time chat application** built as a submission for the **Frontend Developer** position at **Blsky**. It features two chat windows, each representing a different sender. Messages sent from one window appear in the other, with a flashing effect when a new message is received. Messages persist even after refreshing or closing the tab.

## Features

- **Two chat windows** (Left & Right) communicating via WebSockets.
- **Flashing effect** when a new message is received.
- **Message persistence** using localStorage.
- **Responsive & clean UI** built with Tailwind CSS.
- **WebSocket server** using Node.js to handle real-time communication.

## Technologies Used

- **Next.js 15** (Frontend framework)
- **Tailwind CSS** (Styling)
- **TypeScript** (Type safety)
- **WebSockets (ws)** (Real-time communication)
- **Node.js** (Backend WebSocket server)

## Setup Instructions

### Prerequisites

- **Node.js** (v18+ recommended)
- **Yarn** or **npm** installed

### Installation

1. **Clone the repository:**
   ```sh
   git clone <https://github.com/daft2/blsky-fe>
   cd blsky-fe
   ```
2. **Install dependencies:**
   ```sh
   yarn install  # or npm install
   ```

### Running the WebSocket Server

Start the WebSocket server:

```sh
node server/server.ts
```

This will run the WebSocket server on `ws://localhost:4000`.

### Running the Frontend

Start the Next.js application:

```sh
yarn dev  # or npm run dev
```

This will start the frontend on `http://localhost:3000`.

## Project Structure

```
blsky-chat/
│── server/
│   ├── server.ts     # WebSocket server
│── src/
│   ├── components/
│   │   ├── ChatBox.tsx  # Chat UI component
│   ├── pages/
│   │   ├── index.tsx    # Main page with chat windows
│── public/
│── styles/
│── package.json
│── tsconfig.json
│── README.md
```

## How It Works

1. **WebSocket Communication:**

   - When a user types a message and sends it, the message is sent to the WebSocket server.
   - The server then broadcasts the message to all connected clients.
   - The receiving client updates its state and displays the new message.

2. **Message Persistence:**

   - Messages are stored in `localStorage` to persist across page reloads.

3. **Chat UI Logic:**

   - Messages align **left or right** depending on the sender.
   - The chat box has a **scrollable history** with a maximum height.
   - The **flashing effect** is triggered when a new message arrives.

## Demo

- Run the app and open **two browser windows**.
- Type a message in one window and observe it appearing in the other with a **flashing effect**.
- Refresh the page to see messages persist.

## License

This project is for evaluation purposes only and is not licensed for commercial use.

---

Made with ❤️ for Blsky


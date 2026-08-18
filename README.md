# Slack App

A full-stack, real-time chat application inspired by Slack. 

*(Note: This project was originally built by following along with a tutorial by Code with Antonio, and later expanded with custom features like real-time online presence indicators and try demo login button).*

## 🚀 Live Demo
[https://slack-app-clone-eight.vercel.app]

---

## 🛠️ Technologies Used

### Frontend
- **Framework:** Next.js (App Router)
- **UI Library:** React
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Icons:** Lucide React
- **State Management:** Jotai
- **Forms & Validation:** React Hook Form
- **Rich Text Editor:** Quill.js
- **Toast Notifications:** Sonner

### Backend & Database
- **Platform:** Convex (Real-time Database & Backend Functions)
- **Authentication:** Convex Auth (OAuth & Email)
- **Real-time Sync:** Native Convex WebSocket Queries

---

## ✨ Key Functionality & Features

### Workspaces & Channels
- Create and switch between multiple workspaces seamlessly.
- Create text channels within workspaces for group communication.
- Global search functionality (Command Palette) to quickly find channels, members, and jump between them.

### Real-Time Messaging
- Send, edit, and delete messages in real-time.
- Thread replies and direct messaging (1-on-1 conversations).
- Rich text formatting using Quill.js integration.
- Emoji picker and custom emoji reactions on messages.
- Image and file attachments (powered by Convex Storage).

### Online Presence Indicators 🟢
- Real-time online/offline green dot indicators for workspace members.
- Active "Heartbeat" mechanism ensures presence states are updated instantly (marks users offline within 15 seconds of disconnecting).

### User Authentication & Management
- Secure authentication system via Convex Auth.
- Profile management and dynamic avatars.
- Member roles (Admin vs. Member permissions inside workspaces).

---

## 📦 Getting Started

First, install dependencies:

```bash
npm install
```

Start the Convex development server:

```bash
npx convex dev
```

Then, run the Next.js development server:

```bash
npm run dev
```

Open [http://localhost:3000] with your browser to see the result.

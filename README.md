# 📚 Bookfied

**Bookfied** is an AI-powered platform that lets you **talk with books using voice**.
Upload a book and start a natural conversation with it — ask questions, explore ideas, or study complex topics interactively.

The platform combines **AI voice conversations, semantic search, and document understanding** to create a new way of reading and learning.

🌐 Live App: https://bookfied.vercel.app
💻 Repository: https://github.com/diegovilhalva/bookfied

---

# ✨ Features

* 📖 Upload and explore books
* 🎙️ Voice conversations with books
* 🔎 Search books by title or author
* 🧠 AI-powered semantic understanding
* 📚 Intelligent book segmentation for contextual responses
* 👤 Authentication and user management
* 💳 Subscription plans and billing
* 🎭 Multiple AI voice personas
* ⚡ Fast server-side rendering with Next.js

---

# 🎙️ AI Voice Personas

Bookfied offers different voice personalities for conversations:

* **Dave** — Young male, British (Essex), casual & conversational
* **Daniel** — Middle-aged male, British, authoritative but warm
* **Chris** — Male, casual & easy-going
* **Rachel** — Young female, American, calm & clear
* **Sarah** — Young female, American, soft & approachable

These personas allow users to customize how they interact with books.

---

# 🧠 How It Works

1. A user uploads a book.
2. The book is processed and divided into **text segments**.
3. When the user asks a question:

   * relevant segments are retrieved from the database
   * the AI uses this context to generate a response.
4. The response is delivered **as voice using AI speech synthesis**.

This enables **interactive conversations with the content of the book**.

---

# 🛠️ Tech Stack

**Frontend**

* Next.js (App Router)
* TypeScript
* Tailwind CSS
* ShadCN UI

**Backend**

* Node.js
* MongoDB

**Authentication & Billing**

* Clerk

**AI & Voice**

* Vapi
* ElevenLabs

**File Storage**

* Vercel Blob

**Deployment**

* Vercel

---

# ⚙️ Environment Variables

Create a `.env.local` file and add the following variables:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

MONGODB_URI=

READ_WRITE_TOKEN=

NEXT_PUBLIC_ASSISTANT_ID=
NEXT_PUBLIC_VAPI_API_KEY=
```

---

# 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/diegovilhalva/bookfied.git
cd bookfied
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and add the variables listed above.

### 4. Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

# 📦 Deployment

This project is designed to be deployed on **Vercel**.

Steps:

1. Push your repository to GitHub
2. Import the project into Vercel
3. Add the environment variables
4. Deploy

---

# 📚 Use Cases

Bookfied can be used for:

* 📖 Interactive reading
* 🎓 Academic study
* 🧠 Understanding complex books
* 💬 Exploring ideas through conversation
* 📚 Research and learning

---

# 👨‍💻 Author

**Diego Vilhalva**

GitHub: https://github.com/diegovilhalva

---

# 📄 License

This project is open source and available under the MIT License.

# Baxus-BOB: Your Personal AI Whiskey Sommelier 🥃🤖

[![BOB Avatar](https://raw.githubusercontent.com/LoreviQ/Baxus-Honey-Barrel/main/assets/bob.png)](https://baxathon.oliver.tj/bob)

**Meet BOB (BAXUS Outstanding Butler... or is it Operational Bot? 😉)**

Welcome to the home of BOB, the AI agent built for the Baxathon! BOB isn't just any bot; he's a sophisticated, knowledgeable whiskey expert designed to be your personal guide through the vast world of whiskey, right within the BAXUS ecosystem.

This project was brought to life using a custom-built agent framework (`@olivertj/agent-builder`), showcasing its capabilities in creating intelligent, context-aware AI agents.

**The Baxathon Challenge: Accepted & Exceeded!**

The core mission was clear: create an AI agent to analyze a user's BAXUS virtual bar and provide personalized bottle recommendations from a curated dataset. BOB does exactly that, and then some!

**Core Features:**

- **Deep Collection Analysis:** BOB meticulously examines your virtual bar, identifying your preferred whiskey regions, styles (Bourbon, Scotch, Rye, etc.), flavor profiles, price points, and more.
- **Personalized Recommendations:** Based on his analysis, BOB suggests new bottles tailored to your taste. He'll find drams similar to your favorites or complementary bottles to help you explore new horizons.
- **Clear Reasoning:** BOB doesn't just throw names at you. He explains _why_ each bottle is recommended, connecting it directly to your collection patterns.
- **Dataset Driven:** All recommendations come from the official hackathon dataset of ~500 bottles, ensuring relevance to the BAXUS world.

**🚀 Beyond the Spec: Extra Sips of Fun!**

We didn't just stop at meeting the requirements. We wanted BOB to be truly integrated and accessible:

- **Live Deployment:** BOB is not just code; he's live! You can interact with him directly.
- **Chat with BOB:** Have a question? Want a recommendation? Chat with BOB right now: [https://baxathon.oliver.tj/bob](https://baxathon.oliver.tj/bob)
- **Cross-Track Integration:** BOB collaborates with other hackathon projects!
  - **Chrome Extension:** Find BOB assisting users directly within their browser.
  - **Whiskey Goggles:** BOB equips the "whiskey goggles" for the image classification track, adding his expertise to identifying bottles visually.

**Technical Tipples:**

- **Framework:** Built with the developer's own `@olivertj/agent-builder` framework.
- **Backend:** Node.js, Express, TypeScript
- **Database:** MongoDB for storing conversation threads and user knowledge.
- **Data Sources:** BAXUS User Bar API (`http://services.baxus.co/api/bar/user/{{ username }}`) & the provided TSV dataset.
- **Deployment:** Containerized with Docker and deployed on Google Cloud Run (See `scripts/deploy.sh`).

**Running Locally:**

1.  Clone the repository.
2.  Install dependencies: `npm install`
3.  Set up environment variables (create a `.env` file based on required variables like MongoDB connection string).
4.  Initialize the database with the whiskey dataset: `npm run initdb`
5.  Start the server: `npm run dev` or `npm start`

**Hackathon Deliverables:**

- ✅ Working prototype of BOB.
- ✅ Demo capabilities (via the live chat interface).
- ✅ Code repository with clear instructions (You're reading them!).

---

Built with passion (and maybe a dram or two) for the Baxathon. Enjoy your whiskey journey with BOB!

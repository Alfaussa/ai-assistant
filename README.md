# Smart Boiler Selector

Web application for calculating boiler power and interacting with an AI assistant for heating guidance.

## Features
- Calculate boiler power based on house parameters.
- Chat with AI assistant for heating recommendations.
- Visualization of calculation results.

## Technologies
- Vercel (hosting and deployment)
- React / Next.js (frontend)
- AI SDK (assistant and logic)

## Installation & Running

1. Clone the repository:
bash
git clone https://github.com/your/repo.git

2. Go to the project folder:

cd repo

3. Install dependencies:

npm install

4. Set environment variables in .env.local:

NEXT_PUBLIC_API_URL=https://api.openai.com
OPENAI_API_KEY=your_openai_key

5. Run the application:

npm run dev

## Project Structure

/src <br>
        /components      — UI components <br>
  /pages           — pages <br>
  /utils           — calculation functions and helpers <br>
  /styles          — project styles <br>
.gitignore <br>
README.md <br>
package.json <br>

## Contributing

Pull requests and ideas are welcome. Improvements to UI, calculations, or AI assistant are encouraged.

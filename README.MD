# Telegram Bot Proxy for OpenAI Assistance

## Project Overview

This project is a Node.js-based proxy application designed to connect a Telegram bot with the OpenAI Assistant, facilitating user consultations directly through Telegram. The application acts as an intermediary, receiving user messages via the Telegram bot, processing them through the OpenAI API, and delivering responses back to the users in real time.

Built using TypeScript, Express, and Sequelize ORM, this application manages interactions  maintains a lightweight SQLlite database to log and track user sessions, providing a streamlined consultation experience.

## Key Functionalities

- **Telegram Bot Integration**: Connects directly with Telegram's API, receiving and sending user messages seamlessly.
- **OpenAI API Communication**: Processes incoming requests from the bot, passing them to OpenAI for natural language responses.
- **Session Management**: Uses SQLlite and Sequelize ORM to log user interactions, allowing for session tracking and streamlined user management.
- **Express Server**: Manages the backend operations and handles HTTP requests efficiently with Express.

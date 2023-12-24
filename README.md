# phi2discord
Phi 2, by Microsoft brought to a Discord bot.

## Overview
phi2discord is a Discord bot that leverages the power of language models for interactive conversations. Named Phi 2, this lightweight and fast Large Language Model (LLM) is designed by Microsoft for fast interference in devices with limited resources. This project was just a quick experiment to see what I could do with LM Studio's server.

## Features
- **Message Generation**: Responds to direct messages from invited users by generating messages based on a conversation history.
- **Message History**: Gathers and utilizes message history to enhance context-aware responses.
- **Message deletion**: You can delete the bot's messages by reacting to them with `❌`.
- **Easily customizable**: You can easily modify the code to adapt it to your needs, or use it as a template.

## Setup
1. Clone the repository: `git clone https://github.com/UkehUwU/phi2discord.git`, `cd phi2discord`
2. Install dependencies: `yarn install` or `npm install`
3. Go to [Discord Developer Portal](https://discord.com/developers/applications) and create an application. You can customize it if you want to.
4. Create a `.env` file and add your bot's Discord token as shown in `.env.example`: `DISCORD_TOKEN=your_token_here`. Don't share it with anyone!
5. Create a `config.json` file and customize it to suit your preferences. `config.json.example` contains an example of configuration.
6. Start a LM Studio server with the Phi 2 model loaded. You can use any other method or model, but that might need some changes in the code.
7. Run `yarn start` or `npm start` to initialize the bot.
8. Now, you can DM the bot you just created.

# Contributing
Feel free to contribute to the project by forking and submitting pull requests. Bug reports and feature requests are also welcome.

# License
This project is licensed under the [MIT License](LICENSE).
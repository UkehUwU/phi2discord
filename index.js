import { Client, Events, GatewayIntentBits, Partials } from 'discord.js';
import { configDotenv } from 'dotenv';
import axios from 'axios';

// * Config *
configDotenv();
import config from './config.json' assert { type: 'json' };

// * Client *
const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.DirectMessageReactions], partials: [Partials.Channel, Partials.Message, Partials.Reaction] });

client.once(Events.ClientReady, readyClient => {

	console.log(`Ready! Logged in as ${readyClient.user.tag}`);

});

// * Handle messages *
client.on(Events.MessageCreate, async message => {

    try {

        // The bot only responds to direct messages from invited users.
        if ((message.guild) || !(config.invitedUsers.includes(message.author.id))) return;

        // Send some feedback while the bot is processing the message.
        message.channel.sendTyping();

        // Build the message history
        const messages = await message.channel.messages.fetch();

        const messageHistory = messages.map(msg => ({

            role: msg.author.id === client.user.id ? 'system' : 'user',
            content: msg.content

        }));

        // Generate a new message
        const aiResponse = await axios({

            method: 'post',
            url: config.llm.url,
            headers: {'Content-Type': 'application/json'},
            data: {

                'temperature': config.llm.temp,
                'max_tokens': config.llm.max_tokens,
                'stream': false,
                'messages': [

                    { role: 'system', content: `You are Phi 2, or Phi, for short. You are a lightweight and fast LLM made by Microsoft to help the user. You are on Discord. The user's name is ${message.author.displayName}.` },
                    ...messageHistory,
                    { role: 'user', content: message.content }

                ]

            }

        });

        // Send the message
        message.channel.send(aiResponse.data.choices[0].message.content);

    } catch {

        console.log('There was an error while handling a message.');

    };

});

// * Delete messages *
client.on(Events.MessageReactionAdd, async (reaction) => {

    try {

        // If the user reacted to a message from the bot with `❌`, delete it.
        await reaction.fetch();
        if (reaction.message.author.id !== client.user.id) return;
        if (reaction.emoji.name == '❌') {

            await reaction.message.fetch();
            reaction.message.delete();

        };

    } catch {

        console.log('There was an error while handling a reaction.');

    };

});

// * Login *
client.login(process.env.DISCORD_TOKEN);
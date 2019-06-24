const Discord = require('discord.js');
const client = new Discord.Client();
var token = require("./donotopen/tokens.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

});

client.login(token.token);
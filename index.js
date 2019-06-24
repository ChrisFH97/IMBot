const Discord = require('discord.js');
const funcs = require("./funcs.js");
const client = new Discord.Client();

var token = require("./donotopen/tokens.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {

    if(msg.author.bot) return;

    if(msg.content.toLowerCase().includes("imbot")){

        funcs.listen(msg,client);
    
    
      }


});

client.login(token.token);
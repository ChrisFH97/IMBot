const Discord = require('discord.js');
const funcs = require("./funcs.js");
const client = new Discord.Client();

var token = require("./donotopen/tokens.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(funcs.appendUserInfo, 300000);
});

client.on('message', msg => {
    funcs.recordUserInfo(msg);

    if (msg.author.bot) return;

    funcs.isTimedout(msg)

    if (msg.content.toLowerCase().includes("imbot")) {

        funcs.listen(msg, client);


    }


});

client.login(token.token);
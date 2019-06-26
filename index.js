/*
$$$$$$$\  $$\                                               $$\       $$\   $$\                     $$\             $$\      $$\                     $$\       
$$  __$$\ \__|                                              $$ |      $$ |  $$ |                    $$ |            $$ | $\  $$ |                    $$ |      
$$ |  $$ |$$\  $$$$$$$\  $$$$$$$\  $$$$$$\   $$$$$$\   $$$$$$$ |      $$ |  $$ | $$$$$$\   $$$$$$$\ $$ |  $$\       $$ |$$$\ $$ | $$$$$$\   $$$$$$\  $$ |  $$\ 
$$ |  $$ |$$ |$$  _____|$$  _____|$$  __$$\ $$  __$$\ $$  __$$ |      $$$$$$$$ | \____$$\ $$  _____|$$ | $$  |      $$ $$ $$\$$ |$$  __$$\ $$  __$$\ $$ | $$  |
$$ |  $$ |$$ |\$$$$$$\  $$ /      $$ /  $$ |$$ |  \__|$$ /  $$ |      $$  __$$ | $$$$$$$ |$$ /      $$$$$$  /       $$$$  _$$$$ |$$$$$$$$ |$$$$$$$$ |$$$$$$  / 
$$ |  $$ |$$ | \____$$\ $$ |      $$ |  $$ |$$ |      $$ |  $$ |      $$ |  $$ |$$  __$$ |$$ |      $$  _$$<        $$$  / \$$$ |$$   ____|$$   ____|$$  _$$<  
$$$$$$$  |$$ |$$$$$$$  |\$$$$$$$\ \$$$$$$  |$$ |      \$$$$$$$ |      $$ |  $$ |\$$$$$$$ |\$$$$$$$\ $$ | \$$\       $$  /   \$$ |\$$$$$$$\ \$$$$$$$\ $$ | \$$\ 
\_______/ \__|\_______/  \_______| \______/ \__|       \_______|      \__|  \__| \_______| \_______|\__|  \__|      \__/     \__| \_______| \_______|\__|  \__|     

Developed by:
CHAIG200 (ChrisFH#1769)
Gisgar3 (Gisgar3#3047)
*/

const Discord = require('discord.js');
const funcs = require("./funcs.js");
const client = new Discord.Client();

var token = require("./donotopen/tokens.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(funcs.appendUserInfo, 300000);
});

client.on('message', msg => {
    if (msg.author.bot) return;

    funcs.recordUserInfo(msg);
    funcs.isTimedout(msg)

    if (msg.content.toLowerCase().includes("imbot")) {
        funcs.listen(msg, client);
    }


});

client.login(token.token);
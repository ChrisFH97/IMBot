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
const {Translate} = require('@google-cloud/translate');
const readline = require("readline");

var token = require("./donotopen/tokens.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    setInterval(funcs.appendUserInfo, 300000);
});

client.on('message', msg => {
    if (msg.author.bot) return;
    funcs.recordUserInfo(msg);
    funcs.isTimedout(msg)
    funcs.detectLanguage(msg);

    if (msg.content.toLowerCase().includes("imbot")) {
        funcs.listen(msg, client);
    }

});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on("line", function (input) {
    if (input.startsWith("/imbot ")) {
        var result = input.slice(7);
        if (result == "fetchUserData") {
            for (const data of funcs.userinfostack) {
                console.log(`USER: ${data.name} || USER-ID: ${data.id} || MESSAGE: ${data.msg} || MESSAGE-ID: ${data.msgId} || CREATED-AT: ${data.createdAt}`);
            }
        }
    }
});



client.login(token.token);
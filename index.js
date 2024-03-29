/*
$$$$$$$\  $$\                                               $$\       $$\   $$\                     $$\             $$\      $$\                     $$\       
$$  __$$\ \__|                                              $$ |      $$ |  $$ |                    $$ |            $$ | $\  $$ |                    $$ |      
$$ |  $$ |$$\  $$$$$$$\  $$$$$$$\  $$$$$$\   $$$$$$\   $$$$$$$ |      $$ |  $$ | $$$$$$\   $$$$$$$\ $$ |  $$\       $$ |$$$\ $$ | $$$$$$\   $$$$$$\  $$ |  $$\ 
$$ |  $$ |$$ |$$  _____|$$  _____|$$  __$$\ $$  __$$\ $$  __$$ |      $$$$$$$$ | \____$$\ $$  _____|$$ | $$  |      $$ $$ $$\$$ |$$  __$$\ $$  __$$\ $$ | $$  |
$$ |  $$ |$$ |\$$$$$$\  $$ /      $$ /  $$ |$$ |  \__|$$ /  $$ |      $$  __$$ | $$$$$$$ |$$ /      $$$$$$  /       $$$$  _$$$$ |$$$$$$$$ |$$$$$$$$ |$$$$$$  / 
$$ |  $$ |$$ | \____$$\ $$ |      $$ |  $$ |$$ |      $$ |  $$ |      $$ |  $$ |$$  __$$ |$$ |      $$  _$$<        $$$  / \$$$ |$$   ____|$$   ____|$$  _$$<  
$$$$$$$  |$$ |$$$$$$$  |\$$$$$$$\ \$$$$$$  |$$ |      \$$$$$$$ |      $$ |  $$ |\$$$$$$$ |\$$$$$$$\ $$ | \$$\       $$  /   \$$ |\$$$$$$$\ \$$$$$$$\ $$ | \$$\ 
\_______/ \__|\_______/  \_______| \______/ \__|       \_______|      \__|  \__| \_______| \_______|\__|  \__|      \__/     \__| \_______| \_______|\__|  \__|     

 $$$$$$\  $$\   $$\       $$\  $$$$$$\   $$$$$$\        $$\   $$\    $$$$$$\  
$$  __$$\ $$ |  $$ |     $$  |$$$ __$$\ $$  __$$\      $$  |$$$$ |  $$  __$$\ 
\__/  $$ |$$ |  $$ |    $$  / $$$$\ $$ |$$ /  \__|    $$  / \_$$ |  $$ /  $$ |
 $$$$$$  |$$$$$$$$ |   $$  /  $$\$$\$$ |$$$$$$$\     $$  /    $$ |  \$$$$$$$ |
$$  ____/ \_____$$ |  $$  /   $$ \$$$$ |$$  __$$\   $$  /     $$ |   \____$$ |
$$ |            $$ | $$  /    $$ |\$$$ |$$ /  $$ | $$  /      $$ |  $$\   $$ |
$$$$$$$$\       $$ |$$  /     \$$$$$$  / $$$$$$  |$$  /     $$$$$$\ \$$$$$$  |
\________|      \__|\__/       \______/  \______/ \__/      \______| \______/ 

Developed by:
CHAIG200 (ChrisFH#1769)
Gavin Isgar (Gisgar3#3047)
*/

const Discord = require('discord.js');
const funcs = require("./funcs.js");
const client = new Discord.Client();
const regex = require("./regex.js");
const readline = require("readline");
const fs = require('fs');
var token = require("./donotopen/tokens.json");
var config = require("./config.json");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    //Stores the users messages every 5 minutes will be used for future features.
    setInterval(funcs.appendUserInfo, 300000);

});

//Checks if the user is timedout, if the bot is called with a specific action and also if features such as the nsfw filer
//has been activated.
client.on('message', msg => {
    if (msg.author.bot) return;

    funcs.recordUserInfo(msg);
    var timedout = funcs.isTimedout(msg);

    if (msg.content.toLowerCase().includes("imbot")) {
        funcs.listen(msg, client, config);
    }


    // Section below checks all urls that point directly towards an image and uses a free NSFW Detection API for checking for NSFW content inside an image.
    if (config["NSFW Filter"] == true) {
        var regexp = new RegExp(regex.templates.url[0], 'gi');
        var images = msg.content.match(regexp);
        if (images != null) {

            images.forEach(function (url) {
                if (funcs.isNSFW(url, (function (nsfw) {
                    if (nsfw == true) {
                        msg.channel.send(msg.author + ", You are not allowed to post NSFW Content");
                        msg.delete().then(msg => console.log(`Deleted message from ${msg.author.username} fro NSFW Content`)).catch(console.error);
                    } else {
                        if (timedout == false) {
                            funcs.detectLanguage(msg);
                        }
                    }
                }))) { }
            });
        } else {
            if (timedout == false) {
                funcs.detectLanguage(msg);
            }
        }
    } else {
        if (timedout == false) {
            funcs.detectLanguage(msg);
        }

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


//Client login.
client.login(token.token);
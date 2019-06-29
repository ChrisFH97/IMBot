const Discord = require('discord.js');
const regex = require("./regex.js");
const intents = require("./intents.json");
const config = require("./config.json");
const fs = require('fs');
var request = require("request");

var userinfostack = [];
var userinfoattachmentstack = [];
var configFile;

module.exports = {

    listen: function (msg, client, configF) {
        configFile = configF;
        var arr = (intents.intents);
        var count = 0;
        arr.forEach(function (intent) {
            var word = intent.Word;
            if (msg.content.toLowerCase().includes(word)) {
                count++;
            }
        });

        if(count > 1){
            msg.channel.send(msg.author + ", Please only use single intent per message.")
        }else if(count == 1){
            arr.forEach(function (intent) {
                var word = intent.Word;
                if (msg.content.toLowerCase().includes(word)) {
                    switch (word) {
                        case "ban":
                            if(hasPermission(msg.member,"BAN_MEMBERS")){
                                banUser(word, msg, client);
                            }
                            break;
    
                        case "kick":
                            if(hasPermission(msg.member,"KICK_MEMBERS")){
                                kickUser(word, msg, client);
                            }
                            break;
    
                        case "timeout":
                        
                            if(hasPermission(msg.member,"MANAGE_MESSAGES")){
                                timeoutUser(word, msg, client);
                            }
                            break;
    
                        case "enable" || "activate":
                            if(hasPermission(msg.member,"ADMINISTRATOR")){
                                var type = true;
                                featureToggle(msg, type);
                            }
                            break;
    
                        case "disable" || "deactivate":
                            
                            if(hasPermission(msg.member,"ADMINISTRATOR")){
                                var type = false;
                                featureToggle(msg, type);
                            }
                            break;
    
                        case "turn":
                            if(hasPermission(msg.member,"ADMINISTRATOR")){
                                featureToggle(msg, null);
                            }
                            break;
    
                        case "purge":
                            if(hasPermission(msg.member,"MANAGE_MESSAGES")){
                                purgeChannel(msg, client);
                            }
                            break;

                        case "role":
                            if(hasPermission(msg.member,"MANAGE_ROLES")){
                                roleAlteration(msg, client);
                            }
                            break;
                    }
                }
            });
        }

    },
    recordUserInfo: function (msg) {
        if (msg.attachments.size > 0) {
            for (const value of msg.attachments.array().values()) {
                userinfoattachmentstack.push({ attachments: [{ filename: value.filename, url: value.url }] });
            }
            userinfostack.push({ name: msg.author.username,channel: msg.channel.id, id: msg.author.id, msg: msg.content, msgattachments: userinfoattachmentstack, msgId: msg.id, createdAt: msg.createdAt });
            userinfoattachmentstack = [];
        }
        else {
            userinfostack.push({ name: msg.author.username, channel: msg.channel.id, id: msg.author.id, msg: msg.content, msgId: msg.id, createdAt: msg.createdAt });
        }
    },
    appendUserInfo: function () {
        try {
            fs.writeFileSync("./userdatastack.json", JSON.stringify(userinfostack), { encoding: "utf8" });
        }
        catch (error) {
            console.log(error);
        }
    },
    isTimedout: function (msg) {
        var isTimedout = false;
        var filedata = fs.readFileSync('./timeouts.json', { encoding: 'utf8' });
        var timeouts = JSON.parse(filedata);
        timeouts["active"].forEach(function (obj) {
            if (obj.id == msg.author.id) {
                var timeEnd = new Date(obj.end);
                var now = new Date();
                isTimedout = true;
                if (now.valueOf() > timeEnd.valueOf()) {
                    timeouts["active"].splice(obj, 1);

                    fs.writeFileSync('./timeouts.json', JSON.stringify(timeouts), 'utf8', function (err) {
                        if (err) throw err;
                    });
                } else {

                    msg.delete();
                }

            }
        });
        return isTimedout;
    },
    detectLanguage: function (msg) {
        var filedata = fs.readFileSync('./config.json', { encoding: 'utf8' });
        var config = JSON.parse(filedata);

        if (config["Translation"] == true) {
            var original = msg.content;
            var options = {
                method: 'GET',
                url: 'https://translate.yandex.net/api/v1.5/tr.json/detect',
                qs:
                {
                    key: 'trnsl.1.1.20190626T023402Z.aec9c733ab816267.ead2c2e94b6b8e1dfe3057775ce1613d21a92e38',
                    text: original
                }
            };

            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                var obj = JSON.parse(body);
                if (obj.lang != "en" && obj.lang != "") {
                    getTranslatedText(msg, (function (text) {
                        msg.channel.send(translateEmbed(msg, text));
                        msg.delete();
                    }));
                }
            });
        }
    },
    isNSFW: function (url, callback) {
        var nsfw = false;

        var options = { method: 'GET', url: 'https://api.uploadfilter.io/v1/nudity', qs: { apikey: 'f7827a90-9604-11e9-a4fd-d54073694519', url: url }, headers: { 'cache-control': 'no-cache', Host: 'api.uploadfilter.io', Accept: '*/*' } };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);

            if (response.statusCode == 200) {
                var obj = JSON.parse(body);
                if (obj.result.classification == "not safe" || obj.result.classification == "propably not safe") {
                    nsfw = true;
                    callback(nsfw)
                } else {

                    callback(nsfw)
                }
            }
        });
    },statSlowmode : function(){
        statSlowmode();
    },
    userinfostack
}

function banUser(word, msg, client) {

    var ids = msg.mentions.users; 
    var bans = [];
    var splitter;
    if (ids != null) {

        ids.forEach(function(user){
            if (user.id != "592783579998584868") {
                var member = msg.guild.members.get(user.id);
                bans.push(member.toString());
                if (msg.content.toLowerCase().includes("for") || msg.content.toLowerCase().includes("because")) {
                     splitter = msg.content.toLowerCase().includes("for") ? "for" : "because";
                    //    member.ban({ reason: msg.content.slice(msg.content.indexOf("for"), msg.content.length)}).then(() => console.log(`Banned ${member.toString()}`)).catch(console.error);
                    member.send("You have been banned from **" + client.guilds.get(msg.guild.id).name + "** " + msg.content.toLowerCase().slice(msg.content.toLowerCase.indexOf(splitter), msg.content.length) + ".");
                } else {
                    //    member.ban().then(() => console.log(`Banned ${member.toString()}`)).catch(console.error);
                    member.send("You have been banned from **" + client.guilds.get(msg.guild.id).name + "**.");
                }
               
         }
        });



        setTimeout(function () {
            bans = bans.toString().replace(/,/g, ' & ');
            if (msg.content.toLowerCase().includes("for") || msg.content.toLowerCase().includes("because")) {
                var splitter = msg.content.toLowerCase().includes("for") ? "for" : "because";
                msg.channel.send("Hello " + msg.author + ", I see you wish to " + word + " " + bans.toString() + ", they are now banned :wave: :point_right:.\n**Reason**: *" + msg.content.toLowerCase().slice(msg.content.indexOf(splitter), msg.content.length) + "*");
            } else {
                msg.channel.send("Hello " + msg.author + ", I see you wish to " + word + " " + bans.toString() + ", they are now banned :wave: :point_right:.");
            }


        }, 75);

    }

}

function kickUser(word, msg, client) {


    var ids = msg.mentions.users; 
    var splitter;
    var kicks = [];

    if (ids != null) {

        ids.forEach(function(user){
            if (user.id != "592783579998584868") {

                var member = msg.guild.members.get(user.id);
                kicks.push(member.toString());
                if (msg.content.toLowerCase().includes("for") || msg.content.toLowerCase().includes("because")) {
                     splitter = msg.content.toLowerCase().includes("for") ? "for" : "because";
                    //    member.ban({ reason: msg.content.slice(msg.content.toLowerCase().indexOf(splitter), msg.content.length)}).then(() => console.log(`Banned ${member.toString()}`)).catch(console.error);
                    member.send("You have been kicked from **" + client.guilds.get(msg.guild.id).name + "** " + msg.content.toLowerCase().slice(msg.content.indexOf(splitter), msg.content.length) + "");
                } else {
                    //    member.ban().then(() => console.log(`Banned ${member.toString()}`)).catch(console.error);
                    member.send("You have been kicked from **" + client.guilds.get(msg.guild.id).name + "**." );
                }

            }
        });



        setTimeout(function () {
            kicks = kicks.toString().replace(/,/g, ' & ');
            if (msg.content.toLowerCase().includes(splitter)) {
                msg.channel.send("Hello " + msg.author + ", I see you wish to " + word + " " + kicks.toString() + ", they are now kicked :wave: :point_right:.\n**Reason**: *" + msg.content.slice(msg.content.toLowerCase().indexOf(splitter), msg.content.length) + "*");
            } else {
                msg.channel.send("Hello " + msg.author + ", I see you wish to " + word + " " + kicks.toString() + ", they are now kicked :wave: :point_right:.");
            }


        }, 75);

    }

}

function timeoutUser(word, msg, client) {
    var timer = {
        days: [],
        hours: [],
        mintues: [],
        seconds: []
    };

    var ids = msg.mentions.users; 

    var timeouts = [];

    var end = "";

    if (ids != null) {

        var timeRegs = regex.templates.time;
        
        timeRegs.forEach(function (reg) {
            var regexp = new RegExp(reg, 'gi');
            var times = msg.content.toLowerCase().match(regexp);
            if (times != null) {
                times.forEach(function (time) {
                    if (time.includes("h")) {
                        timer.hours.push(time);
                    } else if (time.includes("m")) {
                        timer.mintues.push(time);
                    } else if (time.includes("d") && reg == "/\\d+\\s*d[a]?[y]?[s]?/gi") {
                        timer.days.push(time);
                    } else {
                        timer.seconds.push(time);
                    }

                })
            }
        });

        ids.forEach(function(user){
            if (user.id != "592783579998584868") {
                if(isTimedout(user.id) == false){
                    end = calculateTimeoutEnd(user.id, timer);
                    if (end != 0) {
                        var member = msg.guild.members.get(user.id);
                        timeouts.push(member.toString());
                        member.send("You have been timed out from **" + client.guilds.get(msg.guild.id).name + "**, you will be able to chat again in **" + end + "**");
                    }
                }
            }
        });
        if (end != 0) {
            timeouts = timeouts.toString().replace(/,/g, ' & ');
            msg.channel.send("Hello " + msg.author + ", I see you wish to timeout " + timeouts.toString() + ", their timeout will end in **" + end + "**");
        } else {
            msg.channel.send("Hello " + msg.author + ", It appears you have entered an invalid length of time.");
        }

    }

}

function calculateTimeoutEnd(did, times) {
    var now = new Date();
    var duc = 0;
    var huc = 0;
    var muc = 0;
    var suc = 0;
    var d = times.days.length;
    var h = times.hours.length;
    var m = times.mintues.length;
    var s = times.seconds.length;

    if (d != 0) {
        times.days.forEach(function (days) {
            duc = duc + parseInt(days.replace(/\D/g, ''));
        });
    }

    if (h != 0) {
        times.hours.forEach(function (hours) {
            huc = huc + parseInt(hours.replace(/\D/g, ''));
        });
    }

    if (m != 0) {
        times.mintues.forEach(function (minutes) {
            muc = muc + parseInt(minutes.replace(/\D/g, ''));
        });
    }

    if (s != 0) {
        times.seconds.forEach(function (seconds) {
            suc = suc + parseInt(seconds.replace(/\D/g, ''));
        });
    }

    var timeEnd = new Date(now.getTime() + 0 + 1000 * (suc + 60 * (muc + 60 * (huc + 24 * duc))));

    var newDate = new Date(timeEnd);
    var timeDiff = MtoHMS(parseInt(newDate.valueOf() - now.valueOf()));

    if (timeDiff == "") {
        timeDiff = 0;
    } else {
        var timeouts = JSON.parse(fs.readFileSync('timeouts.json'));
        timeouts.active.push({ id: did, end: newDate });
        var newTimeouts = JSON.stringify(timeouts);

        fs.writeFile('timeouts.json', newTimeouts, 'utf8', function (err) {
            if (err) throw err;
        });
    }

    return timeDiff;
}

function MtoHMS(time) {
    var ms = time % 1000;
    time = (time - ms) / 1000;
    var seconds = time % 60;
    time = (time - seconds) / 60;
    var minutes = time % 60;
    var hours = (time - minutes) / 60;
    var days = Math.floor(hours / 24);
    var x = Math.floor(hours / 24);
    hours = hours - (x * 24);

    var time = "";
    if ((days >= 1) == true) {
        time = time + days + " Days ";
    }
    if ((hours >= 1) == true) {
        time = time + hours + " Hours ";
    }
    if ((minutes >= 1) == true) {
        time = time + minutes + " Minutes ";
    }
    if ((seconds >= 1) == true) {
        time = time + seconds + " Seconds";
    }

    return time;
}

function getTranslatedText(msg, callback) {
    var translated;

    if (msg.content == "" && msg.attachments.size > 0) {
        return;
    }
    else {
        var options = {
            method: 'GET',
            url: 'https://translate.yandex.net/api/v1.5/tr.json/translate',
            qs:
            {
                key: 'trnsl.1.1.20190626T023402Z.aec9c733ab816267.ead2c2e94b6b8e1dfe3057775ce1613d21a92e38',
                lang: config.lang,
                text: msg.content
            }
        };

        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            var obj = JSON.parse(body);
            callback(obj.text[0]);
        });
    }
}

function translateEmbed(msg, translation) {
    const embed = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setAuthor('IMBot Translator', 'https://raw.githubusercontent.com/CHAIG200/DHWeekBot/master/assets/IMBOTLOGO1-TILE.png?token=AF4X5G3NQWKGZFMT3X5ZT5K5D2MRM', 'https://github.com/CHAIG200/DHWeekBot')
        .setThumbnail('https://raw.githubusercontent.com/CHAIG200/DHWeekBot/master/assets/IMBOTLOGO1-BADGE-SMALL.png?token=AF4X5G6ZFAJJITL7RX43CNC5D2MUG')
        .addField('Original Author: ', msg.author)
        .addField('Original Text: ', msg.content)
        .addField('Translated Text: ', translation)
        .setTimestamp()
        .setFooter('IMBot Translation', 'https://raw.githubusercontent.com/CHAIG200/DHWeekBot/master/assets/IMBOTLOGO1-TILE.png?token=AF4X5G3NQWKGZFMT3X5ZT5K5D2MRM');
    return embed;
}

function featureToggle(msg, toggleType) {
    
    var types = ["translation", "nsfw", "cooldown", "blacklisting"]

    if (msg.content.toLowerCase().includes(" off ")) {
        toggleType = false;
    } else if (msg.content.toLowerCase().includes(" on ")) {
        toggleType = true;
    } else if (msg.content.toLowerCase().includes(" off ") && msg.content.toLowerCase().includes(" on ")) {
        toggleType = null;
    }else{
        toggleType = toggleType;
    }

    if (toggleType == null) {
        msg.channel.send(msg.author + ", it appears you are trying to enabled and disable a feature at the same time.");
    } else {
        types.forEach(function (type) {
            if (msg.content.toLowerCase().includes(type)) {
                var state;
                if(toggleType){
                     state = "Enabled.";
                }else{
                     state = "Disabled.";
                }

                switch (type) {
                    case "translation":
                        configFile["Translation"] = toggleType;
                        msg.channel.send(msg.author + ",  the __Auto Translation__ feature has been " + state);
                        break;

                    case "nsfw":
                        configFile["NSFW Filter"] = toggleType;
                        msg.channel.send(msg.author + ",  the __NSFW Filter__ feature has been " + state);
                        break;

                    case "cooldown":
                        configFile["Statistical Slow-mode"] = toggleType;
                        msg.channel.send(msg.author + ",  the __Statistical Slow-Mode__ feature has been " + state);
                        break;

                    case "blacklisting":
                        configFile["Word Blacklisting"] = toggleType;
                        msg.channel.send(msg.author + ",  the __Word Blacklisting__ feature has been " + state);
                        break;
                }

                fs.writeFileSync('./config.json', JSON.stringify(configFile), { encoding: "utf8" }, function (err) {
                    if (err) throw err;
                });
            }
        });
    }
}

function purgeChannel(msg, client) {
    if (msg.mentions.channels.size > 0) {
        msg.mentions.channels.forEach((function(channel){
            var channelId = channel.id;
            client.guilds.get(msg.guild.id).channels.get(channelId).fetchMessages().then(messages => messages.array().forEach(message => {
                message.delete();
            }));
        }));
    }else if (msg.mentions.members.size > 0) {
        if (msg.mentions.members.array()[0].user.id == client.id) {
            if (msg.mentions.members.array()[1].exists()) {
                var userid = msg.mentions.members.array()[1].user.id;
                msg.channel.fetchMessages().then(messages => messages.array().forEach(message => {
                    if (message.author.id == userid) {
                        message.delete();
                    }
                }));
            }
        }else {
            var userid = msg.mentions.members.array()[0].user.id;
            msg.channel.fetchMessages().then(messages => messages.array().forEach(message => {
                if (message.author.id == userid) {
                    message.delete();
                }
            }));
        }
    }

    msg.channel.send(msg.author + ", Now purging");

}

function isTimedout(id){
    var isTimedout = false;
    var filedata = fs.readFileSync('./timeouts.json', { encoding: 'utf8' });
    var timeouts = JSON.parse(filedata);
    timeouts["active"].forEach(function (obj) {
        if (obj.id == id) {
            var timeEnd = new Date(obj.end);
            var now = new Date();
            isTimedout = true;
        }
    });
    return isTimedout;
}

function hasPermission(member,permission){
    return member.hasPermission(permission) ? true : false;
}

function roleAlteration(msg){

    var people = [];
    var type = "";
    var roleName = "";

    var userlist = msg.mentions.users; 
    userlist.forEach(function(user){
        if (user.id != "592783579998584868") {

            var member = msg.guild.members.get(user.id);
            people.push(member.toString());
            var hasRole = false;
            msg.guild.roles.find(role => {
                if(hasRole == false && msg.content.toLowerCase().includes(role.name.toLowerCase())){
                    hasRole = true;
                    roleName = role.name;
                    if(msg.content.toLowerCase().includes("give") || msg.content.toLowerCase().includes("assign") || msg.content.toLowerCase().includes("allocate")){
                        type = "given"
                        member.addRole(role).catch(console.error);
                    }else if(msg.content.toLowerCase().includes("remove") || msg.content.toLowerCase().includes("take")){
                        type = "removed"
                        member.removeRole(role).catch(console.error);
                    }
                }
            } );
        }
    });


    if(people.size != 0){
        people = people.toString().replace(/,/g, ' & ');
        if(type == "given"){
            msg.channel.send("The following user(s) " + people + " have been given the role of " + roleName + ".");
        }else if(type == "removed"){
            msg.channel.send("The following user(s) " + people + " no longer have the role " + roleName + ".");
        }
        
    }
}


const regex = require("./regex.js");
const intents = require("./intents.json");
const fs = require('fs');
var userinfostack = [];

module.exports = {

    listen: function (msg, client) {

        var arr = (intents.intents);
        arr.forEach(function (intent) {
            var word = intent.Word;
            if (msg.content.toLowerCase().includes(word)) {
                switch (word) {
                    case "ban":
                        banUser(word, msg, client);
                        break;

                    case "kick":
                        kickUser(word, msg, client);
                        break;

                    case "timeout":
                        timeoutUser(word, msg, client);
                        break;
                }
            }
        });
    },
    recordUserInfo: function (msg) {
        userinfostack.push({ name: msg.author.username, id: msg.author.id, msg: msg.content, msgId: msg.id, createdAt: msg.createdAt });
        console.log(userinfostack);
    },
    appendUserInfo: function () {
        try {
            fs.writeFileSync("./userdatastack.json", JSON.stringify(userinfostack), { encoding: "utf8" });
        }
        catch (error) {
            console.log(error);
        }
    }
}

function banUser(word, msg, client) {

    var regexp = new RegExp(regex.templates.discordID, '');
    var ids = msg.content.match(regexp);
    var bans = [];

    if (ids != null) {

        ids.forEach(function (id) {
            if (id != "592783579998584868") {
                client.fetchUser(id).then(user => {
                    var member = msg.guild.members.get(id);
                    bans.push(member.displayName);
                    if (msg.content.includes("for")) {
                        //    member.ban({ reason: msg.content.slice(msg.content.indexOf("for"), msg.content.length)}).then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                    } else {
                        //    member.ban().then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                    }

                    member.send("You have been banned from **" + client.guilds.get(msg.guild.id).name + "** " + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "");

                });
            }


        });


        setTimeout(function () {
            bans = bans.toString().replace(/,/g, ' & ');
            if (msg.content.includes("for")) {
                msg.channel.send("Hello " + msg.author + ", I see you wish to " + word + " " + bans.toString() + ", they are now banned :wave: :point_right:.\n**Reason**: *" + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "*");
            } else {
                msg.channel.send("Hello " + msg.author + ", I see you wish to " + word + " " + bans.toString() + ", they are now banned :wave: :point_right:.");
            }


        }, 75);

    }

}

function kickUser(word, msg, client) {

    var regexp = new RegExp(regex.templates.discordID, 'i');
    var ids = msg.content.match(regexp);
    var kicks = [];

    if (ids != null) {

        ids.forEach(function (id) {
            if (id != "592783579998584868") {
                client.fetchUser(id).then(user => {
                    var member = msg.guild.members.get(id);
                    kicks.push(member.displayName);
                    if (msg.content.includes("for")) {
                        //    member.ban({ reason: msg.content.slice(msg.content.indexOf("for"), msg.content.length)}).then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                    } else {
                        //    member.ban().then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                    }

                    member.send("You have been kicked from **" + client.guilds.get(msg.guild.id).name + "** " + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "");

                });
            }


        });


        setTimeout(function () {
            kicks = kicks.toString().replace(/,/g, ' & ');
            if (msg.content.includes("for")) {
                msg.channel.send("Hello " + msg.author + ", I see you wish to " + word + " " + kicks.toString() + ", they are now kicked :wave: :point_right:.\n**Reason**: *" + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "*");
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

    var timeRegs = regex.templates.time;
    var regexp = new RegExp(regex.templates.discordID, 'i');
    var ids = msg.content.match(regexp);
    var timeouts = [];

    var end = "";

    if (ids != null) {


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



        ids.forEach(function (id) {
            if (id != "592783579998584868") {
                end = calculateTimeoutEnd(id, timer);
                if (end != 0) {
                    var member = msg.guild.members.get(id);
                    timeouts.push(member.displayName);
                    member.send("You have been timed out from **" + client.guilds.get(msg.guild.id).name + "**, you will be able to chat again in **" + end + "**");
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

    if (m != 0) {
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
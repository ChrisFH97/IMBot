<img src="./assets/IMBOTLOGO1-WITHDESC.png"></img>

<p align="center"><a href="https://discordapp.com/api/oauth2/authorize?client_id=592783579998584868&permissions=8&scope=bot"><img src="./assets/IMBOTINVITE1.png"></img></a></p>

**IMBot** is a Discord server moderation bot that functions by detecting the intentions of a user using the bot. The developed intent-system is capable of comprehending commands in many different ways.
# Why rely on intention?
With an intent-system, users are not required to remember any specific syntax to allow the bot to function (**i.e.** a command prefix). For example, if a moderator on a server wants to ban a user, they can type:  
```
IMBot please ban ChrisFH#1769 for staff disrespect
```
or
```
IMBot can u plzzzz ban @Gisgar3#3047 for being a poopoo hed
```
Both solutions will equally work, as the intent-system was primarily developed to understand numerous forms of speech.
# What else can IMBot do?
**IMBot** comes with many extra *configurable* options, including the ability to record userdata (acquired through messages), NSFW-filtering, language translation and much more! As development continues, more features will be added for the overall user experience.
# Features w/ Examples
Since we do not have our Wiki page up with all documentation, we are displaying our feature list here and examples on how to use them:
## Ban Users
|Required Permission|
|:-----------------:|
|BAN_MEMBERS|
```
IMBot please ban @Gisgar3#3047 for being disrespectful towards users
```
## Kick Users
|Required Permission|
|:-----------------:|
|KICK_MEMBERS|
```
IMBot plzzzz kick @ChrisFH#1769 for beeeinggg a meanie
```
## Timeout Users
|Required Permission|
|:-----------------:|
|MANAGE_MESSAGES|
```
IMBot please timeout @ChrisFH#1769 for 20m
```
## Auto-Translation
**Can be enabled and will automatically translate them.**  

|Required Permission|
|:-----------------:|
|ADMINISTRATOR|
```
IMBot enable translation
me gusta beber la leche

// Will return a RichEmbed() with translation information
```
## Intent-System
**Bot is capable of comprehending numerous ways of speech to function as intended**
## Purge Channels/Users
**Can be used to remove mass amounts of messages from channels or users.**  

|Required Permission|
|:-----------------:|
|ADMINISTRATOR|
```
IMBot purge #general
IMBot purge @Gisgar3#3047
```
## Add/Remove Roles from Users
|Required Permission|
|:-----------------:|
|MANAGE_ROLES|
```
IMBot give @ChrisFH#1769 the Admin role
```

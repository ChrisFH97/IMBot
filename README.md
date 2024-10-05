<img src="./assets/IMBOTLOGO1-WITHDESC.png"></img>
**Bot is temporarily running on a Raspberry Pi board; NSFW Filtering and Translation may function slowly.**
<p align="center"><a href="https://discordapp.com/api/oauth2/authorize?client_id=592783579998584868&permissions=8&scope=bot"><img style="width:480px;" src="./assets/IMBOTINVITE1.png"></img></a></p>

**IMBot** is a Discord server moderation bot that functions by detecting the intentions of a user using the bot. The developed intent-system is capable of comprehending commands in many different ways.
# Why rely on intention?
With an intent-system, users are not required to remember any specific syntax to allow the bot to function (**i.e.** a command prefix). For example, if a moderator on a server wants to ban a user, they can type:  
```
IMBot please ban ChrisFH#1769 for staff disrespect
```
or
```
IMBot can u plzzzz ban @Gisgar3#3047 for being a pain
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
## Unban Users
|Required Permission|
|:-----------------:|
|BAN_MEMBERS|
```
IMBot please unban Gisgar3#3047
```
or 
```
IMBot unban the user known as Gisgar3#3047
```
## Kick Users
|Required Permission|
|:-----------------:|
|KICK_MEMBERS|
```
IMBot plzzzz kick @ChrisFH#1769 for beeeinggg a meanie
```
or
```
IMBot kick @ChrisFH#1769 because he is being mean
```
## Timeout Users
|Required Permission|
|:-----------------:|
|MANAGE_MESSAGES|
```
IMBot please timeout @ChrisFH#1769 for 20m
```
or 
```
IMBot timeout @ChrisFH#1769 for 5d 6hours 20mins 30seconds
```
## Auto-Translation
**Can be enabled and will automatically translate messages.**  

|Required Permission|
|:-----------------:|
|ADMINISTRATOR|
```
IMBot enable translation
me gusta beber la leche

// Will return a RichEmbed() with translation information
```
## Language Selection
|Required Permission|
|:-----------------:|
|BAN_MEMBERS|
```
IMBot set the servers language to english
```
or
```
IMBot set language to french
```
## Purge Channels/Users
**Can be used to remove mass amounts of messages from channels or users.**  

|Required Permission|
|:-----------------:|
|ADMINISTRATOR|
```
IMBot purge #general
IMBot purge @Gisgar3#3047
```
or 
```
IMBot Can you purge messages from #general
IMBot Please purge all messages from @Gisgar3#3047
```
## Add/Remove Roles from Users
|Required Permission|
|:-----------------:|
|MANAGE_ROLES|
```
IMBot give @ChrisFH#1769 the Admin role
```
or 
```
IMBot Can you assign @ChrisFH#1769 the Admin role please
```
## Intent-System
**Bot is capable of comprehending numerous ways of speech to function as intended**

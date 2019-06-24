
const regex = require("./regex.js");
const intents = require("./intents.json");

module.exports = {

    listen : function(msg,client){

        var arr = (intents.intents);
        arr.forEach(function(intent){
            var word = intent.Word;
            if(msg.content.toLowerCase().includes(word)){
                switch(word){
                    case "ban":
                        banUser(word,msg,client);
                    break;

                    case "kick":
                        kickUser(word,msg,client);
                    break;

                    case "timeout":
                        timeoutUser(word,msg,client);
                    break;
                }
            }
        });
    }
} 

function banUser(word,msg,client){

        var regexp = new RegExp( regex.templates.discordID, ''); 
        var ids = msg.content.match(regexp);
        var bans = [];

        if(ids != null){
      
         ids.forEach(function(id){
             if(id != "592783579998584868"){
                 client.fetchUser(id).then(user => {
                     var member =  msg.guild.members.get(id);
                     bans.push(member.displayName);
                     if(msg.content.includes("for")){
                  //    member.ban({ reason: msg.content.slice(msg.content.indexOf("for"), msg.content.length)}).then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                     }else{
                  //    member.ban().then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                     }   

                     member.send("You have been banned from **" + client.guilds.get(msg.guild.id).name + "** " + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "");
                    
                  });
             }

             
         });
        

         setTimeout(function(){
             bans = bans.toString().replace(/,/g, ' & ');
             if(msg.content.includes("for")){
                 msg.channel.send("Hello " + msg.author + ", I see you wish to "+ word + " " + bans.toString() + ", they are now banned :wave: :point_right:.\n**Reason**: *" + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "*");  
             }else{
                 msg.channel.send("Hello " + msg.author + ", I see you wish to "+ word + " " + bans.toString() + ", they are now banned :wave: :point_right:.");
             }

           
         },75);
                       
        }                
     
}

function kickUser(word,msg,client){

    var regexp = new RegExp( regex.templates.discordID, 'i'); 
    var ids = msg.content.match(regexp);
    var kicks = [];

    if(ids != null){
  
     ids.forEach(function(id){
         if(id != "592783579998584868"){
             client.fetchUser(id).then(user => {
                 var member =  msg.guild.members.get(id);
                 kicks.push(member.displayName);
                 if(msg.content.includes("for")){
              //    member.ban({ reason: msg.content.slice(msg.content.indexOf("for"), msg.content.length)}).then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                 }else{
              //    member.ban().then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                 }   

                 member.send("You have been kicked from **" + client.guilds.get(msg.guild.id).name + "** " + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "");
                
              });
         }

         
     });
    

     setTimeout(function(){
        kicks = kicks.toString().replace(/,/g, ' & ');
         if(msg.content.includes("for")){
             msg.channel.send("Hello " + msg.author + ", I see you wish to "+ word + " " + kicks.toString() + ", they are now kicked :wave: :point_right:.\n**Reason**: *" + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "*");  
         }else{
             msg.channel.send("Hello " + msg.author + ", I see you wish to "+ word + " " + kicks.toString() + ", they are now kicked :wave: :point_right:.");
         }

       
     },75);
                   
    }                
 
}

function timeoutUser(word,msg,client){
                    
    var regexp = new RegExp( regex.templates.discordID, ''); 
    var ids = msg.content.match(regexp);
    var timeouts = [];

    if(ids != null){
  
     ids.forEach(function(id){
         if(id != "592783579998584868"){
             client.fetchUser(id).then(user => {
                 var member =  msg.guild.members.get(id);
                 timeouts.push(member.displayName);
                 if(msg.content.includes("for")){
              //    member.ban({ reason: msg.content.slice(msg.content.indexOf("for"), msg.content.length)}).then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                 }else{
              //    member.ban().then(() => console.log(`Banned ${member.displayName}`)).catch(console.error);
                 }   

                 member.send("You have been kicked from **" + client.guilds.get(msg.guild.id).name + "** " + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "");
                
              });
         }

         
     });
    

     setTimeout(function(){
        timeouts = timeouts.toString().replace(/,/g, ' & ');
         if(msg.content.includes("for")){
             msg.channel.send("Hello " + msg.author + ", I see you wish to "+ word + " " + timeouts.toString() + ", they are now kicked :wave: :point_right:.\n**Reason**: *" + msg.content.slice(msg.content.indexOf("for"), msg.content.length) + "*");  
         }else{
             msg.channel.send("Hello " + msg.author + ", I see you wish to "+ word + " " + timeouts.toString() + ", they are now kicked :wave: :point_right:.");
         }

       
     },75);
                   
    }                
 
}

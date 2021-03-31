const Discord = require("discord.js");
const { Structures } = require('discord.js');
const User = require ('../Clusters/Models/Users.js')

const client = new Discord.Client();


client.login('Nzk4MzIyMDA2ODQzMTk1NDQy.X_zVTg.FXSk0PiYIQUfylfHGQU8j8IQu64')

const config = require("../config.json");
const fs = require("fs");
const { readdirSync } = require("fs");
const { join } = require("path");
var userTickets = new Map()

client.on("ready", () => {
    let status = [
        {name: `Estou fazendo meu trabalho como deixar o website online 😪`, type: 'WATCHING'}
    ]
    function setStatus(){
        let randomStatus = status[Math.floor(Math.random()*status.length)]
        client.user.setPresence({activity: randomStatus})
    }
    setStatus();
    setInterval(() => setStatus(),20000)
    
});

  client.on("message", message => {
    if (message.author.bot) return;
    if (message.channel.type == "dm") return;
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;
    
    var comando = message.content.toLowerCase().split(" ")[0];
    comando = comando.slice(config.prefix.length);

    var args = message.content.split(" ").slice(1);
    try {
        var arquivoComando = require(`./commands/${comando}.js`)
        arquivoComando.run(client, message, args);
    } catch (erro) {
        if (erro.code == "MODULE_NOT_FOUND") return;
        console.log(erro);
    }

});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  
  let mention = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
  
  mention.find(mention => {
    if (message.content === mention) {
      
      const embed = new Discord.MessageEmbed()
        .setDescription(
          `<:DiscordBotList:803330704392847371> ${message.author} Seja bem vindo a Bots de Discord , você deve está perdido mais por sorte eu tenho um comando de ajuda, use ".ajuda" para receber a minha ajuda.`

        )
        .setColor("#2f3136")

      message.channel.send(embed);
    }
  });
})

client.on('guildMemberAdd', async (member) => {

    let servidor = client.guilds.cache.get("800505498926579772") 
    
    if(member.user.bot === true) {
        
        const embedwel = new Discord.MessageEmbed()
        
        .setTitle('**|**  Bots de Discord - Welcome')
        .setDescription(`**|** Olá ${member.user.tag} esperamos que execute muitos comandos na \` Bots de Discord \` !`)
        .setFooter(`Bots atuais: ${servidor.members.cache.filter(a => a.user.bot).size}`)
        
    return client.channels.cache.get('803705184642793532').send(member.user, embedwel)


    } else {
        
        const embed = new Discord.MessageEmbed()
        
        .setTitle('**|** Bots de Discord - Agradecimentos')
        .setDescription('**|** Obrigado por entrar na \` Bots de Discord \` !')
        .addField(`**|** Nosso WebSite`, `[ Bots de Discord - WebSite](https://botsdediscord.ml/)`)
        
        const embedwel = new Discord.MessageEmbed()
        
        .setTitle('**|** Bots de Discord - Welcome')
        .setDescription(`**|** ${member.user.tag} Obrigado por entrar na \` Bots de Discord \` !`)
        .addField(`**|** Nosso WebSite`, `[ Bots de Discord - WebSite](https://botsdediscord.ml/)`)
        
    return client.users.cache.get(member.user.id).send(embed), client.channels.cache.get('803705184642793532').send(member.user, embedwel)
        
    }

})
client.on('ready', async () => {
  
    console.log('Bot iniciado com sucesso !')

})
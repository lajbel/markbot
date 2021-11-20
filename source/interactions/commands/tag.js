import {getUser, sendInteractionResponse, SlashCommandInteraction, DiscordApplicationCommandOptionTypes, DiscordInteractionResponseTypes} from "../../deps.ts";
import Database from '@replit/database';

const db = new Database()

export default function tagCommand() {
	return {
		name: "tag",
		description: "View/edit/create tags",
		options: [
			{
				type: DiscordApplicationCommandOptionTypes.String,
				name: "name",
				description: "Tag you want to view/edit/create",
				required: true,
			},
      {
        type: DiscordApplicationCommandOptionTypes.String,
        name: "code",
        description: "If you want to edit/create then what to set to",
        required: false,
      }
		],
		exe: async (interaction: SlashCommandInteraction) => {
			let member = interaction.member.user;
      
      const tags = JSON.parse(await db.get('tags') || "{}")

      if (!tags[interaction.data.options[0].value.toLowerCase()]) {
        if (!interaction.data.options[1]) {
          return sendInteractionResponse(interaction.id, interaction.token, {
				    type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				    data: {content: `That tag doesn't exist, but you can create it with \`/tag name:${interaction.data.options[0].value} code:{response}\``, flags:64},
			    }); 
        }
        tags[interaction.data.options[0].value.toLowerCase()] = {
          owner: member.id,
          response: interaction.options[1].value
        }
        await db.set('tags', JSON.stringify(tags))
        return sendInteractionResponse(interaction.id, interaction.token, {
				  type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				  data: {content: `Created tag ${interaction.data.options[0].value}`},
			  });        
      } else if (tags[interaction.data.options[0].value.toLowerCase()]) {
        if (interaction.data.options[1]) {
          if (member.id == tags[interaction.data.options[0].value.toLowerCase()].owner) {
            tags[interaction.data.options[0].value.toLowerCase()] = {
              owner: member.id,
              response: interaction.options[1].value
            }
            await db.set('tags', JSON.stringify(tags))
            return sendInteractionResponse(interaction.id, interaction.token, {
				      type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
				      data: {content: `Edited tag ${interaction.data.options[0].value}`},
			      });                
          } else {
            return sendInteractionResponse(interaction.id, interaction.token, {
              type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
              data: {content: `You can't edit this tag as you aren't the owner.`, flags:64}
            })
          }
        } else {
          return sendInteractonResponse(interaction.id, interaction.token, {
            type: DiscordInteractionResponseTypes.ChannelMessageWithSource,
            data: {content: tags[interaction.data.options[0].value.toLowerCase()].response, allowed_mentions:{parse:[]}}
          })
        }
      }
		},
	};
}

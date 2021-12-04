import { sendInteractionResponse, Bot, DiscordenoInteraction, Embed, InteractionResponseTypes, } from "../deps/discordeno.ts";

export default () => {
	return {
		name: "tip",
		description: "Get a tip of the Kaboom World",
		options: [],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const tips = [
				{ t: "npm i kaboom@next", img: null },
			];

			const tip = tips[Math.floor(Math.random() * tips.length)];

			const embed: Embed = {
				color: 0xffe359,
				title: "TIP",
				description: tip.t,
			};

			if(tip.img) embed.image = { url: tip.img };
			
			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: { embeds: [ embed ] },
			});
		},
	};
}

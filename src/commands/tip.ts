import {
	Bot,
	DiscordenoInteraction,
	Embed,
	InteractionResponseTypes,
	sendInteractionResponse,
} from "../deps/discordeno.ts";

export default () => {
	return {
		name: "tip",
		description: "Get a tip of the Kaboom World",
		options: [],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const tips = [
				{ t: "npm i kaboom@next", img: null },
				{ t: "kaboom({\nburp: true})", img: null },
			];

			const tip = tips[Math.floor(Math.random() * tips.length)];

			const embed: Embed = {
				color: 0xffe359,
				title: "TIP",
				description: tip.t,
			};

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: { embeds: [embed] },
			});
		},
	};
};

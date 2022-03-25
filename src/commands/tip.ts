import {
	ApplicationCommandOptionTypes,
	Bot,
	DiscordenoInteraction,
	Embed,
	InteractionResponseTypes,
	sendInteractionResponse,
} from "../../deps.ts";

const tips = [
	{
		t: "`npm i kaboom@next` to install the latest dev release that comes with new features (might be unstable and contain breaking change!)",
	},
	{
		t: "```js\nkaboom({\n  burp: true,\n});```",
	},
	{
		t: "mention <@&901298683906240582> for get <#883782079802908772> about kaboom",
	},
	{
		t: "you can use these fonts in your kaboom game without import anything: `apl386`, `apl386o`, `sink`, `sinko`",
	},
	{
		t: "you can sell your Kaboom game thanks to the MIT License",
	},
];

export default () => {
	return {
		name: "tip",
		description: "get a tip about the Kaboom World",
		options: [
			{
				type: ApplicationCommandOptionTypes.Number,
				name: "number",
				description: `tip number - 1-${tips.length}`,
				required: false,
			},
		],
		exe: (bot: Bot, interaction: DiscordenoInteraction) => {
			const tip =
				tips[Number(interaction?.data?.options?.[0].value?.toString()) - 1] ||
				tips[Math.floor(Math.random() * tips.length)];

			const embed: Embed = {
				color: 0xffe359,
				title: "Kaboom TIP",
				description: tip.t,
			};

			sendInteractionResponse(bot, interaction.id, interaction.token, {
				type: InteractionResponseTypes.ChannelMessageWithSource,
				data: { embeds: [embed] },
			});
		},
	};
};

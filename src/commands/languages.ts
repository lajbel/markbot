import { MarkCommand } from "../types/command.ts";

const cmd: MarkCommand = {
	name: "languages",
	description: "get a language role",
	exe: (interaction) => {
		interaction.respond({
			embeds: [{
				color: 0xffe359,
				title: "Language Roles",
				fields: [{
          name: "[ENGLISH]"
          value: "Speak another language? Choose a language role and unlock a new part of the Kaboom Discord!"
        }, {
          name: "[ESPAÑOL]"
          value: "¿Habla otro idioma? ¡Elige un rol de idioma y desbloquea una nueva parte de Kaboom Discord!"
        }],
			}],
			components: [{
				type: "ACTION_ROW",
				components: [
					{
						type: "SELECT",
						customID: "get_role",
						options: [
							{
								label: "Spanish / Español",
								value: "901298683906240582",
								emoji: {
									name: "flag_es"
                },
							}
						],
					},
				],
			}],
			ephemeral: true,
		});
	},
};

export default cmd;

import { ApplicationCommandInteraction, ApplicationCommandPartial, MessageComponentInteraction } from "../deps.ts";

export interface MarkCommand extends ApplicationCommandPartial {
    exe: (
        interaction: ApplicationCommandInteraction,
    ) => void;
}

export interface MarkComponent {
    (interaction: MessageComponentInteraction): void;
}

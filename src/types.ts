import { ApplicationCommandInteraction, ApplicationCommandPartial, MessageComponentInteraction } from "harmony";

export interface Command extends ApplicationCommandPartial {
    exe: (interaction: ApplicationCommandInteraction) => void;
}

export interface Component {
    (interaction: MessageComponentInteraction): void;
}

import {
    ApplicationCommandInteraction,
    ApplicationCommandPartial,
    MessageComponentInteraction,
} from "@harmony/harmony";

export interface Command extends ApplicationCommandPartial {
    exe: (interaction: ApplicationCommandInteraction) => void;
}

export interface Component {
    (interaction: MessageComponentInteraction): void;
}

export type DocPiece = {
    title: string;
    description: string;
    exampleCode: string;
};

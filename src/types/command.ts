import { ApplicationCommandInteraction, ApplicationCommandPartial } from "../../deps.ts";

export interface MarkCommand extends ApplicationCommandPartial {
    exe: (
        interaction: ApplicationCommandInteraction,
    ) => void;
}

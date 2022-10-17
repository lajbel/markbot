import { MessageComponentInteraction } from "../../deps.ts";

export interface MarkComponent {
    (interaction: MessageComponentInteraction): void;
}

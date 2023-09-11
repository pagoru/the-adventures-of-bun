import { Color } from "libs/types";

export type TextComponent = {
  text: string;
  color?: Color | Color[];
  backgroundColor?: Color | Color[];
  backgroundPadding?: number;
};

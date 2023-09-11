import { keyboard } from "./keyboard";
import { cursor } from "./cursor";

export const io = (events) => {
  const _keyboard = keyboard();
  const _cursor = cursor(events);

  const load = async () => {
    _keyboard.load();
    _cursor.load();
  };

  return {
    load,
    keyboard: _keyboard,
    cursor: _cursor,
  };
};

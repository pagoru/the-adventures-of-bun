import { Event, NativeEvent } from "libs/enums";
import { Utils } from "utils";

const EVENT_MAP: [NativeEvent, Event][] = [
  [NativeEvent.KEYDOWN, Event.KEY_DOWN],
  [NativeEvent.KEYUP, Event.KEY_UP],
];

export const keyboard = () => {
  const load = () => {
    EVENT_MAP.forEach(([nativeEvent, event]) =>
      Utils.events.emitNativeEvent(nativeEvent, event)
    );
  };

  return {
    load,
  };
};

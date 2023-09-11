import { Event, NativeEvent } from "libs/enums";
import { System } from "system";

export const eventsUtils = () => {
  const emitNativeEvent = (nativeEvent: NativeEvent, event: Event) =>
    System.events.native.on(nativeEvent, (currentEvent) => {
      if (nativeEvent !== NativeEvent.WHEEL) currentEvent?.preventDefault();
      System.events.emit(event, currentEvent);
    });

  return {
    emitNativeEvent,
  };
};

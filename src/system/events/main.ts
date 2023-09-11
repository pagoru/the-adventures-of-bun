import { Event } from "libs/enums/event.enum";
import { native } from "system/events/native";

export const events = () => {
  const listenerCallbackRecord: Record<Event, Function[]> = {
    [Event.GAME_VIEW_RESIZE]: [],
    [Event.FPS]: [],
    [Event.KEY_UP]: [],
    [Event.KEY_DOWN]: [],
    [Event.LEFT_CLICK]: [],
    [Event.RIGHT_CLICK]: [],
    [Event.WHEEL]: [],
    [Event.MOUSE_DOWN]: [],
    [Event.MOUSE_MOVE]: [],
    [Event.MOUSE_UP]: [],
  };

  const _getInternalEventName = (event: Event): string => `__internal_${event}`;
  const emit = (event: Event, data?: any) => {
    window.dispatchEvent(
      new CustomEvent(_getInternalEventName(event), { detail: data }),
    );
  };
  const on = (event: Event, callback?: (data?: any) => void) => {
    const listenerCallback = ({ detail }: CustomEvent) => callback(detail);
    window.addEventListener(_getInternalEventName(event), listenerCallback);
    return listenerCallbackRecord[event].push(listenerCallback) - 1;
  };

  const remove = (event: Event, index: number) =>
    window.removeEventListener(
      _getInternalEventName(event),
      listenerCallbackRecord[event][index] as any,
    );

  return {
    emit,
    on,
    remove,
    native: native(),
  };
};

import { Event, NativeEvent } from "libs/enums";
import { Utils } from "utils";
import { Vector2d } from "libs/types";
import { System } from "system/main";

const EVENT_MAP: [NativeEvent, Event][] = [
  [NativeEvent.CLICK, Event.LEFT_CLICK],
  [NativeEvent.CONTEXT_MENU, Event.RIGHT_CLICK],
  [NativeEvent.WHEEL, Event.WHEEL],

  [NativeEvent.MOUSEDOWN, Event.MOUSE_DOWN],
  [NativeEvent.MOUSEMOVE, Event.MOUSE_MOVE],
  [NativeEvent.MOUSEUP, Event.MOUSE_UP],
];

export const cursor = (events) => {
  let cursorRelativePosition: Vector2d = {
    x: 0,
    y: 0,
  };
  const load = () => {
    EVENT_MAP.forEach(([nativeEvent, event]) =>
      Utils.events.emitNativeEvent(nativeEvent, event)
    );

    events.on(Event.MOUSE_MOVE, (mouseEvent: MouseEvent) => {
      const { clientX, clientY } = mouseEvent;
      const scale = System.render.getScale();
      const { width, height } = System.render.getBounds();

      const absolutePosition: Vector2d = {
        x: Math.round(clientX / scale),
        y: Math.round(clientY / scale),
      };

      cursorRelativePosition = {
        x: absolutePosition.x - width / 2,
        y: absolutePosition.y - height / 2,
      };
    });
  };

  const getRelativePosition = (): Vector2d => cursorRelativePosition;

  return {
    load,
    getRelativePosition,
  };
};

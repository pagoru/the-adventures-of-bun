import { NativeEvent } from "libs/enums/event.enum";

export const native = () => {
  const listenerNativeCallbackRecord: Record<NativeEvent, Function[]> = {
    [NativeEvent.RESIZE]: [],
    [NativeEvent.KEYDOWN]: [],
    [NativeEvent.KEYUP]: [],
    [NativeEvent.CLICK]: [],
    [NativeEvent.CONTEXT_MENU]: [],
    [NativeEvent.WHEEL]: [],
    [NativeEvent.MOUSEDOWN]: [],
    [NativeEvent.MOUSEMOVE]: [],
    [NativeEvent.MOUSEUP]: [],
  };

  const on = (event: NativeEvent, callback?: (data?: any) => void) => {
    window.addEventListener(event, callback);
    return listenerNativeCallbackRecord[event].push(callback) - 1;
  };

  const remove = (event: NativeEvent, index: number) =>
    window.removeEventListener(
      event,
      listenerNativeCallbackRecord[event][index] as any,
    );

  return {
    on,
    remove,
  };
};

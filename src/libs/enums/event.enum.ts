export enum Event {
  GAME_VIEW_RESIZE,
  FPS,

  KEY_DOWN,
  KEY_UP,

  LEFT_CLICK,
  RIGHT_CLICK,
  WHEEL,

  MOUSE_DOWN,
  MOUSE_MOVE,
  MOUSE_UP,
}

export enum NativeEvent {
  // canvas
  RESIZE = "resize",
  // keyboard
  KEYDOWN = "keydown",
  KEYUP = "keyup",
  // cursor
  CLICK = "click",
  CONTEXT_MENU = "contextmenu",
  WHEEL = "wheel",
  //
  MOUSEDOWN = "mousedown",
  MOUSEMOVE = "mousemove",
  MOUSEUP = "mouseup",
}

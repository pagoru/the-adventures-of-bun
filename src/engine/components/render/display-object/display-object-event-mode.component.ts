export type DisplayObjectEventModeComponent = {
  eventMode: DisplayObjectEventMode;
};

export enum DisplayObjectEventMode {
  /**
   * Ignores all interaction events, even on its children.
   * @deprecated Do not use!
   */
  NONE,
  /**
   * Does not emit events and ignores all hit testing on itself and
   * non-interactive children.
   * Interactive children will still emit events.
   */
  PASSIVE,
  /**
   * Does not emit events but is hit tested if parent is interactive.
   * Same as interactive = false in v7
   */
  AUTO,
  /**
   *  Emit events and is hit tested.
   *  Same as interaction = true in v7
   */
  STATIC,
  /**
   * Emits events and is hit tested but will also receive mock interaction events
   * fired from a ticker to allow for interaction when the mouse isn't moving
   */
  DYNAMIC,
}

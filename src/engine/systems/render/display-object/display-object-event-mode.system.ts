import { SystemFunction } from "libs/darker-engine";
import { Component, DisplayObjectEventMode, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectEventModeSystem: SystemFunction<
  Component
> = async () => {
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const displayObjectContainer = Utils.render.getContainer(entityId);

    const { eventMode } = entity.getComponent(
      Component.DISPLAY_OBJECT_EVENT_MODE,
    );

    displayObjectContainer.eventMode = DisplayObjectEventMode[eventMode]
      .toLowerCase();
  };

  const onUpdate = async (entityId: number, component: Component) => {
    if (component !== Component.DISPLAY_OBJECT_EVENT_MODE) return;
    await onAdd(entityId);
  };

  return {
    components: [Component.DISPLAY_OBJECT, Component.DISPLAY_OBJECT_EVENT_MODE],
    onAdd,
    onUpdate,
  };
};

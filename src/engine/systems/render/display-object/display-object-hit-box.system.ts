import { SystemFunction } from "libs/darker-engine";
import {
  Component,
  DisplayObjectEventMode,
  Engine,
  graphicsPolygonEntity,
} from "engine";
import { Utils } from "utils";

export const displayObjectHitBoxSystem: SystemFunction<
  Component
> = async () => {
  const graphicsIdEntityMap: Record<number, number> = {};
  const clickEventListenerEntityMap: Record<number, number> = {};

  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const {
      clickBoxPolygon = [],
      visualClickBox = false,
      removeCurrentSelections = true,
      repeatedClick = false,
      targetEntityId,
      pivot = { x: 0, y: 0 },
    } = entity.getComponent(Component.DISPLAY_OBJECT_CLICK_BOX);

    if (!clickBoxPolygon.length) return;

    const [graphics] = await Engine.addEntity(
      graphicsPolygonEntity({
        childOf: entityId,
        polygon: clickBoxPolygon,
        color: 0x0000ff,
      }),
    );

    await graphics.updateComponent(Component.DISPLAY_OBJECT_ALPHA, {
      alpha: visualClickBox ? 0.25 : 0,
    });

    await graphics.updateComponent(Component.DISPLAY_OBJECT_PIVOT, {
      vector2d: pivot,
    });

    const targetEntity = targetEntityId
      ? Engine.getEntity(targetEntityId)
      : entity;

    await graphics.updateComponent(Component.DISPLAY_OBJECT_EVENT_MODE, {
      eventMode: DisplayObjectEventMode.STATIC,
    });

    graphicsIdEntityMap[entityId] = graphics.id;
    //TODO Remove this event handler {onRemove}
    clickEventListenerEntityMap[entityId] = Utils.render.addEventListener(
      graphics.id,
      "click",
      async () => {
        if (removeCurrentSelections) {
          let entityList = Engine.getEntityListByComponents(
            Component.DISPLAY_OBJECT_SELECTED,
          );
          if (!repeatedClick) {
            entityList = entityList.filter(
              (entity) => entity.id !== targetEntity.id,
            );
          }
          await Promise.allSettled(
            entityList.map((currentEntity) =>
              currentEntity.removeComponent(Component.DISPLAY_OBJECT_SELECTED)
            ),
          );
        }
        if (
          repeatedClick ||
          !targetEntity.hasComponent(Component.DISPLAY_OBJECT_SELECTED)
        ) {
          await targetEntity.updateComponent(
            Component.DISPLAY_OBJECT_SELECTED,
            {
              datetime: Date.now(),
            },
          );
        }
      },
    );
  };

  const onRemove = async (entityId: number) => {
    Utils.render.removeEventListener(
      graphicsIdEntityMap[entityId],
      "click",
      clickEventListenerEntityMap[entityId],
    );

    delete graphicsIdEntityMap[entityId];
    delete clickEventListenerEntityMap[entityId];
  };

  return {
    components: [Component.DISPLAY_OBJECT, Component.DISPLAY_OBJECT_CLICK_BOX],
    onAdd,
    onRemove,
  };
};

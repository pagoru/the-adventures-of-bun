import { SystemFunction } from "libs/darker-engine";
import { Component, Engine, Entity, uiStageEntity } from "engine";
import { System } from "system";
import { TickerQueue } from "libs/enums";
import { Vector2d } from "libs/types";
import { Utils } from "utils";

export const uiChildOfSystem: SystemFunction<Component> = async () => {
  const components = [
    Component.DISPLAY_OBJECT,
    Component.UI,
    Component.UI_CHILD_OF,
  ];

  let tickerQueue: number;
  const entityVector2dMap: Record<number, Vector2d> = {};

  const onLoad = async () => {
    const [cameraEntity] = Engine.getEntityListByType(Entity.CAMERA);
    const [uiStage] = await Engine.addEntity(
      uiStageEntity({ childOf: cameraEntity.id }),
    );
    await uiStage.updateComponent(Component.DISPLAY_OBJECT_ZINDEX, {
      zIndex: 1,
    });

    tickerQueue = System.render.ticker.queue.add({
      type: TickerQueue.CUSTOM,
      func: () => {
        Engine.getEntityListByComponents(...components).forEach((entity) => {
          const { childOf } = entity.getComponent(Component.UI_CHILD_OF);
          const fatherEntity = Engine.getEntity(childOf);
          const { vector2d } = fatherEntity.getComponent(
            Component.DISPLAY_OBJECT_POSITION,
          );
          if (
            entityVector2dMap[entity.id] &&
            Utils.vector.isVector2dEqual(vector2d, entityVector2dMap[entity.id])
          ) {
            return false;
          }

          entityVector2dMap[entity.id] = vector2d;
          entity.updateComponent(Component.DISPLAY_OBJECT_POSITION, {
            vector2d,
          });
        });

        return false;
      },
    });
  };

  const onDestroy = async () => {
    System.render.ticker.queue.remove(tickerQueue);
  };

  const onRemove = async (entityId: number) => {
    delete entityVector2dMap[entityId];
  };

  return {
    components,
    onLoad,
    onDestroy,
    onRemove,
  };
};

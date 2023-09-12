import { SystemFunction } from "libs/darker-engine";
import {
  Component,
  DisplayObjectEventMode,
  Engine,
  Entity,
  graphicsPolygonEntity,
  stageEntity,
} from "engine";
import { System } from "system";

export const stageSystem: SystemFunction<Component> = async () => {
  const stageBackgroundIdMap: Record<number, number> = {};
  const _reDrawPolygon = async (entityId: number) => {
    const stage = Engine.getEntity(entityId);
    const stageBackground = Engine.getEntity(stageBackgroundIdMap[entityId]);

    const { vector2d } = stage.getComponent(Component.DISPLAY_OBJECT_POSITION);

    const { width, height } = System.render.getBounds();
    const scale = System.render.getScale();
    const midWidth = (width * scale) / 2;
    const midHeight = (height * scale) / 2;

    await stageBackground.updateComponent(Component.GRAPHICS_POLYGON, {
      polygon: [
        -midWidth,
        -midHeight,
        midWidth,
        -midHeight,
        midWidth,
        midHeight,
        -midWidth,
        midHeight,
      ],
    });
    await stageBackground.updateComponent(Component.DISPLAY_OBJECT_POSITION, {
      vector2d: {
        x: -vector2d.x,
        y: -vector2d.y,
      },
    });
  };

  const onLoad = async () => {
    const [cameraEntity] = Engine.getEntityListByType(Entity.CAMERA);
    await Engine.addEntity(stageEntity({ childOf: cameraEntity.id }));
  };

  const onAdd = async (entityId: number) => {
    const stage = Engine.getEntity(entityId);

    await stage.updateComponent(Component.DISPLAY_OBJECT_ZINDEX, {
      zIndex: 0,
    });

    const [stageBackground] = await Engine.addEntity(
      graphicsPolygonEntity({
        childOf: stage.id,
        polygon: [0, 0, 100, 0, 100, 100, 0, 100],
        color: 0x302c2e,
      }),
    );
    await stageBackground.updateComponent(Component.DISPLAY_OBJECT_ZINDEX, {
      zIndex: Number.MIN_SAFE_INTEGER,
    });
    stageBackgroundIdMap[entityId] = stageBackground.id;

    await _reDrawPolygon(entityId);

    await stageBackground.updateComponent(Component.DISPLAY_OBJECT_EVENT_MODE, {
      eventMode: DisplayObjectEventMode.STATIC,
    });
  };

  const onUpdate = async (entityId: number, component: Component) => {
    if (component === Component.DISPLAY_OBJECT_POSITION) {
      await _reDrawPolygon(entityId);
    }
  };

  return {
    components: [
      Component.STAGE,
      Component.DISPLAY_OBJECT,
      Component.DISPLAY_OBJECT_POSITION,
      Component.CONTAINER,
    ],
    onLoad,
    onAdd,
    onUpdate,
  };
};

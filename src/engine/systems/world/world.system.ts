import { SystemFunction } from "libs/darker-engine";
import { chunkEntity, Component, Engine, Entity, worldEntity } from "engine";

export const worldSystem: SystemFunction<Component> = async () => {
  const onLoad = async () => {
    const [stage] = Engine.getEntityListByType(Entity.STAGE);
    const { chunks } = await fetch("/assets/map/map.json").then((data) =>
      data.json()
    );

    await Engine.addEntity(worldEntity({
      childOf: stage.id,
      chunks,
    }));
  };
  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { chunks } = entity.getComponent(Component.WORLD);

    await Engine.addEntity(
      ...chunks.map((vector2d) => chunkEntity({ childOf: entityId, vector2d })),
    );
  };

  return {
    components: [
      Component.DISPLAY_OBJECT,
      Component.CONTAINER,

      Component.WORLD,
    ],
    onLoad,
    onAdd,
  };
};

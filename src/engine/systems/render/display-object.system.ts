import { SystemFunction } from "libs/darker-engine";
import { Component, Engine } from "engine";
import { Utils } from "utils";

export const displayObjectSystem: SystemFunction<Component> = async () => {
  /*
		Do not add {onLoad}!!! PLEASE, think please, think.
	 */
  const onUpdate = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { childOf } = entity.getComponent(Component.DISPLAY_OBJECT);

    const container = Utils.render.getContainer(entityId);

    // Change childOf
    const parentContainer = Utils.render.getContainer(childOf);
    if (parentContainer.children.indexOf(container) === -1) {
      parentContainer.addChild(container);
    }
  };

  const onRemove = async (entityId: number) => {
    await Promise.allSettled(
      Utils.engine
        .getChildEntities(entityId)
        .map(({ id }) => Engine.removeEntity(id)),
    );
    Utils.render.getContainer(entityId).destroy();
  };

  return {
    components: [Component.DISPLAY_OBJECT],
    onUpdate,
    onRemove,
  };
};

import { SystemFunction } from "libs/darker-engine";
import * as PIXI from "libs/pixi.mjs";
import { Utils } from "utils";
import { Component, Engine } from "engine";

export const particleContainerSystem: SystemFunction<Component> = async () => {
  const onAdd = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { childOf } = entity.getComponent(Component.DISPLAY_OBJECT);
    const { maxSize } = entity.getComponent(Component.PARTICLE_CONTAINER);

    const parentContainer = Utils.render.getContainer(childOf);

    const particleContainer = new PIXI.ParticleContainer(maxSize, {});
    particleContainer.name = Utils.render.getDisplayObjectName(id);

    parentContainer.addChild(particleContainer);
  };

  return {
    components: [Component.DISPLAY_OBJECT, Component.PARTICLE_CONTAINER],
    onAdd,
  };
};

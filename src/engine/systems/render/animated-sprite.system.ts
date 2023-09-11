import { SystemFunction } from "libs/darker-engine";
import * as PIXI from "libs/pixi.mjs";
import { Utils } from "utils";
import { AnimatedSpriteComponent, Component, Engine } from "engine";
import { System } from "system";
import { AnimationStatus, AnimationVelocity } from "libs/enums";

export const animatedSpriteSystem: SystemFunction<Component> = async () => {
  const entityAnimatedSpriteRecord: Record<string, AnimatedSpriteComponent> =
    {};

  const onAdd = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { childOf } = entity.getComponent(Component.DISPLAY_OBJECT);
    const { spritesheet, animation, animationSpeed, animationStatus } = entity
      .getComponent(Component.ANIMATED_SPRITE);

    entityAnimatedSpriteRecord[entityId] = {
      animation,
      spritesheet,
    };

    const parentContainer = Utils.render.getContainer(childOf);
    const { animations } = await System.render.spritesheet.get(spritesheet);

    const animatedSprite = new PIXI.AnimatedSprite(animations[animation]);
    animatedSprite.onComplete = () => {
      entity.updateComponent(Component.ANIMATED_SPRITE, {
        animationStatus: AnimationStatus.STOP,
      } as AnimatedSpriteComponent);
    };
    animatedSprite.name = Utils.render.getDisplayObjectName(entityId);

    onAddOrUpdate(animatedSprite, animationStatus, animationSpeed);

    parentContainer.addChild(animatedSprite);

    const { width, height } = animatedSprite.getBounds();
    await entity.updateComponent(Component.DISPLAY_OBJECT_BOUNDS, {
      bounds: {
        width,
        height,
      },
    });
  };

  const onUpdate = async (id: number) => {
    const entity = Engine.getEntity(id);
    const { spritesheet, animation, animationStatus, animationSpeed } = entity
      .getComponent(Component.ANIMATED_SPRITE);

    const { spritesheet: lastSpritesheetName, animation: lastAnimation } =
      entityAnimatedSpriteRecord[id];

    const animatedSprite = Utils.render.getContainer(id) as PIXI.AnimatedSprite;

    if (lastSpritesheetName !== spritesheet || lastAnimation !== animation) {
      const { animations } = await System.render.spritesheet.get(spritesheet);

      animatedSprite.textures = animations[animation];
    }

    onAddOrUpdate(animatedSprite, animationStatus, animationSpeed);

    entityAnimatedSpriteRecord[id] = {
      animation,
      spritesheet,
    };
  };

  const onAddOrUpdate = (
    animatedSprite: PIXI.AnimatedSprite,
    status?: AnimationStatus,
    animationSpeed?: AnimationVelocity,
  ) => {
    animatedSprite.loop = status === AnimationStatus.PLAY_IN_LOOP;

    if (
      status === AnimationStatus.PLAY ||
      status === AnimationStatus.PLAY_IN_LOOP
    ) {
      animatedSprite.play();
    }
    if (status === AnimationStatus.STOP) animatedSprite.stop();

    if (animationSpeed !== undefined) {
      animatedSprite.animationSpeed = animationSpeed;
    }
  };

  return {
    components: [Component.DISPLAY_OBJECT, Component.ANIMATED_SPRITE],
    onAdd,
    onUpdate,
  };
};

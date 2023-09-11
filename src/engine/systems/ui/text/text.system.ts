import { SystemFunction } from "libs/darker-engine";
import * as PIXI from "libs/pixi.mjs";
import { Component, Engine } from "engine";
import { Utils } from "utils";
import { System } from "system";
import { SpriteSheet } from "libs/enums";

export const textSystem: SystemFunction<Component> = async () => {
  //TODO Add cache to prevent destroying background every update.
  const onAddOrUpdate = async (entityId: number) => {
    const entity = Engine.getEntity(entityId);
    const { text, type, color, backgroundColor, backgroundPadding } = entity
      .getComponent(Component.TEXT);

    const spriteSheet = await System.render.spritesheet.get(SpriteSheet.FONT);
    const { height } = spriteSheet.textures[`${type}_a`];

    const splittedText = text.split("");

    const container = Utils.render.getContainer(entityId);

    if (backgroundColor) {
      const isBackgroundColorAnArray = Array.isArray(backgroundColor[0]);

      if (isBackgroundColorAnArray) {
        //TODO :D
        // splittedText.forEach((_, index) => {
        // 	const backgroundGraphics = new PIXI.Graphics();
        // 	backgroundGraphics.beginFill(backgroundColor[index][0]);
        // 	backgroundGraphics.drawPolygon([
        // 		index === 0 ? -backgroundPadding : 0,
        // 		-backgroundPadding,
        // 		//
        // 		size + (index === splittedText.length - 1 ? backgroundPadding : 0),
        // 		-backgroundPadding,
        // 		//
        // 		size + (index === splittedText.length - 1 ? backgroundPadding : 0),
        // 		size + backgroundPadding,
        // 		//
        // 		index === 0 ? -backgroundPadding : 0,
        // 		size + backgroundPadding,
        // 	]);
        // 	backgroundGraphics.endFill();
        // 	backgroundGraphics.alpha = backgroundColor[index][1];
        // 	backgroundGraphics.position.set(index * (size + 0), 0);
        // 	container.addChild(backgroundGraphics);
        // });
      } else {
        const width = splittedText.reduce(
          (total, character) =>
            spriteSheet.textures[`${type}_${character}`].width + 1 + total,
          0,
        );

        const backgroundGraphics = container.getChildByName("background") ||
          new PIXI.Graphics();
        backgroundGraphics.name = "background";
        backgroundGraphics.clear();

        backgroundGraphics.beginFill(backgroundColor[0]);
        backgroundGraphics.drawPolygon([
          -backgroundPadding,
          -backgroundPadding,
          //
          width + backgroundPadding,
          -backgroundPadding,
          //
          width + backgroundPadding,
          height + backgroundPadding,
          //
          -backgroundPadding,
          height + backgroundPadding,
        ]);
        backgroundGraphics.endFill();
        backgroundGraphics.alpha = backgroundColor[1];
        container.addChild(backgroundGraphics);
      }
    }

    const particleContainer = container.getChildByName("text") ||
      new PIXI.ParticleContainer(text.length);
    particleContainer.name = "text";
    particleContainer.autoResize = true;
    particleContainer.removeChildren();
    container.addChild(particleContainer);

    const isColorAnArray = Array.isArray(color[0]);

    let accumulatedWidth = 1;
    splittedText.forEach((character, index) => {
      const currentTexture = spriteSheet.textures[`${type}_${character}`];
      const characterSprite = new PIXI.Sprite(currentTexture);
      characterSprite.tint = isColorAnArray ? color[index][0] : color[0];
      characterSprite.alpha = isColorAnArray ? color[index][1] : color[1];

      particleContainer.addChild(characterSprite);
      characterSprite.position.set(accumulatedWidth, 0);
      accumulatedWidth += currentTexture.width + 1;
    });

    await entity.updateComponent(Component.DISPLAY_OBJECT_BOUNDS, {
      bounds: {
        width: accumulatedWidth,
        height,
      },
    });
  };

  const onAdd = onAddOrUpdate;
  const onUpdate = onAddOrUpdate;

  const onRemove = async (entityId: number) => {
    //TODO :D :D
  };

  return {
    components: [Component.DISPLAY_OBJECT, Component.CONTAINER, Component.TEXT],
    onAdd,
    onUpdate,
    onRemove,
  };
};

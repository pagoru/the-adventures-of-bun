import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine/components";
import { Engine } from "engine/main";
import { cameraEntity, containerEntity, textEntity } from "engine/entities";
import { System } from "system";
import { Environment, Event } from "libs/enums";
import { Utils } from "utils";

export const cameraSystem: SystemFunction<Component> = async () => {
  const onLoad = async () => {
    const [camera] = await Engine.addEntity(cameraEntity({}));
    const [ui] = await Engine.addEntity(
      containerEntity({ childOf: camera.id }),
    );
    await ui.updateComponent(Component.DISPLAY_OBJECT_ZINDEX, {
      zIndex: 2,
    });

    if (Utils.environment.get(Environment.ENVIRONMENT) !== "DEVELOPMENT") {
      return;
    }

    const [text] = await Engine.addEntity(
      textEntity({
        childOf: ui.id,

        text: "0 FPS",
        color: [0xffffff, 1],
        backgroundColor: [0x000000, 0.5],
        backgroundPadding: 1,
      }),
    );
    await text.updateComponent(Component.DISPLAY_OBJECT_POSITION, {
      vector2d: {
        x: -98,
        y: -43,
      },
    });

    await camera.updateComponent(Component.DISPLAY_OBJECT_SORT_CHILDREN, {
      sortChildren: true,
    });

    System.events.on(Event.FPS, (fps) => {
      text.updateComponent(Component.TEXT, {
        text: `${fps} FPS`,
      });
    });
  };
  return {
    components: [
      Component.CAMERA,
      Component.DISPLAY_OBJECT,
      Component.CONTAINER,
    ],
    onLoad,
  };
};

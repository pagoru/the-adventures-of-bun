import { SystemFunction } from "libs/darker-engine";
import { Component } from "engine/components";
import { Engine } from "engine/main";
import { cameraEntity, containerEntity } from "engine/entities";

export const cameraSystem: SystemFunction<Component> = async () => {
  const onLoad = async () => {
    const [camera] = await Engine.addEntity(cameraEntity({}));
    const [ui] = await Engine.addEntity(
      containerEntity({ childOf: camera.id }),
    );

    // const [text] = await Engine.addEntity(
    // 	textEntity({
    // 		childOf: ui.id,
    //
    // 		text: '0 FPS',
    // 		color: [0xffffff, 1],
    // 		backgroundColor: [0x000000, 0.5],
    // 		backgroundPadding: 4,
    // 		type: '',
    // 	}),
    // );

    await camera.updateComponent(Component.DISPLAY_OBJECT_SORT_CHILDREN, {
      sortChildren: true,
    });
    await ui.updateComponent(Component.DISPLAY_OBJECT_ZINDEX, {
      zIndex: 2,
    });
    // await text.updateComponent(Component.DISPLAY_OBJECT_PIVOT, {
    // 	vector2d: {
    // 		x: -4,
    // 		y: -4,
    // 	},
    // });
    //
    // System.events.on(Event.FPS, fps => {
    // 	text.updateComponent(Component.TEXT, {
    // 		text: `${fps} FPS`,
    // 	});
    // });
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

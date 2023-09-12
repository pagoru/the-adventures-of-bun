import { SystemFunction } from "libs/darker-engine";
import {
  Component,
  containerEntity,
  Engine,
  graphicsPolygonEntity,
  spriteEntity,
} from "engine";
import { Utils } from "utils";
import { System } from "system";
import { TickerQueue } from "libs/enums";

export const splashSystem: SystemFunction<Component> = async () => {
  const onAdd = async (entityId: number) => {
    return;
    const { width, height } = System.render.getBounds();

    const [container] = await Engine.addEntity(
      containerEntity({ childOf: entityId }),
    );
    await container.updateComponent(Component.DISPLAY_OBJECT_ZINDEX, {
      zIndex: Number.MAX_SAFE_INTEGER,
    });

    const [background, splashLogo] = await Engine.addEntity(
      graphicsPolygonEntity({
        childOf: container.id,
        color: 0xFFFFFF,
        polygon: Utils.polygon.getRectanglePolygon({ width, height }),
      }),
      spriteEntity({
        childOf: container.id,
        texture: "splash",
      }),
    );
    await splashLogo.updateComponent(Component.DISPLAY_OBJECT_ALPHA, {
      alpha: 0,
    });

    await background.updateComponent(Component.DISPLAY_OBJECT_PIVOT, {
      vector2d: {
        x: width / 2,
        y: height / 2,
      },
    });
    const { bounds: logoBounds } = splashLogo.getComponent(
      Component.DISPLAY_OBJECT_BOUNDS,
    );
    await splashLogo.updateComponent(Component.DISPLAY_OBJECT_PIVOT, {
      vector2d: {
        x: logoBounds.width / 2,
        y: logoBounds.height / 2,
      },
    });

    const WAIT_TIME = 3000;
    let step: "in" | "wait" | "out" | "wait2" = "in";
    let waitDateTime;

    System.render.ticker.queue.add({
      type: TickerQueue.CUSTOM,
      dateTime: Date.now(),
      func: () => {
        const { alpha } = splashLogo.getComponent(
          Component.DISPLAY_OBJECT_ALPHA,
        );

        switch (step) {
          case "in":
            if (1 > alpha) {
              splashLogo.updateComponent(Component.DISPLAY_OBJECT_ALPHA, {
                alpha: alpha + .0125,
              });
            } else {
              step = "wait";
              waitDateTime = Date.now();
            }
            return false;
          case "wait":
            if (Date.now() > waitDateTime + WAIT_TIME) {
              step = "out";
            }
            return false;
          case "out":
            if (0 < alpha) {
              splashLogo.updateComponent(Component.DISPLAY_OBJECT_ALPHA, {
                alpha: alpha - .0125,
              });
            } else {
              step = "wait2";
              waitDateTime = Date.now();
            }
            return false;
          case "wait2":
            if (Date.now() > waitDateTime + WAIT_TIME / 2) {
              Engine.removeEntity(container.id);
              return true;
            }
            return false;
        }
      },
    });
  };

  return {
    components: [
      Component.STAGE,
      Component.DISPLAY_OBJECT,
      Component.DISPLAY_OBJECT_POSITION,
      Component.CONTAINER,
    ],
    onAdd,
  };
};

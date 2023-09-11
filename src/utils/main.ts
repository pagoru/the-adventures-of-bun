import { renderUtils } from "utils/render.utils";
import { randomUtils } from "utils/random.utils";
import { environmentUtils } from "utils/environment.utils";
import { vectorUtils } from "utils/vector";
import { graphicsUtils } from "utils/graphics.utils";
import { polygonUtils } from "utils/polygon.utils";
import { eventsUtils } from "utils/events.utils";
import { arrayUtils } from "utils/array.utils";
import { uidUtils } from "utils/uid.utils";
import { engineUtils } from "utils/engine.utils";

export const Utils = (() => ({
  render: renderUtils(),
  random: randomUtils(),
  environment: environmentUtils(),
  vector: vectorUtils(),
  /**
   * @deprecated Use polygonUtils instead
   */
  graphics: graphicsUtils(),
  polygon: polygonUtils(),
  events: eventsUtils(),
  array: arrayUtils(),
  uid: uidUtils(),
  engine: engineUtils(),
}))();

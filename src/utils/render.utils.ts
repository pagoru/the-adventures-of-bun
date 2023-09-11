import { System } from "system/main";
import * as PIXI from "libs/pixi.mjs";

export const renderUtils = () => {
  const getDisplayObjectName = (id: number) => `display-object-${id}`;

  const getContainer = (containerId: number): PIXI.Container => {
    const stageContainer = System.render.getStage();
    return containerId === undefined
      ? stageContainer
      : stageContainer.getChildByName(getDisplayObjectName(containerId), true);
  };

  const eventFunctionMap: Record<number, Function[]> = {};

  const addEventListener = (
    entityId: number,
    eventName: string,
    callback: (event) => void,
  ): number => {
    if (!eventFunctionMap[entityId]) eventFunctionMap[entityId] = [];

    const eventFunctionIndex = eventFunctionMap[entityId].push(callback) - 1;

    const displayObject = getContainer(entityId);
    displayObject.addEventListener(
      eventName,
      eventFunctionMap[entityId][eventFunctionIndex],
    );

    return eventFunctionIndex;
  };

  const removeEventListener = (
    entityId: number,
    eventName: string,
    index: number,
  ) => {
    const displayObject = getContainer(entityId);
    displayObject.removeEventListener(
      eventName,
      eventFunctionMap[entityId][index],
    );
    eventFunctionMap[entityId][index] = undefined;
  };

  return {
    getDisplayObjectName,

    /**
     * @deprecated It's not deprecated, but careful to use it.
     * @param containerId
     */
    getContainer,
    addEventListener,
    removeEventListener,
  };
};

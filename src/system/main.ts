import { render as systemRender } from "system/render/main";
import { events } from "system/events/main";
import { io } from "system/io/main";
import { Engine } from "engine/main";
import { getSystems } from "engine/systems/main";
import { production } from "system/production";
import { Utils } from "utils";
import { Environment } from "libs/enums";
import { splash } from "system/splash";

export const System = (() => {
  const render = systemRender();

  const _events = events();
  const _io = io(_events);
  const _production = production();

  const _splash = splash();

  const load = async () => {
    await _io.load();
    await render.load();

    const isDevelopment =
      Utils.environment.get(Environment.ENVIRONMENT) === "DEVELOPMENT";
    if (!isDevelopment) _production.load();

    await _splash.load(isDevelopment);

    Engine.clear();
    await Engine.setSystems(...getSystems());
    await Engine.load();
  };

  return {
    load,

    events: _events,
    io: _io,
    render,
  };
})();

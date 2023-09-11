import { engine } from "libs/darker-engine";
import { Component, ComponentTypeMap, Entity } from "engine";

export const Engine = engine<Entity, Component, ComponentTypeMap>();

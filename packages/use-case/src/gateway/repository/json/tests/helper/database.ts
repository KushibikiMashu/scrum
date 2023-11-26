import {Low} from "lowdb";
import {adapter, createDefaultData} from "@/external/lowdb";

export const getMockDb = () => new Low(adapter, createDefaultData())

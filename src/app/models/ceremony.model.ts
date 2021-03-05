import { Place } from "src/app/models/place.model";

export class Ceremony {
  key: string;
  name: string;
  date: string;
  places: Place[];
}

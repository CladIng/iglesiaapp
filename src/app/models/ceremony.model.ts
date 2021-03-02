import { Place } from "src/app/models/place.model";

export class Ceremony {
  key: string;
  id: string;
  name: string;
  date: string;
  places: Place[];
}

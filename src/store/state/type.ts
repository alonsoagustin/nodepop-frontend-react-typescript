import { Advert } from "../../pages/types";

type State = {
  auth: boolean;
  adverts: { data: Advert[]; loaded: boolean };
  tags: { data: string[]; loaded: boolean };
  filters: { tags: string[]; name: string };
  ui: { error: string | null; loading: boolean };
};

export default State;

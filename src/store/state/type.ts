import { Advert } from "../../pages/types";

type State = {
  auth: boolean;
  adverts: { data: Advert[]; loaded: boolean };
  ui: { error: string | null; loading: boolean };
};

export default State;

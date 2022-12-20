import CardsStore from "./CardsStore";

class RootStore {
  constructor() {
    this.cardsStore = new CardsStore(this);
  }
}

const rootStore = new RootStore();

export default rootStore;

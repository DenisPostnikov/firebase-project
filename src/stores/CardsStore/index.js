import {makeObservable, observable, action } from "mobx";

class CardsStore {
  cards = [];

  constructor() {
    makeObservable(this, {
      cards: observable,
      cardsData: action,
      addCard: action,
      deleteCard: action,
    })
  }

  cardsData(data) {
    this.cards = data;
  }

  addCard(card) {
    this.cards = [...this.cards, card];
  }

  async deleteCard(card) {
    this.cards = this.cards.filter((item) => item.id !== card.id);
  }
}

export default CardsStore;

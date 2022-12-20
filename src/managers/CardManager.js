import React from 'react';

import RootStore from '../stores';
import { apiGetCards, apiAddCard, apiDeleteCard } from '../config/api';

class CardManager {
  constructor() {
    this.store = RootStore.cardsStore;
  }

  async fetchCards() {
    try {
      await apiGetCards().then(querySnapshot => {
        const cardsArray = querySnapshot.docs.map(doc => ({ docId: doc.id, ...doc.data() }));

        this.store.cardsData(cardsArray);
      })
    } catch (e) {
      console.error("Error get Cards: ", e)
    }
  }

  async addCard(item) {
    try {
      await apiAddCard(item).then(() => {
        this.store.addCard(item);
      })
    } catch (e) {
      console.error("Error removing document: ", e)
    }
  }

  async deleteCard(item) {
    try {
      await apiDeleteCard(item.docId).then(() => {
        this.store.deleteCard(item)
      })
    } catch (e) {
      console.error("Error removing document: ", e)
    }
  }
}

export default CardManager;

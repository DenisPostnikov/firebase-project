import firestore from "@react-native-firebase/firestore";

export const apiGetCards = async () => {
  return await firestore()
    .collection('cards')
    .get();
}

export const apiAddCard = item => {
  return firestore()
    .collection('cards')
    .add(item)
}

export const apiDeleteCard = docId => {
  return firestore()
    .collection("cards")
    .doc(docId)
    .delete()
}

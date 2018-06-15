import {
  FETCH_ORDER_BOOK,
  SELECT_ACTIVE_ACCOUNT,
  CREATE_ACCOUNT
} from "./types";

// import artworks from "../data/artworks";

export function fetchOrderBook() {
  return { type: FETCH_ORDER_BOOK, payload:  };
}

export function selectActiveAccount(accountID) {
  return { type: SELECT_ACTIVE_ACCOUNT, id: accountID };
}

// new action
// delete a painting
export function createAccount() {
  return {
    type: CREATE_ACCOUNT,
    id: paintingId
  };
}

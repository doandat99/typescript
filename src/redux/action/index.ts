type typeList = Array<{
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
}>;

export const openModal = (typeModal: string) => ({
  type: "OPEN_MODAL",
  typeModal,
});

export const closeModal = () => ({
  type: "CLOSE_MODAL",
});

export const openModalEdit = (typeModal: string, friendID: number) => ({
  type: "OPEN_MODAL",
  typeModal,
  friendID,
});

export const addFriend = (newList: typeList) => ({
  type: "ADD_FRIENDS",
  payload: newList,
});

export const editFriend = (
  id: number,
  name: string,
  address: string,
  phoneNumber: string
) => ({
  type: "EDIT_FRIENDS",
  id,
  name,
  address,
  phoneNumber,
});

export const deleteFriend = (newList: typeList) => ({
  type: "DELETE_FRIENDS",
  payload: newList,
});
export const updateFriend = (newList: typeList) => ({
  type: "UPDATE_FRIENDS",
  payload: newList,
});

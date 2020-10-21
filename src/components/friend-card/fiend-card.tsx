import React from "react";
import "./friend-card.scss";
import { useDispatch, useSelector } from "react-redux";
import { openModalEdit, deleteFriend } from "redux/action";
import { Button } from "rsuite";
import {
  PhoneIcon,
  AddressIcon,
  UserIcon,
  EditIcon,
  TrashIcon,
} from "components/icons/icons";
// import { type } from "os";
import { RootState } from "redux/reducer";
// import { openModal } from "redux/action";
type Props = {
  name: string;
  address: string;
  phoneNumber: string;
  id: number;
};
const FriendCard = ({ name, address, phoneNumber, id }: Props) => {
  const dispatch = useDispatch();
  const FriendItem = useSelector((state: RootState) => state.DataFriends);

  const RemoveFriend = (id: number) => {
    let NewRemove = FriendItem.filter((item) => item.id !== id);
    for (let i = id - 1; i < NewRemove.length; i++) {
      NewRemove[i].id = i + 1;
    }
    // NewRemove.forEach((item, index) => {
    //   item.id = index + 1;
    // });

    dispatch(deleteFriend(NewRemove));
  };
  return (
    <div className="fiend-card">
      <div className="fiend-card-content">
        <div className="d-flex align-items-center mb-4">
          <div className="avatar">
            <UserIcon />
          </div>
          <h2 className="name">{name}</h2>
        </div>
        <p className="address">
          <AddressIcon />
          {address}
        </p>
        <p className="phone-number d-flex align-items-center">
          <PhoneIcon />
          {phoneNumber}
        </p>
        <div className="button-group d-flex justify-content-end">
          <Button
            color="green"
            onClick={() => {
              dispatch(openModalEdit("edit", id));
            }}
          >
            <EditIcon />
            Edit
          </Button>
          <Button
            color="red"
            onClick={() => {
              RemoveFriend(id);
            }}
          >
            <TrashIcon />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;

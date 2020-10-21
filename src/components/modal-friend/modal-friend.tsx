import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./modal-friend.scss";

import { closeModal, addFriend, updateFriend } from "redux/action";
import {
  Modal,
  Button,
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Input,
  Notification,
} from "rsuite";
import { UserPlusIcon, EditIcon } from "components/icons/icons";
import { RootState } from "redux/reducer";

type dataFriend = Array<{
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
}>;

type Props = {
  typeModal: string;
  isActive: boolean;
  friendID: number;
  dispatch: any;
  dataFriends: dataFriend;
};

const ModalFriend = () => {
  const [dataName, setDataName] = useState("");
  const [dataAddress, setDataAddress] = useState("");
  const [dataPhoneNumber, setDataPhoneNumber] = useState("");
  const dispatch = useDispatch();
  const typeModal: string = useSelector(
    (state: RootState) => state.ModalFriend.typeModal
  );
  const isActive: boolean = useSelector(
    (state: RootState) => state.ModalFriend.isActive
  );
  const friendID: number = useSelector(
    (state: RootState) => state.ModalFriend.friendID
  );
  // const [edit, setIsEdit] = useState(false);
  const dataList: dataFriend = useSelector(
    (state: RootState) => state.DataFriends
  );
  const close = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    if (typeModal === "edit") {
      setDataName(dataList[friendID - 1].name);
      setDataAddress(dataList[friendID - 1].address);
      setDataPhoneNumber(dataList[friendID - 1].phoneNumber);
    } else {
      setDataName("");
      setDataAddress("");
      setDataPhoneNumber("");
    }
  }, [dataList, typeModal, isActive, friendID]);

  const submit = () => {
    if (dataName === "" || dataAddress === "" || dataPhoneNumber === "") {
      openNotification("error");
    } else {
      let obj = {
        name: dataName,
        address: dataAddress,
        phoneNumber: dataPhoneNumber,
        id: dataList.length + 1,
      };
      const newList: dataFriend = [...dataList, obj];
      dispatch(addFriend(newList));
    }
  };
  const saveEdit = () => {
    console.log(friendID - 1);
    let obj = {
      name: dataName,
      address: dataAddress,
      phoneNumber: dataPhoneNumber,
      id: friendID,
    };
    let newObj = [...dataList];
    // newObj.forEach((item) => {
    //   if (item.id === friendID) {
    //     item.name = dataName;
    //     item.address = dataAddress;
    //     item.phoneNumber = dataPhoneNumber;
    //   }
    // });
    // newObj.splice(friendID - 1, 1, obj);
    let a = newObj.slice(0, friendID - 1);
    let b = newObj.slice(friendID);
    console.log(a);
    console.log(b);
    let c: dataFriend = [...a, obj, ...b];
    dispatch(updateFriend(c));
    close();
  };
  const openNotification = (des: any) => {
    Notification["error"]({
      title: "Error",
      description: des,
    });
  };

  return (
    <div className="modal-friend">
      <Modal backdrop={true} show={isActive} onHide={close}>
        <Modal.Header>
          {typeModal === "add" && (
            <Modal.Title>
              <UserPlusIcon />
              Add Friend
            </Modal.Title>
          )}
          {typeModal === "edit" && (
            <Modal.Title>
              <EditIcon />
              Edit Friend
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <Form
            onKeyPress={(e: any) => {
              if (e.key === "Enter") submit();
            }}
          >
            <FormGroup>
              <ControlLabel>Name</ControlLabel>
              <Input
                onChange={(value) => {
                  setDataName(value);
                }}
                value={dataName}
                name="name"
                type="text"
              />
              <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Address</ControlLabel>
              <Input
                onChange={(value) => {
                  setDataAddress(value);
                }}
                value={dataAddress}
                name="name"
                type="text"
              />
              <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Phone Number</ControlLabel>
              <Input
                onChange={(value) => {
                  setDataPhoneNumber(value);
                }}
                value={dataPhoneNumber}
                name="name"
                type="text"
              />
              <HelpBlock tooltip>Required</HelpBlock>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {typeModal === "add" && (
            <Button onClick={submit} appearance="primary">
              Add Friend
            </Button>
          )}
          {typeModal === "edit" && (
            <Button onClick={saveEdit} appearance="primary">
              Save
            </Button>
          )}
          <Button onClick={close} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalFriend;

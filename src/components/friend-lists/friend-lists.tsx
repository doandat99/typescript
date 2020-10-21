import React, { useEffect, useState } from "react";
import "./friend-lists.scss";
import FriendCard from "components/friend-card/fiend-card";
import { RootState } from "../../redux/reducer/index";
import { useSelector } from "react-redux";
import { FaceSadIcon } from "components/icons/icons";
import { Input, InputGroup, Icon } from "rsuite";

type dataFriendType = Array<{
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
}>;
const FiendLists = () => {
  const dataFriend: dataFriendType = useSelector(
    (state: RootState) => state.DataFriends
  );
  const [dataList, setDataList]: [dataFriendType, any] = useState([]);

  useEffect(() => {
    setDataList(dataFriend);
  }, [dataFriend]);

  const handleInput = (e: any) => {
    const searchDataFriend: dataFriendType = dataFriend.filter((item) =>
      item.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setDataList(searchDataFriend);
    console.log(searchDataFriend);
  };
  return (
    <div>
      <InputGroup>
        <input onChange={handleInput} />
        <InputGroup.Addon>
          <Icon icon="search" />
        </InputGroup.Addon>
      </InputGroup>
      <div className="list-friends d-flex flex-wrap ">
        {dataList.map((item) => (
          <FriendCard
            key={item.id}
            id={item.id}
            name={item.name}
            address={item.address}
            phoneNumber={item.phoneNumber}
          />
        ))}
      </div>
    </div>
  );
};

export default FiendLists;

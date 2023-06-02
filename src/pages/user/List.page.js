import React, { useEffect, useState } from 'react';
import { db } from "../../firebase-config";
import { collection, query, orderBy, getDocs } from "firebase/firestore/lite";
import UserList from '../../components/user/List';

const ListPage = () => {
  const [list, setList] = useState([]);

  const getList = async () => {
    const q = query(collection(db, 'Users'), orderBy('name'));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    setList(data);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <UserList list={list} />
  )
}

export default ListPage;
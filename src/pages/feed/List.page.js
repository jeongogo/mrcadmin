import React, { useEffect, useState } from 'react';
import { db } from "../../firebase-config";
import { collection, query, orderBy, getDocs, limit, where } from "firebase/firestore/lite";
import FeedList from '../../components/feed/List';

const ListPage = () => {
  const [list, setList] = useState([]);

  const getList = async () => {
    const today = new Date();
    // const q = query(collection(db, 'Records'), where('date', '>=', today), orderBy('date', 'desc'));
    const q = query(collection(db, 'Records'), orderBy('date', 'desc'), limit(30));
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
    <FeedList list={list} />
  )
}

export default ListPage;
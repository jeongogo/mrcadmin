import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from "../../firebase-config";
import { doc, getDoc } from "firebase/firestore/lite";
import Detail from '../../components/feed/Detail';

const DetailPage = () => {
  const { id } = useParams();
  const [feed, setFeed] = useState('');

  const getFeed = async () => {
    try {
      const docRef = doc(db, "Records", id);
      const docSnap = await getDoc(docRef);
      setFeed(docSnap.data());
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <>
      {feed && <Detail feed={feed} />}
    </>
  )
}

export default DetailPage
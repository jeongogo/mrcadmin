import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Feed = ({item}) => {
  const [pace, setPace] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const m = (Math.floor(item.totalTime / 60)).toFixed(0);
    const s = (item.totalTime - m * 60).toFixed(0);  
    const minutes = m < 1 ? '00' : m < 10 ? '0' + m : m;
    const seconds = s < 1 ? '00' : s < 10 ? '0' + s : s;
    setPace(minutes + ':' + seconds);

    // const currentDate = new Date(item.date.toDate());
    const currentDate = new Intl.DateTimeFormat("ko", { dateStyle: "full" }).format(new Date(item.date.toDate()));
    setDate(currentDate);
  }, [item]);

  return (
    <Container>
      <Link to={`/feed/${item.id}`} className="wrap">
        <div className="name">{item.name}</div>
        <div className="distance">{item.distance}</div>
        <div className="pace">{pace}</div>
        <div className="date">{date}</div>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  .wrap {
    display: flex;    
  }
  .name {
    width: 7rem;
  }
  .distance {
    width: 6rem;
  }
  .pace {
    width: 6rem;
  }
`;

export default Feed
import React, { useEffect, useState } from 'react';
import Feed from "./Feed";
import styled from 'styled-components';

const List = ({list}) => {
  const [FeedList, setFeedList] = useState([]);

  useEffect(() => {
    const sortList = [...list];
    sortList.sort((a, b) => {
      return a.distance - b.distance;
    });
    setFeedList(sortList);
  }, [list]);

  return (
    <Container>
      <div className="list">
        <ul>
          {FeedList && FeedList.map((item) => (
            <Feed key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
`;

export default List
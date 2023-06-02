import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const List = ({list}) => {
  return (
    <Container>
      {/* <Link to={`/user/${i.id}`}></Link> */}
      <div className="list">
        <ul>
          {list && list.map((i) => (
            <li key={i.id}>
              <div className="avatar">
                {i.photoURL &&
                  <img src={i.photoURL} alt="" />
                }
              </div>
              <div className="name">{i.name}</div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
  .list {
    ul {
      li {
        display: flex;
        align-items: center;
        margin-top: 1.2rem;
        .avatar {
          width: 4rem;
          height: 4rem;
          margin-right: 1rem;
          background-color: #eee;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
      }
    }
  }
`;

export default List
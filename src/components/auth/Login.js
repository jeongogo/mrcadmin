import React, {useRef} from 'react';
import styled from 'styled-components';

const Login = ({handleSubmit}) => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(emailRef.current, passwordRef.current);
  }

  return (
    <Container>
      <form onSubmit={onSubmit} className="box">
        <div className="input-wrap">
          <input
            type="email"
            onChange={(e) => emailRef.current = e.target.value}
            placeholder="email"
            required
          />
        </div>
        <div className="input-wrap">
          <input
            type="password"
            onChange={(e) => passwordRef.current = e.target.value}
            placeholder="password"
            required
          />
        </div>
        <div className="btn-wrap">
          <button type="submit">Login</button>
        </div>
      </form>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem 3rem;
    background-color: #fff;
    border-radius: 1rem;
  }
  .input-wrap {
    margin-bottom: 1rem;
    input {
      min-width: 20rem;
    }
  }
  .btn-wrap {
    width: 100%;
    button, a {
      font-weight: 500;
    }
    button {
      width: 100%;
      padding: 1rem;
      color: white;
      background: linear-gradient(to right, #da8cff, #9a55ff);
      border-radius: 5px;
    }
  }
`;

export default Login;
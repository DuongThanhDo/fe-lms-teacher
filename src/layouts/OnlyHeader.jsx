import React from 'react'
import Header from '../components/Header';
import { Container } from 'react-bootstrap';

const OnlyHeader = ({ children }) => {
    return (
      <div>
        <Header />
        <Container style={{minHeight: 600}}>{children}</Container>
      </div>
    );
  };

export default OnlyHeader

import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const Box = styled.div`
  height: 100%;
  width: 100%;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 48px;
  color: grey;
  text-transform: uppercase;

  ${({ isMobile }) =>
    isMobile &&
    css`
      font-family: TTNorms-Bold;
      font-size: 18px;
      text-align: left;
      padding-left: 24px;
    `}
`;

const Subtitle = styled.div`
  font-family: TTNorms-Regular;
  font-size: 15px;
  line-height: 24px;
  color: #9b95a4;
  text-align: center;
  margin-top: 4px;

  ${({ isMobile }) =>
    isMobile &&
    css`
      font-size: 15px;
      text-align: left;
      padding: 0px 0px 24px 24px;
      line-height: 20px;
    `}
`;

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = { error: null };
  }

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error !== null) {
      return (
        <Box>
          <Title>Não foi possível concluir a sua ação</Title>
          <Subtitle>Por favor, tente em outro momento</Subtitle>
        </Box>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;

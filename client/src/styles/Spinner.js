import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
`;

const rotateReverse = keyframes`
    0% { transform: rotate(0deg) }
    100%{ transform: rotate(360deg) }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    height: ${props => (props.height ? props.height : `calc(100% - ${props.top}px)`)};
    width: ${props => `calc(100% - ${props.left}px)`};
    background-color: rgba(231, 236, 243, ${props => props.opacity});
    z-index: 2;
`;

const Ring = styled.div`
    position: absolute;
`;

const Outer = styled(Ring)`
  height: 60px;
  width: 60px;
  border-radius: 60px;
  border-top: 4px solid #0496FF;
  border-right: 4px solid #0496FF;
  border-bottom: 4px solid transparent;
  border-left: 4px solid #0496FF;
  animation: ${rotate} 1.25s linear infinite;
`;

const Middle = styled(Ring)`
  height: 45px;
  width: 45px;
  border-radius: 45px;
  border-top: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #f5f5f5e5;
  border-left: 4px solid transparent;
  animation: ${rotateReverse} 1s linear infinite;
`;

const Inner = styled(Ring)`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  border-top: 4px solid #FFBC42;
  border-right: 4px solid #FFBC42;
  border-bottom: 4px solid transparent;
  border-left: 4px solid transparent;
  animation: ${rotate} 2s linear infinite;
`;

const Spinner = props => {
    const { top, left, height, opacity } = props;

    return(
        <Container
            top={top.toString()}
            height={height}
            left={left.toString()}
            opacity={opacity.toString()}
        >
            <Outer />
            <Middle />
            <Inner />
        </Container>
    );
};

Spinner.defaultProps = {
    opacity: 0.7,
    height: undefined
};

Spinner.propTypes = {
    top: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    left: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    opacity: PropTypes.number,
    height: PropTypes.string
};

export default Spinner;
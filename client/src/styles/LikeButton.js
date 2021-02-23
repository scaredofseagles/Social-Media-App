import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";

const StyledButton = styled.button`
    display: inline-flex;
    align-items: center;
    margin: 0px;
    padding: 5px;
    border: none;
    border-radius: 40px;
    background-color: ${props => props.bg};
    color: #000;
    cursor: pointer;
    height: 30px;
    box-sizing: border-box;

    :disabled {
        opacity: 0.25;
        cursor: default;
    }

    &:hover:not(:disabled) {
        background-color: rgba(54, 73, 97, 0.08);
    }
`;


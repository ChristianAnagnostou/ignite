import React, { useState } from "react";
// Styling and Animation
import styled from "styled-components";
import { motion } from "framer-motion";

function DropDown({ selectedOption, setSelectedOption, options }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  
  return (
    <DropDownContainer>
      <DropDownHeader onClick={toggling}>{selectedOption.type}</DropDownHeader>
      {isOpen && (
        <DropDownListContainer>
          <DropDownList>
            {options.map((option) => (
              <ListItem onClick={onOptionClicked(option)} key={option.type}>
                {option.type}
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
}

const DropDownContainer = styled(motion.div)`
  width: 10rem;
  margin: 1rem 0rem;
  position: relative;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.3rem;
  color: #164666;
  text-align: center;
`;

const DropDownHeader = styled(motion.div)`
  padding: 0.5rem 0rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  background: rgba(0, 0, 0, 0.1);
  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`;

const DropDownListContainer = styled(motion.div)``;

const DropDownList = styled("ul")`
  position: absolute;
  right: -40rem;
  top: 0;
  display: flex;
  background: #ffffff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const ListItem = styled("li")`
  list-style: none;
  width: 10rem;
  padding: 0.5rem 0rem;
  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

export default DropDown;

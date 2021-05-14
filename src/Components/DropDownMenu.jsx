import React, { useRef } from 'react';
import styled from 'styled-components/macro';
import {string, bool, func, array} from 'prop-types';

const StyledDropDownContainer = styled.div`
margin-top: 1rem;
background-color:#223843;
display: flex;
flex-direction: column;
width: 50%;
align-self: center;
`;

const StyledDropDownHeaderContainer = styled.div`
background-color: #223843;
border: 0.13rem solid #DBD3D8;
padding: 0.3rem;
margin-bottom: 0.2rem;
`;

const StyledDropDownHeader = styled(StyledDropDownHeaderContainer)`
font-size: 1.5em;
color: #DBD3D8;
`;

const StyledDropDownButton = styled.button`
border: none;
padding: 0rem;
width: 100%;
text-align: left;
cursor: pointer;
background-color: #223843;
`;

const StyledDropDownListContainer = styled.div`
border: 0.1rem solid #DBD3D8;
`;

const StyledDropDownListItems = styled.li`
color: #DBD3D8;
list-style-type: none;
margin: 0.4rem;
border-bottom: 0.12rem solid #DBD3D8;
padding-bottom: 0.15rem;
`;

const DropDownMenu = ({onClick, isExpanded, items, title}) => {
   const dropdownRef = useRef(null);
  
    return (
        <StyledDropDownContainer className="menu-container">
        <StyledDropDownButton onClick={onClick} className="menu-trigger">
          <StyledDropDownHeader>{title}</StyledDropDownHeader>
        </StyledDropDownButton>
          { isExpanded ? 
        (<StyledDropDownListContainer ref={dropdownRef} items={items}>
            { items.map((item) => {
                return (
                    <StyledDropDownButton onClick={onClick} key={item.id}>
                    <StyledDropDownListItems>{item}</StyledDropDownListItems>
                    </StyledDropDownButton>
                    )
            })
            }
        </StyledDropDownListContainer>) : (null)
          }
      </StyledDropDownContainer>
    );
};

DropDownMenu.propTypes = {
    title: string,
    onClick: func,
    item: string,
    isExpanded: bool,
    items: array,
    toggle: func
};

DropDownMenu.defaultProps = {
    title: "",
    onClick: () => {},
    item: "",
    isExpanded: false,
    items: [],
    toggle: () => {}
};

export default DropDownMenu
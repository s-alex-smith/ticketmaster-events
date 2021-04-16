import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from 'styled-components/macro';

const StyledPage = styled.div`
background-color: #223843;
height: 100%;
width: 100%;
position: absolute;
justify-content: center;
align-items: center;
display: flex;
`;

const StyledView = styled.div`
display: flex;
margin: 3rem;
flex-direction: column;
border: 0.2rem solid #DBD3D8;
padding: 1rem;
position: relative;
align-items: center;
width: 50%;

@media screen and (max-width: 34.375rem) {
margin: 1rem;
padding: 2.5rem;
}
`;

const StyledTitle = styled.div`
margin-top: 0.5rem;
font-family: Georgia, 'Times New Roman', Times, serif;
font-size: 1.5rem;
color: #EFF1F3;

@media screen and (max-width:34.375rem) {
    padding: 0.1rem;
    font-size: 1rem;
  }
`;

const StyledArea = styled.div`
width: 90%;
border-bottom: 0.15rem solid lightgray;
padding: 2rem;
margin-top: 1rem;
align-items: center;
justify-content: center;
display: flex;

@media screen and (max-width: 34.375rem) {
margin-top: 0.5rem;
padding: 1rem;
}
`;

const StyledInput = styled.input`
  border-radius: 5rem;
  border: 0.2rem solid #DBD3D8;;
  width: 50%;
  color: black;
  display: block;
  font-size: 20;
  padding: 0.4rem;
  margin-left: 1rem;
  background-color: #DBD3D8;

  @media screen and (max-width:34.375rem) {
    padding: 0.1rem;
    width: 60%;
  }
`;

const StyledButton = styled.button`
margin: 2rem;
padding: 0.3rem 3rem;
cursor: pointer;
border: 0.1rem solid grey;
border-radius: 5rem;
background-color: #DBD3D8;
color: #223843;
font-weight: bold;
text-align: center;

@media screen and (max-width: 34.375rem) {
margin: 0.5rem;
padding: 0.5rem 1rem;
margin-top: 2rem;
}
`;

const StyledErrorMessage = styled.span`
color: #C6362F;
border: 0.2rem solid #C6362F;
margin-top: 1rem;
`;

const HomeScreen = () => {
  const [artistValue, setArtistValue] = useState("");
  const [cityValue, setCityValue] = useState("");
  const [venueValue, setVenueValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);


let history = useHistory();

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (artistValue !== "" || cityValue !== "" || venueValue !== "") {
        const searchData = { artistValue, venueValue, cityValue };
            history.push("/results", {searchData})
      } else {
        setShowErrorMessage(true);
        setErrorMessage("At least one search field must be filled");
      }
    } catch (error) {
      console.log(console.error);
    }

}


    return (
      <StyledPage>
        <StyledView>
            <StyledTitle>What's on?</StyledTitle>
            <StyledArea>
              <StyledTitle>Artist</StyledTitle>
              <StyledInput label="Artist" value={artistValue} onChange={text => setArtistValue(text.text)} />
            </StyledArea>
            <StyledArea>
              <StyledTitle>Venue</StyledTitle>
              <StyledInput label="Venue" type="text" value={venueValue} onChange={(text) => setVenueValue(text.text)}/>
            </StyledArea>
            <StyledArea>
            <StyledTitle>City</StyledTitle>
            <StyledInput label="City" type="text" value={cityValue} onChange={(text) => setCityValue(text.text)} />
            </StyledArea>
            {showErrorMessage && (
            <StyledErrorMessage>
                {errorMessage}
            </StyledErrorMessage>
            )
            }
          <StyledButton onClick={handleSubmit}>Show me some gigs!</StyledButton>
         </StyledView>
        </StyledPage>
     );
};
export default HomeScreen;


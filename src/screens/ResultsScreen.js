import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from 'styled-components/macro';
import { getEvents, getEventsByGenre } from "../apiRequests/apiRequests";
import { ActivityIndicator, Image } from "react-native"

const StyledPage = styled.div`
background-color: #223843;
height: 100%;
width: 100%;
justify-content: center;
align-items: center;
display: flex;
`;

const StyledView = styled.div`
display: flex;
flex-direction: column;
margin: 2rem;
border: 0.2rem solid #DBD3D8;
padding: 2rem 2rem 1.5rem 2rem;
position: relative;
align-self: center;
width: 60%;

@media screen and (max-width: 34.375rem) {
margin: 1rem;
width: 80%;
padding: 1.5rem 2rem 1rem 2rem;
}
`;

const StyledContainer = styled.div`
display: flex;
flex-direction: row;
`;

const StyledColumn = styled.div`
width: 50%;
`;

const StyledPageButtonsContainer = styled(StyledColumn)`
display: flex;
justify-content: center;

@media screen and (max-width: 34.375rem) {
margin: 1rem;
}
`;

const StyledTitle = styled.div`
text-align: center;
color: #EFF1F3;
font-size: 1.8em;
font-weight: bold;
border-bottom: 0.1rem solid #EFF1F3;
`;

const StyledArtistTitle = styled(StyledTitle)`
font-size: 1.5em;

@media screen and (max-width: 34.375rem) {
font-size: 1.2em;
}
`;

const StyledDate = styled.div`
font-size: 1em;
margin-top: 0.8rem;
`;

const StyledVenue = styled(StyledDate)`
margin-top: 1rem;
font-weight: bolder;
font-size: 1.1em;

@media screen and (max-width: 34.375rem) {
font-size: 1em;
}
`;

const StyledImage = styled.img`
align-self: center;
width: 6rem;
height: 6rem;
margin: 1.5rem;
align-content: center;

@media screen and (max-width: 34.375rem) {
margin: 1rem;
}
`;

const StyledButton = styled.button`
margin: 1.5rem;
padding: 0.5rem 2.8rem;
cursor: pointer;
border: 0.1rem solid grey;
border-radius: 5rem;
background-color: #DBD3D8;
color: #223843;
font-weight: bold;

@media screen and (max-width: 34.375rem) {
margin: 1rem;
padding: 1rem;
}
`;


const ResultsScreen = () => {
    const [genres, setGenres] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState("All");
    const [page, setPage] = useState(0);
    const [events, updateEvents] = useState([]);
    const [isLoading, updateIsLoading] = useState(true);

    const location = useLocation();
    const history = useHistory();

    let genreArr = [{ value: "All" }];

    const dateFormatting = date => {
      let splitDate = date.split('-')
      return `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`
    };

    const handleBack = () => {
      history.push("/");
    }

    const handleMore = (event) => {
      setPage(page + 1);
      updateIsLoading(true);
    };

    const handleLess = (event) => {
      setPage(page - 1);
      updateIsLoading(true);
    };
    
    useEffect(() => {
        if (filteredEvents !== "All") {
          getEventsByGenre(location.state.artistValue, location.state.cityValue, location.state.venueValue, filteredEvents, page)
            .then((events) => {
              updateEvents(events);
              updateIsLoading(false);
            })
            .catch((err) => console.log(err));
        } else {
          getEvents(location.state.artistValue, location.state.cityValue, location.state.venueValue, page)
            .then((res) => {
              updateEvents(res);
              events.forEach((event) => {
                genreArr.push({ value: event.classifications[0].genre.name });
              });
              let obj = {};
              for (let i = 0; i < genreArr.length; i++)
                obj[genreArr[i]["value"]] = genreArr[i];
              let unique = new Array();
              for (let key in obj) unique.push(obj[key]);
              setGenres(unique);
            })
            .then(() => {
              updateIsLoading(false);
            })
            .catch((err) => console.log(err));
        }
      }, [location, filteredEvents, page]);

    

if (isLoading) {
  return  (
  <StyledPage>
    <StyledView>
      <ActivityIndicator size="large" />
    </StyledView>
  </StyledPage>
  )
} else if (!events) {
  return (
    <StyledPage>
      <StyledView>
       <StyledTitle>Sorry! Doesn't look like there's anything here :(</StyledTitle>
       <StyledButton onClick={handleBack}>Back to search</StyledButton>
      </StyledView>
  </StyledPage>
  )
} else {
  return (
    <StyledPage>
      <StyledView>
        <StyledTitle>
          Your results!
        </StyledTitle>
       {events.map((event) => {
         return (
           <StyledView key={event.id}>
              <StyledArtistTitle>
              {event.name}
              </StyledArtistTitle>
              <StyledContainer>
              <StyledColumn>
                <StyledVenue>
                 {event._embedded.venues[0].city.name} - {event._embedded.venues[0].name}
                </StyledVenue>
                <StyledDate>
                  {dateFormatting(event.dates.start.localDate)}
                </StyledDate>
              </StyledColumn>
              <StyledColumn>
                <StyledImage source={{ uri: event.images[0].url }} alt="Tour poster" />
              </StyledColumn>
              </StyledContainer>
           </StyledView>
         );
       })}
       <StyledContainer>
         <StyledPageButtonsContainer>
       {page > 0 ? (
       <StyledButton onClick={handleLess}>Back</StyledButton>
       ) : null}
         </StyledPageButtonsContainer>
         <StyledPageButtonsContainer>
       {events.length > 9 ? ( 
       <StyledButton onClick={handleMore}>Next</StyledButton>
       ) : null}
         </StyledPageButtonsContainer>
       </StyledContainer>
       <StyledButton onClick={handleBack}>Back to search</StyledButton>
     </StyledView>
    </StyledPage>
)
}


  };
  export default ResultsScreen;
  
  
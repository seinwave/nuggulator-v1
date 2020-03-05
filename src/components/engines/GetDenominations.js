let matchArray = [];


const GetDenominations = (wordToMatch, countries) => {
    matchArray = countries.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.country.match(regex); 
    });
    
    return matchArray[0].denominations;    
}

export default GetDenominations 
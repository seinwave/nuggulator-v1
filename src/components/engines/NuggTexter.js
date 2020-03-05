
const NuggTexter = (counted, extras, countedText, extrasText, resultsText) => {


    for (let i = 0; i < Object.keys(counted).length; i++){
        countedText = 
        `You need ${Object.values(counted)[i]} sets of ${Object.keys(counted)[i]}. `;
    }
    if (extras){
        extrasText = 
        `And that'll leave you with ${extras} leftover.`
    }

    resultsText = countedText.concat(extrasText);

    return resultsText;
}

export default NuggTexter
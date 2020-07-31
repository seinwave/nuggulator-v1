
//derived from the Corrected METS formula, here: https://sites.google.com/site/compendiumofphysicalactivities/corrected-mets

const CalorieConverter = (average, feet, inches, weight, age, gender, distance) => {


    let height = (parseInt(feet)*12) + parseInt(inches);
    
    let realDistance;
    if (distance.includes('km')) {
         realDistance = (parseFloat(distance.replace(/,/g, '')) * 1.609);
    }

    else realDistance = parseFloat(distance.replace(/,/g, ''));

    if (average === true){
        return Math.floor((realDistance*100))
    }

    else {
        const duration = (realDistance / 3.0);
        const mets = 3.5;
        if (gender === "male"){
            
            let RMR = (66.4730 
                + (13.7516 * (weight*0.453592)) 
                + (5.0033 *(height*5.0033)) 
                - (6.7550 * age));
            let harrisBenedict = 
                (((RMR / 1440)/ 5) / (weight*0.453592))*10;
                return Math.floor(((3.5/harrisBenedict) * mets * duration)); 
        }
        if (gender === "female") {
            let RMR = (655.0955  
                + (9.5634  * (weight*0.453592)) 
                + (1.8496*(height*2.54)) 
                - (4.6756 * age));
            let harrisBenedict = 
                (((RMR / 1440)/ 5) / (weight*0.453592))*10;
                return Math.floor(((3.5/harrisBenedict) * mets * duration));
        }
        
        if (gender === "non-binary") {
            let RMR1 = (655.0955  
                + (9.5634  * (weight*0.453592)) 
                + (1.8496*(height*2.54)) 
                - (4.6756 * age));
            let RMR2 = (66.4730 
                + (13.7516 * (weight*0.453592)) 
                + (5.0033 *(height*5.0033)) 
                - (6.7550 * age));
            let RMRavg = ((RMR1 + RMR2)/2);
            let harrisBenedict = 
                (((RMRavg / 1440)/ 5) / (weight*0.453592))*10;
                return Math.floor(((3.5/harrisBenedict) * mets * duration));
        }
    }
};

export default CalorieConverter
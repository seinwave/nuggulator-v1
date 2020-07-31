import React, { Component }  from 'react'
import CalorieConverter from '../engines/CalorieConverter'
import GetDenominations from '../engines/GetDenominations'
import NuggetConverter from '../engines/NuggetConverter'
import nuggImages from '../images/nuggImages'
import packImages from '../images/packImages'
//import {GreedyNuggs, fullSack, counted, extras, quotient, remainder, arrCount} from '../engines/GreedyNuggs'
import Countries from '../engines/countries.json'


class Results extends Component {

        

    render(props) {

        const { onRouteChange, average, polyline, height, weight, age, gender, distance, country } = this.props;
        const countries = Countries; 
        let sack = [];
        let denominationsText = [];
        
        let calories = CalorieConverter(average, height, weight, age, gender, distance);
        let nuggets = NuggetConverter(calories);
        let denominations = GetDenominations(country, countries);


        // Makes denomination counts grammatically correct
        if (denominations.length <1 ){
            return onRouteChange('no-country');
        }
        else if (denominations.length === 1) {
            denominationsText = 
            `only ${denominations[0]}-packs available in your origin country`
        }
        else if (denominations.length === 2) {
            denominationsText = 
            `only ${denominations[0]}- and ${denominations[1]}-packs available in your origin country`
        }
        else if (denominations.length > 2) {
            for (let i =0; i <= denominations.length-2; i++){
            denominationsText.push(` ${denominations[i]}-`);
            denominationsText.join(' , ');
         }
            denominationsText.push(` and ${denominations[denominations.length-1]}-packs available in your origin country`)
            
        }


        
        let denoms = [...denominations]
        let fullSack;
        let counted;
        let extras;
        let quotient;
        let remainder;

        

        function arrCount(arr){
            return arr.reduce(function(obj, item) {
                obj[item] = (obj[item] || 0) + 1;
                return obj;
            },{});         
        }

        const GreedyNuggs = (denoms, amt, sack) => {

            let lastDenom = denoms[denoms.length-1];

            if (amt === 0) {   
                counted = arrCount(sack);
                return counted;
            }

            if (amt === lastDenom){
                sack.push(lastDenom);
                counted = arrCount(sack);
                return counted; 
            }

            if (amt < denoms[0]) {
                fullSack = sack.concat(denoms[0]) 
                counted = arrCount(fullSack);
                extras = denoms[0] - amt;   
                return (counted, extras);
            }
            else
                quotient = Math.floor(amt/(lastDenom));
                remainder = amt - (quotient*(lastDenom));
                let i = quotient;
                while (i>0) {
                    sack.push(lastDenom);
                    i--; 
                }
                amt = remainder;
                if (amt < denoms[0] && amt !== 0) {
                    fullSack = sack.concat(denoms[0]) 
                    counted = arrCount(fullSack);
                    extras = denoms[0] - amt;
                    return (counted, extras);
                }
                denoms.pop();
                GreedyNuggs(denoms,amt,sack);       // run the function again
        }

        // Giving time for Google Maps promise to resolve
        setTimeout(GreedyNuggs(denoms,nuggets,sack),1000);
        
        let countedText = [];
        let countedKeys = [];
        let extrasArr = [];
        let index;
        let extraCopy = extras;

        for (let i = 0; i < Object.keys(counted).length; i++){
            countedText.push(`You need ${Object.values(counted)[i]} pack(s) of ${Object.keys(counted)[i]}.`);
            countedKeys.push(parseInt(Object.keys(counted)[i]));
        }

        if (extras){
            while (extraCopy > 0) {
                extrasArr.push(1);
                extraCopy --; 
        }}


        countedKeys.reverse();

        const commaRizer = (x) => {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        let prettyDistance = commaRizer(distance);
        let prettyCalories = commaRizer(calories);
        let prettyNuggets = commaRizer(nuggets)
        
        let wordKeys = {
            4 : 'Four',
            5: 'Five',
            6 : 'Six',
            9 : 'Nine',
            10 : 'Ten',
            15 : 'Fifteen',
            20 : 'Twenty',
            50 : 'Fifty',
        }


        return (
            <div>
            <div
            className = "center pa4 br3 shadow-5" 
            id = "results">
                <header>
                    <h1>Nuggulation Results</h1>
                    <p className ="f3">{`You're travelling ${prettyDistance}.`}</p>
                <img alt = "Result map" src = 
                    {`https://maps.googleapis.com/maps/api/staticmap?size=500x300&path=color:0x0000ff|weight:5|enc:${polyline}&key=AIzaSyAKS01fQkbYZJo2M-OssfMxdpGoF7c7EhY`} />
                    <p>{`Which will require 
                    ${prettyCalories} calories — or about ${prettyNuggets} McNuggets.`}</p>
                    <p>{`There are ${denominationsText}. That means you'll need...`}</p>
                    
                    <div className = "final resuls">
                    { countedKeys.map(key => 
                        packImages.filter(img => img.id === key)
                        .map(({id, src, alt}) => 
                        <div> 
                            <figure>
                            <img key={id} src={src} alt={alt} height="200" width="auto"/>
                            { counted[id] > 1
                            ? <figcaption>  
                                {`${counted[id.toString()]} ${wordKeys[id]}-packs`}
                             </figcaption>
                        : ( counted[id] === 1
                           ? <figcaption>
                                {`${counted[id.toString()]} ${wordKeys[id]}-pack`}
                            </figcaption>
                            : <figcaption>
                                {"Wiener Fart"}
                            </figcaption>)}
                            </figure>
                        </div>))}

                    { extras > 1
                    ? <div>
                        <div>{extrasArr.map(extra => {
                        index = Math.floor(Math.random()*Math.floor(4));
                        return <img 
                        key={nuggImages[index].id} 
                        src={nuggImages[index].src} 
                        alt={nuggImages[index].alt} 
                        height="200" width="auto"/>})}
                        </div>
                            <p className = "f3">{`Which gives you ${extras} extra nuggets.`}</p>
                        </div>
                    : (extras === 1 
                       ? <div>
                        <div> 
                            <img 
                            key={nuggImages[0].id} 
                            src={nuggImages[0].src} 
                            alt={nuggImages[0].alt} 
                            height="200" width="auto"/>
                        </div>
                            <p className = "f3">{`Which gives you 1 extra nugget.`}</p>
                        </div>
                        
                    : <div>
                    </div>)}
                    </div>
                </header> 
            </div>      
        <div>
            <button className ="w-30 grow pa4 mv5 f2 pointer ph3 pv2 dib white bg-gray"
            onClick={() => onRouteChange('start')}> New trip?</button>
        </div>
        </div>
        )
    
        }}

export default Results
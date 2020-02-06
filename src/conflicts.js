// import
const { insert,insertItem } = require('../utils/arrays')

/**
 * Split an object into two arrays
 * @param { array [object] } data 
 */
const formatDataToArrays = data => {
    let startList = [];
    let endList = [];

    data.map(item => {
        insert(startList,item.startDate);
        insert(endList,item.endDate);
    })

    return {startList,endList}
}

/**
 * Sort an array and give weight to its items given their apparition 
 * @param { array [array] } array list to insert
 * @param { array [number] } valuesArray list to sort and weight
 * @param { number } weight value of the weight to apply
 */
const createWeightList = (array,valuesArray,weight) => {
    let prev ;
    let count = 0;

    for (let i = 0; i <= valuesArray.length; i++) {
        let value = valuesArray[i];
        count += weight;

        if (value !== prev) {
            prev && insertItem(array,[prev, count]);
            count = 0;
        }
        
        prev = value;
    }

    return array;
}

/**
 * Find clear and conflict intervals
 * @param { object } data 
 */
const findConflictIntervals = data => {
    let clearIntervals = [],
        conflictIntervals = [],
        list = [];


    const {startList,endList } = formatDataToArrays(data);
    createWeightList(list,startList,-1);
    createWeightList(list,endList,1);
    
    for (let i = 0; i < list.length - 1; i++) {

        if ((list[i][1] === -1) && list[i + 1] && (list[i][1] + list[i + 1][1] === 0)) {
            let date1 = list[i][0];
            let date2 = list[i+1][0];
            let item = [date1, date2]
            clearIntervals.push(item);
            // TODO : remove console.log
            console.log(`OK for ${new Date(date1*1000)} - ${new Date(date2*1000)}`)
        } else {
            let date1 = list[i][0];
            let date2 = list[i+1][0];
            let item = [date1, date2];
            // accept same date for the end of a meeting and start of a new meeting
            if (date2 - date1!= 0 )  { 
                conflictIntervals.push(item);
                // TODO : remove console.log
                console.log(`KO for ${new Date(date1*1000)} - ${new Date(date2*1000)}`);
            }
        }

    }
    let conflicts = {
        clearIntervals,
        conflictIntervals
    }
    return conflicts
}

module.exports = {
    createWeightList,
    formatDataToArrays,
    findConflictIntervals
}
/**
 * Problem statement: 

The Utopian Tree goes through 2 cycles of growth every year. Each spring, it doubles in height. Each summer, its height increases by 1 meter.

Laura plants a Utopian Tree sapling with a height of 1 meter at the onset of spring. How tall will her tree be after NN growth cycles?

Input Format

The first line contains an integer, TT, the number of test cases. 
TT subsequent lines each contain an integer, NN, denoting the number of cycles for that test case.

Constraints 
1≤T≤101≤T≤10 
0≤N≤600≤N≤60
Output Format

For each test case, print the height of the Utopian Tree after NN cycles. Each height must be printed on a new line.
*/

function utopianTreeHeight(currentHeight, years) {
    var newHeight, newYear;
    // console.log('current height: ', currentHeight, '; years: ', years);
    if(years < 0 || years === 0) {
        return currentHeight;
    }
    newHeight = currentHeight*2 + 1;
    newYear = years - 2;
    return utopianTreeHeight(newHeight, newYear);
}

function testUtopianTree(testYears) {
    var i;
    if(!Array.isArray(testYears)) {
        console.log('Input needs to be an array');
        return;
    }
    for(i = 0; i < testYears.length; i++) {
        console.log('Tree height after ', testYears[i], ' years = ', utopianTreeHeight(1, testYears[i]));
    }
}

testUtopianTree([0, 1, 4]);

function shuffleArray(array){
    // Create a copy of the array to avoid modifying the original
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function generateEventCode(){
    let code = "";
    for(let i=0;i<10;i++){
        let ch = String.fromCharCode(65 + Math.random() * 26);
        code += ch;
    }
    return code;
}

module.exports = {shuffleArray,generateEventCode};
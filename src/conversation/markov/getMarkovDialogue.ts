import { dialoge } from './dialogue';
const unsure: string[] = [];
const possibilities: { [key: string]: string[] } = {};
export const getMarkovDialogue = () => {
    for (let i = 0; i < dialoge.length; i++) {
        let splitSentence: string[] = [];
        const extractedString = /(.+) (<Q>.+)/.exec(dialoge[i]);
        if (extractedString) {
            splitSentence = extractedString[1]
                .split(' ')
                .concat(extractedString[2]);
        } else {
            splitSentence = dialoge[i].split(' '); //todo, handle puctuation and regex
        }

        unsure.push(splitSentence[0]);

        for (let k = 0; k < splitSentence.length; k++) {
            const gram = splitSentence[k];
            possibilities[gram] = possibilities[gram] || [];

            if (splitSentence[k + 1]) {
                possibilities[gram].push(splitSentence[k + 1]);
            }
        }
    }
};
export const getSentence = () => {
    const sentence = [randomArrayElement(unsure)];
    let changed = true;
    while (changed) {
        const nextSegment = possibilities[sentence[sentence.length - 1]]
            ? randomArrayElement(possibilities[sentence[sentence.length - 1]])
            : null;
        if (nextSegment) {
            sentence.push(nextSegment);
        } else {
            changed = false;
        }
    }
    return sentence.join(' ');
};
const randomArrayElement = (theArray: any[]) => {
    return theArray[Math.floor(Math.random() * theArray.length)];
};

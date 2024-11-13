"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLevelInfo = void 0;
const getLevelInfo = (amount) => {
    if (amount >= 0 && amount < 100000)
        return { text: "Starter", number: 1 };
    if (amount >= 100000 && amount < 500000)
        return { text: "Bronze", number: 2 };
    if (amount >= 500000 && amount < 5000000)
        return { text: "Silver", number: 3 };
    if (amount >= 5000000 && amount < 50000000)
        return { text: "Gold", number: 4 };
    if (amount >= 50000000 && amount < 500000000)
        return { text: "Sapphire", number: 5 };
    if (amount >= 500000000 && amount < 5000000000)
        return { text: "Emerald", number: 6 };
    if (amount >= 5000000000 && amount < 50000000000)
        return { text: "Ruby", number: 7 };
    if (amount >= 50000000000 && amount < 500000000000)
        return { text: "Diamond", number: 8 };
    if (amount >= 500000000000 && amount < 1000000000000)
        return { text: "Master", number: 9 };
    if (amount >= 1000000000000 && amount < 10000000000000)
        return { text: "Legend", number: 10 };
    if (amount >= 10000000000000)
        return { text: "God", number: 11 };
    return { text: "Starter", number: 1 };
};
exports.getLevelInfo = getLevelInfo;

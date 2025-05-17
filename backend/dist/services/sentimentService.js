"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSentiment = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const labelMap = {
    LABEL_0: 'NEGATIVE',
    LABEL_1: 'NEUTRAL',
    LABEL_2: 'POSITIVE',
};
const getSentiment = async (text) => {
    try {
        const response = await axios_1.default.post('https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment', { inputs: text }, {
            headers: {
                Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
            },
        });
        console.log('Hugging Face response:', response.data);
        if (!Array.isArray(response.data) || !Array.isArray(response.data[0])) {
            throw new Error('Unexpected Hugging Face response format');
        }
        const predictions = response.data[0];
        const topPrediction = predictions.reduce((max, current) => current.score > max.score ? current : max);
        const sentiment = labelMap[topPrediction.label] || 'NEUTRAL';
        return sentiment;
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('Sentiment analysis failed:', error.message);
        }
        else {
            console.error('Sentiment analysis failed:', error);
        }
        return 'NEUTRAL';
    }
};
exports.getSentiment = getSentiment;

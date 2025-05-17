
// import axios from 'axios';

// import dotenv from 'dotenv';

// dotenv.config();



// const labelMap: Record<string, string> = {

//   LABEL_0: 'NEGATIVE',

//   LABEL_1: 'NEUTRAL',

//   LABEL_2: 'POSITIVE',

// };



// export const getSentiment = async (text: string): Promise<string> => {

//   try {

//     const response = await axios.post(

//       'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment',

//       { inputs: text },

//       {

//         headers: {

//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,

//         },

//       }

//     );



//     console.log('Hugging Face response:', response.data);



//     if (!Array.isArray(response.data) || !Array.isArray(response.data[0])) {

//       throw new Error('Unexpected Hugging Face response format');

//     }



//     const predictions = response.data[0];

//     const topPrediction = predictions.reduce((max, current) =>

//       current.score > max.score ? current : max

//     );



//     const sentiment = labelMap[topPrediction.label] || 'NEUTRAL';

//     return sentiment;

//   } catch (error: unknown) {

//     if (error instanceof Error) {

//       console.error('Sentiment analysis failed:', error.message);

//     } else {

//       console.error('Sentiment analysis failed:', error);

//     }

//     return 'NEUTRAL';

//   }

// };










import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const labelMap: Record<string, string> = {
  LABEL_0: 'NEGATIVE',
  LABEL_1: 'NEUTRAL',
  LABEL_2: 'POSITIVE',
};

type Prediction = {
  label: string;
  score: number;
};

export const getSentiment = async (text: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/cardiffnlp/twitter-roberta-base-sentiment',
      { inputs: text },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
        },
      }
    );

    console.log('Hugging Face response:', response.data);

    if (!Array.isArray(response.data) || !Array.isArray(response.data[0])) {
      throw new Error('Unexpected Hugging Face response format');
    }

    const predictions = response.data[0] as Prediction[];

    const topPrediction = predictions.reduce(
      (max: Prediction, current: Prediction) =>
        current.score > max.score ? current : max
    );

    const sentiment = labelMap[topPrediction.label] || 'NEUTRAL';

    return sentiment;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Sentiment analysis failed:', error.message);
    } else {
      console.error('Sentiment analysis failed:', error);
    }
    return 'NEUTRAL';
  }
};

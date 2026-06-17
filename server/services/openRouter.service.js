// import axios from "axios"

// export const askAi = async(messages) => {
//     try {
//         if(!messages || !Array.isArray(messages) || messages.length === 0)
//             throw new Error("Messages array is empty.")
//         const response = await axios.post("https://openrouter.ai/api/v1/chat/completions"
//        ,{
//         model :"openai/gpt-4o-mini",
//         messages :messages
//        },
//       {headers: {
//     Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//     'Content-Type': 'application/json',
//   },});
//   const content = response?.data?.choices?.[0]?.message?.content;
//    if(!content || !content.trim()) {
//     throw new Error("AI returned empty response.");
//    }  
//    return content   
// } catch (error) {
//       console.log("OpenRouter errror :",error.response?.data ||
//         error.messages);
//         throw new Error("openRouter API Error");
//     }
// }


import axios from "axios";

export const askAi = async (messages) => {
  try {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages array is empty.");
    }

    //console.log("API KEY:", process.env.OPENROUTER_API_KEY);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini",
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const content = response?.data?.choices?.[0]?.message?.content;

    if (!content?.trim()) {
      throw new Error("AI returned empty response.");
    }

    return content;
  } catch (error) {
    console.log("OpenRouter error response:", error.response?.data);
    console.log("OpenRouter error message:", error.message);
    throw error;
  }
};
import { ZuploContext, ZuploRequest } from "@zuplo/runtime";

import { environment } from "@zuplo/runtime";


export default async function (request: ZuploRequest, context: ZuploContext) {

  // Your ChatGPT API endpoint
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  // Your OpenAI API key
  const apiKey = environment.CHATGPT_API;
  

  //body
    // System message
    const systemMessage = 'You are a helpful assistant. Your users will be looking for information about publically acessible apis.  If you know of an API or APIs that match thier description, provide it. List free APIs first. For each API you list, provide a name,  URL, if it is free/paid, a link to a swagger doc, and a brief description.';
    //query parameter
    const query = request.query.api ?? "weather";
  
    
    // Construct the payload for the API call
    const payload = {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemMessage },
        { role: 'user', content: query },
      ],
    };

  //headers
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Bearer "+ apiKey);



  const response = await fetch(apiUrl, {
		method: "POST",
    headers: myHeaders,
		body: JSON.stringify(payload)
	});
  const responseJson = await response.json();
  

  
  return responseJson.choices[0].message.content;
}
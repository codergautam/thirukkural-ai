import generateResponse from "./lib/generateResponse.js";
// import promptSync from 'prompt-sync';
import kuralData from "./data.json" assert { type: "json" };
import express from "express"
import path from "path"
import bodyParser from "body-parser"
import * as url from 'url';
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const app = express();

app.use(bodyParser.json())

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"))
})

app.post("/query", async (req, res) => {
  let data = req.body?.prompt;
  if (data) {
    let answer = await generateResponse({
      prompt: data,
    });
    console.log(data)

    // Find the kural number
    let ind = answer.indexOf("Kural") + 5;
    let num = "";
    let kural = "";
    while (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(answer[ind]) || (num.length == 0 && ind < answer.length)) {
      if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(answer[ind])) num += answer[ind]
      ind++;
    }

    try {
      let numOut = Number(num)
      kural = kuralData.kural[numOut - 1];

    } catch (e) {
      console.log("Failed to find kural", e)
    }

    if(kural) answer+="\n\n"+kural.Line1+"\n"+kural.Line2+"\n\n"+"Tamil Meaning: "+kural.mv

    res.send(JSON.stringify({
      output: answer
    }));


  } else res.send(JSON.stringify({
    output: "Couldn't read your question."
  }))
})

app.listen(3000, () => {
  console.log("Express server started")
})

/*
while (true) {
  const question = prompt("Ask a question >");
  const answer = await generateResponse({
    prompt: question,
  });

  console.log(`${answer}\n`);

  // Find the kural number
  let ind = answer.indexOf("Kural")+5;
  let num = "";
  while(["0","1","2","3","4","5","6","7","8","9"].includes(answer[ind]) || (num.length==0 && ind < answer.length)) {
    if(["0","1","2","3","4","5","6","7","8","9"].includes(answer[ind])) num+=answer[ind]
    ind++;
  }
  try {
   let numOut = Number(num)
    let kural = data.kural[numOut-1];
    console.log(kural.Line1+"\n"+kural.Line2)
  } catch(e) {
    console.log(e)
    console.log("Failed to fetch exact text")
  }
}
*/
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "./data.json");
const outputPath = path.join(__dirname, "./output.md");

const data = fs.readFileSync(filePath, "utf8");
const json = JSON.parse(data);

let output = ``;

json.kural.forEach((kural) => {


    output += `
   ${kural.paul_translation} - ${kural.iyal_translation} - ${kural.adikaram_translation}
    Kural #${kural.Number}:
    Exact Translation: ${kural.Translation}
    Meaning: ${kural.explanation}
    
  `
  
  // output += `
  //   ${kural.paul_name} (${kural.paul_translation}) - ${kural.iyal_name} (${kural.iyal_translation}) - ${kural.adikaram_name} (${kural.adikaram_translation})
  //   Kural ${kural.Number}:
  //   ${kural.Line1}
  //   ${kural.Line2}
  //   Translation: ${kural.Translation}
  //   Meaning: ${kural.explanation}
  
  // `
  // output += `Kural ${kural.Number}: ${kural.explanation}
  // `
})

fs.writeFileSync(outputPath, output);
import {input, select} from "@inquirer/prompts";

(async() => {
  const answers = {
    inputted: await input({message: "What is your name?"}),
    selected: await select({message: "What is your number?", choices: [{value: "1"}, {value: "2"}]}),
  }

  console.log(answers.inputted, answers.selected)
})()

import {input} from "@inquirer/prompts";
import {Command} from "commander";

const program = new Command();
program
  .command('hello')
  .action(async () => {
    console.log('hi');
    const answer = await input({message: "What is your name?"})
    console.log(answer);
  });
program.parse(process.argv);

import {Command} from "commander";
import {addInitCommand} from "~/init";
import {addAddEmployeeCommand, addEditEmployeeCommand, addRemoveEmployeeCommand} from "~/employee";
import {addCreateTeamCommand, addDisbandTeamCommand, addEditTeamCommand, addListTeamCommand} from "~/team";
import {addAddDeveloperCommand, addRemoveDeveloperCommand} from "~/developer";

const program = new Command();

type AddCommand = (program: Command) => void
const commands: AddCommand[] = [
  addInitCommand,
  // employee
  addAddEmployeeCommand,
  addEditEmployeeCommand,
  addRemoveEmployeeCommand,
  // team
  addCreateTeamCommand,
  addListTeamCommand,
  addEditTeamCommand,
  addDisbandTeamCommand,
  // developer
  addAddDeveloperCommand,
  addRemoveDeveloperCommand,
]

for (const command of commands) {
  command(program)
}

program.parse(process.argv);

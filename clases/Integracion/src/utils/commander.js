import {Command} from "commander";

const commander = new Command();

commander
    .option("--mode <mode>", "Modo de ejecución de nuestra app")
    .parse()

export default commander;
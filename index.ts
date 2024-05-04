import { ProjectData } from "./types";
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

// async function confirm_input(): Promise<boolean> {
//   let confirmed = false;

//   rl.question("Confirm input? [y/n]: ", (answer) => {
//     switch (answer.toLowerCase()) {
//       case "y":
//         confirmed = true;
//       case "n":
//         confirmed = false;
//       default:
//         console.log("Invalid confirmation, resetting input...");
//         confirmed = false;
//     }
//   });

//   return confirmed;
// }

async function gather_inputs(): Promise<ProjectData> {
  let data: ProjectData = {
    title: "",
    card_image: "",
    description: "",
    modal_text: "",
    modal_title: "",
  };

  const loop_length = Object.keys(data).length; // number of parameters in ProjectData

  for (let i = 0; i < loop_length; i++) {
    switch (i) {
      case 0:
        data.title = await question("Set project title [title field]: ");
        console.log("title: ", data.title);
        // let confirmed = await confirm_input();
        // if (!confirmed) i--;

        break;
      case 1:
        data.description = await question("Give project a description [description]: ");
        console.log("title: ", data.description);

        break;
      case 2:
        data.modal_title = await question("Give the project modal a title [modal_title]: ");
        console.log("modal_title: ", data.modal_title);

        break;
      case 3:
        data.modal_text = await question("Give the modal some text [modal_text]: ");
        console.log("title: ", data.modal_text);

        break;
      case 4:
        data.card_image = await question("Give the project a firebase image link [card_image]: ");
        console.log("title: ", data.card_image);

        break;
      default:
        break;
    }
  }

  rl.close();

  console.log("Created the following object:");
  console.log(data);

  return data;
}

async function main() {
  try {
    let data: ProjectData = await gather_inputs();
    console.log(data);
  } catch (error) {
    console.error("Could not fetch inputs: ", error);
  }
}

main();

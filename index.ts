import { ProjectData } from "./types";
import * as readline from "readline";

var data: ProjectData = {
  title: "",
  description: "",
  modal_title: "",
  modal_text: "",
  card_image: "",
};

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

async function main() {
  try {
    data.title = await question("Set project title [title field]: ");
    console.log("title: ", data.title);

    data.description = await question(
      "Give project a description [description]: "
    );
    console.log("title: ", data.description);

    data.modal_title = await question(
      "Give the project modal a title [modal_title]: "
    );
    console.log("modal_title: ", data.modal_title);

    data.modal_text = await question("Give the modal some text [modal_text]: ");
    console.log("title: ", data.modal_text);

    data.card_image = await question(
      "Give the project a firebase image link [card_image]: "
    );
    console.log("title: ", data.card_image);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    var jsonData = JSON.stringify(data, null, 2);
    console.log("Created the following json object:");
    console.log(jsonData);
    rl.close();
  }
}

main();

// function confirm_input(field: string) {
//   rl.question("Confirm input? [y/n] ", (answer) => {
//     switch (answer.toLowerCase()) {
//       case "y":
//         break;

//       case "n":

//       default:
//         break;
//     }
//   });
// }

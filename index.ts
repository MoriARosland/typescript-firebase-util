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

function confirm_input(input: string): Promise<boolean> {
  return new Promise((resolve) => {
    rl.question(`Is this correct: "${input}"? [y/n]: `, (answer) => {
      resolve(answer.toLowerCase() === "y");
    });
  });
}

async function gather_inputs(): Promise<ProjectData> {
  const fields: { key: keyof ProjectData; prompt: string }[] = [
    { key: "title", prompt: "Set project title [title]: " },
    { key: "description", prompt: "Give project a description [description]: " },
    { key: "modal_title", prompt: "Give the project modal a title [modal_title]: " },
    { key: "modal_text", prompt: "Give the modal some text [modal_text]: " },
    { key: "card_image", prompt: "Give the project a firebase image link [card_image]: " },
  ];

  let data: ProjectData = {
    title: "",
    description: "",
    modal_title: "",
    modal_text: "",
    card_image: "",
  };

  for (const field of fields) {
    let valid = false;
    while (!valid) {
      const response = await question(field.prompt);
      valid = await confirm_input(response);
      if (valid) {
        data[field.key] = response;
      }
    }
  }

  rl.close();
  console.log("Inputs recorded: \n", data);
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

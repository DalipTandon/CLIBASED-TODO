import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import { TIMEOUT } from "dns";
import { title } from "process";
import boxen from "boxen";

class TodoApp {
    async sleep() {
        return new Promise((resolve) => setTimeout(resolve, 5000));
    }

    async welcomeScreen() {
        const startAnimation = chalkAnimation.karaoke(boxen(
            `
        .____________________.
        |   [1] ADD         |
        |   [2] REMOVE      |
        |   [3] DELETE      |
        |   [4] VIEW        |
        |   [5] EXIT        |
        .___________________|                   
            `,{
                title:"TODO APP",
                titleAlignment:"center",
                borderStyle:"classic",
                float:"left",
            }
        ));
        await this.sleep();
        startAnimation.stop(); // Stops the aniz`mation after 3 seconds
    }


}

const todo = new TodoApp();
todo.welcomeScreen();

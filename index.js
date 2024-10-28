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
     todoArray=[];
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
        this.main();
    }
   async addTask(){
        const userInput=await inquirer.prompt([
          {
            type:"input",
            name:"todoItem",
            message:"Add item to list => ",
          }

        ]) 
        this.todoArray.push(userInput.todoItem)
        console.log("Item added Succesfully");
        
    }
   
    async deleteTask(){
        const deleteTask=await inquirer.prompt([
            {
                type:"list",
                name:"todoItem",
                message:"Delete the Item from list",
                choices:this.todoArray,
            }
        ])
        const deleteIndex=this.todoArray.indexOf(deleteTask.todoItem);
        this.todoArray.splice(deleteIndex,1);
        console.log(`Your item : ${deleteTask.todoItem} is deleted`);
    }
    async updateTask(){
        const userInput=await inquirer.prompt([
            {
                type:"list",
                name:"todoItem",
                message:"Update todo task",
                choices:this.todoArray,
            },{
                type:"input",
                name:"updatedTask",
                message:"Enter updated task",
            }
        ])
        const oldTodoInde=this.todoArray.indexOf(userInput.todoItem);
        this.todoArray[oldTodoInde]=userInput.updatedTask;
        console.log("Your List has been updatd successfully !!");
        
    }
    async endAnimation(){
        const endTask=chalkAnimation.karaoke(
            "THANKS FOR USING OUR TODO !!!"
        )
        await this.sleep();
        endTask.stop();
    }

    async main(){
        let flag =true;
       let toDoOperations =["ADD","VIEW","DELETE","UPDATE","EXIT"];
        do{
            const userInput=await inquirer.prompt([
                {
                    name:"choice",
                    type:"list",
                    message:"Select your Desired operation",
                    choices:toDoOperations,

                }
            ]);
            switch(userInput.choice){
                case toDoOperations[0]:
                await this.addTask();
                break;

                case toDoOperations[1]:
                    if(this.todoArray.length ===0){
                        console.log("Your TODO list is empty");
                        
                    }else{
                        this.todoArray.forEach((item, index) => {
                            console.log(`${index + 1}. ${item}`);
                        });
                    }
                    break;

            case toDoOperations[2]:
                if(this.todoArray.length ===0){
                    console.log("No items in TODO to be deleted");
                    
                }else{
                    await this.deleteTask();
                }
                break;

            case toDoOperations[3]:
                if(this.todoArray.length===0){
                    console.log("No items in todo ");
                    
                }else{
                    await this.updateTask();
                }
                break;


            
                case toDoOperations[4]:
                    this.endAnimation();
                    flag=false;
                    break;
                default:
                    break;
            }



        }while(flag)
    }
}

const todo = new TodoApp();
todo.welcomeScreen();

// importing classes from other files
import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";

// define the Cli class
interface Vehicle {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  printDetails(): void;
  start(): void;
  accelerate(amount: number): void;
  decelerate(amount: number): void;
  stop(): void;
  turn(direction: string): void;
  reverse(): void;
}

interface TruckInterface extends Vehicle {
  towingCapacity: number;
}

interface MotorbikeInterface extends Vehicle {
  frontWheelDiameter: number;
  frontWheelBrand: string;
  rearWheelDiameter: number;
  rearWheelBrand: string;
  performWheelie(): void;
}

class Cli {
  vehicles: (Car | Truck | Motorbike | MotorbikeInterface | TruckInterface)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            };
          }),
        },
      ])
      .then((answers: { selectedVehicleVin: string }) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers: { vehicleType: string }) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then(
        (answers: {
          color: string;
          make: string;
          model: string;
          year: string;
          weight: string;
          topSpeed: string;
        }) => {
          const car = new Car(
            Cli.generateVin(),
            answers.color,
            answers.make,
            answers.model,
            parseInt(answers.year),
            parseInt(answers.weight),
            parseInt(answers.topSpeed),
            []
          );
          this.vehicles.push(car);
          this.selectedVehicleVin = car.vin;
          this.performActions();
        }
      );
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        {
          type: "input",
          name: "towingCapacity",
          message: "Enter Towing Capacity",
        },
      ])
      .then(
        (answers: {
          color: string;
          make: string;
          model: string;
          year: string;
          weight: string;
          topSpeed: string;
          towingCapacity: string;
        }) => {
          const wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];

          const truck = new Truck(
            Cli.generateVin(),
            answers.color,
            answers.make,
            answers.model,
            parseInt(answers.year),
            parseInt(answers.weight),
            parseInt(answers.topSpeed),
            wheels, // Pass the wheels array here
            parseInt(answers.towingCapacity) // Pass the towing capacity
          );
          this.vehicles.push(truck);
          this.selectedVehicleVin = truck.vin;
          this.performActions();
        }
      );
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        {
          type: "input",
          name: "frontWheelDiameter",
          message: "Enter Front Wheel Diameter",
        },
        {
          type: "input",
          name: "frontWheelBrand",
          message: "Enter Front Wheel Brand",
        },
        {
          type: "input",
          name: "rearWheelDiameter",
          message: "Enter Rear Wheel Diameter",
        },
        {
          type: "input",
          name: "rearWheelBrand",
          message: "Enter Rear Wheel Brand",
        },
      ])
      .then(
        (answers: {
          color: string;
          make: string;
          model: string;
          year: string;
          weight: string;
          topSpeed: string;
          frontWheelDiameter: string;
          frontWheelBrand: string;
          rearWheelDiameter: string;
          rearWheelBrand: string;
        }) => {
          // Create an array of Wheel objects for the motorbike
          const wheels = [
            new Wheel(
              parseInt(answers.frontWheelDiameter),
              answers.frontWheelBrand
            ), // Create front wheel
            new Wheel(
              parseInt(answers.rearWheelDiameter),
              answers.rearWheelBrand
            ), // Create rear wheel
          ];

          // Instantiate the Motorbike
          const motorbike = new Motorbike(
            Cli.generateVin(),
            answers.color,
            answers.make,
            answers.model,
            parseInt(answers.year),
            parseInt(answers.weight),
            parseInt(answers.topSpeed),
            wheels // Pass the wheels array here
          );
          this.vehicles.push(motorbike);
          this.selectedVehicleVin = motorbike.vin;
          this.performActions();
        }
      );
  }

  findVehicleToTow(truck: TruckInterface): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles.map((vehicle) => {
            return {
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle,
            };
          }),
        },
      ])
      .then((answers: { vehicleToTow: Vehicle }) => {
        if (answers.vehicleToTow.vin === truck.vin) {
          console.log("The truck cannot tow itself.");
          this.performActions();
        } else {
          console.log(`Towing vehicle: ${answers.vehicleToTow.vin}`);
          this.performActions();
        }
      });
  }

  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow a vehicle",
            "Perform a wheelie",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers: { action: string }) => {
        for (let i = 0; i < this.vehicles.length; i++) {
          if (this.vehicles[i].vin === this.selectedVehicleVin) {
            const selectedVehicle = this.vehicles[i];

            if (answers.action === "Print details") {
              selectedVehicle.printDetails();
            } else if (answers.action === "Start vehicle") {
              selectedVehicle.start();
            } else if (answers.action === "Accelerate 5 MPH") {
              selectedVehicle.accelerate(5);
            } else if (answers.action === "Decelerate 5 MPH") {
              selectedVehicle.decelerate(5);
            } else if (answers.action === "Stop vehicle") {
              selectedVehicle.stop();
            } else if (answers.action === "Turn right") {
              selectedVehicle.turn("right");
            } else if (answers.action === "Turn left") {
              selectedVehicle.turn("left");
            } else if (answers.action === "Reverse") {
              selectedVehicle.reverse();
            } else if (answers.action === "Tow a vehicle") {
              if (selectedVehicle instanceof Truck) {
                this.findVehicleToTow(selectedVehicle);
                return;
              } else {
                console.log("Only trucks can tow vehicles.");
              }
            } else if (answers.action === "Perform a wheelie") {
              if (selectedVehicle instanceof Motorbike) {
                selectedVehicle.performWheelie();
              } else {
                console.log("Only motorbikes can perform a wheelie.");
              }
            } else if (answers.action === "Select or create another vehicle") {
              this.startCli();
              return;
            } else {
              this.exit = true;
            }
          }
        }

        if (!this.exit) {
          this.performActions();
        }
      });
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message:
            "Would you like to create a new vehicle or perform an action on an existing vehicle?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers: { CreateOrSelect: string }) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}

export default Cli;

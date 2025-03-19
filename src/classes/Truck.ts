// Import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from "./Vehicle.js";
import Motorbike from "./Motorbike.js";
import Car from "./Car.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow.js";

// Truck class that extends Vehicle and implements AbleToTow
class Truck extends Vehicle implements AbleToTow {
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  // Constructor for the Truck class
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {
    super(); // Call the parent class constructor
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;

    // Check if the wheels array has 4 elements; if not, create 4 new default Wheel objects
    this.wheels =
      wheels.length === 4
        ? wheels
        : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }

  // Implement the tow method from the AbleToTow interface
  tow(vehicle: Truck | Motorbike | Car): void {
    // Use type guards to check if the vehicle has weight, make, and model properties
    if ("weight" in vehicle) {
      const vehicleWeight = vehicle.weight;

      if ("make" in vehicle && "model" in vehicle) {
        if (vehicleWeight <= this.towingCapacity) {
          console.log(`Towing ${vehicle.make} ${vehicle.model}`);
        } else {
          console.log(
            `${vehicle.make} ${vehicle.model} is too heavy to be towed`
          );
        }
      } else {
        console.log("The vehicle does not have make and model properties.");
      }
    } else {
      console.log("The vehicle does not have a weight property.");
    }
  }

  // Override the printDetails method from the Vehicle class
  override printDetails(): void {
    super.printDetails(); // Call the parent class method
    console.log(`VIN: ${this.vin}`);
    console.log(`Color: ${this.color}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);
    console.log(`Towing Capacity: ${this.towingCapacity} lbs`);

    // Print details of the wheels
    this.wheels.forEach((wheel, index) => {
      console.log(
        `Wheel ${index + 1}: ${wheel.getDiameter} inch with a ${
          wheel.getTireBrand
        } tire`
      );
    });
  }
}

// Export the Truck class as the default export
export default Truck;

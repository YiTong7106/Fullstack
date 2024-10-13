// src/app/models/package.ts

export class Package {
    _id ?: string;
    package_id: string;
    package_title: string;
    package_weight: number;
    package_destination: string;
    package_description?: string;
    createdAt?: Date;
    isAllocated?: boolean;
    driver_id: string;
  
    constructor(
      package_id: string,
      package_title: string,
      package_weight: number,
      package_destination: string,
      driver_id: string,
      package_description: string = '',
      isAllocated: boolean = false,
      createdAt: Date = new Date()
    ) {
      this.package_id = package_id;
      this.package_title = package_title;
      this.package_weight = package_weight;
      this.package_destination = package_destination;
      this.package_description = package_description;
      this.isAllocated = isAllocated;
      this.createdAt = createdAt;
      this.driver_id = driver_id;
    }
  }
  
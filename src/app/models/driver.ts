export class Driver {
    _id ?: string;
    driver_id?: string;
    driver_name: string;
    driver_department: 'food' | 'furniture' | 'electronic' | 'Food' | 'Furniture' | 'Electronic';
    driver_licence: string;
    driver_isActive?: boolean;
    driver_createdAt?: Date;
    assigned_packages?: string[];
  
    constructor(
      driver_name: string,
      driver_department: 'Food' | 'Furniture' | 'Electronic',
      driver_licence: string,
      driver_isActive: boolean = true
    ) {
      this.driver_name = driver_name;
      this.driver_department = driver_department;
      this.driver_licence = driver_licence;
      this.driver_isActive = driver_isActive;
    }
  }
  
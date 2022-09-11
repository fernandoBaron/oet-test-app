export interface VehicleInterface {
  id?: number | null;
  plate: string;
  carBodywork: string;
  configuration: string;
  model?: number;
  vehiclePicture?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;

  fileName?: string, 
  filePath?: string,
}

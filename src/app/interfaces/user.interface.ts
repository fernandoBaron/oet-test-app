export interface UserInterface {
  id?: number | null;
  email: string;
  phone: string;
  identification?: number;
  identificationType?: string;
  firstname: string;
  lastname: string;
  documentFrontImage?: any;
  documentBackImage?: any;
  password?: string;
  latitude?: number;
  longitude?: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

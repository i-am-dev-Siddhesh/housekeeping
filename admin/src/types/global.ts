export interface IAdmin {
  id: number;
  name: string;
  email: string;
  password: string;
  workers: IWorker[];
  updations: IWorkerUpdationHistory[];
  createdAt: Date;
  updatedAt: Date;
}
export interface ILocation {
  lat: number;
  lon: number;
  label: string;
}


export interface IUpdateCustomer {
    id: number;
    name?: string;
    password?: string;
    email?: string;
    phoneNumber?: string;
    location?: ILocation;
  }
  

export interface ICreateCustomer {
  id: number;
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  location: ILocation | null;
}

export interface ICustomer {
  id: number;
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  profileUrl?: string | null;
  location?: ILocation | null;
  orders: IOrder[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IWorker {
  id: number;
  name: string;
  phoneNumber: string;
  kycVerified: boolean;
  availableFrom: Date;
  location?: ILocation | null;
  minimumRequiredMonthlyIncome: number;
  leavesTaken: number;
  profileUrl?: string | null;
  orders: IOrder[];
  slots: ISlot[];
  addedBy: IAdmin;
  updations: IWorkerUpdationHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IOrder {
  id: number;
  customer: ICustomer;
  worker?: IWorker | null;
  budget: number;
  location?: ILocation | null;
  time: Date;
  status: OrderStatus;
  slot?: ISlot | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISlot {
  id: number;
  worker: IWorker;
  startTime: Date;
  endTime: Date;
  status: SlotStatus;
  order?: IOrder | null;
}

export interface IOTP {
  id: number;
  phoneNumber: string;
  otp: string;
  expirationTime: Date;
}

export interface ICommon {
  id: number;
  play_store_app_version: string;
  createdAt: Date;
  updatedAt?: Date | null;
}

export interface IWorkerUpdationHistory {
  id: number;
  admin: IAdmin;
  worker: IWorker;
  updatedAt: Date;
  reason: string;
}

// Enum types
type OrderStatus =
  | 'PENDING'
  | 'ASSIGNED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'CANCELLED';
type SlotStatus = 'AVAILABLE' | 'BOOKED' | 'RESERVED';

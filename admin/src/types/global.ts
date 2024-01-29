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
export enum SlotStatus {
  AVAILABLE = 'AVAILABLE',
  BOOKED = 'BOOKED',
  RESERVED = 'RESERVED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export interface ILocation {
  lat: number;
  lon: number;
  label: string;
}
export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string;
  workers: Worker[];
  updations: WorkerUpdationHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICustomer {
  id: number;
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
  profileUrl?: string;
  location?: JSON;
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
  location?: JSON;
  minimumRequiredMonthlyIncome: number;
  leavesTaken: number;
  profileUrl?: string;
  orders: IOrder[];
  slots: ISlot[];
  addedBy: Admin;
  addedById: number;
  updations: WorkerUpdationHistory[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateOrder {
  customerId: number;
  worker?: Worker;
  workerId?: number;
  phoneNumber: string;
  budget: number;
  location?: JSON;
  expectedStartDate: Date;
  actualStartDate: Date;
  status: OrderStatus;
  slots: number[];
}
export interface IOrder {
  id: number;
  customer: ICustomer;
  customerId: number;
  worker?: Worker;
  workerId?: number;
  phoneNumber: string;
  budget: number;
  location?: JSON;
  expectedStartDate: Date;
  actualStartDate: Date;
  status: OrderStatus;
  slots: ISlot[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ISlot {
  id: number;
  worker: Worker;
  workerId: number;
  slotNumber: number;
  status: SlotStatus;
  order?: IOrder;
  orderId?: number;
}

export interface OTP {
  id: number;
  phoneNumber: string;
  otp: string;
  expirationTime: Date;
}

export interface Common {
  id: number;
  playStoreAppVersion: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface WorkerUpdationHistory {
  id: number;
  admin: Admin;
  adminId: number;
  worker: Worker;
  workerId: number;
  updatedAt: Date;
  reason: string;
}

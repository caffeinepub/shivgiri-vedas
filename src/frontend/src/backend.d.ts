import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Order {
    id: string;
    customerName: string;
    status: string;
    customerPhone: string;
    productName: string;
    productSize: string;
    customerAddress: string;
    timestamp: Time;
    quantity: bigint;
    customerEmail: string;
    productPrice: number;
}
export interface ContactSubmission {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignFirstAdmin(): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllContactSubmissions(): Promise<Array<ContactSubmission>>;
    getAllNewsletterSubscribers(): Promise<Array<string>>;
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserRole(): Promise<UserRole>;
    isCallerAdmin(): Promise<boolean>;
    placeOrder(customerName: string, customerPhone: string, customerEmail: string, customerAddress: string, productName: string, productSize: string, productPrice: number, quantity: bigint): Promise<string>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
    subscribeToNewsletter(email: string): Promise<void>;
    updateOrderStatus(orderId: string, newStatus: string): Promise<void>;
}

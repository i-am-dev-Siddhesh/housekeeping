const Services = {
  Me: "admin/auth/me",
  Login: "admin/auth/login",
  Logout: "admin/auth/logout",
  
  worker: "/admin/worker",
  createWorker: "/admin/worker/create",
  updateWorker: "/admin/worker/update",
  workers: "/admin/worker/all",

  customer: "/admin/customer",
  createCustomer: "/admin/customer/create",
  updateCustomer: "/admin/customer/update",
  customers: "/admin/customer/all",

  order: "/admin/order",
  createOrder: "/admin/order/create",
  updateOrder: "/admin/order/update",
  orders: "/admin/order/all",

} as const;

export default Services;

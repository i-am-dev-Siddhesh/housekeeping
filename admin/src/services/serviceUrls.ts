const Services = {
  Me: "admin/auth/me",
  Login: "admin/auth/login",
  Logout: "admin/auth/logout",
  
  worker: "/admin/worker",
  createWorker: "/admin/worker/create",
  workers: "/admin/worker/all",
} as const;

export default Services;

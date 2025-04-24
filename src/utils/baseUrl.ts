export const getBaseUrl = (): string => {
  if (typeof window !== "undefined") {
    return process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;
  } else {
    const localAddress = "http://192.168.11.4:3000";
    return process.env.NEXT_PUBLIC_API_BASE_URL ?? localAddress;
  }
};
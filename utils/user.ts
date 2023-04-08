import axiosInstance from './axios';
import { getCookie, getPayloadFromToken } from './cookie';
export async function getUserData(
  userId: string | undefined,
  jwtAccess: string | undefined
) {
  if (!!userId || !!jwtAccess) {
    const response = await axiosInstance.get(`/api/user/${userId}`, {
      headers: { Authorization: `Bearer ${jwtAccess}` },
    });
    const data = response.data;
    const { user } = data;
    return user;
  }
  return null;
}

export function getRole() {
  const role: string | undefined =
    getPayloadFromToken(getCookie('jwt_refresh'))?.role || undefined;
  return role;
}

import axiosInstance from './axios';
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

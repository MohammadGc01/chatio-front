import { jwtDecode } from 'jwt-decode'

export function decode(token) {
  if (!token) {
    return {
      message: 'token was not here',
    }
  }

  try {
    const user = jwtDecode(token)
    if (user.exp && Date.now() >= user.exp * 1000) {
      localStorage.removeItem("chatio_token");
      return false
    }
    return user
  } catch (error) {
    return {
      message: 'Invalid token',
      error: error.message,
    }
  }
}

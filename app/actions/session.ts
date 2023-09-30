import { cookies } from "next/headers";

export async function getSession() {
  const nextCookies = cookies();
  const token = nextCookies.get("token");

  if (token) {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/profile`,
      {
        headers: {
          authorization: `Bearer ${token.value}`,
        },
      }
    ).then((response) => response.json());

    if (!data.statusCode) {
      return {
        ...data,
        token: token.value,
      };
    }
  }
  return null;
}

export const getTitleDetails = async (id: string) => {
  const res = await fetch(
    `https://${process.env.EXPO_PUBLIC_RAPID_API_HOST}/v1/title/?id=${id}`,
    {
      headers: {
        "x-rapidapi-key": process.env.EXPO_PUBLIC_RAPID_API_KEY!,
        "x-rapidapi-host": process.env.EXPO_PUBLIC_RAPID_API_HOST!,
      },
    }
  );
  return res.json();
};
export const searchMovies = async (searchTerm: string) => {
  const res = await fetch(
    `https://${process.env.EXPO_PUBLIC_RAPID_API_HOST}/v1/find/?query=${searchTerm}`,
    {
      headers: {
        "x-rapidapi-key": process.env.EXPO_PUBLIC_RAPID_API_KEY!,
        "x-rapidapi-host": process.env.EXPO_PUBLIC_RAPID_API_HOST!,
      },
    }
  );
  const data = await res.json();
  return data;
};

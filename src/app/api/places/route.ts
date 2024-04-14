export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  const RAPID_HOST = process.env.RAPID_API_HOST;
  const RAPID_KEY = process.env.RAPID_API_KEY;

  try {
    const url = `https://${RAPID_HOST}/v1/geo/cities?namePrefix=${city}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Host": `${RAPID_HOST}`,
        "X-RapidAPI-Key": `${RAPID_KEY}`,
      },
    });
    const data = await response.json();

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
};

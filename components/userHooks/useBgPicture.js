import useSWR from "swr";

export const useBgPicture = () => {
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_API}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const fetcher = (url) => fetch(url, requestOptions).then((r) => r.json());

  const { data, error } = useSWR(
    `https://api.unsplash.com/search/photos?page=1&query=cuba`,
    fetcher
  );

  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};

import useSWR from "swr";

export const useTwilioLookUp = (phoneNumber) => {
  let myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Basic ${process.env.NEXT_PUBLIC_TWILIO_BASE64_AUTH}`
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const url = `https://lookups.twilio.com/v1/PhoneNumbers/${phoneNumber}`;

  const fetcher = (url) => fetch(url, requestOptions).then((r) => r.json());
  const { data, error } = useSWR(url, fetcher);

  return { data, error };
};

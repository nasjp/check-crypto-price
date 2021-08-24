import { truncate } from "fs";

export type TokenResponse = {
  updated_at: string;
  data: {
    name: string;
    symbol: string;
    price: string;
    price_BNB: string;
  };
};

export const fetcher = async (
  ...addresses: string[]
): Promise<TokenResponse[] | null> => {
  console.log("request...");
  return Promise.all(
    addresses.map(async (address) => {
      return fetch(
        `https://api.pancakeswap.info/api/v2/tokens/${address}`
      ).then((res) => res.json());
    })
  );
};

export const unixNanoStrToTime = (timestamp: string) => {
  const date = new Date(parseInt(timestamp));
  const yyyy = `${date.getFullYear()}`;
  const MM = `0${date.getMonth() + 1}`.slice(-2);
  const dd = `0${date.getDate()}`.slice(-2);
  const HH = `0${date.getHours()}`.slice(-2);
  const mm = `0${date.getMinutes()}`.slice(-2);
  const ss = `0${date.getSeconds()}`.slice(-2);

  return `${yyyy}/${MM}/${dd} ${HH}:${mm}:${ss}`;
};

export const truncatePriceStr = (price: string, floor: number) => {
  return (
    Math.floor(parseFloat(price) * Math.pow(10, floor)) / Math.pow(10, floor)
  );
};

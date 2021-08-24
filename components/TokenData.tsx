import React from "react";
import useSWR from "swr";
import { fetcher, unixNanoStrToTime, truncatePriceStr } from "./token";

type Props = {
  addresses: string[];
};

const TokenData = ({ addresses }: Props) => {
  const { data, error } = useSWR(addresses, fetcher, {
    refreshInterval: 10000,
  });

  if (error) {
    return <p>error...</p>;
  }

  const isLoading = !error && !data;

  if (isLoading) {
    return <p>loading...</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>symbol</th>
          <th>price(USD)</th>
          <th>price(BND)</th>
          <th>updated at</th>
        </tr>
      </thead>
      <tbody>
        {data.map((token) => (
          <tr key={token.data.symbol}>
            <td>{token.data.name}</td>
            <td>{token.data.symbol}</td>
            <td>{truncatePriceStr(token.data.price, 3)}</td>
            <td>{truncatePriceStr(token.data.price_BNB, 8)}</td>
            <td>{unixNanoStrToTime(token.updated_at)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TokenData;

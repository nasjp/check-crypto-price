import React from "react";
import useSWR from "swr";
import { fetcher, unixNanoStrToTime, truncatePriceStr } from "./token";

type Props = {
  addresses: string[];
};

function useToken(addresses: string[]) {
  const { data, error } = useSWR(addresses, fetcher);

  return {
    tokens: data,
    isLoading: !error && !data,
    isError: error,
  };
}

const TokenData = ({ addresses }: Props) => {
  const { tokens, isLoading, isError } = useToken(addresses);

  return (
    <>
      <h1>Latest token price on PancakeSwap</h1>

      {isLoading && <p>loading...</p>}

      {isError && <p>Error...</p>}

      {!isLoading && (
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
            {tokens.map((token) => (
              <>
                <tr>
                  <td>{token.data.name}</td>
                  <td>{token.data.symbol}</td>
                  <td>{truncatePriceStr(token.data.price, 3)}</td>
                  <td>{truncatePriceStr(token.data.price_BNB, 8)}</td>
                  <td>{unixNanoStrToTime(token.updated_at)}</td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      )}
      <div></div>
    </>
  );
};

export default TokenData;

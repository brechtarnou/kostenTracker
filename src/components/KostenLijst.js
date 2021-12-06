import React from "react";
import { deleteRecord } from "../utils/database";
import { Link } from "@reach/router";

const KostenLijst = ({ costs, setCosts, setInput }) => {
  return (
    <ul>
      {costs.map(({ ref, data }) => {
        return (
          <li key={ref.value.id}>
            <Link to={`/detail/${ref.value.id}`}>
              {data.cost} - {data.amount} euro - owner: {data.costOwner}
            </Link>
            <button
              onClick={() => {
                setInput({
                  cost: data.cost,
                  amount: parseFloat(data.amount),
                  costOwner: data.costOwner,
                  id: ref.value.id,
                });
              }}
              style={{ marginLeft: "10px" }}
            >
              Update
            </button>
            <button
              onClick={async () => {
                await deleteRecord(ref.value.id);
                const myCosts = costs.filter(
                  (c) => ref.value.id !== c.ref.value.id
                );
                setCosts(myCosts);
              }}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default KostenLijst;

import React from "react";
import { createRecord, updateRecord } from "../utils/database";

const KostenForm = ({ input, setInput, costs, setCosts }) => {
  return (
    <div>
      <div>
        <label htmlFor="cost">Beschrijving kost: </label>
        <input
          name="cost"
          value={input.cost}
          onChange={(e) => setInput({ ...input, cost: e.target.value })}
          type="text"
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label htmlFor="amount">Totale kost in euro: </label>
        <input
          name="amount"
          value={input.amount}
          type="number"
          onChange={(e) => setInput({ ...input, amount: e.target.value })}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <label htmlFor="owner">Persoon met kosten: </label>
        <input
          name="owner"
          value={input.costOwner}
          type="text"
          onChange={(e) => setInput({ ...input, costOwner: e.target.value })}
        />
      </div>
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={async () => {
            if (input.id) {
              const response = await updateRecord(input.id, input);
              const updatedCosts = costs.map((cost) => {
                if (cost.ref.value.id === response.ref.value.id) {
                  return response;
                }
                return cost;
              });
              setCosts(updatedCosts);
            } else {
              const response = await createRecord(input);
              setCosts([...costs, response]);
            }

            setInput({ cost: "", amount: 0, costOwner: "", id: "" });
          }}
        >
          Opslaan
        </button>
      </div>
    </div>
  );
};

export default KostenForm;

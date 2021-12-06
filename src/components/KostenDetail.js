/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "@reach/router";
import React, { useEffect, useState } from "react";
import { getRecord, updateRecord } from "../utils/database";

const KostenDetail = ({ input }) => {
  const { ref } = useParams();
  const [details, setDetails] = useState();
  const [betaalmethode, setBetaalmethode] = useState();

  useEffect(() => {
    async function fetchData() {
      const response = await getRecord(ref);

      setDetails(response.data);
    }
    fetchData();
  }, [ref]);

  if (!details) return null;
  return (
    <div>
      <div>
        <label htmlFor="betaalmethode">Betaalmethode</label>
        <select
          name="betaalmethode"
          id="betaalmethode"
          value={betaalmethode}
          onChange={(e) => setBetaalmethode(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Visa">Visa</option>
          <option value="Bancontact">Bancontact</option>
        </select>
        <button
          onClick={async () => {
            const response = await updateRecord(ref, {
              ...details,
              betaalmethode,
            });
            setDetails(response.data);
          }}
        >
          Opslaan
        </button>
      </div>
      <div>Kost: {details.cost}</div>
      <div>Totaal: {details.amount}</div>
      <div>Owner: {details.costOwner}</div>
      <div>Betaalmethode: {details.betaalmethode}</div>
    </div>
  );
};

export default KostenDetail;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getAllRecords } from "../utils/database";
import { getTotalCosts } from "../utils/costs";

import KostenForm from "./KostenForm";
import KostenLijst from "./KostenLijst";

const Kosten = () => {
  const [costs, setCosts] = useState([]);
  const [input, setInput] = useState({
    cost: "",
    amount: 0,
    costOwner: "",
    id: "",
  });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const sumOfCosts = getTotalCosts(costs);
    setTotal(sumOfCosts);
  }, [JSON.stringify(costs)]);

  useEffect(() => {
    async function getData() {
      const response = await getAllRecords();
      setCosts(response.data);
    }
    getData();
  }, []);
  return (
    <>
      <KostenForm
        input={input}
        setInput={setInput}
        setCosts={setCosts}
        costs={costs}
      />
      <KostenLijst costs={costs} setCosts={setCosts} setInput={setInput} />
      <div>Totaal: {total}</div>
    </>
  );
};

export default Kosten;

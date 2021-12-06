import faunadb, { query as q } from "faunadb";
import { config } from "dotenv";
config();

export const connectToDatabase = () => {
  const client = new faunadb.Client({
    secret: process.env.REACT_APP_FAUNADB_SECRET,
    timeout: 100,
  });
  return client;
};

export const createRecord = async (record) => {
  const client = connectToDatabase();
  const result = await client.query(
    q.Create(q.Collection("KostenTracker"), { data: record })
  );
  client.close();
  return result;
};

export const getAllRecords = async () => {
  const client = connectToDatabase();
  const result = await client.query(
    q.Map(q.Paginate(q.Documents(q.Collection("KostenTracker"))), (ref) =>
      q.Get(ref)
    )
  );

  client.close();
  return result;
};

export const getRecord = async (refId) => {
  const client = connectToDatabase();
  const result = await client.query(
    q.Get(q.Ref(q.Collection("KostenTracker"), `${refId}`))
  );

  client.close();
  return result;
};

export const updateRecord = async (refId, data) => {
  const client = connectToDatabase();
  const result = await client.query(
    q.Update(q.Ref(q.Collection("KostenTracker"), `${refId}`), {
      data: data,
    })
  );
  client.close();
  return result;
};

export const deleteRecord = async (refId) => {
  const client = connectToDatabase();
  const result = await client.query(
    q.Delete(q.Ref(q.Collection("KostenTracker"), `${refId}`))
  );

  client.close();
  return result;
};

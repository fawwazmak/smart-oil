const { Client, PrivateKey, AccountId, TopicMessageSubmitTransaction } = require("@hashgraph/sdk");

const operatorId = process.env.HEDERA_OPERATOR_ID;
const operatorKey = process.env.HEDERA_OPERATOR_KEY;

let client; // automatically pulls from .env for testnet
if (operatorId && operatorKey) {
  client = Client.forTestnet().setOperator(operatorId, PrivateKey.fromString(operatorKey));
}

// Replace this with your already-created topicId or create one in the portal!
const TOPIC_ID = process.env.HEDERA_TOPIC_ID || "0.0.123456"; 

async function logToHedera(message) {
  if (!client) throw new Error("Hedera client not configured");
  const submitTx = new TopicMessageSubmitTransaction()
    .setTopicId(TOPIC_ID)
    .setMessage(Buffer.from(message));
  const resp = await submitTx.execute(client);
  return resp.transactionId.toString();
}

module.exports = logToHedera;

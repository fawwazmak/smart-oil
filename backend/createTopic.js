const { Client, PrivateKey, TopicCreateTransaction } = require("@hashgraph/sdk");
console.log('OPERATOR_ID:', '"' + process.env.HEDERA_OPERATOR_ID + '"');
console.log('OPERATOR_KEY:', '"' + process.env.HEDERA_OPERATOR_KEY + '"');
require('dotenv').config();

async function main() {
  // Set up Hedera client
  const operatorId = process.env.HEDERA_OPERATOR_ID;
  const operatorKey = process.env.HEDERA_OPERATOR_KEY;

  if (!operatorId || !operatorKey) {
    throw new Error("HEDERA_OPERATOR_ID and HEDERA_OPERATOR_KEY must be set in .env file.");
  }

  const client = Client.forTestnet().setOperator(operatorId, PrivateKey.fromString(operatorKey));

  // Create a new topic
  const txResponse = await new TopicCreateTransaction().execute(client);

  // Get the receipt, which contains the new topic ID
  const receipt = await txResponse.getReceipt(client);
  const topicId = receipt.topicId;

  console.log(`Your new Hedera Topic ID is: ${topicId.toString()}`);
}

main().catch(console.error);

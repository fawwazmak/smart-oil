const { Client, AccountBalanceQuery, PrivateKey } = require('@hashgraph/sdk');

require('dotenv').config();

const HEDERA_NETWORK = process.env.HEDERA_NETWORK || 'testnet'; // 'testnet' or 'mainnet'
const HEDERA_OPERATOR_ID = process.env.HEDERA_OPERATOR_ID || process.env.HEDERA_ACCOUNT_ID || ''; // Support both variable names
const HEDERA_OPERATOR_KEY = process.env.HEDERA_OPERATOR_KEY || process.env.HEDERA_PRIVATE_KEY || '';

let client;

try {
  if (HEDERA_NETWORK === 'mainnet') {
    client = Client.forMainnet();
  } else {
    client = Client.forTestnet();
  }
  if (HEDERA_OPERATOR_ID && HEDERA_OPERATOR_KEY) {
    // Always use PrivateKey.fromString!
    client.setOperator(HEDERA_OPERATOR_ID, PrivateKey.fromString(HEDERA_OPERATOR_KEY));
  } else {
    console.warn('⚠️  Hedera operator not set: HEDERA_OPERATOR_ID / HEDERA_OPERATOR_KEY');
  }
} catch (err) {
  console.warn('Failed to create Hedera client', err);
}

async function getAccountBalance(accountId) {
  if (!client) throw new Error('Hedera client not configured');
  const query = new AccountBalanceQuery().setAccountId(accountId);
  const resp = await query.execute(client);
  return resp;
}

module.exports = { getAccountBalance, client };

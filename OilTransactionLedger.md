//////////////////////////////////////PROPOSED CONTRACT: FINETUNE WHERE NECESSARY//////////////////////////////////////
//////////////////////////////////////                                            /////////////////////////////////////
//////////////////////////////////////                                            /////////////////////////////////////
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20; // Updated to latest stable version (0.8.20+)

contract OilTransactionLedger {
    // --- STRUCTS ---
    struct Transaction {
        string station;
        uint256 amount;
        uint256 timestamp;
        address submitter;
        string status;
    }

    // --- STATE VARIABLES ---
    Transaction[] private _transactions; // Made private (best practice)
    uint256 private _transactionCount;   // Cache length to save gas

    // --- EVENTS ---
    event TransactionLogged(
        uint256 indexed txId,
        string station,
        uint256 amount,
        uint256 timestamp,
        address indexed submitter,
        string status
    );

    // --- MODIFIERS ---
    modifier validAmount(uint256 amount) {
        require(amount > 0, "Amount must be greater than 0");
        _;
    }

    // --- FUNCTIONS ---
    /**
     * @dev Logs a new oil transaction.
     * @param station Name of the gas station.
     * @param amount Amount of oil transacted (must be > 0).
     */
    function logTransaction(string memory station, uint256 amount)
        public
        validAmount(amount)
    {
        _transactions.push(Transaction({
            station: station,
            amount: amount,
            timestamp: block.timestamp,
            submitter: msg.sender,
            status: "Verified"
        }));
        _transactionCount++; // Update cached count

        emit TransactionLogged(
            _transactionCount - 1, // Use cached count for gas efficiency
            station,
            amount,
            block.timestamp,
            msg.sender,
            "Verified"
        );
    }

    /**
     * @dev Returns transaction details by ID.
     * @param txId Transaction index (0-based).
     */
    function getTransaction(uint256 txId)
        public
        view
        returns (
            string memory station,
            uint256 amount,
            uint256 timestamp,
            address submitter,
            string memory status
        )
    {
        require(txId < _transactionCount, "Transaction does not exist");
        Transaction memory t = _transactions[txId];
        return (t.station, t.amount, t.timestamp, t.submitter, t.status);
    }

    /**
     * @dev Returns the total number of transactions.
     */
    function transactionCount() external view returns (uint256) {
        return _transactionCount; // Use cached count
    }
}
//////////////////////////////////////                                            /////////////////////////////////////
//////////////////////////////////////                                            /////////////////////////////////////
/////////////////////////////////////////////////////ASTRONOMOX////////////////////////////////////////////////////////

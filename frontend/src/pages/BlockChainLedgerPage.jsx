import React from "react";

const transactions = [
{ id: 1, date: "Jul 8", transaction: "Station A", station: "Retion", volume: 3627, status: "Verified" },
{ id: 2, date: "Jul 9", transaction: "Station B", station: "Retion", volume: 6085, status: "Verified" },
{ id: 3, date: "Jul 11", transaction: "Station C", station: "Retion", volume: 7210, status: "Verified" },
];

const nodes = [
{ id: "Node-01", type: "Smart Node", status: "Active" },
{ id: "Node-02", type: "Smart Node", status: "Active" },
{ id: "Node-03", type: "DiFiIN Node", status: "Active" },
];

const BlockchainLedgerPage = () => {
return (
<div className="min-h-screen bg-[#101624] text-white p-6 font-sans">
<h1 className="md:text-4xl text-3xl font-bold mb-6 text-white">Blockchain Ledger</h1>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {/* Verified Transactions */}
    <div className="bg-[#151b29] p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-white">Verified Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border border-[#2b313f] rounded-lg overflow-hidden">
          <thead className="bg-[#191f2d] text-gray-300">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Transaction</th>
              <th className="p-3">Station</th>
              <th className="p-3">Amount (Ltr)</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-t border-[#2b313f] hover:bg-[#2b313f]/30">
                <td className="p-3">{t.date}</td>
                <td className="p-3">{t.transaction}</td>
                <td className="p-3">{t.station}</td>
                <td className="p-3">{t.volume.toLocaleString()}</td>
                <td className="p-3">
                  <span className="px-3 py-1 rounded-full bg-[#183e51] text-white text-sm">
                    {t.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Nodes & Smart Contracts */}
    <div className="bg-[#151b29] p-6 rounded-2xl shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-4 text-white">Active Nodes</h2>
        <div className="space-y-3">
          {nodes.map((n) => (
            <div
              key={n.id}
              className="flex items-center justify-between bg-[#191f2d] p-3 rounded-lg border border-[#2b313f]"
            >
              <div>
                <div className="font-semibold text-white">{n.id}</div>
                <div className="text-sm text-gray-400">{n.type}</div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#183e51] text-sm">
                {n.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-3 text-white">Smart Contracts</h2>
        <div className="bg-[#191f2d] p-4 rounded-lg border border-[#2b313f]">
          <p className="text-sm text-gray-300 mb-1">
            Contract ID: <span className="text-white">DH124_1893</span>
          </p>
          <p className="text-sm text-gray-300">
            Contract ID: <span className="text-white">OH8974_3432</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</div>


);
};

export default BlockchainLedgerPage;
import React from "react";
import { FileText } from "lucide-react";
import StatCard from "./StatCard";

function TotalBillsUploadedStat({ totalWaterBills }) {
  return (
    <StatCard
      title="Total Bills Uploaded"
      value={totalWaterBills ?? "Loading..."}
      iconBg="bg-blue-600"
      icon={<FileText size={32} />}
    />
  );
}

export default TotalBillsUploadedStat;

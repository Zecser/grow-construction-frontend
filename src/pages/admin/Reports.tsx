import { ReportHeading, ReportTable } from "../../features/admin-reports";

const  Reports = () => {
  return (
    <div className="p-4 bg-[#F9F8FD] shadow-md rounded-lg">
      <ReportHeading />
      <ReportTable />
    </div>
  );
};

export default Reports;

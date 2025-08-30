import { useState } from "react";
import reports from "../data/reportsData";

const ReportTable = () => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);

  return (
    <div className="overflow-x-auto mt-15">
      <table className="m-auto w-[90%] border-separate border-spacing-x-3 border-spacing-y-3">
        <thead>
          <tr>
            <th className="hidden md:table-cell bg-gray-200 text-primary text-sm font-semibold px-2 py-5 border -md ">
              NO.
            </th>
            <th className="bg-gray-200 text-primary text-sm font-semibold px-2 py-5 border -md">
              NAME PROVIDED
            </th>
            <th className="bg-gray-200 text-primary text-sm font-semibold px-2 py-5 border -md">
              DATA MODIFIED
            </th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, _index) => {
            const isSelected = selectedRow === report.id;

            return (
              <tr
                key={report.id}
                onClick={() => setSelectedRow(report.id)}
                className="cursor-pointer"
              >
                <td
                  className={`hidden md:table-cell px-2 py-5 border border-primary -md font-medium text-center ${
                    isSelected ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  {report.id}
                </td>
                <td
                  className={`px-2 py-4 border border-primary -md text-center ${
                    isSelected ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  {report.name}
                </td>
                <td
                  className={`px-2 py-4 border border-primary -md text-sm text-center ${
                    isSelected ? "bg-primary text-white" : "bg-white"
                  }`}
                >
                  {report.modified}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;

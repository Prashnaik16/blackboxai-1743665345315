import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Papa, { ParseResult } from 'papaparse';

interface CsvData {
  [key: string]: string;
}

const AdminPanel = () => {
  const { user } = useAuth();
  const [csvData, setCsvData] = useState<CsvData[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadSuccess(false);

    Papa.parse<CsvData>(file, {
      header: true,
      complete: (results: ParseResult<CsvData>) => {
        setCsvData(results.data.filter(row => 
          Object.keys(row).length > 0
        ) as CsvData[]);
        setIsUploading(false);
        setUploadSuccess(true);
      },
      error: () => {
        setIsUploading(false);
      }
    });
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'influencers_export.csv';
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Bulk Upload</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
              id="csv-upload"
            />
            <label
              htmlFor="csv-upload"
              className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition inline-block mb-4"
            >
              {isUploading ? 'Processing...' : 'Select CSV File'}
            </label>
            <p className="text-gray-600">
              Upload a CSV file with influencer data. The first row should contain headers.
            </p>
            {uploadSuccess && (
              <p className="text-green-600 mt-2">
                Successfully uploaded {csvData.length} records!
              </p>
            )}
          </div>
        </div>

        {csvData.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Uploaded Data Preview</h2>
              <button
                onClick={exportToCSV}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Export to CSV
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(csvData[0]).map((key) => (
                      <th
                        key={key}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {csvData.slice(0, 5).map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value: any, j) => (
                        <td
                          key={j}
                          className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {csvData.length > 5 && (
                <p className="text-gray-500 text-sm mt-2">
                  Showing first 5 of {csvData.length} records
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
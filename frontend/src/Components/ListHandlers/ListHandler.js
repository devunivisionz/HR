// Global header handles logic -> Takes in column names and also fields that will not be included in the table

export function extractHeadersAndRows(dataArray, selectedKeys = []) {
  if (!Array.isArray(dataArray) || dataArray.length === 0)
    return { headers: [], rows: [] };

  // Create headers from selected keys
  const headers = selectedKeys.map((key) => ({
    id: key,
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize
  }));

  // Create rows
  const rows = dataArray.map((item) => {
    const row = {};
    selectedKeys.forEach((key) => {
      row[key] = item[key];
    });
    return row;
  });

  return { headers, rows };
}

/**
 * importExport.js
 * Utility functions for importing and exporting data in various formats
 */

/**
 * Parse CSV data into a structured format
 * 
 * @param {string} csvData - Raw CSV data as a string
 * @param {Object} options - Parsing options
 * @returns {Object} Parsed data structure
 */
export const parseCSV = (csvData, options = {}) => {
  try {
    // Split data by lines
    const lines = csvData.split(/\r?\n/).filter(line => line.trim() !== '');
    
    if (lines.length === 0) {
      throw new Error('No data found in CSV');
    }
    
    // Parse headers
    const headers = lines[0].split(',').map(header => header.trim());
    
    // Parse data rows
    const data = [];
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(value => value.trim());
      
      // Skip empty rows
      if (values.length !== headers.length) {
        continue;
      }
      
      const row = {};
      headers.forEach((header, index) => {
        // Try to convert numeric values
        const value = values[index];
        row[header] = !isNaN(value) && value !== '' ? parseFloat(value) : value;
      });
      
      data.push(row);
    }
    
    return {
      headers,
      data,
      rawData: csvData
    };
  } catch (error) {
    throw new Error(`Error parsing CSV: ${error.message}`);
  }
};

/**
 * Parse cost data from CSV into cost structure format
 * 
 * @param {string} csvData - Raw CSV data as a string
 * @returns {Object} Cost structure data
 */
export const parseCostDataFromCSV = (csvData) => {
  const parsed = parseCSV(csvData);
  
  // Expected columns:
  // Type (direct, indirect, time), Name, Amount, Period (for indirect costs), Rate/Hours (for time costs)
  
  const directCosts = [];
  const indirectCosts = [];
  const timeCosts = [];
  
  parsed.data.forEach(row => {
    const type = (row['Type'] || '').toLowerCase();
    
    if (type === 'direct') {
      directCosts.push({
        name: row['Name'] || `Item ${directCosts.length + 1}`,
        amount: parseFloat(row['Amount'] || 0)
      });
    } else if (type === 'indirect') {
      indirectCosts.push({
        name: row['Name'] || `Item ${indirectCosts.length + 1}`,
        amount: parseFloat(row['Amount'] || 0),
        period: (row['Period'] || 'month').toLowerCase()
      });
    } else if (type === 'time') {
      timeCosts.push({
        name: row['Name'] || `Item ${timeCosts.length + 1}`,
        rate: parseFloat(row['Rate'] || 0),
        hours: parseFloat(row['Hours'] || 0)
      });
    }
  });
  
  return {
    directCosts,
    indirectCosts,
    timeCosts,
    targetMargin: 0.3, // Default target margin
    expectedVolume: 100 // Default expected volume
  };
};

/**
 * Generate CSV string from cost structure data
 * 
 * @param {Object} costData - Cost structure data
 * @returns {string} CSV data as string
 */
export const generateCostDataCSV = (costData) => {
  const { directCosts = [], indirectCosts = [], timeCosts = [] } = costData;
  
  // Create CSV headers
  const headers = ['Type', 'Name', 'Amount', 'Period', 'Rate', 'Hours'];
  const rows = [headers.join(',')];
  
  // Add direct costs
  directCosts.forEach(cost => {
    rows.push([
      'Direct',
      cost.name.replace(/,/g, ' '),
      cost.amount,
      '',
      '',
      ''
    ].join(','));
  });
  
  // Add indirect costs
  indirectCosts.forEach(cost => {
    rows.push([
      'Indirect',
      cost.name.replace(/,/g, ' '),
      cost.amount,
      cost.period,
      '',
      ''
    ].join(','));
  });
  
  // Add time costs
  timeCosts.forEach(cost => {
    rows.push([
      'Time',
      cost.name.replace(/,/g, ' '),
      '',
      '',
      cost.rate,
      cost.hours
    ].join(','));
  });
  
  // Add additional information
  rows.push(['Settings', 'Target Margin', costData.targetMargin, '', '', ''].join(','));
  rows.push(['Settings', 'Expected Volume', costData.expectedVolume, '', '', ''].join(','));
  
  return rows.join('\n');
};

/**
 * Parse Excel/CSV file into cost structure
 * 
 * @param {File} file - File object
 * @returns {Promise<Object>} Promise resolving to cost structure data
 */
export const parseCostDataFromFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target.result;
        const costData = parseCostDataFromCSV(content);
        resolve(costData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (error) => {
      reject(new Error('Error reading file: ' + error));
    };
    
    reader.readAsText(file);
  });
};

/**
 * Download data as a file
 * 
 * @param {string} content - File content
 * @param {string} fileName - File name
 * @param {string} contentType - Content type (default: 'text/csv')
 */
export const downloadFile = (content, fileName, contentType = 'text/csv') => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Export cost data to CSV file
 * 
 * @param {Object} costData - Cost structure data
 * @param {string} fileName - File name
 */
export const exportCostDataToCSV = (costData, fileName = 'cost-data.csv') => {
  const csvContent = generateCostDataCSV(costData);
  downloadFile(csvContent, fileName);
};

/**
 * Generate sample cost data for import testing
 * 
 * @param {string} industry - Industry type: 'service', 'retail', 'saas'
 * @returns {string} CSV data for the specified industry
 */
export const generateSampleCostData = (industry = 'service') => {
  let csvData = 'Type,Name,Amount,Period,Rate,Hours\n';
  
  if (industry === 'service') {
    csvData += 'Direct,Office Supplies,50,,\n';
    csvData += 'Direct,Software Licenses,100,,\n';
    csvData += 'Indirect,Rent,1500,month,,\n';
    csvData += 'Indirect,Marketing,500,month,,\n';
    csvData += 'Time,Junior Developer,,,,40,25\n';
    csvData += 'Time,Senior Developer,,,,75,15\n';
    csvData += 'Settings,Target Margin,0.35,,,\n';
    csvData += 'Settings,Expected Volume,50,,,\n';
  } else if (industry === 'retail') {
    csvData += 'Direct,Product Cost,15,,\n';
    csvData += 'Direct,Packaging,2,,\n';
    csvData += 'Indirect,Rent,3000,month,,\n';
    csvData += 'Indirect,Utilities,500,month,,\n';
    csvData += 'Indirect,Staff,4000,month,,\n';
    csvData += 'Settings,Target Margin,0.4,,,\n';
    csvData += 'Settings,Expected Volume,500,,,\n';
  } else if (industry === 'saas') {
    csvData += 'Direct,Server Costs,0.5,,\n';
    csvData += 'Indirect,Development,8000,month,,\n';
    csvData += 'Indirect,Marketing,3000,month,,\n';
    csvData += 'Indirect,Customer Support,2000,month,,\n';
    csvData += 'Settings,Target Margin,0.7,,,\n';
    csvData += 'Settings,Expected Volume,100,,,\n';
  }
  
  return csvData;
};

/**
 * Download sample cost data
 * 
 * @param {string} industry - Industry type: 'service', 'retail', 'saas'
 */
export const downloadSampleCostData = (industry = 'service') => {
  const csvContent = generateSampleCostData(industry);
  downloadFile(csvContent, `sample-${industry}-costs.csv`);
};
/**
 * pdfExport.js
 * Utilities for exporting data to PDF format
 */

/**
 * Generate a PDF from the pricing strategy data
 * 
 * @param {Object} data - Pricing data to export
 * @param {string} type - Export type ('pricing' or 'dashboard')
 * @returns {boolean} Success status
 */
export const exportToPdf = (data, type = 'pricing') => {
  try {
    // In an actual implementation, we would use a library like jsPDF or pdfmake
    // For the MVP, we'll create a simple export using browser's print functionality
    
    // Create a new window for the PDF content
    const printWindow = window.open('', '_blank');
    
    if (!printWindow) {
      console.error('Unable to open print window. Please check your popup blocker settings.');
      return false;
    }
    
    // Generate HTML content based on export type
    const htmlContent = type === 'dashboard' 
      ? generateDashboardHtml(data)
      : generatePricingHtml(data);
    
    // Write the HTML content to the new window
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Add a slight delay to ensure the content is fully loaded
    setTimeout(() => {
      // Trigger print dialog
      printWindow.print();
      
      // Close the window after printing is done or canceled
      printWindow.onafterprint = () => {
        printWindow.close();
      };
    }, 500);
    
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    return false;
  }
};

/**
 * Generate HTML for pricing strategy export
 * 
 * @param {Object} data - Pricing data
 * @returns {string} HTML content
 */
const generatePricingHtml = (data) => {
  const { costAnalysis, pricingStrategy } = data;
  const costBreakdown = costAnalysis?.costBreakdown || {};
  const priceRecommendations = pricingStrategy?.priceRecommendations || {};
  const selectedStrategy = pricingStrategy?.selectedStrategy || 'optimal';
  const recommendation = priceRecommendations[selectedStrategy] || {};
  
  // Calculate average competitor price if competitors exist
  const competitors = pricingStrategy?.competitors || [];
  const avgCompetitorPrice = competitors.length 
    ? competitors.reduce((sum, comp) => sum + comp.price, 0) / competitors.length 
    : 0;
  
  // Format currency
  const formatCurrency = (value) => `$${parseFloat(value).toFixed(2)}`;
  
  // Format percentage
  const formatPercentage = (value) => `${(parseFloat(value) * 100).toFixed(0)}%`;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Pricing Strategy - ${new Date().toLocaleDateString()}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #3b82f6;
            margin-bottom: 5px;
          }
          .header p {
            color: #64748b;
            margin-top: 0;
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            color: #334155;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          table, th, td {
            border: 1px solid #e2e8f0;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f8fafc;
            font-weight: bold;
          }
          .highlight {
            background-color: #f0f9ff;
            font-weight: bold;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            color: #64748b;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Pricing Strategy Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        
        <div class="section">
          <h2>Cost Analysis</h2>
          <table>
            <tr>
              <th>Cost Category</th>
              <th>Amount</th>
            </tr>
            <tr>
              <td>Direct Costs per Unit</td>
              <td>${formatCurrency(costBreakdown.directCost || 0)}</td>
            </tr>
            <tr>
              <td>Time Costs per Unit</td>
              <td>${formatCurrency(costBreakdown.timeCost || 0)}</td>
            </tr>
            <tr>
              <td>Indirect Costs per Unit</td>
              <td>${formatCurrency(costBreakdown.indirectCost || 0)}</td>
            </tr>
            <tr class="highlight">
              <td>Total Cost per Unit</td>
              <td>${formatCurrency(costBreakdown.total || 0)}</td>
            </tr>
          </table>
          
          <table>
            <tr>
              <th>Additional Metrics</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Target Margin</td>
              <td>${formatPercentage(costAnalysis?.targetMargin || 0)}</td>
            </tr>
            <tr>
              <td>Expected Monthly Volume</td>
              <td>${costAnalysis?.expectedVolume || 0} units</td>
            </tr>
            <tr class="highlight">
              <td>Minimum Viable Price</td>
              <td>${formatCurrency(costBreakdown.minimumPrice || 0)}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <h2>Market Position</h2>
          <table>
            <tr>
              <th>Market Position</th>
              <td>${pricingStrategy?.marketPosition?.charAt(0).toUpperCase() + pricingStrategy?.marketPosition?.slice(1) || 'Not specified'}</td>
            </tr>
            <tr>
              <th>Number of Competitors</th>
              <td>${competitors.length}</td>
            </tr>
            <tr>
              <th>Average Competitor Price</th>
              <td>${formatCurrency(avgCompetitorPrice)}</td>
            </tr>
          </table>
        </div>
        
        <div class="section">
          <h2>Price Recommendations</h2>
          <table>
            <tr>
              <th>Strategy</th>
              <th>Price</th>
              <th>Margin</th>
            </tr>
            ${Object.entries(priceRecommendations).map(([strategy, recData]) => `
              <tr${strategy === selectedStrategy ? ' class="highlight"' : ''}>
                <td>${strategy.charAt(0).toUpperCase() + strategy.slice(1)}</td>
                <td>${formatCurrency(recData.price || 0)}</td>
                <td>${formatPercentage(recData.margin || 0)}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        
        ${recommendation.implementation ? `
        <div class="section">
          <h2>Implementation Guidance</h2>
          <div>
            ${recommendation.implementation.map(step => `
              <h3>${step.title}</h3>
              <p>${step.description}</p>
            `).join('')}
          </div>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>Generated by Dynamic Pricing Optimizer</p>
        </div>
      </body>
    </html>
  `;
};

/**
 * Generate HTML for dashboard export
 * 
 * @param {Object} data - Dashboard data
 * @returns {string} HTML content
 */
const generateDashboardHtml = (data) => {
  const { costAnalysis, pricingStrategy, customerSegments = [] } = data;
  
  // Format currency
  const formatCurrency = (value) => `$${parseFloat(value).toFixed(2)}`;
  
  // Format percentage
  const formatPercentage = (value) => `${(parseFloat(value) * 100).toFixed(0)}%`;
  
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Pricing Dashboard - ${new Date().toLocaleDateString()}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.5;
            margin: 0;
            padding: 20px;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          .header h1 {
            color: #3b82f6;
            margin-bottom: 5px;
          }
          .header p {
            color: #64748b;
            margin-top: 0;
          }
          .section {
            margin-bottom: 30px;
          }
          .section h2 {
            color: #334155;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 5px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          table, th, td {
            border: 1px solid #e2e8f0;
          }
          th, td {
            padding: 10px;
            text-align: left;
          }
          th {
            background-color: #f8fafc;
            font-weight: bold;
          }
          .highlight {
            background-color: #f0f9ff;
            font-weight: bold;
          }
          .recommendation {
            background-color: #f0fdf4;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 20px;
          }
          .recommendation h3 {
            margin-top: 0;
            color: #166534;
          }
          .footer {
            margin-top: 50px;
            text-align: center;
            color: #64748b;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Pricing Dashboard Report</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        
        <div class="section">
          <h2>Pricing Strategy Summary</h2>
          
          <div class="recommendation">
            <h3>Recommended Price</h3>
            <p>Based on ${pricingStrategy?.selectedStrategy || 'optimal'} strategy, your recommended price is
            <strong>${formatCurrency(pricingStrategy?.priceRecommendations?.[pricingStrategy?.selectedStrategy || 'optimal']?.price || 0)}</strong>.</p>
          </div>
          
          <table>
            <tr>
              <th>Key Metrics</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Total Cost per Unit</td>
              <td>${formatCurrency(costAnalysis?.costBreakdown?.total || 0)}</td>
            </tr>
            <tr>
              <td>Minimum Viable Price</td>
              <td>${formatCurrency(costAnalysis?.costBreakdown?.minimumPrice || 0)}</td>
            </tr>
            <tr>
              <td>Expected Margin at Recommended Price</td>
              <td>${formatPercentage(pricingStrategy?.priceRecommendations?.[pricingStrategy?.selectedStrategy || 'optimal']?.margin || 0)}</td>
            </tr>
            <tr>
              <td>Market Position</td>
              <td>${pricingStrategy?.marketPosition?.charAt(0).toUpperCase() + pricingStrategy?.marketPosition?.slice(1) || 'Not specified'}</td>
            </tr>
          </table>
        </div>
        
        ${customerSegments.length > 0 ? `
        <div class="section">
          <h2>Customer Segments</h2>
          <table>
            <tr>
              <th>Segment</th>
              <th>Size</th>
              <th>Price Elasticity</th>
              <th>Recommended Price</th>
            </tr>
            ${customerSegments.map(segment => `
              <tr>
                <td>${segment.name}</td>
                <td>${formatPercentage(segment.size)}</td>
                <td>${segment.priceElasticity.toFixed(1)}</td>
                <td>${formatCurrency(segment.recommendedPrice || 0)}</td>
              </tr>
            `).join('')}
          </table>
        </div>
        ` : ''}
        
        <div class="section">
          <h2>Implementation Steps</h2>
          <ol>
            ${pricingStrategy?.priceRecommendations?.[pricingStrategy?.selectedStrategy || 'optimal']?.implementation?.map(step => `
              <li>
                <h3>${step.title}</h3>
                <p>${step.description}</p>
              </li>
            `).join('') || '<li>No implementation steps available.</li>'}
          </ol>
        </div>
        
        <div class="footer">
          <p>Generated by Dynamic Pricing Optimizer</p>
        </div>
      </body>
    </html>
  `;
};

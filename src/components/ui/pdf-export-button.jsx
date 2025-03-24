/**
 * pdf-export-button.jsx
 * Component for exporting data to PDF
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { 
  exportPricingStrategyToPdf, 
  exportValueAssessmentToPdf, 
  exportDashboardToPdf 
} from '@/utils/pdfExport';

/**
 * Component for exporting data to PDF with loading state
 * 
 * @param {Object} props Component props
 * @param {string} props.exportType Type of export (pricing, value, dashboard)
 * @param {Object} props.data Data to be exported
 * @param {string} props.variant Button variant (default, outline, etc.)
 * @param {string} props.className Additional CSS classes
 * @param {string} props.label Button label
 * @returns {JSX.Element} Export button with loading state
 */
const PdfExportButton = ({ 
  exportType,
  data,
  variant = 'outline',
  className = '',
  label = 'Export to PDF',
  ...props
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState(null);
  
  const handleExport = async () => {
    try {
      setIsExporting(true);
      setExportResult(null);
      
      let result;
      
      switch (exportType) {
        case 'pricing':
          result = await exportPricingStrategyToPdf(data);
          break;
        case 'value':
          result = await exportValueAssessmentToPdf(data);
          break;
        case 'dashboard':
          result = await exportDashboardToPdf(data);
          break;
        default:
          throw new Error(`Unknown export type: ${exportType}`);
      }
      
      setExportResult({
        success: true,
        message: result
      });
      
      // In a real implementation, we would trigger a download here
      // For now, we'll just show a success message briefly
      setTimeout(() => {
        setExportResult(null);
      }, 3000);
      
    } catch (error) {
      setExportResult({
        success: false,
        message: error.message || 'Error exporting to PDF'
      });
      
      // Clear error message after 3 seconds
      setTimeout(() => {
        setExportResult(null);
      }, 3000);
      
    } finally {
      setIsExporting(false);
    }
  };
  
  return (
    <div className="relative">
      <Button 
        variant={variant}
        className={`flex items-center gap-2 ${className}`}
        onClick={handleExport}
        disabled={isExporting}
        {...props}
      >
        {isExporting ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Download className="h-4 w-4" />
        )}
        {isExporting ? 'Exporting...' : label}
      </Button>
      
      {exportResult && (
        <div className={`absolute top-full right-0 mt-2 p-2 text-xs rounded-md shadow-md w-64 z-10 ${
          exportResult.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {exportResult.message}
        </div>
      )}
    </div>
  );
};

PdfExportButton.propTypes = {
  exportType: PropTypes.oneOf(['pricing', 'value', 'dashboard']).isRequired,
  data: PropTypes.object.isRequired,
  variant: PropTypes.string,
  className: PropTypes.string,
  label: PropTypes.string,
};

export { PdfExportButton };

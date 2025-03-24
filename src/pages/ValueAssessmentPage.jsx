/**
 * ValueAssessmentPage.jsx
 * Page component for value assessment
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Button } from '../components/ui/button';
import { FileText, CheckCircle, BarChart, Zap } from 'lucide-react';

// Value Assessment Components
import CompetitiveAnalysis from '../components/value-assessment/CompetitiveAnalysis';
import ValuePropositionEditor from '../components/value-assessment/ValuePropositionEditor';
import ValueMapping from '../components/value-assessment/ValueMapping';
import ValueCommunication from '../components/value-assessment/ValueCommunication';

// Hooks
import useValueAssessment from '../hooks/useValueAssessment';

// PDF Export
import { exportToPdf } from '../utils/pdfExport';

/**
 * PDF Export Button component
 */
const PdfExportButton = ({ exportType, data, label }) => {
  const handleExport = () => {
    if (exportType === 'value') {
      exportToPdf(data, exportType);
    }
  };
  
  return (
    <Button onClick={handleExport} className="flex items-center gap-2">
      <FileText className="h-4 w-4" />
      {label || 'Export to PDF'}
    </Button>
  );
};

/**
 * Value Assessment Page component
 * 
 * @returns {JSX.Element} Value assessment page
 */
const ValueAssessmentPage = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('competitive-analysis');
  
  // Use value assessment hook
  const valueAssessment = useValueAssessment();
  
  /**
   * Prepare export data for PDF
   */
  const getExportData = () => {
    return {
      valueAssessment
    };
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold mb-6">Value Assessment</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="competitive-analysis" className="flex items-center gap-2">
            <BarChart className="h-4 w-4" /> Competitive Analysis
          </TabsTrigger>
          <TabsTrigger value="value-proposition" className="flex items-center gap-2">
            <Zap className="h-4 w-4" /> Value Proposition
          </TabsTrigger>
          <TabsTrigger value="value-mapping" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" /> Value Mapping
          </TabsTrigger>
          <TabsTrigger value="value-communication" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Communication
          </TabsTrigger>
        </TabsList>
        
        {/* Competitive Analysis Tab */}
        <TabsContent value="competitive-analysis">
          <CompetitiveAnalysis 
            competitors={valueAssessment.competitors}
            onUpdateCompetitor={valueAssessment.updateCompetitor}
            onAddCompetitor={valueAssessment.addCompetitor}
            onRemoveCompetitor={valueAssessment.removeCompetitor}
          />
          
          {valueAssessment.competitors.length > 0 && (
            <div className="flex justify-end mt-6">
              <PdfExportButton
                exportType="value"
                data={getExportData()}
                label="Export Competitive Analysis to PDF"
              />
            </div>
          )}
        </TabsContent>
        
        {/* Value Proposition Tab */}
        <TabsContent value="value-proposition">
          {valueAssessment.competitors.length > 0 ? (
            <div className="space-y-6">
              <ValuePropositionEditor
                valueProposition={valueAssessment.valueProposition}
                onUpdate={valueAssessment.updateValueProposition}
              />
              
              <div className="flex justify-end">
                <PdfExportButton
                  exportType="value"
                  data={getExportData()}
                  label="Export Value Proposition to PDF"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No competitive data available</h3>
              <p className="text-gray-500 mb-4">
                Please complete the Competitive Analysis first to develop your Value Proposition.
              </p>
              <Button onClick={() => setActiveTab('competitive-analysis')}>
                Go to Competitive Analysis
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Value Mapping Tab */}
        <TabsContent value="value-mapping">
          {valueAssessment.valueProposition.statement ? (
            <div className="space-y-6">
              <ValueMapping
                valueProposition={valueAssessment.valueProposition}
                valueMap={valueAssessment.valueMap}
                onUpdateValueMap={valueAssessment.updateValueMap}
              />
              
              <div className="flex justify-end">
                <PdfExportButton
                  exportType="value"
                  data={getExportData()}
                  label="Export Value Mapping to PDF"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No value proposition available</h3>
              <p className="text-gray-500 mb-4">
                Please complete the Value Proposition first to map your value to customer needs.
              </p>
              <Button onClick={() => setActiveTab('value-proposition')}>
                Go to Value Proposition
              </Button>
            </div>
          )}
        </TabsContent>
        
        {/* Value Communication Tab */}
        <TabsContent value="value-communication">
          {valueAssessment.valueMap.customerNeeds.length > 0 ? (
            <div className="space-y-6">
              <ValueCommunication
                valueProposition={valueAssessment.valueProposition}
                valueMap={valueAssessment.valueMap}
                communication={valueAssessment.communication}
                onUpdateCommunication={valueAssessment.updateCommunication}
              />
              
              <div className="flex justify-end">
                <PdfExportButton
                  exportType="value"
                  data={getExportData()}
                  label="Export Communication Plan to PDF"
                />
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No value mapping available</h3>
              <p className="text-gray-500 mb-4">
                Please complete the Value Mapping first to develop your communication plan.
              </p>
              <Button onClick={() => setActiveTab('value-mapping')}>
                Go to Value Mapping
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ValueAssessmentPage;
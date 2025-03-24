/**
 * ScenarioComparisonPage.jsx
 * Page for managing and comparing pricing scenarios
 */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScenarioManager from '@/components/pricing-strategy/ScenarioManager';

// Hooks
import useCostAnalysis from '@/hooks/useCostAnalysis';
import usePricingStrategy from '@/hooks/usePricingStrategy';
import useScenarioManager from '@/hooks/useScenarioManager';

/**
 * Scenario Comparison Page component
 * 
 * @returns {JSX.Element} Scenario comparison page
 */
const ScenarioComparisonPage = () => {
  // Use hooks for state management
  const costAnalysis = useCostAnalysis();
  const pricingStrategy = usePricingStrategy(costAnalysis.costModel);
  
  // Use scenario manager hook
  const scenarioManager = useScenarioManager();
  
  // Prepare current state for scenario creation
  const currentState = {
    costAnalysis,
    pricingStrategy
  };
  
  // Effect to initialize scenario comparison when selected scenarios change
  useEffect(() => {
    if (scenarioManager.selectedScenarioIds.length >= 2) {
      scenarioManager.compareSelectedScenarios();
    }
  }, [scenarioManager.selectedScenarioIds]);
  
  // Handler to save current state as a new scenario
  const handleSaveCurrentState = () => {
    const defaultName = `Scenario ${scenarioManager.scenarios.length + 1}`;
    scenarioManager.createScenario(defaultName, currentState);
  };
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Link to="/pricing-optimizer">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Optimizer
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Scenario Comparison</h1>
        </div>
        <Button size="sm" onClick={handleSaveCurrentState}>
          <Save className="h-4 w-4 mr-1" /> Save Current State
        </Button>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="max-w-4xl mx-auto">
          <ScenarioManager 
            scenarios={scenarioManager.scenarios}
            activeScenarioId={scenarioManager.activeScenarioId}
            selectedScenarioIds={scenarioManager.selectedScenarioIds}
            comparisonResults={scenarioManager.comparisonResults}
            onCreateScenario={scenarioManager.createScenario}
            onUpdateScenario={scenarioManager.updateScenario}
            onDeleteScenario={scenarioManager.deleteScenario}
            onSetActiveScenario={scenarioManager.setActiveScenario}
            onToggleScenarioSelection={scenarioManager.toggleScenarioSelection}
            onCompareScenarios={scenarioManager.compareSelectedScenarios}
            onClearComparison={scenarioManager.clearComparison}
            onExportScenarios={scenarioManager.exportScenarios}
            onImportScenarios={scenarioManager.importScenarios}
            currentState={currentState}
          />
        </div>
      </div>
      
      <div className="bg-amber-50 p-4 rounded-lg text-sm max-w-4xl mx-auto">
        <h3 className="font-medium text-amber-800 mb-2">Using Scenario Comparison</h3>
        <ul className="space-y-1 text-amber-700 list-disc pl-5">
          <li>Create scenarios to save different pricing strategies and configurations</li>
          <li>Select two or more scenarios using the checkboxes to compare them</li>
          <li>Click "Compare Selected" to see detailed analysis of differences</li>
          <li>Use "Save Current State" to save your current pricing settings as a new scenario</li>
          <li>Export your scenarios to share or back them up</li>
        </ul>
      </div>
    </div>
  );
};

export default ScenarioComparisonPage;
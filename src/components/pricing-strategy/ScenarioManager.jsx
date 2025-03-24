/**
 * ScenarioManager.jsx
 * Component for managing and comparing pricing scenarios
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Button 
} from '@/components/ui/button';
import { 
  Input 
} from '@/components/ui/input';
import { 
  Label 
} from '@/components/ui/label';
import { 
  Checkbox 
} from '@/components/ui/checkbox';
import {
  Plus,
  Download,
  Upload,
  Save,
  Trash2,
  BarChart2,
  Clock,
  Edit,
  Calendar
} from 'lucide-react';
import { formatCurrency, formatPercentage } from '@/utils/formatters';

/**
 * Scenario Manager component
 * 
 * @param {Object} props - Component props
 * @param {Array} props.scenarios - List of scenarios
 * @param {string} props.activeScenarioId - Active scenario ID
 * @param {Array} props.selectedScenarioIds - Selected scenario IDs for comparison
 * @param {Object} props.comparisonResults - Scenario comparison results
 * @param {Function} props.onCreateScenario - Create scenario callback
 * @param {Function} props.onUpdateScenario - Update scenario callback
 * @param {Function} props.onDeleteScenario - Delete scenario callback
 * @param {Function} props.onSetActiveScenario - Set active scenario callback
 * @param {Function} props.onToggleScenarioSelection - Toggle scenario selection callback
 * @param {Function} props.onCompareScenarios - Compare scenarios callback
 * @param {Function} props.onClearComparison - Clear comparison callback
 * @param {Function} props.onExportScenarios - Export scenarios callback
 * @param {Function} props.onImportScenarios - Import scenarios callback
 * @param {Object} props.currentState - Current application state
 * @returns {JSX.Element} Scenario manager component
 */
const ScenarioManager = ({
  scenarios = [],
  activeScenarioId,
  selectedScenarioIds = [],
  comparisonResults,
  onCreateScenario,
  onUpdateScenario,
  onDeleteScenario,
  onSetActiveScenario,
  onToggleScenarioSelection,
  onCompareScenarios,
  onClearComparison,
  onExportScenarios,
  onImportScenarios,
  currentState
}) => {
  // State for new scenario dialog
  const [newScenarioDialogOpen, setNewScenarioDialogOpen] = useState(false);
  const [scenarioName, setScenarioName] = useState('');
  
  // State for import/export dialog
  const [importExportDialogOpen, setImportExportDialogOpen] = useState(false);
  const [importExportTab, setImportExportTab] = useState('export');
  const [importData, setImportData] = useState('');
  const [importError, setImportError] = useState('');
  
  // Handlers
  const handleCreateScenario = () => {
    if (!scenarioName.trim()) return;
    
    onCreateScenario(scenarioName, currentState);
    setScenarioName('');
    setNewScenarioDialogOpen(false);
  };
  
  const handleExportScenarios = () => {
    const exportData = onExportScenarios();
    return exportData;
  };
  
  const handleImportScenarios = () => {
    try {
      setImportError('');
      const success = onImportScenarios(importData);
      
      if (success) {
        setImportData('');
        setImportExportDialogOpen(false);
      } else {
        setImportError('Invalid scenario data format. Please check the import data.');
      }
    } catch (error) {
      setImportError('Failed to import scenarios: ' + error.message);
    }
  };
  
  const handleDownloadScenarios = () => {
    const data = handleExportScenarios();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pricing-scenarios.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Pricing Scenarios</CardTitle>
          <CardDescription>
            Create and compare different pricing strategies
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setImportExportDialogOpen(true)}
          >
            <Download className="h-4 w-4 mr-1" /> Export/Import
          </Button>
          <Button 
            size="sm"
            onClick={() => setNewScenarioDialogOpen(true)}
          >
            <Plus className="h-4 w-4 mr-1" /> New Scenario
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {scenarios.length > 0 ? (
          <div className="space-y-6">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10"></TableHead>
                    <TableHead>Scenario</TableHead>
                    <TableHead>Strategy</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Margin</TableHead>
                    <TableHead className="text-right">Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scenarios.map((scenario) => (
                    <TableRow 
                      key={scenario.id}
                      className={scenario.id === activeScenarioId ? 'bg-blue-50' : ''}
                    >
                      <TableCell>
                        <Checkbox 
                          checked={selectedScenarioIds.includes(scenario.id)}
                          onCheckedChange={() => onToggleScenarioSelection(scenario.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{scenario.name}</div>
                      </TableCell>
                      <TableCell>
                        {scenario.strategy === 'cost-plus' && 'Cost-Plus'}
                        {scenario.strategy === 'competitor' && 'Competitor-Based'}
                        {scenario.strategy === 'value' && 'Value-Based'}
                        {scenario.strategy === 'optimal' && 'Optimal Blend'}
                      </TableCell>
                      <TableCell className="text-right">
                        {scenario.recommendation?.price ? 
                          formatCurrency(scenario.recommendation.price) : 
                          'N/A'
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        {scenario.recommendation?.margin ? 
                          formatPercentage(scenario.recommendation.margin) : 
                          'N/A'
                        }
                      </TableCell>
                      <TableCell className="text-right">
                        {new Date(scenario.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onSetActiveScenario(scenario.id)}
                            disabled={scenario.id === activeScenarioId}
                          >
                            {scenario.id === activeScenarioId ? 'Active' : 'Activate'}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => onDeleteScenario(scenario.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="outline"
                disabled={selectedScenarioIds.length < 2}
                onClick={onCompareScenarios}
              >
                <BarChart2 className="h-4 w-4 mr-1" /> Compare Selected ({selectedScenarioIds.length})
              </Button>
              {comparisonResults && (
                <Button 
                  variant="ghost"
                  onClick={onClearComparison}
                >
                  Clear Comparison
                </Button>
              )}
            </div>
            
            {/* Comparison Results */}
            {comparisonResults && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Scenario Comparison</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md border">
                    <h4 className="font-medium mb-3">Price Comparison</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Scenario</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                          <TableHead className="text-right">Difference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {comparisonResults.scenarios.map((scenario) => (
                          <TableRow key={scenario.id}>
                            <TableCell>{scenario.name}</TableCell>
                            <TableCell className="text-right">{formatCurrency(scenario.price)}</TableCell>
                            <TableCell className="text-right">
                              {scenario.price === comparisonResults.metrics.priceRange.min && 
                                <span className="text-green-600">Lowest</span>
                              }
                              {scenario.price === comparisonResults.metrics.priceRange.max && 
                                <span className="text-red-600">Highest</span>
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="mt-3 text-sm text-gray-500">
                      <div className="flex justify-between">
                        <span>Price Range:</span>
                        <span>{formatCurrency(comparisonResults.metrics.priceRange.min)} - {formatCurrency(comparisonResults.metrics.priceRange.max)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Price:</span>
                        <span>{formatCurrency(comparisonResults.metrics.priceRange.avg)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md border">
                    <h4 className="font-medium mb-3">Margin Comparison</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Scenario</TableHead>
                          <TableHead className="text-right">Margin</TableHead>
                          <TableHead className="text-right">Difference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {comparisonResults.scenarios.map((scenario) => (
                          <TableRow key={scenario.id}>
                            <TableCell>{scenario.name}</TableCell>
                            <TableCell className="text-right">{formatPercentage(scenario.margin)}</TableCell>
                            <TableCell className="text-right">
                              {scenario.margin === comparisonResults.metrics.marginRange.min && 
                                <span className="text-red-600">Lowest</span>
                              }
                              {scenario.margin === comparisonResults.metrics.marginRange.max && 
                                <span className="text-green-600">Highest</span>
                              }
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="mt-3 text-sm text-gray-500">
                      <div className="flex justify-between">
                        <span>Margin Range:</span>
                        <span>{formatPercentage(comparisonResults.metrics.marginRange.min)} - {formatPercentage(comparisonResults.metrics.marginRange.max)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Average Margin:</span>
                        <span>{formatPercentage(comparisonResults.metrics.marginRange.avg)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Detailed Comparisons */}
                {Object.keys(comparisonResults.differences).length > 0 && (
                  <div className="bg-white p-4 rounded-md border mt-4">
                    <h4 className="font-medium mb-3">Detailed Comparisons</h4>
                    <div className="space-y-3">
                      {Object.entries(comparisonResults.differences).map(([key, diff]) => (
                        <div key={key} className="p-3 border rounded-md">
                          <div className="font-medium">{diff.scenarios[0]} vs. {diff.scenarios[1]}</div>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <div className="text-sm text-gray-500">Price Difference:</div>
                              <div className={diff.priceDifference > 0 ? 'text-red-600' : 'text-green-600'}>
                                {diff.priceDifference > 0 ? '+' : ''}{formatCurrency(diff.priceDifference)} ({diff.priceDifferencePercent.toFixed(1)}%)
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Margin Difference:</div>
                              <div className={diff.marginDifference > 0 ? 'text-green-600' : 'text-red-600'}>
                                {diff.marginDifference > 0 ? '+' : ''}{formatPercentage(diff.marginDifference)} ({diff.marginDifferencePercent.toFixed(1)}%)
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 border border-dashed rounded-md">
            <p className="text-gray-500 mb-2">No pricing scenarios created yet</p>
            <p className="text-sm text-gray-400 mb-4">
              Create scenarios to compare different pricing strategies
            </p>
            <Button 
              onClick={() => setNewScenarioDialogOpen(true)}
            >
              <Plus className="h-4 w-4 mr-1" /> Create First Scenario
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* New Scenario Dialog */}
      <Dialog open={newScenarioDialogOpen} onOpenChange={setNewScenarioDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Scenario</DialogTitle>
            <DialogDescription>
              Save your current pricing settings as a scenario for future reference.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="scenario-name">Scenario Name</Label>
              <Input 
                id="scenario-name" 
                placeholder="e.g., Premium Pricing Strategy"
                value={scenarioName}
                onChange={(e) => setScenarioName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewScenarioDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateScenario}>
              Create Scenario
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Import/Export Dialog */}
      <Dialog open={importExportDialogOpen} onOpenChange={setImportExportDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Import/Export Scenarios</DialogTitle>
            <DialogDescription>
              Save your scenarios to file or import from a previous export.
            </DialogDescription>
          </DialogHeader>
          <Tabs 
            value={importExportTab} 
            onValueChange={setImportExportTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="export">Export</TabsTrigger>
              <TabsTrigger value="import">Import</TabsTrigger>
            </TabsList>
            
            <TabsContent value="export" className="py-4">
              <div className="space-y-4">
                <p className="text-sm text-gray-500">
                  Export all your saved scenarios to a JSON file that you can import later.
                </p>
                <Button 
                  onClick={handleDownloadScenarios}
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-1" /> Download Scenarios
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="import" className="py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="import-data">Paste JSON export data</Label>
                  <div className="relative">
                    <textarea
                      id="import-data"
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Paste exported JSON data here..."
                      value={importData}
                      onChange={(e) => setImportData(e.target.value)}
                    />
                  </div>
                  {importError && (
                    <p className="text-sm text-red-600 mt-1">{importError}</p>
                  )}
                </div>
                <Button 
                  onClick={handleImportScenarios}
                  className="w-full"
                  disabled={!importData.trim()}
                >
                  <Upload className="h-4 w-4 mr-1" /> Import Scenarios
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

ScenarioManager.propTypes = {
  scenarios: PropTypes.array,
  activeScenarioId: PropTypes.string,
  selectedScenarioIds: PropTypes.array,
  comparisonResults: PropTypes.object,
  onCreateScenario: PropTypes.func.isRequired,
  onUpdateScenario: PropTypes.func.isRequired,
  onDeleteScenario: PropTypes.func.isRequired,
  onSetActiveScenario: PropTypes.func.isRequired,
  onToggleScenarioSelection: PropTypes.func.isRequired,
  onCompareScenarios: PropTypes.func.isRequired,
  onClearComparison: PropTypes.func.isRequired,
  onExportScenarios: PropTypes.func.isRequired,
  onImportScenarios: PropTypes.func.isRequired,
  currentState: PropTypes.object.isRequired
};

export default ScenarioManager;
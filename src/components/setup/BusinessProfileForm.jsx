/**
 * BusinessProfileForm.jsx
 * Form for collecting business profile information
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

const BusinessProfileForm = ({ data, onDataChange, onNext }) => {
  // Form state
  const [businessProfile, setBusinessProfile] = useState({
    businessName: data.businessProfile?.businessName || '',
    description: data.businessProfile?.description || '',
    businessModel: data.businessProfile?.businessModel || '',
    businessSize: data.businessProfile?.businessSize || '',
    targetMarket: data.businessProfile?.targetMarket || '',
    geographicRegion: data.businessProfile?.geographicRegion || '',
    yearsInBusiness: data.businessProfile?.yearsInBusiness || '',
    website: data.businessProfile?.website || ''
  });
  
  // Error state
  const [errors, setErrors] = useState({});
  
  // Update parent component data when form changes
  useEffect(() => {
    onDataChange({ businessProfile });
  }, [businessProfile, onDataChange]);
  
  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setBusinessProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Handle select changes
  const handleSelectChange = (name, value) => {
    setBusinessProfile(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!businessProfile.businessName) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!businessProfile.businessModel) {
      newErrors.businessModel = 'Business model is required';
    }
    
    if (!businessProfile.businessSize) {
      newErrors.businessSize = 'Business size is required';
    }
    
    // Years in business should be a number
    if (businessProfile.yearsInBusiness && isNaN(Number(businessProfile.yearsInBusiness))) {
      newErrors.yearsInBusiness = 'Must be a valid number';
    }
    
    // Website should be a valid URL if provided
    if (businessProfile.website) {
      try {
        new URL(businessProfile.website);
      } catch (e) {
        newErrors.website = 'Must be a valid URL (include http:// or https://)';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onNext({ businessProfile });
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Business Profile</h2>
        <p className="text-gray-500">
          Help us understand your business better to optimize your pricing strategy
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Business Name */}
        <div className="space-y-2">
          <Label htmlFor="businessName">
            Business Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="businessName"
            name="businessName"
            value={businessProfile.businessName}
            onChange={handleChange}
            placeholder="Your Business Name"
            className={errors.businessName ? 'border-red-500' : ''}
          />
          {errors.businessName && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.businessName}
            </div>
          )}
        </div>
        
        {/* Business Model */}
        <div className="space-y-2">
          <Label htmlFor="businessModel">
            Business Model <span className="text-red-500">*</span>
          </Label>
          <Select
            value={businessProfile.businessModel}
            onValueChange={(value) => handleSelectChange('businessModel', value)}
          >
            <SelectTrigger id="businessModel" className={errors.businessModel ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select Business Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="service">Service-based</SelectItem>
              <SelectItem value="product">Product-based</SelectItem>
              <SelectItem value="subscription">Subscription-based</SelectItem>
              <SelectItem value="marketplace">Marketplace/Platform</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
            </SelectContent>
          </Select>
          {errors.businessModel && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.businessModel}
            </div>
          )}
        </div>
        
        {/* Business Size */}
        <div className="space-y-2">
          <Label htmlFor="businessSize">
            Business Size <span className="text-red-500">*</span>
          </Label>
          <Select
            value={businessProfile.businessSize}
            onValueChange={(value) => handleSelectChange('businessSize', value)}
          >
            <SelectTrigger id="businessSize" className={errors.businessSize ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select Business Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solo">Solo/Freelancer</SelectItem>
              <SelectItem value="micro">Micro (2-9 employees)</SelectItem>
              <SelectItem value="small">Small (10-49 employees)</SelectItem>
              <SelectItem value="medium">Medium (50-249 employees)</SelectItem>
              <SelectItem value="large">Large (250+ employees)</SelectItem>
            </SelectContent>
          </Select>
          {errors.businessSize && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.businessSize}
            </div>
          )}
        </div>
        
        {/* Target Market */}
        <div className="space-y-2">
          <Label htmlFor="targetMarket">Target Market</Label>
          <Select
            value={businessProfile.targetMarket}
            onValueChange={(value) => handleSelectChange('targetMarket', value)}
          >
            <SelectTrigger id="targetMarket">
              <SelectValue placeholder="Select Target Market" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="b2b">B2B (Business to Business)</SelectItem>
              <SelectItem value="b2c">B2C (Business to Consumer)</SelectItem>
              <SelectItem value="b2g">B2G (Business to Government)</SelectItem>
              <SelectItem value="mixed">Mixed/Multiple</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Geographic Region */}
        <div className="space-y-2">
          <Label htmlFor="geographicRegion">Geographic Region</Label>
          <Select
            value={businessProfile.geographicRegion}
            onValueChange={(value) => handleSelectChange('geographicRegion', value)}
          >
            <SelectTrigger id="geographicRegion">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="local">Local/City</SelectItem>
              <SelectItem value="regional">Regional/State</SelectItem>
              <SelectItem value="national">National</SelectItem>
              <SelectItem value="international">International</SelectItem>
              <SelectItem value="global">Global</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Years in Business */}
        <div className="space-y-2">
          <Label htmlFor="yearsInBusiness">Years in Business</Label>
          <Input
            id="yearsInBusiness"
            name="yearsInBusiness"
            value={businessProfile.yearsInBusiness}
            onChange={handleChange}
            placeholder="e.g., 3"
            className={errors.yearsInBusiness ? 'border-red-500' : ''}
          />
          {errors.yearsInBusiness && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.yearsInBusiness}
            </div>
          )}
        </div>
        
        {/* Website */}
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            name="website"
            value={businessProfile.website}
            onChange={handleChange}
            placeholder="https://example.com"
            className={errors.website ? 'border-red-500' : ''}
          />
          {errors.website && (
            <div className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="h-4 w-4" /> {errors.website}
            </div>
          )}
        </div>
      </div>
      
      {/* Business Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Business Description</Label>
        <Textarea
          id="description"
          name="description"
          value={businessProfile.description}
          onChange={handleChange}
          placeholder="Briefly describe your business, products or services..."
          rows={3}
        />
      </div>
      
      <div className="border-t pt-4 mt-6">
        <p className="text-sm text-gray-500 mb-6">
          <span className="text-red-500">*</span> Required fields
        </p>
        
        <div className="flex justify-end">
          <Button type="submit">Continue</Button>
        </div>
      </div>
    </form>
  );
};

BusinessProfileForm.propTypes = {
  data: PropTypes.object,
  onDataChange: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired
};

BusinessProfileForm.defaultProps = {
  data: {}
};

export default BusinessProfileForm;
/**
 * ValueCommunication.jsx
 * Component for creating and managing value communication plan
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { AlertCircle, Plus, Trash2, MessageSquare, Share2, Target } from 'lucide-react';

/**
 * KeyMessageItem component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.message - Message data
 * @param {Function} props.onRemove - Function to remove message
 * @returns {JSX.Element} KeyMessageItem component
 */
const KeyMessageItem = ({ message, onRemove }) => {
  return (
    <div className="flex items-start p-3 border rounded-md bg-gray-50 gap-2">
      <MessageSquare className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
      <div className="flex-grow">
        <h4 className="font-medium">{message.text}</h4>
        <p className="text-sm text-gray-600">{message.audience} • {message.context}</p>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onRemove(message.id)}
        className="text-gray-500 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

/**
 * CommunicationChannel component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.channel - Channel data
 * @param {Function} props.onRemove - Function to remove channel
 * @returns {JSX.Element} CommunicationChannel component
 */
const CommunicationChannel = ({ channel, onRemove }) => {
  return (
    <div className="flex items-center p-3 border rounded-md bg-gray-50 gap-2">
      <Share2 className="w-5 h-5 text-green-500 flex-shrink-0" />
      <div className="flex-grow">
        <h4 className="font-medium">{channel.name}</h4>
        <p className="text-sm text-gray-600">{channel.purpose}</p>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => onRemove(channel.id)}
        className="text-gray-500 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

/**
 * ValueCommunication component
 * 
 * @param {Object} props - Component props
 * @param {Object} props.valueProposition - Value proposition data
 * @param {Object} props.valueMap - Value map data
 * @param {Object} props.communication - Communication data
 * @param {Function} props.onUpdateCommunication - Function to update communication data
 * @returns {JSX.Element} ValueCommunication component
 */
const ValueCommunication = ({ 
  valueProposition, 
  valueMap, 
  communication, 
  onUpdateCommunication 
}) => {
  // State for new message form
  const [newMessage, setNewMessage] = useState({
    text: '',
    audience: 'All customers',
    context: 'General'
  });
  
  // State for new channel form
  const [newChannel, setNewChannel] = useState({
    name: '',
    purpose: ''
  });
  
  // State for new material form
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    type: 'Case Study',
    description: ''
  });
  
  /**
   * Handle adding a new key message
   */
  const handleAddMessage = () => {
    if (!newMessage.text.trim()) return;
    
    onUpdateCommunication({
      keyMessages: [
        ...communication.keyMessages,
        {
          id: Date.now().toString(),
          ...newMessage
        }
      ]
    });
    
    // Reset form
    setNewMessage({
      text: '',
      audience: 'All customers',
      context: 'General'
    });
  };
  
  /**
   * Handle removing a key message
   * 
   * @param {string} id - Message ID
   */
  const handleRemoveMessage = (id) => {
    onUpdateCommunication({
      keyMessages: communication.keyMessages.filter(message => message.id !== id)
    });
  };
  
  /**
   * Handle adding a new channel
   */
  const handleAddChannel = () => {
    if (!newChannel.name.trim()) return;
    
    onUpdateCommunication({
      channels: [
        ...communication.channels,
        {
          id: Date.now().toString(),
          ...newChannel
        }
      ]
    });
    
    // Reset form
    setNewChannel({
      name: '',
      purpose: ''
    });
  };
  
  /**
   * Handle removing a channel
   * 
   * @param {string} id - Channel ID
   */
  const handleRemoveChannel = (id) => {
    onUpdateCommunication({
      channels: communication.channels.filter(channel => channel.id !== id)
    });
  };
  
  /**
   * Handle adding a new material
   */
  const handleAddMaterial = () => {
    if (!newMaterial.title.trim()) return;
    
    onUpdateCommunication({
      materials: [
        ...communication.materials,
        {
          id: Date.now().toString(),
          ...newMaterial
        }
      ]
    });
    
    // Reset form
    setNewMaterial({
      title: '',
      type: 'Case Study',
      description: ''
    });
  };
  
  /**
   * Handle removing a material
   * 
   * @param {string} id - Material ID
   */
  const handleRemoveMaterial = (id) => {
    onUpdateCommunication({
      materials: communication.materials.filter(material => material.id !== id)
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Value Proposition Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="mr-2 h-5 w-5 text-primary" />
            Value Proposition Summary
          </CardTitle>
          <CardDescription>
            Reference your value proposition while creating your communication plan
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-l-4 border-primary pl-4 py-2">
            <p className="text-lg font-medium">{valueProposition.statement}</p>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">Primary benefit:</span> {valueProposition.primaryBenefit}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Key differentiator:</span> {valueProposition.differentiator}
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Key Messages */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5 text-blue-500" />
            Key Messages
          </CardTitle>
          <CardDescription>
            Create clear, consistent messages that communicate your value proposition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Message list */}
            <div className="space-y-3">
              {communication.keyMessages?.length > 0 ? (
                communication.keyMessages.map(message => (
                  <KeyMessageItem 
                    key={message.id} 
                    message={message} 
                    onRemove={handleRemoveMessage} 
                  />
                ))
              ) : (
                <div className="text-center py-4 border border-dashed rounded-md bg-gray-50">
                  <p className="text-gray-500">No key messages added yet</p>
                </div>
              )}
            </div>
            
            {/* Add new message form */}
            <div className="bg-gray-50 p-4 rounded-md border">
              <h4 className="font-medium mb-3">Add New Message</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="message-text">Message</Label>
                  <Textarea 
                    id="message-text"
                    placeholder="Enter a clear, compelling message about your value"
                    value={newMessage.text}
                    onChange={(e) => setNewMessage({...newMessage, text: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="message-audience">Target Audience</Label>
                    <Input 
                      id="message-audience"
                      placeholder="Who is this message for?"
                      value={newMessage.audience}
                      onChange={(e) => setNewMessage({...newMessage, audience: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="message-context">Context</Label>
                    <Select 
                      value={newMessage.context}
                      onValueChange={(value) => setNewMessage({...newMessage, context: value})}
                    >
                      <SelectTrigger id="message-context">
                        <SelectValue placeholder="Select context" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Sales Pitch">Sales Pitch</SelectItem>
                        <SelectItem value="Website">Website</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button onClick={handleAddMessage} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Message
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Communication Channels */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Share2 className="mr-2 h-5 w-5 text-green-500" />
            Communication Channels
          </CardTitle>
          <CardDescription>
            Select the best channels to reach your target audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Channels list */}
            <div className="space-y-3">
              {communication.channels?.length > 0 ? (
                communication.channels.map(channel => (
                  <CommunicationChannel 
                    key={channel.id} 
                    channel={channel} 
                    onRemove={handleRemoveChannel} 
                  />
                ))
              ) : (
                <div className="text-center py-4 border border-dashed rounded-md bg-gray-50">
                  <p className="text-gray-500">No channels added yet</p>
                </div>
              )}
            </div>
            
            {/* Add new channel form */}
            <div className="bg-gray-50 p-4 rounded-md border">
              <h4 className="font-medium mb-3">Add New Channel</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="channel-name">Channel Name</Label>
                  <Input 
                    id="channel-name"
                    placeholder="e.g., LinkedIn, Email Newsletter, Website"
                    value={newChannel.name}
                    onChange={(e) => setNewChannel({...newChannel, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="channel-purpose">Purpose/Audience</Label>
                  <Input 
                    id="channel-purpose"
                    placeholder="e.g., Reach decision makers, Nurture existing customers"
                    value={newChannel.purpose}
                    onChange={(e) => setNewChannel({...newChannel, purpose: e.target.value})}
                  />
                </div>
                <Button onClick={handleAddChannel} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Channel
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Marketing Materials */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
            Supporting Materials
          </CardTitle>
          <CardDescription>
            Plan content that supports your value proposition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Materials list */}
            <div className="space-y-3">
              {communication.materials?.length > 0 ? (
                communication.materials.map(material => (
                  <div key={material.id} className="flex items-start p-3 border rounded-md bg-gray-50 gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                    <div className="flex-grow">
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-gray-600">{material.type}</p>
                      {material.description && (
                        <p className="text-sm mt-1">{material.description}</p>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveMaterial(material.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 border border-dashed rounded-md bg-gray-50">
                  <p className="text-gray-500">No materials added yet</p>
                </div>
              )}
            </div>
            
            {/* Add new material form */}
            <div className="bg-gray-50 p-4 rounded-md border">
              <h4 className="font-medium mb-3">Add New Supporting Material</h4>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="material-title">Title</Label>
                  <Input 
                    id="material-title"
                    placeholder="e.g., Customer Success Story, Product Brochure"
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="material-type">Material Type</Label>
                    <Select 
                      value={newMaterial.type}
                      onValueChange={(value) => setNewMaterial({...newMaterial, type: value})}
                    >
                      <SelectTrigger id="material-type">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Case Study">Case Study</SelectItem>
                        <SelectItem value="Brochure">Brochure</SelectItem>
                        <SelectItem value="White Paper">White Paper</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                        <SelectItem value="Infographic">Infographic</SelectItem>
                        <SelectItem value="Blog Post">Blog Post</SelectItem>
                        <SelectItem value="Email Sequence">Email Sequence</SelectItem>
                        <SelectItem value="Slide Deck">Slide Deck</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="material-description">Description (Optional)</Label>
                    <Textarea 
                      id="material-description"
                      placeholder="Brief description of this material"
                      value={newMaterial.description}
                      onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                    />
                  </div>
                </div>
                <Button onClick={handleAddMaterial} className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Material
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Implementation Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            Communication Plan Summary
          </CardTitle>
          <CardDescription>
            Review your complete communication strategy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="font-medium mb-2">Key Messages</h3>
              <p className="text-sm text-gray-600">
                {communication.keyMessages?.length > 0 
                  ? `${communication.keyMessages.length} key message(s) defined across ${
                      new Set(communication.keyMessages.map(m => m.audience)).size
                    } audience(s)`
                  : 'No key messages defined yet'
                }
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="font-medium mb-2">Distribution Channels</h3>
              <p className="text-sm text-gray-600">
                {communication.channels?.length > 0 
                  ? `${communication.channels.length} channel(s) identified for message distribution`
                  : 'No channels defined yet'
                }
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="font-medium mb-2">Supporting Materials</h3>
              <p className="text-sm text-gray-600">
                {communication.materials?.length > 0 
                  ? `${communication.materials.length} supporting material(s) planned for creation`
                  : 'No supporting materials defined yet'
                }
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ValueCommunication;
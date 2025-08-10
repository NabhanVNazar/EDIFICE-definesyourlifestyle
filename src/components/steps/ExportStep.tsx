import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  FileText, 
  Image, 
  Share2, 
  Calculator,
  CheckCircle,
  Eye,
  Mail,
  Printer,
  Box,
  Home
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExportStep: React.FC = () => {
  const { currentProject } = useAppStore();
  const [exportType, setExportType] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);

  const exportOptions = [
    {
      id: 'pdf',
      icon: FileText,
      title: 'PDF Package',
      description: 'Complete design documentation with floor plans, 3D views, and specifications',
      features: ['2D Blueprint', '3D Renderings', 'Material List', 'Cost Estimate', 'Specifications'],
      popular: true
    },
    {
      id: 'cad',
      icon: Box,
      title: 'CAD Files',
      description: 'Technical drawings for contractors and architects',
      features: ['DWG Format', 'Detailed Dimensions', 'Layer Organization', 'Construction Details'],
      professional: true
    },
    {
      id: 'images',
      icon: Image,
      title: 'High-Res Images',
      description: 'Beautiful renderings and floor plans for presentations',
      features: ['4K Renderings', 'Multiple Angles', 'Day/Night Views', 'Interior Layouts']
    },
    {
      id: 'share',
      icon: Share2,
      title: 'Shareable Link',
      description: 'Interactive online presentation for clients and family',
      features: ['Interactive 3D', 'Mobile Friendly', 'Comment System', 'Real-time Updates']
    }
  ];

  const materialEstimate = currentProject ? [
    { category: 'Foundation & Structure', cost: Math.round(currentProject.plot.area * 35), unit: 'sq ft' },
    { category: 'Walls & Roofing', cost: Math.round(currentProject.plot.area * 45), unit: 'sq ft' },
    { category: 'Flooring', cost: Math.round(currentProject.plot.area * 25), unit: 'sq ft' },
    { category: 'Windows & Doors', cost: 15000, unit: 'fixed' },
    { category: 'Plumbing & Electrical', cost: Math.round(currentProject.plot.area * 20), unit: 'sq ft' },
    { category: 'Finishing & Paint', cost: Math.round(currentProject.plot.area * 15), unit: 'sq ft' }
  ] : [];

  const totalCost = materialEstimate.reduce((sum, item) => sum + item.cost, 0);

  const handleExport = async (type: string) => {
    setIsExporting(true);
    
    try {
      switch (type) {
        case 'pdf':
          await exportToPDF();
          break;
        case 'cad':
          // Simulate CAD export
          setTimeout(() => {
            alert('CAD files will be sent to your email within 24 hours');
            setIsExporting(false);
          }, 2000);
          return;
        case 'images':
          await exportImages();
          break;
        case 'share':
          await generateShareLink();
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
    
    setIsExporting(false);
  };

  const exportToPDF = async () => {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(20);
    pdf.text(currentProject?.name || 'Design Project', 20, 30);
    
    // Add project details
    pdf.setFontSize(12);
    pdf.text(`Plot Size: ${currentProject?.plot.width} × ${currentProject?.plot.length} ft`, 20, 50);
    pdf.text(`Total Area: ${currentProject?.plot.area.toLocaleString()} sq ft`, 20, 65);
    pdf.text(`Floors: ${currentProject?.requirements.floors}`, 20, 80);
    pdf.text(`Bedrooms: ${currentProject?.requirements.bedrooms}`, 20, 95);
    pdf.text(`Bathrooms: ${currentProject?.requirements.bathrooms}`, 20, 110);
    
    // Add cost estimate
    pdf.text('Cost Estimate:', 20, 140);
    let yPos = 160;
    materialEstimate.forEach((item) => {
      pdf.text(`${item.category}: $${item.cost.toLocaleString()}`, 25, yPos);
      yPos += 15;
    });
    
    pdf.text(`Total Estimated Cost: $${totalCost.toLocaleString()}`, 20, yPos + 10);
    
    pdf.save(`${currentProject?.name || 'design'}.pdf`);
  };

  const exportImages = async () => {
    // Simulate image export
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,Images exported successfully';
    link.download = 'design-images.zip';
    link.click();
  };

  const generateShareLink = async () => {
    const shareUrl = `${window.location.origin}/share/${currentProject?.id}`;
    
    if (navigator.share) {
      await navigator.share({
        title: currentProject?.name,
        text: 'Check out my home design created with EDIFICE AI',
        url: shareUrl
      });
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Share link copied to clipboard!');
    }
  };

  if (!currentProject) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-amber-600">No project selected</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <CheckCircle size={48} className="text-green-500 mr-4" />
            <h1 className="text-4xl font-bold text-amber-900">Design Complete!</h1>
          </div>
          <p className="text-lg text-amber-700 max-w-2xl mx-auto">
            Your home design is ready. Choose your preferred export format to get your files and share your vision.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Export Options */}
          <div className="lg:col-span-2">
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 mb-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold text-amber-900 mb-6 flex items-center">
                <Download className="mr-3" size={24} />
                Export Options
              </h2>

              <div className="grid gap-4">
                {exportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.div
                      key={option.id}
                      className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                        exportType === option.id
                          ? 'border-amber-500 bg-amber-50'
                          : 'border-gray-200 hover:border-amber-300'
                      }`}
                      onClick={() => setExportType(option.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className={`p-3 rounded-lg ${
                          exportType === option.id ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600'
                        }`}>
                          <Icon size={24} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-semibold text-amber-900">{option.title}</h3>
                            {option.popular && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Popular</span>
                            )}
                            {option.professional && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Professional</span>
                            )}
                          </div>
                          <p className="text-amber-700 text-sm mb-3">{option.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                            {option.features.map((feature, i) => (
                              <span
                                key={i}
                                className="bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Export Button */}
              <div className="mt-6 flex justify-center">
                <motion.button
                  onClick={() => exportType && handleExport(exportType)}
                  disabled={!exportType || isExporting}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    exportType && !isExporting
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  whileHover={exportType && !isExporting ? { scale: 1.05 } : {}}
                  whileTap={exportType && !isExporting ? { scale: 0.95 } : {}}
                >
                  {isExporting ? 'Exporting...' : 'Export Design'}
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Project Summary & Cost Estimate */}
          <div className="space-y-6">
            {/* Project Summary */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                <Home className="mr-3" size={20} />
                Project Summary
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-amber-700">Project Name:</span>
                  <span className="text-amber-900 font-medium">{currentProject.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Plot Size:</span>
                  <span className="text-amber-900 font-medium">{currentProject.plot.width} × {currentProject.plot.length} ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Total Area:</span>
                  <span className="text-amber-900 font-medium">{currentProject.plot.area.toLocaleString()} sq ft</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Floors:</span>
                  <span className="text-amber-900 font-medium">{currentProject.requirements.floors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Bedrooms:</span>
                  <span className="text-amber-900 font-medium">{currentProject.requirements.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amber-700">Bathrooms:</span>
                  <span className="text-amber-900 font-medium">{currentProject.requirements.bathrooms}</span>
                </div>
              </div>
            </motion.div>

            {/* Cost Estimate */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-amber-900 mb-4 flex items-center">
                <Calculator className="mr-3" size={20} />
                Cost Estimate
              </h3>
              
              <div className="space-y-3">
                {materialEstimate.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-amber-700 text-sm">{item.category}</span>
                    <span className="text-amber-900 font-medium">${item.cost.toLocaleString()}</span>
                  </div>
                ))}
                
                <div className="border-t border-amber-100 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-900 font-semibold">Total Estimate:</span>
                    <span className="text-amber-900 font-bold text-lg">${totalCost.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                <p className="text-xs text-amber-600">
                  * Estimates are based on average material costs. Actual costs may vary based on location, quality, and market conditions.
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold text-amber-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                  <Eye size={16} className="text-amber-600" />
                  <span className="text-amber-800 text-sm">Preview Design</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                  <Mail size={16} className="text-amber-600" />
                  <span className="text-amber-800 text-sm">Email to Contractor</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 p-3 bg-amber-50 hover:bg-amber-100 rounded-lg transition-colors">
                  <Printer size={16} className="text-amber-600" />
                  <span className="text-amber-800 text-sm">Print Summary</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportStep;
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Move, 
  RotateCw, 
  Trash2, 
  Save, 
  Undo, 
  Redo,
  Grid,
  Eye,
  Settings,
  ArrowRight
} from 'lucide-react';
import * as fabric from 'fabric';
import { useAppStore } from '../../store/useAppStore';

const Blueprint2DStep: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const { currentProject, setCurrentStep } = useAppStore();
  
  const [selectedTool, setSelectedTool] = useState<string>('select');
  const [showGrid, setShowGrid] = useState(true);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Dispose previous canvas if exists
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: '#fefefe'
    });

    fabricCanvasRef.current = canvas;

    // Add grid pattern
    if (showGrid) {
      addGrid(canvas);
    }

    // Generate initial AI blueprint
    generateAIBlueprint(canvas);

    return () => {
      canvas.dispose();
    };
  }, []);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setZoom(zoom);
      fabricCanvasRef.current.renderAll();
    }
  }, [zoom]);

  const addGrid = (canvas: fabric.Canvas) => {
    const gridSize = 20;
    const width = canvas.getWidth();
    const height = canvas.getHeight();

    const gridGroup = new fabric.Group([], {
      selectable: false,
      evented: false
    });

    // Vertical lines
    for (let i = 0; i <= width; i += gridSize) {
      const line = new fabric.Line([i, 0, i, height], {
        stroke: '#e0e0e0',
        strokeWidth: 0.5,
        selectable: false,
        evented: false
      });
      gridGroup.add(line);
    }

    // Horizontal lines
    for (let i = 0; i <= height; i += gridSize) {
      const line = new fabric.Line([0, i, width, i], {
        stroke: '#e0e0e0',
        strokeWidth: 0.5,
        selectable: false,
        evented: false
      });
      gridGroup.add(line);
    }

    canvas.add(gridGroup);

    // If canvas.sendToBack exists, use it. Otherwise, use workaround.
    if (typeof canvas.sendToBack === 'function') {
      canvas.sendToBack(gridGroup);
    } else {
      // Move the last object (gridGroup) to the front of the array (bottom of stack)
      canvas._objects.unshift(canvas._objects.pop());
      canvas.renderAll();
    }
  };

  const generateAIBlueprint = (canvas: fabric.Canvas) => {
    if (!currentProject) return;

    const { plot, requirements } = currentProject;
    
    // Scale factor to fit plot in canvas
    const scaleX = (canvas.getWidth() - 100) / plot.width;
    const scaleY = (canvas.getHeight() - 100) / plot.length;
    const scale = Math.min(scaleX, scaleY);

    // Plot boundary
    const plotRect = new fabric.Rect({
      left: 50,
      top: 50,
      width: plot.width * scale,
      height: plot.length * scale,
      fill: 'transparent',
      stroke: '#8B5CF6',
      strokeWidth: 3,
      selectable: false,
      strokeDashArray: [10, 5]
    });
    canvas.add(plotRect);

    // Generate rooms based on requirements
    const rooms = generateRooms(plot, requirements, scale);
    rooms.forEach(room => {
      const roomRect = new fabric.Rect({
        left: room.x + 50,
        top: room.y + 50,
        width: room.width,
        height: room.height,
        fill: room.color,
        stroke: '#4A5568',
        strokeWidth: 2,
        cornerColor: '#F59E0B',
        cornerSize: 8,
        transparentCorners: false
      });

      const label = new fabric.Text(room.type, {
        left: room.x + 50 + room.width / 2,
        top: room.y + 50 + room.height / 2,
        fontSize: 12,
        fontFamily: 'Arial',
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        fill: '#2D3748',
        selectable: false
      });

      canvas.add(roomRect);
      canvas.add(label);
    });

    canvas.renderAll();
  };

  const generateRooms = (plot: any, requirements: any, scale: number) => {
    const rooms = [];
    const plotWidth = plot.width * scale;
    const plotHeight = plot.length * scale;
    
    // Simple room layout algorithm
    const roomTypes = [
      { type: 'Living Room', color: 'rgba(34, 197, 94, 0.3)', priority: 1 },
      { type: 'Kitchen', color: 'rgba(249, 115, 22, 0.3)', priority: 2 },
      { type: 'Master Bedroom', color: 'rgba(59, 130, 246, 0.3)', priority: 3 },
      { type: 'Bedroom 2', color: 'rgba(168, 85, 247, 0.3)', priority: 4 },
      { type: 'Bathroom', color: 'rgba(236, 72, 153, 0.3)', priority: 5 }
    ];

    let currentX = 0;
    let currentY = 0;
    const roomPadding = 10;

    roomTypes.forEach((roomType, index) => {
      if (index < requirements.bedrooms + 2) {
        const roomWidth = plotWidth / 3 - roomPadding;
        const roomHeight = plotHeight / 2 - roomPadding;

        rooms.push({
          type: roomType.type,
          x: currentX,
          y: currentY,
          width: roomWidth,
          height: roomHeight,
          color: roomType.color
        });

        currentX += roomWidth + roomPadding;
        if (currentX + roomWidth > plotWidth) {
          currentX = 0;
          currentY += roomHeight + roomPadding;
        }
      }
    });

    return rooms;
  };

  const tools = [
    { id: 'select', icon: Move, label: 'Select' },
    { id: 'room', icon: Plus, label: 'Add Room' },
    { id: 'wall', icon: Grid, label: 'Add Wall' },
    { id: 'door', icon: RotateCw, label: 'Add Door' },
    { id: 'window', icon: Eye, label: 'Add Window' }
  ];

  const handleContinue = () => {
    setCurrentStep('3d-view');
  };

  return (
    <div className="h-full flex">
      {/* Toolbar */}
      <motion.div
        className="w-64 bg-white border-r border-amber-100 p-4 overflow-y-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-amber-900 mb-6">Blueprint Editor</h3>
        
        {/* Tools */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Tools</h4>
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.button
                key={tool.id}
                onClick={() => setSelectedTool(tool.id)}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  selectedTool === tool.id
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'hover:bg-amber-50 text-amber-700'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{tool.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Actions</h4>
          {[
            { icon: Save, label: 'Save', action: () => {} },
            { icon: Undo, label: 'Undo', action: () => {} },
            { icon: Redo, label: 'Redo', action: () => {} },
            { icon: Trash2, label: 'Delete', action: () => {} }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                onClick={action.action}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-amber-50 text-amber-700 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-amber-800">Settings</h4>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-amber-700">Show Grid</span>
            <input
              type="checkbox"
              checked={showGrid}
              onChange={(e) => setShowGrid(e.target.checked)}
              className="rounded border-amber-300 text-amber-600 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-sm text-amber-700 mb-2">Zoom: {Math.round(zoom * 100)}%</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      </motion.div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Canvas Header */}
        <div className="bg-white border-b border-amber-100 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-amber-900">
              {currentProject?.name || 'Untitled Project'}
            </h2>
            <p className="text-sm text-amber-600">
              {currentProject?.plot.width} × {currentProject?.plot.length} ft plot
            </p>
          </div>
          
          <motion.button
            onClick={handleContinue}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Generate 3D Model</span>
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Canvas */}
        <motion.div
          className="flex-1 bg-gray-50 p-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-lg border border-amber-100 p-4">
            <canvas
              ref={canvasRef}
              className="border border-gray-200 rounded"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blueprint2DStep;
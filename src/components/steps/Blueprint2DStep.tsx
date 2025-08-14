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
  ArrowRight,
  Square,
  Circle,
  Minus,
  Home,
  DoorOpen,
  Maximize2,
  Copy,
  Layers
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
  const [selectedRoom, setSelectedRoom] = useState<string>('living-room');
  const [wallThickness, setWallThickness] = useState(6);
  const [isDrawing, setIsDrawing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const roomTypes = [
    { id: 'living-room', name: 'Living Room', color: 'rgba(34, 197, 94, 0.3)', icon: Home },
    { id: 'bedroom', name: 'Bedroom', color: 'rgba(59, 130, 246, 0.3)', icon: Home },
    { id: 'kitchen', name: 'Kitchen', color: 'rgba(249, 115, 22, 0.3)', icon: Home },
    { id: 'bathroom', name: 'Bathroom', color: 'rgba(236, 72, 153, 0.3)', icon: Home },
    { id: 'dining', name: 'Dining Room', color: 'rgba(168, 85, 247, 0.3)', icon: Home },
    { id: 'study', name: 'Study', color: 'rgba(20, 184, 166, 0.3)', icon: Home },
    { id: 'garage', name: 'Garage', color: 'rgba(156, 163, 175, 0.3)', icon: Home }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
      fabricCanvasRef.current = null;
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 900,
      height: 700,
      backgroundColor: '#fefefe'
    });

    fabricCanvasRef.current = canvas;

    if (showGrid) {
      addGrid(canvas);
    }

    generateProfessionalBlueprint(canvas);
    setupCanvasEvents(canvas);
    saveToHistory(canvas);

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

  const setupCanvasEvents = (canvas: fabric.Canvas) => {
    let isDown = false;
    let origX = 0;
    let origY = 0;

    canvas.on('mouse:down', (opt) => {
      const evt = opt.e;
      if (selectedTool === 'wall' && !isDrawing) {
        isDown = true;
        const pointer = canvas.getPointer(evt);
        origX = pointer.x;
        origY = pointer.y;
        setIsDrawing(true);
      } else if (selectedTool === 'room') {
        const pointer = canvas.getPointer(evt);
        addRoom(canvas, pointer.x, pointer.y);
      } else if (selectedTool === 'door') {
        const pointer = canvas.getPointer(evt);
        addDoor(canvas, pointer.x, pointer.y);
      } else if (selectedTool === 'window') {
        const pointer = canvas.getPointer(evt);
        addWindow(canvas, pointer.x, pointer.y);
      }
    });

    canvas.on('mouse:move', (opt) => {
      if (!isDown || selectedTool !== 'wall') return;
      const evt = opt.e;
      const pointer = canvas.getPointer(evt);
      
      // Remove temporary line if exists
      const objects = canvas.getObjects();
      const tempLine = objects.find(obj => obj.name === 'temp-wall');
      if (tempLine) {
        canvas.remove(tempLine);
      }

      // Add temporary line
      const line = new fabric.Line([origX, origY, pointer.x, pointer.y], {
        stroke: '#8B5CF6',
        strokeWidth: wallThickness,
        selectable: false,
        name: 'temp-wall'
      });
      canvas.add(line);
      canvas.renderAll();
    });

    canvas.on('mouse:up', (opt) => {
      if (selectedTool === 'wall' && isDown) {
        const evt = opt.e;
        const pointer = canvas.getPointer(evt);
        
        // Remove temporary line
        const objects = canvas.getObjects();
        const tempLine = objects.find(obj => obj.name === 'temp-wall');
        if (tempLine) {
          canvas.remove(tempLine);
        }

        // Add permanent wall
        addWall(canvas, origX, origY, pointer.x, pointer.y);
        isDown = false;
        setIsDrawing(false);
        saveToHistory(canvas);
      }
    });

    canvas.on('object:modified', () => {
      saveToHistory(canvas);
    });
  };

  const addGrid = (canvas: fabric.Canvas) => {
    const gridSize = 20;
    const width = canvas.getWidth();
    const height = canvas.getHeight();

    // Create vertical grid lines
    for (let i = 0; i <= width; i += gridSize) {
      const line = new fabric.Line([i, 0, i, height], {
        stroke: '#e0e0e0',
        strokeWidth: 0.5,
        selectable: false,
        evented: false,
        objectCaching: false
      });
      canvas.add(line);
    }

    // Create horizontal grid lines
    for (let i = 0; i <= height; i += gridSize) {
      const line = new fabric.Line([0, i, width, i], {
        stroke: '#e0e0e0',
        strokeWidth: 0.5,
        selectable: false,
        evented: false,
        objectCaching: false
      });
      canvas.add(line);
    }
  };

  const generateProfessionalBlueprint = (canvas: fabric.Canvas) => {
    if (!currentProject) return;

    const { plot, requirements } = currentProject;
    
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
      strokeDashArray: [10, 5],
      name: 'plot-boundary'
    });
    canvas.add(plotRect);

    // Generate professional room layout
    const rooms = generateOptimizedRooms(plot, requirements, scale);
    
    // Add exterior walls first
    addExteriorWalls(canvas, 50, 50, plot.width * scale, plot.length * scale);
    
    // Add rooms
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
        transparentCorners: false,
        name: `room-${room.type}`
      });

      const label = new fabric.Text(room.name, {
        left: room.x + 50 + room.width / 2,
        top: room.y + 50 + room.height / 2,
        fontSize: 14,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        fill: '#2D3748',
        selectable: false,
        name: `label-${room.type}`
      });

      // Add dimensions
      const dimensionText = new fabric.Text(`${Math.round(room.width/scale)}' × ${Math.round(room.height/scale)}'`, {
        left: room.x + 50 + room.width / 2,
        top: room.y + 50 + room.height / 2 + 20,
        fontSize: 10,
        fontFamily: 'Arial',
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        fill: '#6B7280',
        selectable: false,
        name: `dimension-${room.type}`
      });

      canvas.add(roomRect);
      canvas.add(label);
      canvas.add(dimensionText);
    });

    // Add interior walls
    addInteriorWalls(canvas, rooms, scale);
    
    // Add doors and windows
    addDoorsAndWindows(canvas, rooms, scale);

    canvas.renderAll();
  };

  const generateOptimizedRooms = (plot: any, requirements: any, scale: number) => {
    const rooms = [];
    const plotWidth = plot.width * scale;
    const plotHeight = plot.length * scale;
    const margin = 20;
    
    // Calculate optimal room sizes based on requirements
    const totalRooms = requirements.bedrooms + (requirements.livingRoom ? 1 : 0) + 
                      (requirements.kitchen ? 1 : 0) + (requirements.diningRoom ? 1 : 0) + 
                      requirements.bathrooms + (requirements.study ? 1 : 0);
    
    // Living room (largest, front of house)
    if (requirements.livingRoom) {
      rooms.push({
        type: 'living-room',
        name: 'Living Room',
        x: margin,
        y: margin,
        width: plotWidth * 0.4,
        height: plotHeight * 0.35,
        color: 'rgba(34, 197, 94, 0.3)'
      });
    }

    // Kitchen (connected to dining)
    if (requirements.kitchen) {
      rooms.push({
        type: 'kitchen',
        name: 'Kitchen',
        x: plotWidth * 0.45,
        y: margin,
        width: plotWidth * 0.3,
        height: plotHeight * 0.25,
        color: 'rgba(249, 115, 22, 0.3)'
      });
    }

    // Dining room
    if (requirements.diningRoom) {
      rooms.push({
        type: 'dining',
        name: 'Dining Room',
        x: plotWidth * 0.45,
        y: plotHeight * 0.3,
        width: plotWidth * 0.3,
        height: plotHeight * 0.2,
        color: 'rgba(168, 85, 247, 0.3)'
      });
    }

    // Master bedroom
    rooms.push({
      type: 'master-bedroom',
      name: 'Master Bedroom',
      x: margin,
      y: plotHeight * 0.4,
      width: plotWidth * 0.35,
      height: plotHeight * 0.3,
      color: 'rgba(59, 130, 246, 0.3)'
    });

    // Additional bedrooms
    for (let i = 1; i < requirements.bedrooms; i++) {
      rooms.push({
        type: `bedroom-${i + 1}`,
        name: `Bedroom ${i + 1}`,
        x: plotWidth * 0.4 + (i - 1) * (plotWidth * 0.25),
        y: plotHeight * 0.55,
        width: plotWidth * 0.25,
        height: plotHeight * 0.25,
        color: 'rgba(59, 130, 246, 0.3)'
      });
    }

    // Bathrooms
    for (let i = 0; i < requirements.bathrooms; i++) {
      rooms.push({
        type: `bathroom-${i + 1}`,
        name: i === 0 ? 'Master Bath' : `Bathroom ${i + 1}`,
        x: plotWidth * 0.8,
        y: margin + i * (plotHeight * 0.15),
        width: plotWidth * 0.15,
        height: plotHeight * 0.12,
        color: 'rgba(236, 72, 153, 0.3)'
      });
    }

    // Study room
    if (requirements.study) {
      rooms.push({
        type: 'study',
        name: 'Study',
        x: plotWidth * 0.8,
        y: plotHeight * 0.4,
        width: plotWidth * 0.15,
        height: plotHeight * 0.15,
        color: 'rgba(20, 184, 166, 0.3)'
      });
    }

    return rooms;
  };

  const addExteriorWalls = (canvas: fabric.Canvas, x: number, y: number, width: number, height: number) => {
    const wallThickness = 8;
    
    // Top wall
    const topWall = new fabric.Rect({
      left: x,
      top: y,
      width: width,
      height: wallThickness,
      fill: '#4A5568',
      selectable: false,
      name: 'exterior-wall-top'
    });
    
    // Bottom wall
    const bottomWall = new fabric.Rect({
      left: x,
      top: y + height - wallThickness,
      width: width,
      height: wallThickness,
      fill: '#4A5568',
      selectable: false,
      name: 'exterior-wall-bottom'
    });
    
    // Left wall
    const leftWall = new fabric.Rect({
      left: x,
      top: y,
      width: wallThickness,
      height: height,
      fill: '#4A5568',
      selectable: false,
      name: 'exterior-wall-left'
    });
    
    // Right wall
    const rightWall = new fabric.Rect({
      left: x + width - wallThickness,
      top: y,
      width: wallThickness,
      height: height,
      fill: '#4A5568',
      selectable: false,
      name: 'exterior-wall-right'
    });

    canvas.add(topWall, bottomWall, leftWall, rightWall);
  };

  const addInteriorWalls = (canvas: fabric.Canvas, rooms: any[], scale: number) => {
    // Add walls between rooms based on layout
    rooms.forEach((room, index) => {
      // Add walls around each room
      const wallThickness = 4;
      
      // Only add walls that don't overlap with exterior walls
      if (room.x > 30) { // Left wall
        const wall = new fabric.Rect({
          left: room.x + 50 - wallThickness/2,
          top: room.y + 50,
          width: wallThickness,
          height: room.height,
          fill: '#6B7280',
          selectable: true,
          name: `interior-wall-${index}-left`
        });
        canvas.add(wall);
      }
      
      if (room.y > 30) { // Top wall
        const wall = new fabric.Rect({
          left: room.x + 50,
          top: room.y + 50 - wallThickness/2,
          width: room.width,
          height: wallThickness,
          fill: '#6B7280',
          selectable: true,
          name: `interior-wall-${index}-top`
        });
        canvas.add(wall);
      }
    });
  };

  const addDoorsAndWindows = (canvas: fabric.Canvas, rooms: any[], scale: number) => {
    rooms.forEach((room, index) => {
      // Add door to each room
      const door = new fabric.Rect({
        left: room.x + 50 + room.width - 30,
        top: room.y + 50 + room.height/2 - 15,
        width: 30,
        height: 6,
        fill: '#8B4513',
        stroke: '#654321',
        strokeWidth: 1,
        selectable: true,
        name: `door-${index}`
      });
      
      // Add door arc
      const doorArc = new fabric.Circle({
        left: room.x + 50 + room.width - 30,
        top: room.y + 50 + room.height/2 - 15,
        radius: 15,
        fill: 'transparent',
        stroke: '#8B4513',
        strokeWidth: 1,
        startAngle: 0,
        endAngle: Math.PI/2,
        selectable: false,
        name: `door-arc-${index}`
      });

      canvas.add(door);
      canvas.add(doorArc);

      // Add windows for exterior rooms
      if (room.type === 'living-room' || room.type.includes('bedroom')) {
        const window = new fabric.Rect({
          left: room.x + 50 + room.width/2 - 20,
          top: room.y + 50 - 3,
          width: 40,
          height: 6,
          fill: '#87CEEB',
          stroke: '#4682B4',
          strokeWidth: 1,
          selectable: true,
          name: `window-${index}`
        });
        canvas.add(window);
      }
    });
  };

  const addRoom = (canvas: fabric.Canvas, x: number, y: number) => {
    const roomType = roomTypes.find(r => r.id === selectedRoom);
    if (!roomType) return;

    const room = new fabric.Rect({
      left: x - 50,
      top: y - 30,
      width: 100,
      height: 60,
      fill: roomType.color,
      stroke: '#4A5568',
      strokeWidth: 2,
      cornerColor: '#F59E0B',
      cornerSize: 8,
      transparentCorners: false,
      name: `room-${Date.now()}`
    });

    const label = new fabric.Text(roomType.name, {
      left: x,
      top: y,
      fontSize: 12,
      fontFamily: 'Arial',
      textAlign: 'center',
      originX: 'center',
      originY: 'center',
      fill: '#2D3748',
      selectable: false,
      name: `label-${Date.now()}`
    });

    canvas.add(room);
    canvas.add(label);
    canvas.renderAll();
    saveToHistory(canvas);
  };

  const addWall = (canvas: fabric.Canvas, x1: number, y1: number, x2: number, y2: number) => {
    const wall = new fabric.Line([x1, y1, x2, y2], {
      stroke: '#4A5568',
      strokeWidth: wallThickness,
      selectable: true,
      cornerColor: '#F59E0B',
      cornerSize: 8,
      name: `wall-${Date.now()}`
    });

    canvas.add(wall);
    canvas.renderAll();
  };

  const addDoor = (canvas: fabric.Canvas, x: number, y: number) => {
    const door = new fabric.Rect({
      left: x - 15,
      top: y - 3,
      width: 30,
      height: 6,
      fill: '#8B4513',
      stroke: '#654321',
      strokeWidth: 1,
      selectable: true,
      cornerColor: '#F59E0B',
      cornerSize: 6,
      name: `door-${Date.now()}`
    });

    canvas.add(door);
    canvas.renderAll();
    saveToHistory(canvas);
  };

  const addWindow = (canvas: fabric.Canvas, x: number, y: number) => {
    const window = new fabric.Rect({
      left: x - 20,
      top: y - 3,
      width: 40,
      height: 6,
      fill: '#87CEEB',
      stroke: '#4682B4',
      strokeWidth: 1,
      selectable: true,
      cornerColor: '#F59E0B',
      cornerSize: 6,
      name: `window-${Date.now()}`
    });

    canvas.add(window);
    canvas.renderAll();
    saveToHistory(canvas);
  };

  const saveToHistory = (canvas: fabric.Canvas) => {
    const state = JSON.stringify(canvas.toJSON());
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0 && fabricCanvasRef.current) {
      const newIndex = historyIndex - 1;
      const state = history[newIndex];
      fabricCanvasRef.current.loadFromJSON(state, () => {
        fabricCanvasRef.current?.renderAll();
      });
      setHistoryIndex(newIndex);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1 && fabricCanvasRef.current) {
      const newIndex = historyIndex + 1;
      const state = history[newIndex];
      fabricCanvasRef.current.loadFromJSON(state, () => {
        fabricCanvasRef.current?.renderAll();
      });
      setHistoryIndex(newIndex);
    }
  };

  const deleteSelected = () => {
    if (fabricCanvasRef.current) {
      const activeObjects = fabricCanvasRef.current.getActiveObjects();
      activeObjects.forEach(obj => {
        fabricCanvasRef.current?.remove(obj);
      });
      fabricCanvasRef.current.discardActiveObject();
      fabricCanvasRef.current.renderAll();
      saveToHistory(fabricCanvasRef.current);
    }
  };

  const duplicateSelected = () => {
    if (fabricCanvasRef.current) {
      const activeObject = fabricCanvasRef.current.getActiveObject();
      if (activeObject) {
        activeObject.clone((cloned: fabric.Object) => {
          cloned.set({
            left: (cloned.left || 0) + 20,
            top: (cloned.top || 0) + 20,
          });
          fabricCanvasRef.current?.add(cloned);
          fabricCanvasRef.current?.setActiveObject(cloned);
          fabricCanvasRef.current?.renderAll();
          saveToHistory(fabricCanvasRef.current!);
        });
      }
    }
  };

  const tools = [
    { id: 'select', icon: Move, label: 'Select & Move' },
    { id: 'room', icon: Square, label: 'Add Room' },
    { id: 'wall', icon: Minus, label: 'Draw Wall' },
    { id: 'door', icon: DoorOpen, label: 'Add Door' },
    { id: 'window', icon: Maximize2, label: 'Add Window' }
  ];

  const handleContinue = () => {
    setCurrentStep('3d-view');
  };

  return (
    <div className="h-full flex">
      {/* Enhanced Toolbar */}
      <motion.div
        className="w-80 bg-white border-r border-amber-100 p-4 overflow-y-auto"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-amber-900 mb-6">Professional Blueprint Editor</h3>
        
        {/* Tools */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Design Tools</h4>
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

        {/* Room Types */}
        {selectedTool === 'room' && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-amber-800 mb-3">Room Type</h4>
            <div className="grid grid-cols-2 gap-2">
              {roomTypes.map((room) => {
                const Icon = room.icon;
                return (
                  <motion.button
                    key={room.id}
                    onClick={() => setSelectedRoom(room.id)}
                    className={`p-2 rounded-lg text-xs transition-all ${
                      selectedRoom === room.id
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'hover:bg-amber-50 text-amber-700 border border-gray-200'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon size={14} className="mx-auto mb-1" />
                    <div>{room.name}</div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Wall Settings */}
        {selectedTool === 'wall' && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-amber-800 mb-3">Wall Settings</h4>
            <div>
              <label className="block text-sm text-amber-700 mb-2">
                Thickness: {wallThickness}px
              </label>
              <input
                type="range"
                min="2"
                max="12"
                value={wallThickness}
                onChange={(e) => setWallThickness(Number(e.target.value))}
                className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2 mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Actions</h4>
          {[
            { icon: Save, label: 'Save Design', action: () => saveToHistory(fabricCanvasRef.current!) },
            { icon: Undo, label: 'Undo', action: undo, disabled: historyIndex <= 0 },
            { icon: Redo, label: 'Redo', action: redo, disabled: historyIndex >= history.length - 1 },
            { icon: Copy, label: 'Duplicate', action: duplicateSelected },
            { icon: Trash2, label: 'Delete Selected', action: deleteSelected }
          ].map((action, index) => {
            const Icon = action.icon;
            return (
              <motion.button
                key={index}
                onClick={action.action}
                disabled={action.disabled}
                className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                  action.disabled 
                    ? 'opacity-50 cursor-not-allowed text-gray-400'
                    : 'hover:bg-amber-50 text-amber-700'
                }`}
                whileHover={!action.disabled ? { scale: 1.02 } : {}}
                whileTap={!action.disabled ? { scale: 0.98 } : {}}
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{action.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* View Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-amber-800">View Settings</h4>
          
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
            <label className="block text-sm text-amber-700 mb-2">
              Zoom: {Math.round(zoom * 100)}%
            </label>
            <input
              type="range"
              min="0.5"
              max="3"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Project Stats */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Project Stats</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-amber-700">Total Area:</span>
              <span className="text-amber-900 font-medium">
                {currentProject?.plot.area.toLocaleString()} sq ft
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">Rooms:</span>
              <span className="text-amber-900 font-medium">
                {(currentProject?.requirements.bedrooms || 0) + 2}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700">Floors:</span>
              <span className="text-amber-900 font-medium">
                {currentProject?.requirements.floors || 1}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Canvas Area */}
      <div className="flex-1 flex flex-col">
        {/* Enhanced Canvas Header */}
        <div className="bg-white border-b border-amber-100 p-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-amber-900">
              {currentProject?.name || 'Professional Blueprint'}
            </h2>
            <p className="text-sm text-amber-600">
              {currentProject?.plot.width} × {currentProject?.plot.length} ft plot • 
              Scale 1:{Math.round(20/zoom)} • 
              {selectedTool === 'select' ? 'Selection Mode' : `${tools.find(t => t.id === selectedTool)?.label} Mode`}
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

        {/* Enhanced Canvas */}
        <motion.div
          className="flex-1 bg-gray-50 p-8 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-white rounded-lg shadow-lg border border-amber-100 p-4">
            <canvas
              ref={canvasRef}
              className="border border-gray-200 rounded cursor-crosshair"
              style={{ cursor: selectedTool === 'select' ? 'default' : 'crosshair' }}
            />
            
            {/* Canvas Instructions */}
            <div className="mt-4 text-center text-sm text-gray-600">
              {selectedTool === 'select' && 'Click and drag to select and move objects'}
              {selectedTool === 'room' && 'Click anywhere to add a room'}
              {selectedTool === 'wall' && 'Click and drag to draw walls'}
              {selectedTool === 'door' && 'Click on walls to add doors'}
              {selectedTool === 'window' && 'Click on walls to add windows'}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Blueprint2DStep;
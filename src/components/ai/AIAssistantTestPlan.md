# AI Assistant Test Plan

## Overview
This document outlines the test plan for the enhanced AI assistant functionality in the EDIFICE application. The AI assistant has been updated to use actual AI service methods instead of simulated responses.

## Test Scenarios

### 1. Basic Functionality
- **Objective**: Verify that the AI assistant opens and displays correctly
- **Steps**:
  1. Open the application
  2. Click on the AI assistant button (speech bubble icon in bottom right)
  3. Verify that the AI assistant panel opens
  4. Verify that the welcome message is displayed

### 2. Context-Aware Responses
- **Objective**: Verify that the AI assistant provides context-aware responses based on the current step
- **Steps**:
  1. Navigate to each step of the workflow (Input, 2D Edit, 3D View, Elevations, Export)
  2. Send a generic message in each step
  3. Verify that the response is relevant to the current step

### 3. Cost Estimation
- **Objective**: Verify that the AI assistant can provide cost estimates
- **Steps**:
  1. Enter project details in the Input step
  2. Open the AI assistant
  3. Ask a question about costs (e.g., "What is the estimated cost?")
  4. Verify that a cost estimate is provided based on the project details

### 4. Elevation Style Suggestions
- **Objective**: Verify that the AI assistant can provide elevation style suggestions
- **Steps**:
  1. Enter project details in the Input step
  2. Navigate to the Elevations step
  3. Open the AI assistant
  4. Ask a question about elevation styles (e.g., "What elevation styles do you recommend?")
  5. Verify that elevation style suggestions are provided

### 5. Room Layout Suggestions
- **Objective**: Verify that the AI assistant can provide room layout suggestions
- **Steps**:
  1. Enter project details in the Input step
  2. Navigate to the 2D Edit step
  3. Open the AI assistant
  4. Ask a question about room layouts (e.g., "Can you suggest a room layout?")
  5. Verify that room layout suggestions are provided

### 6. Error Handling
- **Objective**: Verify that the AI assistant handles errors gracefully
- **Steps**:
  1. Simulate a network error or service unavailability
  2. Ask the AI assistant a question
  3. Verify that an appropriate error message is displayed

## Expected Results

### Context-Aware Responses by Step
- **Input Step**: Responses should focus on defining project requirements and plot considerations
- **2D Edit Step**: Responses should focus on room layout and floor plan optimization
- **3D View Step**: Responses should focus on visualization and interior design
- **Elevations Step**: Responses should focus on exterior design and style selection
- **Export Step**: Responses should focus on preparing documents and materials for construction

### Special Query Responses
- **Cost-related queries**: Should trigger the cost estimation service
- **Elevation/Style queries**: Should trigger the elevation style generation service
- **Room layout queries**: Should trigger the blueprint generation service

## Test Data
Use the following test data for consistent testing:

1. Plot: 50ft × 60ft (3000 sq ft)
2. Requirements:
   - Floors: 2
   - Bedrooms: 3
   - Bathrooms: 2
   - Kitchen: Island
   - Garage: Yes
   - Garden: Yes
   - Balcony: Yes
   - Study: Yes
   - Dining Room: Yes
   - Living Room: Yes

## Test Environment
- Browser: Latest version of Chrome, Firefox, or Safari
- Network: Stable internet connection
- Device: Desktop or tablet with modern browser

## Troubleshooting
If the AI assistant is not responding as expected:

1. Check browser console for errors
2. Verify that all services are running correctly
3. Ensure that project data is properly entered
4. Try refreshing the page
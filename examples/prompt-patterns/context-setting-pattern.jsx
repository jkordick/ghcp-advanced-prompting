// Pattern Practice: Context-Setting Pattern
// Try this context-setting pattern prompt with Copilot:

// Context: We're building a real-time collaboration platform similar to Figma
// Given: We have WebSocket connections established and a canvas drawing system
// Need: Multi-user cursor tracking with user avatars and smooth animations
// Current Tech Stack: React, Socket.io, Canvas API, Framer Motion for animations
// Existing Systems: User authentication, room management, drawing tools
// 
// Create a collaborative cursor system that shows other users' mouse positions in real-time

import React, { useEffect, useState } from 'react';
import { useSocket } from '../hooks/useSocket';
import { motion } from 'framer-motion';

// Place your cursor below and try the context-setting pattern:
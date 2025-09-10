// Pattern Practice: Pattern Combination
// Try this combined pattern prompt with Copilot:

// Context: Building a financial dashboard for investment tracking
// Given: We have Chart.js configured and real-time stock data API
// 
// As a data visualization expert, create a portfolio performance chart that:
// - Displays multiple stock positions over time
// - Shows percentage gains/losses with color coding
// - Implements smooth animations for data updates
// - Includes interactive tooltips with detailed information
// - Supports multiple time ranges (1D, 1W, 1M, 1Y)
// - Handles real-time data streaming without performance issues
// - Follows accessibility guidelines for financial data
// 
// Constraints:
// - Must use Chart.js 4.x with custom plugins
// - Cannot block UI during data processing
// - Should work on mobile devices
// - Must handle missing or delayed data gracefully
// 
// Following this established pattern for our chart components:
const BaseChart = ({ data, options, onDataUpdate }) => {
  // Standard chart wrapper with error boundaries and loading states
};

import React, { useEffect, useState, useRef } from 'react';
import Chart from 'chart.js/auto';

// Place your cursor below and try the combined pattern:
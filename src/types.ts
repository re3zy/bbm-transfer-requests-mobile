// Mobile Transfer Request Types

export interface MobileTransferRequest {
  transferId: string;
  status: string;
  productName: string;
  skuNumber: string;
  excessStoreName: string;
  excessCity: string;
  excessState: string;
  excessDays: number;
  shortageStoreName: string;
  shortageCity: string;
  shortageState: string;
  requestedQty: number;
  excessQty: number;
}

// Sigma plugin configuration types
export interface SigmaConfig {
  source?: string;
  transferId?: string;
  status?: string;
  productName?: string;
  skuNumber?: string;
  excessStoreName?: string;
  excessCity?: string;
  excessState?: string;
  excessDays?: string;
  shortageStoreName?: string;
  shortageCity?: string;
  shortageState?: string;
  requestedQty?: string;
  excessQty?: string;
}

// Sigma data structure
export interface SigmaData {
  [columnName: string]: (string | number | boolean | null)[];
}

// Helper function to get status color
export function getStatusColor(status: string): string {
  const normalizedStatus = status.toLowerCase().trim();
  
  if (normalizedStatus.includes('pending')) {
    return '#f59e0b'; // Orange
  }
  if (normalizedStatus.includes('approved') || normalizedStatus.includes('confirmed')) {
    return '#10b981'; // Green
  }
  if (normalizedStatus.includes('declined') || normalizedStatus.includes('rejected')) {
    return '#dc2626'; // Red
  }
  
  return '#6b7280'; // Gray default
}

// Helper function to format numbers
export function formatNumber(num: number | null | undefined): string {
  if (num === null || num === undefined || isNaN(num)) return '—';
  return num.toString();
}

// Helper function to format days
export function formatDays(days: number): string {
  if (!days || isNaN(days)) return '0';
  return Math.round(days).toString();
}


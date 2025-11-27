import React, { useEffect, useState } from 'react';
import { client, useConfig, useElementData } from '@sigmacomputing/plugin';
import { SigmaConfig, SigmaData, MobileTransferRequest, formatNumber, formatDays, getStatusColor } from './types';
import './App.css';

// Configure the plugin editor panel with column mappings
client.config.configureEditorPanel([
  { name: 'source', type: 'element' },
  { name: 'transferId', type: 'column', source: 'source', allowMultiple: false, label: 'Transfer Id' },
  { name: 'status', type: 'column', source: 'source', allowMultiple: false, label: 'Status' },
  { name: 'productName', type: 'column', source: 'source', allowMultiple: false, label: 'Product Name' },
  { name: 'skuNumber', type: 'column', source: 'source', allowMultiple: false, label: 'SKU Number' },
  { name: 'excessStoreName', type: 'column', source: 'source', allowMultiple: false, label: 'Excess Store Name' },
  { name: 'excessCity', type: 'column', source: 'source', allowMultiple: false, label: 'Excess City' },
  { name: 'excessState', type: 'column', source: 'source', allowMultiple: false, label: 'Excess State' },
  { name: 'excessDays', type: 'column', source: 'source', allowMultiple: false, label: 'Excess Days' },
  { name: 'shortageStoreName', type: 'column', source: 'source', allowMultiple: false, label: 'Shortage Store Name' },
  { name: 'shortageCity', type: 'column', source: 'source', allowMultiple: false, label: 'Shortage City' },
  { name: 'shortageState', type: 'column', source: 'source', allowMultiple: false, label: 'Shortage State' },
  { name: 'requestedQty', type: 'column', source: 'source', allowMultiple: false, label: 'Requested QTY' },
  { name: 'excessQty', type: 'column', source: 'source', allowMultiple: false, label: 'Excess QTY' }
]);

const App: React.FC = (): React.JSX.Element => {
  const config: SigmaConfig = useConfig();
  const sigmaData: SigmaData = useElementData(config.source || '');
  const [transfer, setTransfer] = useState<MobileTransferRequest | null>(null);

  // Parse transfer data from Sigma columns (first row only for mobile view)
  useEffect(() => {
    if (!sigmaData || !config.transferId) {
      setTransfer(null);
      return;
    }

    try {
      const getValue = (columnId: string | undefined): string | number | boolean | null => {
        if (!columnId) return '';
        return sigmaData[columnId]?.[0] ?? '';
      };

      const parsedTransfer: MobileTransferRequest = {
        transferId: String(getValue(config.transferId)),
        status: String(getValue(config.status)),
        productName: String(getValue(config.productName)),
        skuNumber: String(getValue(config.skuNumber)),
        excessStoreName: String(getValue(config.excessStoreName)),
        excessCity: String(getValue(config.excessCity)),
        excessState: String(getValue(config.excessState)),
        excessDays: Number(getValue(config.excessDays)) || 0,
        shortageStoreName: String(getValue(config.shortageStoreName)),
        shortageCity: String(getValue(config.shortageCity)),
        shortageState: String(getValue(config.shortageState)),
        requestedQty: Number(getValue(config.requestedQty)) || 0,
        excessQty: Number(getValue(config.excessQty)) || 0,
      };

      setTransfer(parsedTransfer);
    } catch (error) {
      console.error('Error parsing transfer data:', error);
      setTransfer(null);
    }
  }, [sigmaData, config]);

  // Empty state
  if (!config.source || !config.transferId) {
    return (
      <div className="plugin-container">
        <p className="empty-text">Please configure the plugin data source.</p>
      </div>
    );
  }

  if (!transfer) {
    return (
      <div className="plugin-container">
        <p className="empty-text">No transfer request found.</p>
      </div>
    );
  }

  const statusColor = getStatusColor(transfer.status);

  return (
    <div className="plugin-container">
      {/* Transfer Request Card */}
      <div className="mobile-card">
        <div className="card-title">TRANSFER REQUEST</div>
        <div className="card-details">
          ID: {transfer.transferId}<br />
          Status: <strong style={{ color: statusColor }}>{transfer.status}</strong>
        </div>
      </div>

      {/* Product */}
      <div className="mobile-label">Product</div>
      <div className="mobile-value">
        {transfer.productName}
      </div>
      <div className="mobile-subtext">
        SKU: {transfer.skuNumber}
      </div>

      <hr className="mobile-divider" />

      {/* From Store */}
      <div className="mobile-label">From Your Store</div>
      <div className="mobile-value">
        {transfer.excessStoreName}<br />
        <span className="mobile-subvalue">{transfer.excessCity}, {transfer.excessState}</span>
      </div>

      {/* To Store */}
      <div className="mobile-label">To</div>
      <div className="mobile-value">
        {transfer.shortageStoreName}<br />
        <span className="mobile-subvalue">{transfer.shortageCity}, {transfer.shortageState}</span>
      </div>

      <hr className="mobile-divider" />

      {/* Requested Quantity */}
      <div className="mobile-label">Requested Quantity</div>
      <div className="mobile-value-large">{formatNumber(transfer.requestedQty)} units</div>

      {/* System Inventory */}
      <div className="mobile-label">System Inventory</div>
      <div className="mobile-value">{formatNumber(transfer.excessQty)} units available</div>
      <div className="mobile-subtext">({formatDays(transfer.excessDays)} days supply)</div>

      {/* Action Buttons */}
      <button className="mobile-btn mobile-btn-primary">
        Verify Inventory
      </button>

      <button className="mobile-btn mobile-btn-secondary">
        Decline Request
      </button>
    </div>
  );
};

export default App;


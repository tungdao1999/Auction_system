import React from 'react';

interface BootstrapModalProps {
  id: string;
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'lg' | 'xl';
  show: boolean;
  onClose?: () => void;
}

export default function BootstrapModal({
  id,
  header,
  body,
  footer,
  size,
  show,
  onClose,
}: BootstrapModalProps) {
  if (!show) return null; // Only render when show is true

  return (
    <div className="modal d-block" tabIndex={-1} id={id} aria-labelledby={`${id}-Label`} aria-modal="true" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className={`modal-dialog modal-dialog-centered ${size ? `modal-${size}` : 'modal-lg'}`}>
        <div className="modal-content">
          {header && (
            <div className="modal-header">
              <h5 className="modal-title" id={`${id}Label`}>{header}</h5>
              <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
            </div>
          )}
          {body && (
            <div className="modal-body">
              {body}
            </div>
          )}
          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
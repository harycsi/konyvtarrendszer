import { useState } from 'react';

interface ModalProps {
  msg: string | null;
  type: 'success' | 'error';
  onClose: () => void;
}

interface InputModalProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (value: string) => void;
}

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const Modal = ({ msg, type, onClose }: ModalProps) => {
  if (!msg) return null;

  const mainColor = type === 'success' ? '#52c41a' : '#ff4d4f';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: `6px solid ${mainColor}` }}
      >
        <button className="close-button" onClick={onClose}>&times;</button>

        <div style={{ fontSize: '40px', textAlign: 'center', color: mainColor }}>
          {type === 'success' ? '✓' : '⚠'}
        </div>

        <h2 style={{ textAlign: 'center' }}>{type === 'success' ? 'OK!' : 'Upsz!'}</h2>
        <p style={{ textAlign: 'center' }}>{msg}</p>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={onClose}
            style={{
              background: mainColor,
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Bezárás
          </button>
        </div>
      </div>
    </div>
  );
};

export const InputModal = ({ isOpen, title, onClose, onSubmit }: InputModalProps) => {
  const [inputValue, setInputValue] = useState("");

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: '6px solid #2563eb' }}
      >
        <button className="close-button" onClick={onClose}>&times;</button>

        <div style={{ fontSize: '40px', textAlign: 'center', color: '#2563eb', marginBottom: '10px' }}>
          ⓘ
        </div>

        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>{title}</h3>

        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={inputValue}
          onChange={(e) => {
            if (e.target.value === "" || /^[0-9\b]+$/.test(e.target.value)) {
              setInputValue(e.target.value)
            }
          }}
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '25px',
            borderRadius: '8px',
            border: '1px solid #d9d9d9',
            fontSize: '16px'
          }}
          autoFocus
        />

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid #d9d9d9',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            Mégse
          </button>
          <button
            disabled={!inputValue}
            onClick={() => { onSubmit(inputValue); setInputValue(""); }}
            style={{
              padding: '10px 20px',
              background: !inputValue ? '#ccc' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: !inputValue ? 'not-allowed' : 'pointer',
              fontWeight: 'bold',
              transition: '0.3s'
            }}
          >
            Kölcsönzés
          </button>
        </div>
      </div>
    </div>
  );
};

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: '6px solid #ff4d4f' }}
      >
        <button className="close-button" onClick={onCancel}>&times;</button>

        <div style={{ fontSize: '40px', textAlign: 'center', color: '#ff4d4f', marginBottom: '10px' }}>
          ❓
        </div>

        <h2 style={{ textAlign: 'center', margin: '0 0 10px 0' }}>{title}</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>{message}</p>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '25px' }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 25px',
              borderRadius: '8px',
              border: '1px solid #d9d9d9',
              background: '#fff',
              cursor: 'pointer'
            }}
          >
            Mégse
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: '#ff4d4f',
              color: 'white',
              border: 'none',
              padding: '10px 25px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Igen, törlöm
          </button>
        </div>
      </div>
    </div>
  );
};
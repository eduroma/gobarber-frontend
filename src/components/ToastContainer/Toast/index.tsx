import React, { useEffect } from 'react';
import {
  FiAlertCircle,
  FiInfo,
  FiCheckCircle,
  FiXCircle,
} from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast';

import { Container } from './styles';

const icon = {
  info: <FiInfo size={24} />,
  success: <FiCheckCircle size={24} />,
  error: <FiAlertCircle size={24} />,
};

interface ToastProps {
  message: ToastMessage;
  style: Record<string, unknown>;
}

const Toast: React.FC<ToastProps> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => removeToast(message.id), 3000);

    return () => clearTimeout(timer);
  }, [message.id, removeToast]);

  return (
    <Container
      key={message.id}
      type={message.type}
      hasDescription={!!message.description}
      style={style}
    >
      {icon[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && (
          <p>Não foi possível fazer login na aplicação.</p>
        )}
      </div>
      <button type="button" onClick={() => removeToast(message.id)}>
        <FiXCircle size={18} />
      </button>
    </Container>
  );
};

export default Toast;

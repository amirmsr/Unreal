import { IonToast } from '@ionic/react';
import React from 'react';

interface ToastComponentProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

const ToastComponent: React.FC<ToastComponentProps> = ({ isOpen, message, onClose }) => {
  return (
    <IonToast
      isOpen={isOpen}
      onDidDismiss={onClose}
      message={message}
      duration={2000}
    />
  );
};

export default ToastComponent;

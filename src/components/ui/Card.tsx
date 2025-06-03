import React from 'react';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  className = '',
  footer,
}) => {
  return (
    <div className={`rounded-lg bg-white shadow ${className}`}>
      {title && (
        <div className="border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{title}</h3>
        </div>
      )}
      
      <div className="px-6 py-5">
        {children}
      </div>
      
      {footer && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 rounded-b-lg">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
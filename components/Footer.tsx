
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center p-6 mt-12">
      <div className="text-xs text-gray-500 space-y-2">
        <p>CNPJ: 00.000.000/0001-00</p>
        <div className="flex justify-center items-center space-x-4">
          <a href="#" className="hover:text-gray-300 transition-colors">
            Política de Privacidade
          </a>
          <span>|</span>
          <a href="#" className="hover:text-gray-300 transition-colors">
            Suporte
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

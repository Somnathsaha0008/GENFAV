
import React from 'react';
import { ICONS } from '../constants';

interface SizeGuideModalProps {
    onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ onClose }) => {
    const sizeData = [
        { size: 'XS', chest: '34-36"', waist: '28-30"' },
        { size: 'S', chest: '36-38"', waist: '30-32"' },
        { size: 'M', chest: '38-40"', waist: '32-34"' },
        { size: 'L', chest: '40-42"', waist: '34-36"' },
        { size: 'XL', chest: '42-44"', waist: '36-38"' },
        { size: 'XXL', chest: '44-46"', waist: '38-40"' },
    ];
    return (
         <div className="fixed inset-0 bg-black bg-opacity-75 z-[60] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="relative bg-gray-900 w-full max-w-lg rounded-lg overflow-hidden p-8" onClick={e => e.stopPropagation()}>
                 <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white z-20">
                    {ICONS.close}
                </button>
                <h3 className="text-2xl font-bold text-white mb-6 text-center">Size Guide</h3>
                <p className="text-center text-brand-gray mb-6 text-sm">Measurements are in inches. This is a general guide, and sizes may vary between items.</p>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-brand-light">
                        <thead className="bg-gray-800">
                            <tr>
                                <th className="p-3 font-semibold">Size</th>
                                <th className="p-3 font-semibold">Chest</th>
                                <th className="p-3 font-semibold">Waist</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sizeData.map((row) => (
                                <tr key={row.size} className="border-b border-gray-800">
                                    <td className="p-3">{row.size}</td>
                                    <td className="p-3">{row.chest}</td>
                                    <td className="p-3">{row.waist}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

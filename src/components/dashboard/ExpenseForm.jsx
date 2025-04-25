import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

const ExpenseForm = ({ onSubmit, onCancel, currentData = { housing: 0, utilities: 0, groceries: 0, transportation: 0, other: 0 } }) => {
  const [formData, setFormData] = useState({
    housing: currentData.housing || 0,
    utilities: currentData.utilities || 0,
    groceries: currentData.groceries || 0,
    transportation: currentData.transportation || 0,
    other: currentData.other || 0
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseFloat(value) || 0
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="housing" className="block text-sm font-medium text-gray-700 mb-1">Housing (Rent/EMI)</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
          <input
            type="number"
            id="housing"
            name="housing"
            min="0"
            value={formData.housing}
            onChange={handleChange}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="utilities" className="block text-sm font-medium text-gray-700 mb-1">Utilities</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
          <input
            type="number"
            id="utilities"
            name="utilities"
            min="0"
            value={formData.utilities}
            onChange={handleChange}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="groceries" className="block text-sm font-medium text-gray-700 mb-1">Groceries</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
          <input
            type="number"
            id="groceries"
            name="groceries"
            min="0"
            value={formData.groceries}
            onChange={handleChange}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="transportation" className="block text-sm font-medium text-gray-700 mb-1">Transportation</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
          <input
            type="number"
            id="transportation"
            name="transportation"
            min="0"
            value={formData.transportation}
            onChange={handleChange}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="other" className="block text-sm font-medium text-gray-700 mb-1">Other Expenses</label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">₹</span>
          <input
            type="number"
            id="other"
            name="other"
            min="0"
            value={formData.other}
            onChange={handleChange}
            className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <X size={16} className="mr-1" />
          Cancel
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-3 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <Check size={16} className="mr-1" />
          Save
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
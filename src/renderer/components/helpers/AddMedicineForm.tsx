import * as React from 'react';
import { useState } from 'react';
import MedicineTable from '../table/MedicineTable';
import MachineTable from '../table/MachineTable';

interface Props {
  onClose: () => void;
}

export default function AddMedicineForm({ onClose }: Props) {
  const [formData, setFormData] = useState({
    medicine_id: '',
    name: '',
    description: '',
    unit: '',
    cost_out: '',
    ingredients: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Need fixed URL
      const response = await fetch('http://localhost:3001/medicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        onClose();
      } else {
        console.error('Failed to add medicine');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50" />
      <div className="relative z-10 max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8 bg-white rounded-md shadow-lg">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Thêm mới thuốc vào kho</h1>
          </div>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="id"
              >
                Id của thuốc
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  id="id"
                  name="medicine_id"
                  placeholder="Nhập id thuốc"
                  type="text"
                  style={{ outline: 'none' }}
                  required
                  value={formData.medicine_id}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Tên thuốc
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  id="name"
                  name="name"
                  placeholder="Nhập tên thuốc"
                  type="text"
                  required
                  style={{ outline: 'none' }}
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="description"
              >
                Mô tả
              </label>
              <div className="mt-1">
                <textarea
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  id="description"
                  name="description"
                  placeholder="Nhập mô tả"
                  rows={3}
                  style={{ resize: 'none', outline: 'none' }}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="unit"
              >
                Đơn vị
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  id="unit"
                  name="unit"
                  placeholder="Nhập đơn vị của thuốc"
                  type="string"
                  style={{ outline: 'none' }}
                  value={formData.unit}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="cost_out"
              >
                Giá bán
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  id="cost_out"
                  name="cost_out"
                  placeholder="Nhập giá bán"
                  type="number"
                  style={{ outline: 'none' }}
                  value={formData.cost_out}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="ingredients"
              >
                Thành phần
              </label>
              <div className="mt-1">
                <input
                  className="block w-full rounded-md border border-gray-300 px-4 py-3 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  id="ingredients"
                  name="ingredients"
                  placeholder="Nhập thành phần thuốc"
                  type="text"
                  style={{ outline: 'none' }}
                  value={formData.ingredients}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                type="button"
                onClick={onClose}
              >
                Hủy bỏ
              </button>
              <button
                className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                type="submit"
              >
                Thêm thuốc mới
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

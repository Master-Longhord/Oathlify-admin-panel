import { useState, useEffect } from 'react';
import { LuX } from "react-icons/lu";
import type { Template, CreateTemplateDTO } from "../../../types/template.d";

interface TemplateModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateTemplateDTO) => Promise<void>;
  isSubmitting: boolean;
}

const TemplateModal = ({ template, isOpen, onClose, onSubmit, isSubmitting }: TemplateModalProps) => {
  const [formData, setFormData] = useState<CreateTemplateDTO>({
    name: '',
    price: 0,
    content: '',
  });

  useEffect(() => {
    if (template) {
      setFormData({
        name: template.name,
        price: template.price,
        content: template.content,
      });
    } else {
      setFormData({ name: '', price: 0, content: '' });
    }
  }, [template, isOpen]);

  if (!isOpen) return null;

  const isEditMode = !!template;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* MOBILE OPTIMIZATION: Added 'm-4' for safety margin and responsive padding */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col max-h-[90vh] animate-fade-in-up">
        
        {/* Sticky Header - Reduced padding on mobile */}
        <div className="flex justify-between items-center p-4 md:p-6 border-b shrink-0">
          <h2 className="text-xl md:text-2xl font-bold text-brand-text-primary">
            {isEditMode ? 'Edit Template' : 'Create New Template'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <LuX size={24} />
          </button>
        </div>

        {/* Scrollable Body - Reduced padding on mobile */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <form id="template-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Template Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-brand-green-dark bg-white"
                placeholder="e.g. Affidavit of Good Conduct"
              />
            </div>

            {/* Price Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (₦)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-brand-green-dark bg-white"
              />
            </div>

            {/* Content Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Content Template</label>
              <p className="text-xs text-gray-500 mb-2">Use {'{{placeholders}}'} for dynamic data.</p>
              <textarea
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-brand-green-dark font-mono text-sm bg-white"
                placeholder="I, {{fullName}}, a citizen of..."
              />
            </div>
          </form>
        </div>

        {/* Sticky Footer */}
        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3 shrink-0 rounded-b-xl relative z-10">
          <button
              type="button"
              onClick={onClose}
              className="px-4 md:px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 text-sm md:text-base"
            >
              Cancel
          </button>

          <button
            type="submit"
            form="template-form"
            disabled={isSubmitting}
            className="px-4 md:px-6 py-2 text-white font-semibold rounded-lg hover:opacity-90 disabled:bg-gray-400 text-sm md:text-base"
            style={{ backgroundColor: '#1C3A3A' }} 
          >
            {isSubmitting ? (isEditMode ? 'Updating...' : 'Creating...') : (isEditMode ? 'Update Template' : 'Create Template')}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TemplateModal;

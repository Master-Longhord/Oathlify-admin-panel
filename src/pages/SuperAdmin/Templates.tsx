import { useEffect, useState } from 'react';
import { LuPlus, LuPencil, LuTrash2 } from 'react-icons/lu';
import { 
  getPlatformTemplates, 
  deletePlatformTemplate, 
  createPlatformTemplate, 
  updatePlatformTemplate, 
  getTemplateById 
} from '../../services/templateService';
import type { Template, CreateTemplateDTO } from '../../types/template.d';
import TemplateModal from './components/TemplateModal';

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTemplates = async () => {
    try {
      setIsLoading(true);
      const data = await getPlatformTemplates();
      setTemplates(data);
    } catch {
      setError('Failed to load templates.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  // Handlers
  const handleOpenCreate = () => {
    setSelectedTemplate(null);
    setIsModalOpen(true);
  };

  const handleEditClick = async (id: string) => {
    try {
        const data = await getTemplateById(id); 
        setSelectedTemplate(data);
        setIsModalOpen(true);
    } catch{
        alert("Could not load template details.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure? This will permanently delete this template.")) return;
    try {
      await deletePlatformTemplate(id);
      setTemplates(prev => prev.filter(t => t.id !== id));
    } catch {
      alert("Failed to delete template.");
    }
  };

  const handleSubmit = async (data: CreateTemplateDTO) => {
    setIsSubmitting(true);
    try {
      if (selectedTemplate) {
        await updatePlatformTemplate(selectedTemplate.id, data);
        alert("Template updated successfully!");
      } else {
        await createPlatformTemplate(data);
        alert("Template created successfully!");
      }
      await fetchTemplates();
      setIsModalOpen(false);
    } catch {
      alert(selectedTemplate ? "Failed to update template." : "Failed to create template.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-center">Loading templates...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-brand-text-primary">Templates</h1>
            <p className="text-brand-text-secondary mt-1">Manage affidavit types and pricing.</p>
          </div>
          <button 
            onClick={handleOpenCreate}
            className="flex items-center justify-center gap-2 px-4 py-3 md:py-2 bg-brand-green-dark text-white rounded-lg hover:opacity-90 transition-opacity w-full md:w-auto"
          >
            <LuPlus size={20} /> Create New
          </button>
        </div>

        {/* MOBILE OPTIMIZATION: overflow-x-auto handles horizontal scroll for the table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-brand-green-light text-brand-green-dark">
                <tr>
                  <th className="p-4 font-semibold">Template Name</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold">Created At</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id} className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{template.name}</td>
                    <td className="p-4">₦{template.price.toLocaleString()}</td>
                    <td className="p-4">{new Date(template.createdAt).toLocaleDateString()}</td>
                    <td className="p-4 flex justify-end gap-3">
                      <button onClick={() => handleEditClick(template.id)} className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-full">
                        <LuPencil size={18} />
                      </button>
                      <button onClick={() => handleDelete(template.id)} className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full">
                        <LuTrash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
                {templates.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">No templates found. Create one to get started.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <TemplateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        template={selectedTemplate}
        isSubmitting={isSubmitting}
      />
    </>
  );
};

export default Templates;

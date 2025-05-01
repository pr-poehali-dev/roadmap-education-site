
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

interface AddItemFormProps {
  onSubmit: (item: {
    title: string;
    description: string;
    links: Array<{ title: string; url: string }>;
  }) => void;
  onCancel: () => void;
}

const AddItemForm = ({ onSubmit, onCancel }: AddItemFormProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [links, setLinks] = useState<Array<{ title: string; url: string }>>([]);
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title, description, links });
      setTitle("");
      setDescription("");
      setLinks([]);
    }
  };

  const addLink = () => {
    if (newLinkTitle.trim() && newLinkUrl.trim()) {
      setLinks([...links, { title: newLinkTitle, url: newLinkUrl }]);
      setNewLinkTitle("");
      setNewLinkUrl("");
    }
  };

  const removeLink = (index: number) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Название
        </label>
        <input
          id="title"
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Описание
        </label>
        <textarea
          id="description"
          className="w-full p-2 border border-gray-300 rounded-md"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ссылки
        </label>
        
        <div className="space-y-2 mb-4">
          {links.map((link, index) => (
            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
              <span className="flex-grow">
                <span className="font-medium">{link.title}</span>: {link.url}
              </span>
              <Button 
                type="button"
                variant="ghost" 
                size="sm"
                onClick={() => removeLink(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="Название ссылки"
            className="flex-grow p-2 border border-gray-300 rounded-md"
            value={newLinkTitle}
            onChange={(e) => setNewLinkTitle(e.target.value)}
          />
          <input
            type="url"
            placeholder="URL"
            className="flex-grow p-2 border border-gray-300 rounded-md"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
          />
          <Button 
            type="button" 
            onClick={addLink} 
            size="sm" 
            variant="outline"
          >
            <Icon name="Plus" />
          </Button>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Отмена
        </Button>
        <Button 
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Добавить
        </Button>
      </div>
    </form>
  );
};

export default AddItemForm;

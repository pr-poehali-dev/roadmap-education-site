
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

interface Link {
  title: string;
  url: string;
}

interface RoadmapItemProps {
  item: {
    id: string;
    title: string;
    description: string;
    links: Link[];
  };
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (updatedItem: any) => void;
  onDelete: () => void;
  onCancelEdit: () => void;
}

const RoadmapItem = ({
  item,
  isEditing,
  onEdit,
  onUpdate,
  onDelete,
  onCancelEdit,
}: RoadmapItemProps) => {
  const [editedItem, setEditedItem] = useState({ ...item });
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleUpdate = () => {
    onUpdate(editedItem);
  };

  const addLink = () => {
    if (newLinkTitle.trim() && newLinkUrl.trim()) {
      setEditedItem({
        ...editedItem,
        links: [...editedItem.links, { title: newLinkTitle, url: newLinkUrl }],
      });
      setNewLinkTitle("");
      setNewLinkUrl("");
    }
  };

  const removeLink = (index: number) => {
    const updatedLinks = [...editedItem.links];
    updatedLinks.splice(index, 1);
    setEditedItem({ ...editedItem, links: updatedLinks });
  };

  if (isEditing) {
    return (
      <Card className="p-6 bg-white rounded-lg shadow-md">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md"
              value={editedItem.title}
              onChange={(e) =>
                setEditedItem({ ...editedItem, title: e.target.value })
              }
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={3}
              value={editedItem.description}
              onChange={(e) =>
                setEditedItem({ ...editedItem, description: e.target.value })
              }
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ссылки</label>
            <ul className="space-y-2 mb-4">
              {editedItem.links.map((link, index) => (
                <li key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-md">
                  <span className="flex-grow">
                    <span className="font-medium">{link.title}</span>: {link.url}
                  </span>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeLink(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Icon name="Trash2" size={16} />
                  </Button>
                </li>
              ))}
            </ul>
            
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
              <Button onClick={addLink} size="sm" variant="outline">
                <Icon name="Plus" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end gap-2 mt-4">
            <Button
              variant="outline"
              onClick={onCancelEdit}
            >
              Отмена
            </Button>
            <Button 
              onClick={handleUpdate}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Сохранить
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            <Icon name="Edit2" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <Icon name="Trash2" />
          </Button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{item.description}</p>
      
      {item.links.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Полезные ссылки:</h4>
          <ul className="space-y-1">
            {item.links.map((link, index) => (
              <li key={index} className="flex items-center gap-2">
                <Icon name="Link" size={16} className="text-indigo-500" />
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  );
};

export default RoadmapItem;

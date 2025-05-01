
import { useState } from "react";
import { Button } from "@/components/ui/button";
import RoadmapItem from "@/components/RoadmapItem";
import AddItemForm from "@/components/AddItemForm";

interface RoadmapItemType {
  id: string;
  title: string;
  description: string;
  links: Array<{ title: string; url: string }>;
}

const Index = () => {
  const [items, setItems] = useState<RoadmapItemType[]>([
    {
      id: "1",
      title: "Основы программирования",
      description: "Изучение базовых концепций и синтаксиса языков программирования",
      links: [
        { title: "Курс на Stepik", url: "https://stepik.org/course/58852/promo" },
        { title: "Учебник JavaScript", url: "https://learn.javascript.ru/" }
      ]
    },
    {
      id: "2",
      title: "Веб-разработка",
      description: "Изучение HTML, CSS и JavaScript для создания веб-сайтов",
      links: [
        { title: "MDN Web Docs", url: "https://developer.mozilla.org/ru/" },
        { title: "CSS-Tricks", url: "https://css-tricks.com/" }
      ]
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const addItem = (newItem: Omit<RoadmapItemType, "id">) => {
    const id = Date.now().toString();
    setItems([...items, { ...newItem, id }]);
    setShowAddForm(false);
  };

  const updateItem = (updatedItem: RoadmapItemType) => {
    setItems(
      items.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditingItemId(null);
  };

  const deleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

    <div className="min-h-screen bg-roadmap-beige/30">
      <header className="bg-roadmap-red text-roadmap-beige p-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold">Моя дорожная карта обучения</h1>
          <p className="mt-2 text-roadmap-beige/90">
            Организуйте свой образовательный путь и ресурсы в одном месте
          </p>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Пункты дорожной карты
          </h2>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            Добавить пункт
          </Button>
        </div>

        {showAddForm && (
          <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium mb-4">Добавить новый пункт</h3>
            <AddItemForm
              onSubmit={addItem}
              onCancel={() => setShowAddForm(false)}
            />
          </div>
        )}

        <div className="space-y-4">
          {items.map((item) => (
            <RoadmapItem
              key={item.id}
              item={item}
              isEditing={item.id === editingItemId}
              onEdit={() => setEditingItemId(item.id)}
              onUpdate={updateItem}
              onDelete={() => deleteItem(item.id)}
              onCancelEdit={() => setEditingItemId(null)}
            />
          ))}
        </div>

        {items.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">
              У вас пока нет пунктов в дорожной карте. Добавьте первый пункт, нажав кнопку выше.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

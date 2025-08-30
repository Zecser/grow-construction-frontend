import React from "react";
import { Plus, Trash2 } from "lucide-react";

interface FieldItem {
  heading: string;
  description: string;
}

interface DynamicFieldsProps {
  items: FieldItem[];
  setItems: (items: FieldItem[]) => void;
  label: string;
  maxFields?: number;
  fieldErrors?: { heading?: string; description?: string }[];
}

const DynamicFields: React.FC<DynamicFieldsProps> = ({
  items,
  setItems,
  label,
  maxFields = 5,
  fieldErrors = [],
}) => {
  const addField = () => {
    if (items.length < maxFields) setItems([...items, { heading: "", description: "" }]);
  };

  const removeField = (idx: number) => {
    setItems(items.filter((_, i) => i !== idx));
  };

  return (
    <>
      {items.map((item, idx) => (
        <div key={idx} className="flex flex-col lg:flex-row gap-6 flex-wrap mt-4">
          <div className="w-full sm:max-w-[256px] lg:max-w-[405px]">
            <label className="block text-sm font-medium text-primary mb-2">{label} Heading</label>
            <input
              type="text"
              value={item.heading}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx].heading = e.target.value;
                setItems(newItems);
              }}
              className="w-full px-4 py-2 border border-primary"
              placeholder={`${label} heading`}
            />
            {fieldErrors?.[idx]?.heading && <p className="text-red-500 text-xs mt-1">{fieldErrors[idx].heading}</p>}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start w-full sm:max-w-[256px] lg:max-w-[405px] xl:ml-10 gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium text-primary mb-2">{label} Description</label>
              <textarea
                rows={4}
                value={item.description}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[idx].description = e.target.value;
                  setItems(newItems);
                }}
                className="w-full px-4 py-2 border border-primary"
                placeholder={`${label} description`}
              />
              {fieldErrors?.[idx]?.description && <p className="text-red-500 text-xs mt-1">{fieldErrors[idx].description}</p>}
            </div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeField(idx)}
                className="bg-red-500 text-white px-3 py-2 mt-1 sm:mt-[30px] w-10"
              >
                <Trash2 size={16} />
              </button>
            )}

            {idx === items.length - 1 && items.length < maxFields && (
              <button
                type="button"
                onClick={addField}
                className="bg-primary text-white px-3 py-2 mt-1 sm:mt-[30px] w-10"
              >
                <Plus size={16} />
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default DynamicFields;

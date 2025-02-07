import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ImageIcon, Type, Square } from "lucide-react";

export type ComponentType = {
  id: string;
  type: string;
  icon: React.ReactNode;
  label: string;
};

export const componentLibrary: ComponentType[] = [
  {
    id: "button",
    type: "button",
    icon: <Square className="w-4 h-4" />,
    label: "Button",
  },
  {
    id: "text",
    type: "text",
    icon: <Type className="w-4 h-4" />,
    label: "Text",
  },
  {
    id: "image",
    type: "image",
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Image",
  },
];

export const ComponentLibrary = () => {
  return (
    <div className="grid grid-cols-2 gap-2 p-4">
      {componentLibrary.map((component) => (
        <Card
          key={component.id}
          className="p-4 cursor-move hover:bg-accent/10 transition-colors"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("componentType", component.type);
          }}
        >
          <div className="flex flex-col items-center gap-2">
            {component.icon}
            <span className="text-sm">{component.label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
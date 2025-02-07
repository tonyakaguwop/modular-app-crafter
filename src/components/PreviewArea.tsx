import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Component = {
  id: string;
  type: string;
  position: { x: number; y: number };
};

export const PreviewArea = () => {
  const [components, setComponents] = useState<Component[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const componentType = e.dataTransfer.getData("componentType");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setComponents([
      ...components,
      {
        id: `${componentType}-${Date.now()}`,
        type: componentType,
        position: { x, y },
      },
    ]);
  };

  return (
    <Card 
      className="flex-1 bg-white relative min-h-[600px] overflow-hidden"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="absolute top-4 left-4">
        <h2 className="text-lg font-semibold text-gray-400">Preview Area</h2>
      </div>
      {components.map((component) => (
        <div
          key={component.id}
          style={{
            position: "absolute",
            left: component.position.x,
            top: component.position.y,
          }}
        >
          {component.type === "button" && (
            <Button>Button</Button>
          )}
          {component.type === "text" && (
            <p className="text-gray-800">Text Component</p>
          )}
          {component.type === "image" && (
            <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Image</span>
            </div>
          )}
        </div>
      ))}
    </Card>
  );
};
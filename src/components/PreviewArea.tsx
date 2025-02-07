import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

type Component = {
  id: string;
  type: string;
  position: { x: number; y: number };
  properties?: {
    text?: string;
    checked?: boolean;
    value?: number;
  };
};

export const PreviewArea = () => {
  const [components, setComponents] = useState<Component[]>([]);
  const [showGrid, setShowGrid] = useState(false);

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
        properties: {
          text: "New Component",
          checked: false,
          value: 50,
        },
      },
    ]);
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center">
      <div className="flex gap-4 mb-4">
        <label className="flex items-center gap-2">
          <Checkbox
            checked={showGrid}
            onCheckedChange={(checked) => setShowGrid(checked as boolean)}
          />
          <span>Show Grid</span>
        </label>
      </div>
      <Card 
        className={`w-[360px] h-[640px] bg-white relative overflow-hidden border-8 border-gray-800 rounded-3xl ${
          showGrid ? "bg-grid-pattern" : ""
        }`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="absolute top-0 left-0 right-0 h-6 bg-black rounded-t-xl">
          <div className="w-16 h-4 bg-gray-800 mx-auto rounded-b-lg" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-black rounded-b-xl flex justify-center items-center gap-8">
          <div className="w-8 h-8 rounded-full border-2 border-gray-600" />
          <div className="w-12 h-4 rounded-sm border-2 border-gray-600" />
          <div className="w-8 h-8 rounded-full border-2 border-gray-600" />
        </div>
        <div className="p-8 pt-12 h-full overflow-auto">
          {components.map((component) => (
            <div
              key={component.id}
              style={{
                position: "absolute",
                left: component.position.x,
                top: component.position.y,
              }}
              className="hover:outline hover:outline-2 hover:outline-blue-500"
            >
              {component.type === "button" && (
                <Button>{component.properties?.text}</Button>
              )}
              {component.type === "text" && (
                <p className="text-gray-800">{component.properties?.text}</p>
              )}
              {component.type === "checkbox" && (
                <Checkbox checked={component.properties?.checked} />
              )}
              {component.type === "slider" && (
                <Slider
                  defaultValue={[component.properties?.value || 50]}
                  max={100}
                  step={1}
                  className="w-32"
                />
              )}
              {component.type === "image" && (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Image</span>
                </div>
              )}
              {/* Add more component types here */}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
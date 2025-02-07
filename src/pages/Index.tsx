import { useState } from "react";
import { ComponentPanel } from "@/components/ComponentPanel";
import { PreviewArea } from "@/components/PreviewArea";
import { PropertiesPanel } from "@/components/PropertiesPanel";

type Component = {
  id: string;
  type: string;
  position: { x: number; y: number };
  properties?: {
    text?: string;
    checked?: boolean;
    value?: number;
    width?: string;
    height?: string;
    fontSize?: number;
    backgroundColor?: string;
    textColor?: string;
    enabled?: boolean;
    visible?: boolean;
  };
};

const Index = () => {
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [components, setComponents] = useState<Component[]>([]);

  const handleUpdateProperties = (newProperties: Component["properties"]) => {
    setComponents(
      components.map((component) =>
        component.id === selectedComponent?.id
          ? { ...component, properties: newProperties }
          : component
      )
    );
  };

  const handleDeleteComponent = () => {
    if (selectedComponent) {
      setComponents(components.filter((component) => component.id !== selectedComponent.id));
      setSelectedComponent(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <ComponentPanel />
      <PreviewArea
        components={components}
        setComponents={setComponents}
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
      />
      <PropertiesPanel
        selectedComponent={selectedComponent}
        onUpdateProperties={handleUpdateProperties}
        onDeleteComponent={handleDeleteComponent}
      />
    </div>
  );
};

export default Index;
import { useState } from "react";
import { ComponentPanel } from "@/components/ComponentPanel";
import { PreviewArea } from "@/components/PreviewArea";
import { PropertiesPanel } from "@/components/PropertiesPanel";

const Index = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [components, setComponents] = useState([]);

  const handleUpdateProperties = (newProperties) => {
    setComponents(
      components.map((component) =>
        component.id === selectedComponent.id
          ? { ...component, properties: newProperties }
          : component
      )
    );
  };

  const handleDeleteComponent = () => {
    setComponents(components.filter((component) => component.id !== selectedComponent.id));
    setSelectedComponent(null);
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
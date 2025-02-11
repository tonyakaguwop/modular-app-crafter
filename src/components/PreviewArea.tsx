
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { PreviewControls } from "./preview/PreviewControls";
import { PreviewFrame } from "./preview/PreviewFrame";
import { ComponentRenderer } from "./preview/ComponentRenderer";

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
    href?: string;
  };
};

interface PreviewAreaProps {
  components: Component[];
  setComponents: React.Dispatch<React.SetStateAction<Component[]>>;
  selectedComponent: Component | null;
  setSelectedComponent: React.Dispatch<React.SetStateAction<Component | null>>;
  onAddComponent: (component: Component) => void;
}

export const PreviewArea = ({
  components,
  setComponents,
  selectedComponent: externalSelectedComponent,
  setSelectedComponent,
  onAddComponent,
}: PreviewAreaProps) => {
  const [showGrid, setShowGrid] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const componentType = e.dataTransfer.getData("componentType");
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Get default text based on component type
    const getDefaultText = (type: string) => {
      switch (type) {
        case "button": return "Button";
        case "text": return "Text";
        case "heading": return "Heading";
        case "paragraph": return "Text";
        case "quote": return "Quote";
        case "checkbox": return "Check";
        case "radio": return "Option";
        case "link": return "Link";
        case "label": return "Label";
        default: return "";
      }
    };

    const newComponent = {
      id: `${componentType}-${Date.now()}`,
      type: componentType,
      position: { x, y },
      properties: {
        text: getDefaultText(componentType),
        checked: false,
        value: 50,
        width: "auto",
        height: "auto",
        fontSize: 14,
        backgroundColor: "#ffffff",
        textColor: "#000000",
        enabled: true,
        visible: true,
        href: "#",
      },
    };

    onAddComponent(newComponent);
  };

  const handleComponentClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const component = components.find(c => c.id === id);
    if (component) {
      setSelectedComponent(component);
    }
  };

  const handleBackgroundClick = () => {
    setSelectedComponent(null);
  };

  return (
    <div className="flex-1 p-8 flex flex-col items-center">
      <PreviewControls
        showGrid={showGrid}
        onShowGridChange={(checked) => setShowGrid(checked)}
      />
      <Card>
        <PreviewFrame
          showGrid={showGrid}
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleBackgroundClick}
        >
          {components.map((component) => (
            <ComponentRenderer
              key={component.id}
              component={component}
              isSelected={externalSelectedComponent?.id === component.id}
              onComponentClick={handleComponentClick}
            />
          ))}
        </PreviewFrame>
      </Card>
    </div>
  );
};

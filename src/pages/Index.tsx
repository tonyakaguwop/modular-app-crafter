import { ComponentPanel } from "@/components/ComponentPanel";
import { PreviewArea } from "@/components/PreviewArea";
import { PropertiesPanel } from "@/components/PropertiesPanel";

const Index = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <ComponentPanel />
      <PreviewArea />
      <PropertiesPanel />
    </div>
  );
};

export default Index;
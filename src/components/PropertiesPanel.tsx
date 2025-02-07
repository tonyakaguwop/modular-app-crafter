import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

type PropertiesPanelProps = {
  selectedComponent: any;
  onUpdateProperties: (properties: any) => void;
  onDeleteComponent: () => void;
};

export const PropertiesPanel = ({
  selectedComponent,
  onUpdateProperties,
  onDeleteComponent,
}: PropertiesPanelProps) => {
  const handlePropertyChange = (property: string, value: any) => {
    onUpdateProperties({ ...selectedComponent?.properties, [property]: value });
  };

  const handleDelete = () => {
    onDeleteComponent();
    toast.success("Component deleted successfully!");
  };

  if (!selectedComponent) {
    return (
      <Card className="w-64 bg-background border-l flex flex-col h-full">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Properties</h2>
        </div>
        <div className="flex-1 p-4 flex items-center justify-center text-muted-foreground">
          Select a component to edit its properties
        </div>
      </Card>
    );
  }

  return (
    <Card className="w-64 bg-background border-l flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Properties</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Label>Text</Label>
            <Input
              value={selectedComponent.properties?.text || ""}
              onChange={(e) => handlePropertyChange("text", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Input
              type="number"
              value={selectedComponent.properties?.fontSize || 14}
              onChange={(e) => handlePropertyChange("fontSize", Number(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Width</Label>
            <Input
              value={selectedComponent.properties?.width || "auto"}
              onChange={(e) => handlePropertyChange("width", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Height</Label>
            <Input
              value={selectedComponent.properties?.height || "auto"}
              onChange={(e) => handlePropertyChange("height", e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label>Enabled</Label>
            <Switch
              checked={selectedComponent.properties?.enabled}
              onCheckedChange={(checked) => handlePropertyChange("enabled", checked)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Label>Visible</Label>
            <Switch
              checked={selectedComponent.properties?.visible}
              onCheckedChange={(checked) => handlePropertyChange("visible", checked)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input
              type="color"
              className="h-10 p-1"
              value={selectedComponent.properties?.backgroundColor || "#ffffff"}
              onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Text Color</Label>
            <Input
              type="color"
              className="h-10 p-1"
              value={selectedComponent.properties?.textColor || "#000000"}
              onChange={(e) => handlePropertyChange("textColor", e.target.value)}
            />
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="destructive" className="w-full" onClick={handleDelete}>
              Delete Component
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
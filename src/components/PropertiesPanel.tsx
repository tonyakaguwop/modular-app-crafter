
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
        <p className="text-sm text-muted-foreground">{selectedComponent.type}</p>
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

          {selectedComponent.type === 'link' && (
            <div className="space-y-2">
              <Label>URL</Label>
              <Input
                value={selectedComponent.properties?.href || "#"}
                onChange={(e) => handlePropertyChange("href", e.target.value)}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label>Font Size</Label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={selectedComponent.properties?.fontSize || 14}
                onChange={(e) => handlePropertyChange("fontSize", Number(e.target.value))}
              />
              <span className="text-sm text-muted-foreground">px</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Width</Label>
            <Select
              value={selectedComponent.properties?.width || "auto"}
              onValueChange={(value) => handlePropertyChange("width", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select width" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="100%">Full</SelectItem>
                <SelectItem value="50%">Half</SelectItem>
                <SelectItem value="200px">200px</SelectItem>
                <SelectItem value="300px">300px</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Height</Label>
            <Select
              value={selectedComponent.properties?.height || "auto"}
              onValueChange={(value) => handlePropertyChange("height", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select height" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="auto">Auto</SelectItem>
                <SelectItem value="100%">Full</SelectItem>
                <SelectItem value="50%">Half</SelectItem>
                <SelectItem value="200px">200px</SelectItem>
                <SelectItem value="300px">300px</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />
          
          <div className="space-y-4">
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
          </div>
          
          <Separator />

          <div className="space-y-2">
            <Label>Background Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                className="h-10 p-1 w-16"
                value={selectedComponent.properties?.backgroundColor || "#ffffff"}
                onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
              />
              <Input
                value={selectedComponent.properties?.backgroundColor || "#ffffff"}
                onChange={(e) => handlePropertyChange("backgroundColor", e.target.value)}
                placeholder="#ffffff"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Text Color</Label>
            <div className="flex gap-2">
              <Input
                type="color"
                className="h-10 p-1 w-16"
                value={selectedComponent.properties?.textColor || "#000000"}
                onChange={(e) => handlePropertyChange("textColor", e.target.value)}
              />
              <Input
                value={selectedComponent.properties?.textColor || "#000000"}
                onChange={(e) => handlePropertyChange("textColor", e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>
          
          <Separator />
          
          <div className="pt-4">
            <Button variant="destructive" className="w-full" onClick={handleDelete}>
              Delete Component
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

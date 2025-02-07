import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export const PropertiesPanel = () => {
  return (
    <Card className="w-64 bg-background border-l flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Properties</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">
          <div className="space-y-2">
            <Label>Text</Label>
            <Input placeholder="Component text" />
          </div>
          
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Input type="number" placeholder="14" />
          </div>
          
          <div className="space-y-2">
            <Label>Width</Label>
            <Input placeholder="Auto" />
          </div>
          
          <div className="space-y-2">
            <Label>Height</Label>
            <Input placeholder="Auto" />
          </div>
          
          <div className="flex items-center justify-between">
            <Label>Enabled</Label>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <Label>Visible</Label>
            <Switch defaultChecked />
          </div>
          
          <div className="space-y-2">
            <Label>Background Color</Label>
            <Input type="color" className="h-10 p-1" />
          </div>
          
          <div className="space-y-2">
            <Label>Text Color</Label>
            <Input type="color" className="h-10 p-1" />
          </div>
          
          <div className="pt-4 border-t">
            <Button variant="destructive" className="w-full">
              Delete Component
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
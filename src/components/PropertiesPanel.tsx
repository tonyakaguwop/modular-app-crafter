import { Card } from "@/components/ui/card";

export const PropertiesPanel = () => {
  return (
    <Card className="w-64 bg-background border-l">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Properties</h2>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500">Select a component to edit its properties</p>
      </div>
    </Card>
  );
};
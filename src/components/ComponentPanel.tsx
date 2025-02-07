import { Card } from "@/components/ui/card";
import { ComponentLibrary } from "./ComponentLibrary";

export const ComponentPanel = () => {
  return (
    <Card className="h-full w-64 bg-background border-r">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Components</h2>
      </div>
      <ComponentLibrary />
    </Card>
  );
};
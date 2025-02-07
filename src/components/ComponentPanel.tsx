import { Card } from "@/components/ui/card";
import { ComponentLibrary } from "./ComponentLibrary";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const ComponentPanel = () => {
  return (
    <Card className="h-full w-64 bg-background border-r flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Components</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        <Accordion type="single" collapsible defaultValue="ui">
          <AccordionItem value="ui">
            <AccordionTrigger className="px-4">User Interface</AccordionTrigger>
            <AccordionContent>
              <ComponentLibrary />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="layout">
            <AccordionTrigger className="px-4">Layout</AccordionTrigger>
            <AccordionContent>
              <div className="p-4 text-sm text-gray-500">
                Layout components coming soon
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="media">
            <AccordionTrigger className="px-4">Media</AccordionTrigger>
            <AccordionContent>
              <div className="p-4 text-sm text-gray-500">
                Media components coming soon
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
};
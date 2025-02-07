import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ImageIcon,
  Type,
  Square,
  Calendar,
  List,
  AlignLeft,
  Lock,
  Sliders,
  Timer,
  Globe,
  CheckSquare,
} from "lucide-react";

export type ComponentType = {
  id: string;
  type: string;
  icon: React.ReactNode;
  label: string;
};

export const componentLibrary: ComponentType[] = [
  {
    id: "button",
    type: "button",
    icon: <Square className="w-4 h-4" />,
    label: "Button",
  },
  {
    id: "text",
    type: "text",
    icon: <Type className="w-4 h-4" />,
    label: "Text",
  },
  {
    id: "image",
    type: "image",
    icon: <ImageIcon className="w-4 h-4" />,
    label: "Image",
  },
  {
    id: "checkbox",
    type: "checkbox",
    icon: <CheckSquare className="w-4 h-4" />,
    label: "CheckBox",
  },
  {
    id: "datepicker",
    type: "datepicker",
    icon: <Calendar className="w-4 h-4" />,
    label: "DatePicker",
  },
  {
    id: "listview",
    type: "listview",
    icon: <List className="w-4 h-4" />,
    label: "ListView",
  },
  {
    id: "label",
    type: "label",
    icon: <AlignLeft className="w-4 h-4" />,
    label: "Label",
  },
  {
    id: "password",
    type: "password",
    icon: <Lock className="w-4 h-4" />,
    label: "Password",
  },
  {
    id: "slider",
    type: "slider",
    icon: <Sliders className="w-4 h-4" />,
    label: "Slider",
  },
  {
    id: "timer",
    type: "timer",
    icon: <Timer className="w-4 h-4" />,
    label: "TimePicker",
  },
  {
    id: "webview",
    type: "webview",
    icon: <Globe className="w-4 h-4" />,
    label: "WebViewer",
  },
];

export const ComponentLibrary = () => {
  return (
    <div className="grid grid-cols-2 gap-2 p-4 overflow-y-auto max-h-[calc(100vh-10rem)]">
      {componentLibrary.map((component) => (
        <Card
          key={component.id}
          className="p-4 cursor-move hover:bg-accent/10 transition-colors"
          draggable
          onDragStart={(e) => {
            e.dataTransfer.setData("componentType", component.type);
          }}
        >
          <div className="flex flex-col items-center gap-2">
            {component.icon}
            <span className="text-sm">{component.label}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};
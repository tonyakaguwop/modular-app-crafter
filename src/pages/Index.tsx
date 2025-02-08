
import { useEffect, useState } from "react";
import { ComponentPanel } from "@/components/ComponentPanel";
import { PreviewArea } from "@/components/PreviewArea";
import { PropertiesPanel } from "@/components/PropertiesPanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
  };
};

const Index = () => {
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [components, setComponents] = useState<Component[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadComponents();
  }, []);

  const loadComponents = async () => {
    try {
      const { data, error } = await supabase
        .from('components')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        throw error;
      }

      if (data) {
        const transformedComponents: Component[] = data.map(item => {
          const position = typeof item.position === 'string' 
            ? JSON.parse(item.position) 
            : item.position;

          return {
            id: item.id,
            type: item.type,
            position: position as { x: number; y: number },
            properties: item.properties as Component['properties']
          };
        });
        setComponents(transformedComponents);
      }
    } catch (error) {
      console.error('Error loading components:', error);
      toast.error('Failed to load components');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProperties = async (newProperties: Component["properties"]) => {
    if (!selectedComponent) return;

    try {
      const { error } = await supabase
        .from('components')
        .update({ properties: newProperties })
        .eq('id', selectedComponent.id);

      if (error) {
        throw error;
      }

      setComponents(
        components.map((component) =>
          component.id === selectedComponent.id
            ? { ...component, properties: newProperties }
            : component
        )
      );
      toast.success('Properties updated successfully');
    } catch (error) {
      console.error('Error updating properties:', error);
      toast.error('Failed to update properties');
    }
  };

  const handleDeleteComponent = async () => {
    if (!selectedComponent) return;

    try {
      const { error } = await supabase
        .from('components')
        .delete()
        .eq('id', selectedComponent.id);

      if (error) {
        throw error;
      }

      setComponents(components.filter((component) => component.id !== selectedComponent.id));
      setSelectedComponent(null);
      toast.success('Component deleted successfully');
    } catch (error) {
      console.error('Error deleting component:', error);
      toast.error('Failed to delete component');
    }
  };

  const handleAddComponent = async (newComponent: Component) => {
    try {
      const { data, error } = await supabase
        .from('components')
        .insert([{
          type: newComponent.type,
          position: newComponent.position,
          properties: newComponent.properties
        }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        const position = typeof data.position === 'string' 
          ? JSON.parse(data.position) 
          : data.position;

        const transformedComponent: Component = {
          id: data.id,
          type: data.type,
          position: position as { x: number; y: number },
          properties: data.properties as Component['properties']
        };

        setComponents([...components, transformedComponent]);
        setSelectedComponent(transformedComponent);
        toast.success('Component added successfully');
      }
    } catch (error) {
      console.error('Error adding component:', error);
      toast.error('Failed to add component');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-background">
      <ComponentPanel />
      <PreviewArea
        components={components}
        setComponents={setComponents}
        selectedComponent={selectedComponent}
        setSelectedComponent={setSelectedComponent}
        onAddComponent={handleAddComponent}
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

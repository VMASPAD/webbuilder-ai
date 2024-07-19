import React, { useEffect, useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import getEditorInstance from "../grapesjs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FontManagement from "../complements/FontManagement";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsButton = ({ isOpen, onClose }: DialogProps) => {
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    null
  );  
  const [prompt, setPrompt] = useState("Create a prompt");

  const getPrompt = (): string => {
    const storedPrompt = localStorage.getItem("prompt");
    return storedPrompt !== null ? storedPrompt : "Create a prompt";
  };
  const { toast } = useToast();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    const storedValue = localStorage.getItem("context");
    setChecked(storedValue === "true");
    const storedPrompt = localStorage.getItem("prompt");
    if (storedPrompt !== null) {
      setPrompt(storedPrompt);
    }
  }, []);

  const handleCheckboxChange = (checked: boolean) => {
    setChecked(checked);
    localStorage.setItem("context", checked.toString());
  };

  const changeData = () => {
    const api = (document.getElementById("API") as HTMLInputElement)?.value;
    const prompt = (document.getElementById("prompt") as HTMLInputElement)
      ?.value;

    if (api) localStorage.setItem("apigroq", api);
    if (prompt) localStorage.setItem("prompt", prompt);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFileContent(e.target?.result ?? null);
        const editor = getEditorInstance();
        if (editor) {
          editor.CssComposer.addRules(e.target?.result as string);
        } else {
          console.error("Editor instance not found");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <Tabs defaultValue="Settings" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="Settings">Settings</TabsTrigger>
              <TabsTrigger value="AI">AI</TabsTrigger>
              <TabsTrigger value="Fonts">Fonts</TabsTrigger>
              <TabsTrigger value="Theme">Theme</TabsTrigger>
            </TabsList>
            <TabsContent value="Settings">
              <div className="my-10">
                <div className="flex flex-row items-center gap-3">
                  <Checkbox
                    checked={checked}
                    onCheckedChange={handleCheckboxChange}
                    id="context-checkbox"
                  />
                  <label htmlFor="context-checkbox">
                    Use context at the prompt
                  </label>
                </div>
                <Separator className="my-4" />
                <Input
                  placeholder="Archive CSS"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
            </TabsContent>
            <TabsContent value="AI">
              <DialogTitle>Change prompt or API (Groq).</DialogTitle>
              <DialogDescription>
                <p>
                  Change the API or prompt to generate your own response with
                  your access key
                </p>
              </DialogDescription>
              <Separator className="my-4" />
              <Input placeholder="API" id="API" />
              <Separator className="my-4" />
              <Textarea placeholder={prompt} id="prompt" />
              <Separator className="my-4" />
              <Button
                className="bg-slate-900"
                onClick={() => {
                  changeData();
                  toast({
                    title: "Changed",
                    description: "API and Prompt is changed",
                  });
                }}
              >
                Change
              </Button>
            </TabsContent>
            <TabsContent value="Fonts">
              <DialogTitle>Theme Management</DialogTitle>
              <FontManagement />
            </TabsContent>
            <TabsContent value="Theme">
              <DialogTitle>Font Management</DialogTitle>
              <Textarea />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsButton;

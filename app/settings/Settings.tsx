import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Dialog{
    isOpen: boolean
    onClose: string
}

const CustomDialog = ({ isOpen, onClose }: Dialog) => {
    const { toast } = useToast()
    console.log(isOpen,onClose)
    function changeData() {
        const api = (document.getElementById("API") as HTMLInputElement).value;
        const prompt = (document.getElementById("prompt") as HTMLInputElement).value;
      
        if (!localStorage.getItem("apigroq")) {
          localStorage.setItem("apigroq", api);
        }
        if (!localStorage.getItem("prompt")) {
          localStorage.setItem("prompt", prompt);
        }
      }

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change prompt or API (Groq).</DialogTitle>
            <DialogDescription>
           <p> Change the API or prompt to generate your own response with your access key</p>
              <Separator className="my-4"/>
              <Input placeholder='API' id="API"/>
              <Separator className="my-4"/>
              <Input placeholder='prompt' id="prompt"/>
              <Separator className="my-4"/>
              <Button onClick={() => {
    toast({
      title: "Generated",
      description: "Prompt genaret succesfully",
    });
    changeData();
  }}>Change</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

export default CustomDialog;
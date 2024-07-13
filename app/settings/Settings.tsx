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

const CustomDialog = ({ isOpen, onClose }) => {
    const { toast } = useToast()
    function changeData(){
        const api = (document.getElementById("API") as HTMLInputElement).value
        const prompt = (document.getElementById("prompt") as HTMLInputElement).value

        localStorage.setItem("apigroq",api)
        localStorage.setItem("prompt",prompt)
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
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
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
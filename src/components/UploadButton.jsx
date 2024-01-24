import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

const UploadButton = (props) => {
  const {isOpen, setIsOpen} = props

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(e) => {
        if (!e) {
          setIsOpen(e);
        }
      }}
    >
      <DialogTrigger
        asChild
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <Button>
          <Plus className="mr-2 h-5 w-5" />
          Agregar servicio
        </Button>
      </DialogTrigger>

      <DialogContent>
        <props.ContentComponent {...props} setIsOpen={setIsOpen}/>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;

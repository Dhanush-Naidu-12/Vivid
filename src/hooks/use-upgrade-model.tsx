import { useState } from "react";
import { UpgradeModel } from "@/components/global/upgrade-model";
import { TRPCClientError } from "@trpc/client";

export const useUpgradeModel =() =>{
    const [open, setOpen] = useState(false);


    const handleError = (error: unknown) =>{
        if(error instanceof TRPCClientError){
           if(error.data?.code ==="FORBIDDEN"){
              setOpen(true);
              return true;
           }
        }
        return false
    };

    const model = <UpgradeModel open={open} onOpenChange={setOpen} />

    return {handleError, model}
}
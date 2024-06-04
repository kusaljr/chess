import { Button } from "@chess/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@chess/ui/dialog";
import { Input } from "@chess/ui/input";
import { Label } from "@chess/ui/label";
import { Textarea } from "@chess/ui/textarea";
import { GoBug } from "react-icons/go";

export default function ReportButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex items-center h-28 justify-center w-40 p-6 bg-gray-900 rounded-lg shadow hover:bg-gray-800">
          <div className="flex flex-col items-center">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-center text-white">
              <GoBug className="text-white" />
            </h5>
            <p className="font-normal text-gray-400 dark:text-gray-400">
              Send Report
            </p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send Report</DialogTitle>
          <DialogDescription>
            Let us know what's going on so we can help.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className=" items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className=" items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Message
            </Label>
            <Textarea id="username" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

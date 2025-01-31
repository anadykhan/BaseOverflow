import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, PlusIcon } from "lucide-react";
import LocalSearchBar from "../search/LocalSearchBar";
import Link from "next/link";

const UserSearchModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="primary-gradient rounded-full text-white h-10 w-10 p-0">
          <PlusIcon className="p-0" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-light-900 dark:bg-dark-400">
        <DialogHeader>
          <DialogTitle>Start a chat</DialogTitle>
          <DialogDescription>
            Start a chat with your friends. Start a new journey on sharing your
            knowledge!
          </DialogDescription>
        </DialogHeader>
        <div>
          <LocalSearchBar
            route="/messages"
            iconPosition="left"
            imgSrc="/assets/icons/search.svg"
            placeholder="Search for followers"
            otherClasses="flex-1 w-[260px] w-full"
          />
          {/* <Link
            href={`/messages/${user.clerkId}`}
            key={user.clerkId}
            onClick={() => setSelectedUser(user.clerkId)}
            className="w-full"
          >
            <UserBox
              key={user.clerkId}
              clerkId={JSON.stringify(userId)}
              name={user.name}
              isSelected={user.clerkId === selectedUser}
            />
          </Link> */}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default UserSearchModal;

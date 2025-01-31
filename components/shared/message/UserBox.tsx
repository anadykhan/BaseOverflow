import { Avatar, AvatarImage } from "@/components/ui/avatar"

interface UserBoxProps {
  clerkId: string;
  name: string;
  isSelected: boolean;
}

const UserBox = ({name, isSelected, clerkId, lastMessage}: UserBoxProps) => {

  return (
    <div className={`flex items-center gap-5 ${isSelected ? "bg-light-700 text-white dark:bg-dark-400" : ""} p-3 w-full pl-7`}>
      <Avatar>
        <AvatarImage src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400" />
      </Avatar>
      <div>
        <div className="text-dark-100 text-md font-semibold dark:text-white">
            {name}
        </div>
        <div className="text-dark-100 text-sm dark:text-white">
            {lastMessage}
        </div>
      </div>
    </div>
  );
}
export default UserBox
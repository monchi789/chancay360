import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";

export function ProfileImage() {
  return (
    <div className="flex items-center justify-center space-x-4">
      <div className="text-right text-[.7rem]">
        <p className="font-bold text-gray-800 hover:text-ceruleanBlue-800">Cristian Monzon</p>
        <p className="text-gray-600 hover:text-center">@monchi789</p>
      </div>
      <Avatar className="shadow-md">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

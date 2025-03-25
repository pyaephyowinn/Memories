import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserAvatar({ image, name }: { image?: string; name: string }) {
  return (
    <Avatar>
      <AvatarImage src={image} alt={name} />
      <AvatarFallback>
        {name[0]?.toUpperCase()}
        {name[-1]?.toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}

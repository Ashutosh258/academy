import { UserButton } from "@clerk/nextjs";

export default function Home() {
  
  return (
    <div>
       Home 
       <UserButton afterSignOutUrl="/sign-in"/>
    </div>
  );

}

import Topbar from "@/components/Topbar";


const Homelayout = ({children}:{children: React.ReactNode}) => {
  return <>
    <Topbar/>
     {children}
  </>;
};

export default Homelayout;

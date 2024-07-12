import Topbar from "@/components/layout/Topbar";



const Homelayout = ({children}:{children: React.ReactNode}) => {
  return <>
    <Topbar/>
     {children}
  </>;
};

export default Homelayout;

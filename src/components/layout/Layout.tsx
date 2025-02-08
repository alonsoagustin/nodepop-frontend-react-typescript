import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

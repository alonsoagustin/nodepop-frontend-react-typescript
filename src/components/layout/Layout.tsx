import { ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 pt-5 pb-5">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

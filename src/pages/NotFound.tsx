import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20 min-h-[80vh] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-orange to-accent-pink flex items-center justify-center mx-auto mb-6">
            <FileQuestion className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-3">404</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="rounded-full px-8">
            <Link to="/">Go Home</Link>
          </Button>
        </motion.div>
      </main>
      <Footer />
    </>
  );
};

export default NotFound;

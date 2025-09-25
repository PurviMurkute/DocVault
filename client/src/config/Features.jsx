import { FaLock, FaBolt, FaFileAlt, FaGlobe, FaFileExport } from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";

export const features = [
  {
    title: "Secure Cloud Storage",
    description: "All your files are safely stored and encrypted.",
    icon: <FaLock />,
  },
  {
    title: "Fast & Optimized Delivery",
    description: "ImageKit CDN ensures your files load instantly.",
    icon: <FaBolt />,
  },
  {
    title: "Supports All File Types",
    description: "Upload PDFs, images, docs, spreadsheets, and more.",
    icon: <FaFileAlt />,
  },
  {
    title: "Access Anywhere, Anytime",
    description: "Available on desktop, tablet, and mobile devices.",
    icon: <FaGlobe />,
  },
  {
    title: "Easy File Management",
    description: "Organize, rename, or delete your files with a simple and intuitive interface.",
    icon: <FaFileExport />,
  },
  {
    title: "Document Previews",
    description: "Preview images, PDFs, and docs without downloading, saving you time.",
    icon: <IoDocumentsSharp />,
  }
];

export default features;
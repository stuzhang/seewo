import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import CustomTitleBar from "@/components/CustomTitleBar";

export default function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* 自定义标题栏 */}
      <CustomTitleBar />
      
      {/* 主要内容区域 */}
      <div className="flex-1 overflow-hidden">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/other" element={<div className="text-center text-xl">Other Page - Coming Soon</div>} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

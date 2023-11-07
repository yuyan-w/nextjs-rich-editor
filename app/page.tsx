import { Editor } from "./Editor";

export default function Home() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative w-[800px] h-[600px] border-2 border-gray-300 bg-white text-gray-900">
        <Editor />
      </div>
    </main>
  );
}

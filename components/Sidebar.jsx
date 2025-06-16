"use client";
import { category } from "../assets/categorie";
import useIsMobile from "@/utils/useIsMobile";

export default function Sidebar() {
  const isMobile = useIsMobile();

  if (isMobile) return <></>;

  return (
    <aside className="hidden md:block w-1/4 px-8">
      <h2 className="text-xl font-semibold mb-4">Find Courses</h2>
      <ul className="space-y-2">
        {category.map((cat) => (
          <li
            key={cat._id}
            onClick={() => handleClick(cat._id)}
            className="text-blue-500 hover:underline cursor-pointer"
          >
            {cat.name}
          </li>
        ))}
      </ul>
    </aside>
  );
}

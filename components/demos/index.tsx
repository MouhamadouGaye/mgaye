import type { ComponentType } from "react";
import type { Product } from "@/data/types";
import Frame from "./Frame";
import DocDemo from "./DocDemo";
import SheetDemo from "./SheetDemo";
import CallDemo from "./CallDemo";
import PosterDemo from "./PosterDemo";

const DEMOS: Record<Product["slug"], ComponentType> = { docs: DocDemo, sheet: SheetDemo, call: CallDemo, poster: PosterDemo };

export default function ProductDemo({ product }: { product: Product }) {
  const Demo = DEMOS[product.slug];
  return <Frame url={product.url.replace("https://", "")}><Demo /></Frame>;
}

import {
  createOgImageResponse,
  ogImageSize,
} from "@/shared/lib/create-og-image-response";

export const alt = "송지우 | Frontend Developer · Portfolio";
export const size = ogImageSize;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return createOgImageResponse();
}

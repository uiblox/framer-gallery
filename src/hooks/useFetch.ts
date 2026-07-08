import { useEffect, useState } from "react";

type UnsplashImage = {
  id: string;
  urls: {
    regular: string;
  };
  alt_description?: string | null;
};

export const useFetch = () => {
  const [data, setData] = useState<UnsplashImage[] | null>(null);
  const ImageAccessKey = import.meta.env.VITE_API_KEY;

  const url = `https://api.unsplash.com/search/photos?query=nature&client_id=${ImageAccessKey}`;

  useEffect(() => {
    async function fetchImages() {
      const response = await fetch(url);
      const imageJSON = (await response.json()) as UnsplashImage[];
      console.log(imageJSON);
      setData(imageJSON);
    }
    fetchImages();
  }, [url]);

  return { data };
};

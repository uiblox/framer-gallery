import { useEffect, useState } from "react";

export type UnsplashRecord = {
  id: string;
  description: string;
  user: {
    first_name: string;
    location: string;
  };
  urls: {
    regular: string;
    full: string;
  };
  alt_description?: string | null;
};

type UnsplashSearch = {
  results: UnsplashRecord[];
};

export const useFetch = () => {
  const [data, setData] = useState<UnsplashSearch | null>(null);
  const ImageAccessKey = import.meta.env.VITE_API_KEY;

  const url = `https://api.unsplash.com/search/photos?query=nature&client_id=${ImageAccessKey}`;

  useEffect(() => {
    async function fetchImages() {
      let isMounted = true;

      const response = await fetch(url);
      const imageJSON = (await response.json()) as UnsplashSearch;

      if (isMounted) {
        setData(imageJSON);
      }

      return () => {
        isMounted = false;
      };
    }

    fetchImages();
  }, [url]);

  return { data };
};

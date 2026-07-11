import { useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { AnimatePresence, motion } from "motion/react";
import { type UnsplashRecord } from "../../hooks/useFetch";
import { image } from "motion/react-client";

export const Gallery = () => {
  const { data: images } = useFetch();
  const [selectedImage, setSelectedImage] = useState<UnsplashRecord | null>(
    null,
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (image: UnsplashRecord) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setIsLightboxOpen(false);
  };

  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isLightboxOpen]);

  const currentImageIndex =
    images?.results?.findIndex((img) => img.id === selectedImage?.id) ?? -1;

  const nextImage = (current: number) => {
    const nextCount = current + 1;
    const totalCount = images?.results.length;
    const newImage = images?.results?.[nextCount] as UnsplashRecord | undefined;
    console.log(nextCount);
    console.log(totalCount && totalCount);
    if (newImage && images?.results) {
      if (nextCount === totalCount) {
        console.log(images?.results?.[0]);
        setSelectedImage(images?.results?.[0]);
        return;
      }
      setSelectedImage(newImage);
    }
  };

  const prevImage = (current: number) => {
    const prevCount = current - 1;
    const newImage = images?.results?.[prevCount] as UnsplashRecord | undefined;

    if (newImage) {
      setSelectedImage(newImage);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4 sm:px-6 lg:px-8 text-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {
                opacity: 0,
              },
              visible: {
                opacity: 1,
                transition: {
                  duration: 0.6,
                },
              },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                duration: 0.6,
              }}
              className="text-4xl font-bold mb-4"
            >
              Image Gallery with Lightbox
            </motion.h1>
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{
                delay: 0.2,
                duration: 0.6,
              }}
              className="text-lg text-slate-300 mx-auto"
            >
              Click on any imager to get addition details
            </motion.p>
          </motion.div>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {
              opacity: 0,
            },
            visible: {
              opacity: 1,
              transition: {
                duration: 0.6,
              },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-2 lg:grid-cols3 gap-6"
        >
          {images?.results?.map((img, index) => {
            return (
              <motion.div
                onClick={() => openLightbox(img)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  delay: index * 0.1,
                }}
                key={img.id}
              >
                <img
                  src={`${img.urls.regular}?auto=format&fit=crop&w=1200&q=90`}
                  alt={img.alt_description ?? "Gallery image"}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </motion.div>
            );
          })}
        </motion.div>
        <AnimatePresence>
          {isLightboxOpen && selectedImage && (
            <motion.div className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4">
              <motion.div className="bg-slate-900 rounded-xl overflow-hidden max-w-6xl w-full relative">
                <button
                  className="absolute top-4 right-4 z-10 bg-slate-800 hover:bg-slate-700 text-white w-10 h-10 rounded-full flex justify-center items-center cursor-pointer"
                  onClick={closeLightbox}
                >
                  x
                </button>
                <div className="flex flex-col md:flex-row md:justify-between">
                  <div>
                    <img
                      className="w-full h-80 lg:h-160 object-cover object-center rounded-lg grow"
                      src={selectedImage.urls.full}
                      alt={selectedImage.alt_description ?? "Gallery image"}
                    />
                  </div>
                  <div className="md:w-96 bg-slate-800 p-6 text-white flex flex-col">
                    <h2 className="text-2xl font-bold mb-2">
                      {selectedImage.alt_description}
                    </h2>
                    <p className="text-slate-300">{`Photographer: ${selectedImage.user.first_name}`}</p>
                    <div className="text-slate-400 my-4 text-sm">
                      {currentImageIndex + 1} / {images?.results?.length}
                    </div>
                    <div className="flex space-x-4 mt-auto">
                      <button
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => prevImage(currentImageIndex)}
                      >
                        Previous
                      </button>
                      <button
                        className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg"
                        onClick={() => nextImage(currentImageIndex)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

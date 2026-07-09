import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { AnimatePresence, motion } from "motion/react";
import { type UnsplashRecord } from "../../hooks/useFetch";

export const Gallery = () => {
  const { data: images } = useFetch();
  const [selectedImage, setSelectedImage] = useState<UnsplashRecord | null>(
    null,
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (image: UnsplashRecord) => {
    console.log(image);
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
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
              className="text-lg text-slate-300"
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
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
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
              <motion.div className="bg-slate-900 rounded-xl overflow-hidden max-w-6xl w-full">
                <div>
                  <img
                    className="w-full h-80 lg:h-160 object-cover rounded"
                    src={selectedImage.urls.full}
                    alt={selectedImage.alt_description ?? "Gallery image"}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
